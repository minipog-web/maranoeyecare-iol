import * as THREE from 'three';

export interface LandmarkScreenCoord {
  x: number; // percentage (0 to 100)
  y: number; // percentage (0 to 100)
  visible: boolean;
}

export interface LandmarkMap {
  cornea: LandmarkScreenCoord;
  lens: LandmarkScreenCoord;
  macula: LandmarkScreenCoord;
  opticNerve: LandmarkScreenCoord;
}

export interface CataractSceneOptions {
  container: HTMLElement;
  isMinimal?: boolean;
  onProgressUpdate?: (progress: number, stageIndex: number) => void;
  onLandmarksUpdate?: (landmarks: LandmarkMap) => void;
}

export type CameraViewMode = 'crossSection' | 'lensFocus' | 'anterior';

export class CataractEyeScene {
  private container: HTMLElement;
  private isMinimal: boolean;
  private onProgressUpdate?: (progress: number, stageIndex: number) => void;
  private onLandmarksUpdate?: (landmarks: LandmarkMap) => void;
  private lastLandmarkEmit = 0;
  private lastEmittedStage = -1;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private animFrameId: number | null = null;
  private isDisposed = false;

  // Master Sagittal Clipping Plane: Cuts foreground Z > 0, keeping Z <= 0.
  // This leaves the crystalline lens, cornea, iris, retina, and optic nerve 100% UNBLOCKED
  // and directly facing the viewer in full anatomical profile!
  private clipPlane = new THREE.Plane(new THREE.Vector3(0, 0, -1), 0.0);

  // Interaction & Camera Spherical Coordinates
  private isDragging = false;
  private prevPointerX = 0;
  private prevPointerY = 0;

  private currentViewMode: CameraViewMode = 'crossSection';
  // Camera Controls (Spherical Orbit, Clamped to Anatomical Cutaway)
  private targetDistance = 4.45;
  private currentDistance = 4.45;
  private targetAzimuth = 0.1;
  private currentAzimuth = 0.1;
  private targetElevation = 0.08;
  private currentElevation = 0.08;

  private targetLookAt = new THREE.Vector3(-0.3, 0.0, 0.0);
  private currentLookAt = new THREE.Vector3(-0.3, 0.0, 0.0);

  // Timeline & State
  private targetProgress = 0.0;
  private currentProgress = 0.0;
  private isPlaying = true;
  private playSpeed = 0.12;
  private isIOLMode = false;
  private iolTransition = 0.0;
  private iolHoldTimer = 0;
  private denseCataractHoldTimer = 0;
  private lastFrameTime = 0;

  // Meshes & Groups
  private eyeGroup!: THREE.Group;
  private lensGroup!: THREE.Group;
  private lensMesh!: THREE.Mesh;
  private proteinParticles!: THREE.Points;
  private proteinPositions!: Float32Array;
  private proteinColors!: Float32Array;
  private iolGroup!: THREE.Group;
  private iolOpticMesh!: THREE.Mesh;
  private iolRingMesh!: THREE.Mesh;
  private iolHaptic1Mesh!: THREE.Mesh;
  private iolHaptic2Mesh!: THREE.Mesh;

  // Optical Ray Meshes
  private rayGroup!: THREE.Group;
  private incomingRays!: THREE.LineSegments;
  private internalRays!: THREE.LineSegments;
  private scatterRays!: THREE.LineSegments;
  private retinalFocalSpot!: THREE.Mesh;
  private retinalFocalGlow!: THREE.PointLight;

  // Anatomical Macular Focus Coordinate (Visual Axis Y = 0.05, Temporal Z = -0.24)
  private readonly maculaPos = new THREE.Vector3(1.525, 0.05, -0.24);

  constructor(options: CataractSceneOptions) {
    this.container = options.container;
    this.isMinimal = options.isMinimal ?? false;
    this.onProgressUpdate = options.onProgressUpdate;
    this.onLandmarksUpdate = options.onLandmarksUpdate;

    if (this.isMinimal) {
      this.playSpeed = 0.125; // 8.0s for biological progression
      this.targetDistance = 4.65;
      this.currentDistance = 4.65;
      this.targetAzimuth = 0.12;
      this.currentAzimuth = 0.12;
      this.targetElevation = 0.08;
      this.currentElevation = 0.08;
    }

    this.init();
  }

  private init() {
    const width = this.container.clientWidth || 600;
    const height = this.container.clientHeight || 450;

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    this.updateCameraPosition();

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.25;
    // Enable GPU-accelerated local clipping plane
    this.renderer.localClippingEnabled = true;
    this.container.appendChild(this.renderer.domElement);

    this.setupEnvironment();
    this.setupLighting();
    this.buildAnatomicalEye();
    this.buildOpticalLightPath();
    this.bindEvents();
    this.renderLoop();
  }

  private setupEnvironment() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createLinearGradient(0, 0, 0, 128);
      grad.addColorStop(0, '#1e293b');
      grad.addColorStop(0.35, '#0f172a');
      grad.addColorStop(0.5, '#38bdf8');
      grad.addColorStop(0.65, '#0f172a');
      grad.addColorStop(1, '#020617');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 256, 128);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fillRect(40, 15, 70, 45);
      ctx.fillRect(160, 20, 60, 35);
    }
    const envTexture = new THREE.CanvasTexture(canvas);
    envTexture.mapping = THREE.EquirectangularReflectionMapping;
    this.scene.environment = envTexture;
  }

  private setupLighting() {
    const ambient = new THREE.AmbientLight(0x1e293b, 1.6);
    this.scene.add(ambient);

    // Primary key light focused on crystalline lens from top-left
    const keyLight = new THREE.DirectionalLight(0xfffaed, 4.2);
    keyLight.position.set(-3.5, 5, 4.5);
    this.scene.add(keyLight);

    // Lateral fill light from bottom-right
    const fillLight = new THREE.DirectionalLight(0x93c5fd, 1.6);
    fillLight.position.set(3.5, 2, 4);
    this.scene.add(fillLight);

    // Subtle back rim light to highlight anterior cornea and posterior sclera edges
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 2.0);
    rimLight.position.set(0, 3, -4);
    this.scene.add(rimLight);

    // High-precision spotlight pointing right at the crystalline lens center (-0.95, 0, 0)
    // Neutral surgical illumination to keep the clear acrylic IOL pristine without amber cast
    const lensSpot = new THREE.SpotLight(0xf8fafc, 3.8, 8, Math.PI * 0.35, 0.45);
    lensSpot.position.set(-0.95, 2.8, 2.5);
    lensSpot.target.position.set(-0.95, 0, 0);
    this.scene.add(lensSpot);
    this.scene.add(lensSpot.target);

    // Warm fundus glow inside the vitreous / retinal cavity
    const fundusGlow = new THREE.PointLight(0xf97316, 1.4, 4);
    fundusGlow.position.set(0.6, 0.1, -0.4);
    this.scene.add(fundusGlow);

    // Dedicated Anterior Slit-Lamp Biomicroscopy Key Light
    // Angled obliquely (~32° off visual axis) to illuminate the crystalline lens through the pupil
    const slitLampKey = new THREE.SpotLight(0xfffbeb, 4.6, 9, Math.PI * 0.28, 0.35);
    slitLampKey.position.set(-3.4, 1.2, 1.5);
    slitLampKey.target.position.set(-0.95, 0, 0);
    this.scene.add(slitLampKey);
    this.scene.add(slitLampKey.target);
  }

  private createScleraTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, 512, 512);

      ctx.lineWidth = 1.3;
      ctx.lineCap = 'round';
      ctx.strokeStyle = 'rgba(220, 38, 38, 0.32)';

      const drawBranch = (x: number, y: number, angle: number, len: number, d: number) => {
        if (d <= 0) return;
        const x2 = x + Math.cos(angle) * len;
        const y2 = y + Math.sin(angle) * len;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        drawBranch(x2, y2, angle + (Math.random() * 0.55 - 0.25), len * 0.72, d - 1);
      };

      for (let i = 0; i < 16; i++) {
        const sx = Math.random() * 512;
        const sy = Math.random() * 512;
        drawBranch(sx, sy, Math.random() * Math.PI * 2, 22, 3);
      }
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }

  private createRetinaTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Warm, deep, uniform retinal pigment epithelium & choroidal fundus base
      const grad = ctx.createRadialGradient(256, 256, 10, 256, 256, 256);
      grad.addColorStop(0, '#be3a12');
      grad.addColorStop(0.35, '#a3320f');
      grad.addColorStop(0.7, '#85290d');
      grad.addColorStop(1.0, '#4a1408');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 512);

      // Subtle, smooth diffuse choroidal warmth (zero harsh circles or lines)
      const softGlow = ctx.createRadialGradient(256, 256, 40, 256, 256, 220);
      softGlow.addColorStop(0, 'rgba(234, 88, 12, 0.12)');
      softGlow.addColorStop(0.5, 'rgba(194, 65, 12, 0.06)');
      softGlow.addColorStop(1, 'rgba(74, 20, 8, 0)');
      ctx.fillStyle = softGlow;
      ctx.fillRect(0, 0, 512, 512);
    }
    return new THREE.CanvasTexture(canvas);
  }

  private createOpticDiscTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Scleral ring / Elschnig's border (clean, pale transition)
      ctx.fillStyle = 'rgba(241, 245, 249, 0.95)';
      ctx.beginPath();
      ctx.arc(128, 128, 124, 0, Math.PI * 2);
      ctx.fill();

      // Neuroretinal rim: Crisp, prominent creamy-white / pale-ivory papilla ("white spot")
      const rimGrad = ctx.createRadialGradient(128, 128, 28, 128, 128, 118);
      rimGrad.addColorStop(0, '#ffffff'); // Inner cup transition
      rimGrad.addColorStop(0.35, '#fffbeb'); // Physiological cup margin
      rimGrad.addColorStop(0.7, '#fef08a'); // Healthy neuroretinal rim
      rimGrad.addColorStop(0.92, '#fde68a'); // Outer papilla border
      rimGrad.addColorStop(1.0, '#f59e0b'); // Subtle vascular rim contour
      ctx.fillStyle = rimGrad;
      ctx.beginPath();
      ctx.arc(128, 128, 118, 0, Math.PI * 2);
      ctx.fill();

      // Physiological cup (central pale, depression)
      const cupGrad = ctx.createRadialGradient(128, 128, 5, 128, 128, 48);
      cupGrad.addColorStop(0, '#ffffff');
      cupGrad.addColorStop(0.7, '#fefce8');
      cupGrad.addColorStop(1.0, '#fef08a');
      ctx.fillStyle = cupGrad;
      ctx.beginPath();
      ctx.arc(128, 128, 48, 0, Math.PI * 2);
      ctx.fill();

      // Central vascular depression (Lamina Cribrosa emergent core)
      ctx.fillStyle = '#991b1b';
      ctx.beginPath();
      ctx.arc(128, 128, 16, 0, Math.PI * 2);
      ctx.fill();

      // Central retinal artery emergence (nasal/superior side of cup)
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.arc(122, 124, 8, 0, Math.PI * 2);
      ctx.fill();

      // Central retinal vein emergence (temporal/inferior side of cup)
      ctx.fillStyle = '#1e3a8a';
      ctx.beginPath();
      ctx.arc(134, 131, 9, 0, Math.PI * 2);
      ctx.fill();
    }
    return new THREE.CanvasTexture(canvas);
  }

  private createMaculaTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Macula Lutea: Rich warm amber-orange carotenoid/xanthophyll pigment ring
      const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 120);
      grad.addColorStop(0, '#450a0a'); // Foveola / central foveal pit (darker red)
      grad.addColorStop(0.2, '#7c2d12'); // Fovea centralis
      grad.addColorStop(0.55, '#b45309'); // Parafovea xanthophyll pigment
      grad.addColorStop(0.82, '#9a3412'); // Perifovea transition
      grad.addColorStop(1.0, 'rgba(154, 52, 18, 0)'); // Seamless blending into retina
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 256, 256);

      // Subtle foveal central reflex
      const foveaReflex = ctx.createRadialGradient(128, 128, 0, 128, 128, 14);
      foveaReflex.addColorStop(0, 'rgba(254, 243, 199, 0.45)');
      foveaReflex.addColorStop(0.5, 'rgba(217, 119, 6, 0.25)');
      foveaReflex.addColorStop(1.0, 'rgba(69, 10, 10, 0)');
      ctx.fillStyle = foveaReflex;
      ctx.beginPath();
      ctx.arc(128, 128, 14, 0, Math.PI * 2);
      ctx.fill();
    }
    return new THREE.CanvasTexture(canvas);
  }

  private createFocalSpotTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Brilliant optical convergence pinpoint flare focused onto the fovea
      const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 60);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
      grad.addColorStop(0.18, 'rgba(254, 240, 138, 0.95)');
      grad.addColorStop(0.42, 'rgba(245, 158, 11, 0.7)');
      grad.addColorStop(0.75, 'rgba(234, 88, 12, 0.25)');
      grad.addColorStop(1, 'rgba(234, 88, 12, 0.0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 128, 128);

      // Delicate optical diffraction spikes (Airy disk star flare)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(14, 64);
      ctx.lineTo(114, 64);
      ctx.moveTo(64, 14);
      ctx.lineTo(64, 114);
      ctx.stroke();
    }
    return new THREE.CanvasTexture(canvas);
  }

  private createIrisTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, 512, 512);

      const cx = 256;
      const cy = 256;
      for (let i = 0; i < 360; i += 0.8) {
        const rad = (i * Math.PI) / 180;
        const r1 = 80;
        const r2 = 246 + Math.sin(i * 12) * 6;
        const grad = ctx.createLinearGradient(
          cx + Math.cos(rad) * r1,
          cy + Math.sin(rad) * r1,
          cx + Math.cos(rad) * r2,
          cy + Math.sin(rad) * r2
        );
        grad.addColorStop(0, '#000000');
        grad.addColorStop(0.28, '#2563eb');
        grad.addColorStop(0.72, '#1e3a8a');
        grad.addColorStop(1, '#0f172a');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(rad) * r1, cy + Math.sin(rad) * r1);
        ctx.lineTo(cx + Math.cos(rad) * r2, cy + Math.sin(rad) * r2);
        ctx.stroke();
      }
    }
    return new THREE.CanvasTexture(canvas);
  }

  /*
   * Precision Anatomical Ocular Construction:
   * Sclera globe (R = 1.60) with anterior limbal opening at X = -1.274 (radius 0.968).
   * Cornea dome (R = 1.15) seamlessly joins at X = -1.274 and apex at X = -1.80.
   * Iris diaphragm at X = -1.16 with round pupil aperture.
   * Crystalline Lens (biconvex, equatorial R = 0.65, thickness 0.46) at X = -0.95.
   * Ciliary Body and radial Zonules of Zinn at X = -1.02.
   * Retina cup lining posterior wall from X = -0.65 to +1.56.
   * Master Sagittal Clipping Plane cleanly cuts away foreground Z > 0, exposing
   * every interior organ with ZERO occlusion directly to the viewer's eyes!
   */
  private buildAnatomicalEye() {
    this.eyeGroup = new THREE.Group();
    this.scene.add(this.eyeGroup);

    const scleraR = 1.6;
    const limbusX = -1.274;
    const limbusR = 0.968;

    // ── 1. SCLERA (Outer White Eye Globe, Clipped at Z = 0) ──
    const scleraGeo = new THREE.SphereGeometry(
      scleraR,
      64,
      48,
      0,
      Math.PI * 2,
      0.65,
      Math.PI - 0.65
    );
    scleraGeo.rotateZ(Math.PI * 0.5); // align aperture to -X (anterior pole)
    const scleraMat = new THREE.MeshStandardMaterial({
      map: this.createScleraTexture(),
      roughness: 0.38,
      metalness: 0.04,
      side: THREE.DoubleSide,
      clippingPlanes: [this.clipPlane],
    });
    const sclera = new THREE.Mesh(scleraGeo, scleraMat);
    this.eyeGroup.add(sclera);

    // ── 2. RETINA & CHOROID (Inner bowl lining, Clipped at Z = 0) ──
    const retinaR = scleraR * 0.968;
    const retinaGeo = new THREE.SphereGeometry(
      retinaR,
      64,
      48,
      0,
      Math.PI * 2,
      0.72,
      Math.PI - 0.72
    );
    retinaGeo.rotateZ(Math.PI * 0.5);
    const retinaMat = new THREE.MeshStandardMaterial({
      map: this.createRetinaTexture(),
      roughness: 0.55,
      metalness: 0.05,
      side: THREE.BackSide,
      clippingPlanes: [this.clipPlane],
    });
    const retina = new THREE.Mesh(retinaGeo, retinaMat);
    this.eyeGroup.add(retina);

    // ── 3. ANATOMICAL CUTAWAY SECTION RIM (Multi-Layer Tissue Profile at Z = 0) ──
    const cutWallGroup = new THREE.Group();
    cutWallGroup.position.set(0, 0, 0);

    // Sclera layer cut rim
    const cutScleraGeo = new THREE.RingGeometry(scleraR * 0.968, scleraR, 64, 1, 0, Math.PI);
    cutScleraGeo.rotateZ(Math.PI * 0.5);
    const cutScleraMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.45,
      side: THREE.DoubleSide,
    });
    const cutSclera = new THREE.Mesh(cutScleraGeo, cutScleraMat);
    cutWallGroup.add(cutSclera);

    // Vascular choroid layer cut rim
    const cutChoroidGeo = new THREE.RingGeometry(
      scleraR * 0.94,
      scleraR * 0.968,
      64,
      1,
      0,
      Math.PI
    );
    cutChoroidGeo.rotateZ(Math.PI * 0.5);
    const cutChoroidMat = new THREE.MeshStandardMaterial({
      color: 0x4a1207,
      roughness: 0.65,
      side: THREE.DoubleSide,
    });
    const cutChoroid = new THREE.Mesh(cutChoroidGeo, cutChoroidMat);
    cutWallGroup.add(cutChoroid);

    this.eyeGroup.add(cutWallGroup);

    // ── 4. CORNEA (Crystal Clear Anterior Dome, Seamlessly connects at limbusX) ──
    const corneaR = 1.15;
    const corneaGeo = new THREE.SphereGeometry(corneaR, 56, 32, 0, Math.PI * 2, 0, 1.0);
    corneaGeo.rotateZ(Math.PI * 0.5);
    const corneaMat = new THREE.MeshPhysicalMaterial({
      color: 0xf0f9ff,
      transparent: true,
      opacity: 0.2,
      roughness: 0.02,
      metalness: 0.0,
      ior: 1.376,
      specularIntensity: 1.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      side: THREE.DoubleSide,
      depthWrite: false,
      clippingPlanes: [this.clipPlane],
    });
    const cornea = new THREE.Mesh(corneaGeo, corneaMat);
    cornea.position.set(-0.653, 0.0, 0.0);
    this.eyeGroup.add(cornea);

    // Translucent ghosted foreground cornea dome
    const ghostCorneaMat = new THREE.MeshPhysicalMaterial({
      color: 0xe0f2fe,
      transparent: true,
      opacity: 0.09,
      roughness: 0.05,
      metalness: 0.0,
      ior: 1.376,
      specularIntensity: 1.3,
      clearcoat: 0.85,
      clearcoatRoughness: 0.04,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const ghostCornea = new THREE.Mesh(corneaGeo.clone(), ghostCorneaMat);
    ghostCornea.position.set(-0.653, 0.0, 0.0);
    this.eyeGroup.add(ghostCornea);

    // Corneal Limbus Ring (Corneo-scleral junction ring)
    const limbusGeo = new THREE.TorusGeometry(limbusR, 0.035, 16, 64);
    limbusGeo.rotateY(Math.PI * 0.5);
    const limbusMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      transparent: true,
      opacity: 0.82,
      roughness: 0.32,
      clippingPlanes: [this.clipPlane],
    });
    const limbus = new THREE.Mesh(limbusGeo, limbusMat);
    limbus.position.set(limbusX, 0.0, 0.0);
    this.eyeGroup.add(limbus);

    // ── 5. IRIS & PUPIL (In Coronal Plane X = -1.16, Clipped at Z = 0) ──
    const irisOuterR = 0.94;
    const irisInnerR = 0.44; // Pupil aperture
    const irisGeo = new THREE.RingGeometry(irisInnerR, irisOuterR, 64);
    irisGeo.rotateY(Math.PI * 0.5);
    const irisMat = new THREE.MeshStandardMaterial({
      map: this.createIrisTexture(),
      roughness: 0.54,
      metalness: 0.08,
      side: THREE.DoubleSide,
      clippingPlanes: [this.clipPlane],
    });
    const iris = new THREE.Mesh(irisGeo, irisMat);
    iris.position.set(-1.16, 0.0, 0.0);
    this.eyeGroup.add(iris);

    // Pupillary margin sphincter ring (black, representing the pupil aperture)
    const sphincterGeo = new THREE.RingGeometry(irisInnerR - 0.02, irisInnerR + 0.02, 48);
    sphincterGeo.rotateY(Math.PI * 0.5);
    const sphincterMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      side: THREE.DoubleSide,
      clippingPlanes: [this.clipPlane],
    });
    const sphincter = new THREE.Mesh(sphincterGeo, sphincterMat);
    sphincter.position.set(-1.162, 0.0, 0.0);
    this.eyeGroup.add(sphincter);

    // ── 6. CILIARY BODY & SUSPENSORY ZONULES OF ZINN (X = -1.02) ──
    const ciliaryGroup = new THREE.Group();
    this.eyeGroup.add(ciliaryGroup);

    // Ciliary body base ring (Pars Plicata / Ciliary Ring)
    const ciliaryGeo = new THREE.TorusGeometry(0.88, 0.075, 16, 64);
    ciliaryGeo.rotateY(Math.PI * 0.5);
    const ciliaryMat = new THREE.MeshStandardMaterial({
      color: 0x3d1708,
      roughness: 0.82,
      metalness: 0.05,
      clippingPlanes: [this.clipPlane],
    });
    const ciliary = new THREE.Mesh(ciliaryGeo, ciliaryMat);
    ciliary.position.set(-1.02, 0.0, 0.0);
    ciliaryGroup.add(ciliary);

    // Corona Ciliaris: 72 Anatomical Ciliary Processes (Radial uveal crests)
    const numProcesses = 72;
    const processGeo = new THREE.CylinderGeometry(0.012, 0.024, 0.11, 8);
    const processMat = new THREE.MeshStandardMaterial({
      color: 0x2b1006,
      roughness: 0.88,
      clippingPlanes: [this.clipPlane],
    });
    const processInst = new THREE.InstancedMesh(processGeo, processMat, numProcesses);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < numProcesses; i++) {
      const angle = (i / numProcesses) * Math.PI * 2;
      const r = 0.845;
      dummy.position.set(-1.02, Math.cos(angle) * r, Math.sin(angle) * r);
      dummy.rotation.set(0, 0, angle + Math.PI * 0.5);
      dummy.updateMatrix();
      processInst.setMatrixAt(i, dummy.matrix);
    }
    processInst.instanceMatrix.needsUpdate = true;
    ciliaryGroup.add(processInst);

    // Suspensory Zonules of Zinn (Apparatus suspensorius lentis)
    // Clear, taut straight radial suspension fibers connecting the ciliary body directly to the lens
    const zonuleLines: number[] = [];
    const numZonules = 96;

    for (let i = 0; i < numZonules; i++) {
      const angle = (i / numZonules) * Math.PI * 2;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      // Ciliary process origin point
      const origX = -1.02;
      const origR = 0.845;
      const pOrig = [origX, cosA * origR, sinA * origR];

      // 1. Equatorial Straight Fiber (Direct straight line to lens equator)
      const eqX = -0.95;
      const eqR = 0.65;
      const pEq = [eqX, cosA * eqR, sinA * eqR];
      zonuleLines.push(...pOrig, ...pEq);

      // 2. Anterior Straight Fiber (Direct straight line to anterior lens capsule)
      const antX = -0.985;
      const antR = 0.61;
      const dTheta = 0.012;
      const pAnt = [antX, Math.cos(angle + dTheta) * antR, Math.sin(angle + dTheta) * antR];
      zonuleLines.push(...pOrig, ...pAnt);

      // 3. Posterior Straight Fiber (Direct straight line to posterior lens capsule)
      const postX = -0.915;
      const postR = 0.61;
      const pPost = [postX, Math.cos(angle - dTheta) * postR, Math.sin(angle - dTheta) * postR];
      zonuleLines.push(...pOrig, ...pPost);
    }

    // High-visibility, crisp straight suspensory fibers
    const zonuleGeo = new THREE.BufferGeometry();
    zonuleGeo.setAttribute('position', new THREE.Float32BufferAttribute(zonuleLines, 3));
    const zonuleMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 1.0,
      clippingPlanes: [this.clipPlane],
    });
    const zonules = new THREE.LineSegments(zonuleGeo, zonuleMat);
    ciliaryGroup.add(zonules);

    // ── 7. THE CRYSTALLINE LENS (The Star of the Scene, X = -0.95) ──
    // Unclipped by clipPlane! Positioned right in the center of the optical path!
    this.lensGroup = new THREE.Group();
    this.lensGroup.position.set(-0.95, 0.0, 0.0);
    this.eyeGroup.add(this.lensGroup);

    // Biconvex optical profile: Equatorial R = 0.65, axial thickness = 0.46 (scaled X = 0.35)
    // Seamless single anatomical body matching zonular insertion at R = 0.65
    const lensGeo = new THREE.SphereGeometry(0.65, 64, 48);
    lensGeo.scale(0.35, 1.0, 1.0);

    // Anatomically authentic crystalline lens material (pristine biological refractive index 1.406)
    const lensMat = new THREE.MeshPhysicalMaterial({
      color: 0xcffafe,
      transparent: true,
      opacity: 0.82,
      depthWrite: false,
      roughness: 0.05,
      metalness: 0.0,
      ior: 1.406,
      specularIntensity: 1.4,
      clearcoat: 0.88,
      clearcoatRoughness: 0.04,
      side: THREE.DoubleSide,
    });
    this.lensMesh = new THREE.Mesh(lensGeo, lensMat);
    this.lensMesh.renderOrder = 2;
    this.lensGroup.add(this.lensMesh);

    // ── 8. VOLUMETRIC PROTEIN PARTICLES (Cortical & Nuclear Opacities) ──
    const particleCount = this.isMinimal ? 700 : 1500;
    this.proteinPositions = new Float32Array(particleCount * 3);
    this.proteinColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      // Biological distribution: 65% in nuclear core, 35% in cortex
      const isNuclear = Math.random() < 0.65;
      const maxR = isNuclear ? 0.38 : 0.6;
      const maxThick = isNuclear ? 0.13 : 0.18;
      let rx, ry, rz;
      do {
        rx = (Math.random() * 2 - 1) * maxThick;
        ry = (Math.random() * 2 - 1) * maxR;
        rz = (Math.random() * 2 - 1) * maxR;
      } while ((rx / maxThick) ** 2 + (ry / maxR) ** 2 + (rz / maxR) ** 2 > 1.0);

      this.proteinPositions[i * 3] = rx;
      this.proteinPositions[i * 3 + 1] = ry;
      this.proteinPositions[i * 3 + 2] = rz;

      this.proteinColors[i * 3] = 1.0;
      this.proteinColors[i * 3 + 1] = 1.0;
      this.proteinColors[i * 3 + 2] = 1.0;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(this.proteinPositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(this.proteinColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: this.isMinimal ? 0.055 : 0.048,
      map: this.createParticleTexture(),
      transparent: true,
      opacity: 0.0,
      vertexColors: true,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });
    this.proteinParticles = new THREE.Points(particleGeo, particleMat);
    this.proteinParticles.renderOrder = 3;
    this.lensGroup.add(this.proteinParticles);

    // ── 9. POSTERIOR OPTIC NERVE & RETINAL VASCULAR ARCADES ──
    // ── 9. POSTERIOR OPTIC NERVE & RETINAL VASCULAR ARCADES ──
    // Anatomical Fundus Precision:
    // - Macula Lutea & Fovea Centralis: Positioned at the posterior pole along the optical/visual axis
    //   (X = 1.540, Y = +0.02, Z = -0.08), temporal to the optic disc.
    // - Optic Nerve Head (Optic Disc): Sits NASALLY (Z = -0.52) and slightly SUPERIOR (Y = +0.24),
    //   spaced ~2.5 disc diameters (~0.50 units) away from the fovea.
    // - The 3D Optic Nerve Trunk enters the posterior-nasal sclera directly behind the Optic Disc.
    // - The white spot representing the Optic Nerve Head is precisely centered where the 3D optic nerve comes in.
    // - The collimated light rays focus exclusively on the MACULA, NOT the optic nerve.
    // - Superior & Inferior Temporal Arcades emerge from the Optic Disc and arch broadly around the Macula,
    //   cradling the Foveal Avascular Zone (FAZ) in a textbook elliptical embrace.

    const discDir = new THREE.Vector3(1.404, 0.28, -0.58).normalize();
    const discPos = discDir.clone().multiplyScalar(retinaR - 0.008);
    const maculaPos = this.maculaPos;

    // ── 9A. EXTERIOR 3D OPTIC NERVE TRUNK (Entering posterior-nasal sclera) ──
    const scleraExit = discDir.clone().multiplyScalar(scleraR);
    const nerveLength = 0.95;
    const nerveCenter = scleraExit.clone().add(discDir.clone().multiplyScalar(nerveLength * 0.5));
    const nerveQuat = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      discDir
    );

    const nerveGroup = new THREE.Group();
    nerveGroup.position.copy(nerveCenter);
    nerveGroup.quaternion.copy(nerveQuat);

    // Dural / arachnoid sheath (fibrous pearlescent white/slate exterior)
    const sheathGeo = new THREE.CylinderGeometry(0.16, 0.19, nerveLength, 32);
    const sheathMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.5,
      metalness: 0.05,
      clippingPlanes: [this.clipPlane],
    });
    nerveGroup.add(new THREE.Mesh(sheathGeo, sheathMat));

    // Neural fiber core (axons of retinal ganglion cells)
    const coreGeo = new THREE.CylinderGeometry(0.115, 0.135, nerveLength + 0.02, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.55,
      clippingPlanes: [this.clipPlane],
    });
    nerveGroup.add(new THREE.Mesh(coreGeo, coreMat));

    // Central retinal artery entering nerve core
    const artNerveGeo = new THREE.CylinderGeometry(0.024, 0.024, nerveLength + 0.05, 16);
    const artNerveMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.3 });
    const artNerveMesh = new THREE.Mesh(artNerveGeo, artNerveMat);
    artNerveMesh.position.set(-0.025, 0, 0.015);
    nerveGroup.add(artNerveMesh);

    // Central retinal vein entering nerve core
    const veinNerveGeo = new THREE.CylinderGeometry(0.028, 0.028, nerveLength + 0.05, 16);
    const veinNerveMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.3 });
    const veinNerveMesh = new THREE.Mesh(veinNerveGeo, veinNerveMat);
    veinNerveMesh.position.set(0.025, 0, -0.015);
    nerveGroup.add(veinNerveMesh);

    this.eyeGroup.add(nerveGroup);

    // Scleral Canal / Foramen Sleeve (penetrating the eye wall directly behind the disc)
    const canalGeo = new THREE.CylinderGeometry(0.16, 0.17, scleraR - retinaR + 0.06, 32);
    const canalMat = new THREE.MeshStandardMaterial({
      color: 0xdfd7cb,
      roughness: 0.6,
      clippingPlanes: [this.clipPlane],
    });
    const canalMesh = new THREE.Mesh(canalGeo, canalMat);
    canalMesh.position.copy(discDir.clone().multiplyScalar((scleraR + retinaR) * 0.5));
    canalMesh.quaternion.copy(nerveQuat);
    this.eyeGroup.add(canalMesh);

    // ── 9B. INTERIOR WHITE SPOT REPRESENTING OPTIC NERVE HEAD (Centered directly where nerve enters) ──
    const discGeo = new THREE.CylinderGeometry(0.13, 0.13, 0.015, 36);
    discGeo.rotateX(Math.PI * 0.5);
    const discMat = new THREE.MeshStandardMaterial({
      map: this.createOpticDiscTexture(),
      roughness: 0.4,
      metalness: 0.05,
      polygonOffset: true,
      polygonOffsetFactor: -4,
      polygonOffsetUnits: -4,
      clippingPlanes: [this.clipPlane],
    });
    const opticDiscMesh = new THREE.Mesh(discGeo, discMat);
    opticDiscMesh.position.copy(discPos);
    opticDiscMesh.lookAt(0, 0, 0); // Faces directly inward toward vitreous chamber
    this.eyeGroup.add(opticDiscMesh);

    // Raised pearlescent neuroretinal rim collar emphasizing the white spot
    const rimGeo = new THREE.TorusGeometry(0.125, 0.016, 12, 36);
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0xfffdf5,
      roughness: 0.35,
      clippingPlanes: [this.clipPlane],
    });
    const rimMesh = new THREE.Mesh(rimGeo, rimMat);
    rimMesh.position.copy(discPos);
    rimMesh.lookAt(0, 0, 0);
    this.eyeGroup.add(rimMesh);

    // ── 9C. RETINAL MACULA LUTEA & FOVEA CENTRALIS (Visual Focus Target) ──
    const maculaGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.012, 36);
    maculaGeo.rotateX(Math.PI * 0.5);
    const maculaMat = new THREE.MeshStandardMaterial({
      map: this.createMaculaTexture(),
      transparent: true,
      roughness: 0.55,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2,
      clippingPlanes: [this.clipPlane],
    });
    const maculaMesh = new THREE.Mesh(maculaGeo, maculaMat);
    maculaMesh.position.copy(maculaPos);
    maculaMesh.lookAt(0, 0, 0);
    this.eyeGroup.add(maculaMesh);

    // ── 9D. SUPERIOR & INFERIOR RETINAL VASCULAR ARCADES ──
    const toRetina = (x: number, y: number, z: number, offset = 0.008) => {
      return new THREE.Vector3(x, y, z).normalize().multiplyScalar(retinaR - offset);
    };

    const vesselGroup = new THREE.Group();
    const artVesselMat = new THREE.MeshStandardMaterial({
      color: 0xef4444, // Bright arterial crimson
      roughness: 0.25,
      metalness: 0.15,
      clippingPlanes: [this.clipPlane],
    });
    const veinVesselMat = new THREE.MeshStandardMaterial({
      color: 0x991b1b, // Deep venous wine
      roughness: 0.25,
      metalness: 0.15,
      clippingPlanes: [this.clipPlane],
    });

    const addVesselTube = (
      points: THREE.Vector3[],
      radius: number,
      mat: THREE.Material,
      segments = 32
    ) => {
      const curve = new THREE.CatmullRomCurve3(points);
      const geo = new THREE.TubeGeometry(curve, segments, radius, 8, false);
      vesselGroup.add(new THREE.Mesh(geo, mat));
    };

    // 1. SUPERIOR TEMPORAL ARCADE (Arches upward & temporally over the macula)
    // Superior Temporal Venule
    addVesselTube(
      [
        discPos.clone().add(new THREE.Vector3(0.01, 0.02, 0.01)),
        toRetina(1.36, 0.46, -0.46),
        toRetina(1.28, 0.58, -0.36),
        toRetina(1.24, 0.62, -0.24), // Superior apex directly over macula
        toRetina(1.3, 0.54, -0.14),
        toRetina(1.38, 0.4, -0.06),
        toRetina(1.45, 0.24, -0.02),
      ],
      0.016,
      veinVesselMat
    );
    // Superior Temporal Arteriole
    addVesselTube(
      [
        discPos.clone().add(new THREE.Vector3(-0.01, 0.03, 0.01)),
        toRetina(1.35, 0.48, -0.44),
        toRetina(1.26, 0.6, -0.34),
        toRetina(1.22, 0.64, -0.22),
        toRetina(1.28, 0.56, -0.12),
        toRetina(1.36, 0.42, -0.05),
        toRetina(1.44, 0.26, -0.01),
      ],
      0.013,
      artVesselMat
    );

    // 2. INFERIOR TEMPORAL ARCADE (Arches downward & temporally under the macula)
    // Inferior Temporal Venule
    addVesselTube(
      [
        discPos.clone().add(new THREE.Vector3(0.01, -0.02, 0.01)),
        toRetina(1.38, -0.06, -0.46),
        toRetina(1.3, -0.32, -0.36),
        toRetina(1.26, -0.48, -0.24), // Inferior nadir directly below macula
        toRetina(1.32, -0.42, -0.14),
        toRetina(1.4, -0.28, -0.06),
        toRetina(1.46, -0.14, -0.02),
      ],
      0.016,
      veinVesselMat
    );
    // Inferior Temporal Arteriole
    addVesselTube(
      [
        discPos.clone().add(new THREE.Vector3(-0.01, -0.03, 0.01)),
        toRetina(1.37, -0.08, -0.44),
        toRetina(1.28, -0.34, -0.34),
        toRetina(1.24, -0.5, -0.22),
        toRetina(1.3, -0.44, -0.12),
        toRetina(1.38, -0.3, -0.05),
        toRetina(1.45, -0.16, -0.01),
      ],
      0.013,
      artVesselMat
    );

    // 3. SUPERIOR NASAL BRANCH (Radiating away from macula into nasal retina)
    addVesselTube(
      [
        discPos.clone().add(new THREE.Vector3(0, 0.01, -0.01)),
        toRetina(1.36, 0.46, -0.66),
        toRetina(1.26, 0.62, -0.74),
        toRetina(1.15, 0.74, -0.8),
      ],
      0.014,
      veinVesselMat,
      22
    );
    addVesselTube(
      [
        discPos.clone().add(new THREE.Vector3(-0.01, 0.02, -0.01)),
        toRetina(1.35, 0.48, -0.65),
        toRetina(1.24, 0.64, -0.73),
        toRetina(1.13, 0.76, -0.79),
      ],
      0.011,
      artVesselMat,
      22
    );

    // 4. INFERIOR NASAL BRANCH (Radiating away from macula into nasal retina)
    addVesselTube(
      [
        discPos.clone().add(new THREE.Vector3(0, -0.01, -0.01)),
        toRetina(1.36, -0.02, -0.66),
        toRetina(1.26, -0.28, -0.74),
        toRetina(1.15, -0.46, -0.8),
      ],
      0.014,
      artVesselMat,
      22
    );
    addVesselTube(
      [
        discPos.clone().add(new THREE.Vector3(0.01, -0.02, -0.01)),
        toRetina(1.35, -0.04, -0.65),
        toRetina(1.24, -0.3, -0.73),
        toRetina(1.13, -0.48, -0.79),
      ],
      0.011,
      veinVesselMat,
      22
    );

    this.eyeGroup.add(vesselGroup);

    // ── 10. RETINAL MACULAR LIGHT CONVERGENCE FOCAL SPOT ──
    // The incoming optical light beams converge directly onto the MACULA (NOT the optic nerve)
    const focalSpotGeo = new THREE.CircleGeometry(0.2, 32);
    focalSpotGeo.rotateY(-Math.PI * 0.5);
    const focalSpotMat = new THREE.MeshBasicMaterial({
      map: this.createFocalSpotTexture(),
      transparent: true,
      opacity: 0.98,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });
    this.retinalFocalSpot = new THREE.Mesh(focalSpotGeo, focalSpotMat);
    this.retinalFocalSpot.position.copy(maculaPos);
    this.eyeGroup.add(this.retinalFocalSpot);

    this.retinalFocalGlow = new THREE.PointLight(0xfef08a, 2.8, 3.2);
    this.retinalFocalGlow.position.set(maculaPos.x - 0.08, maculaPos.y, maculaPos.z);
    this.eyeGroup.add(this.retinalFocalGlow);

    // ── 11. CLEAR ACRYLIC IOL (Stage 5) ──
    this.buildIOLMesh();
  }

  private buildIOLMesh() {
    this.iolGroup = new THREE.Group();
    this.iolGroup.position.set(-0.95, 0.0, 0.0);
    this.iolGroup.visible = false;
    this.eyeGroup.add(this.iolGroup);

    // Central Optic (6mm foldable acrylic disc)
    const opticGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.08, 48);
    opticGeo.rotateZ(Math.PI * 0.5);
    const opticMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.99,
      opacity: 0.0,
      transparent: true,
      roughness: 0.01,
      ior: 1.55,
      specularIntensity: 1.6,
      clearcoat: 1.0,
      depthWrite: false,
    });
    this.iolOpticMesh = new THREE.Mesh(opticGeo, opticMat);
    this.iolGroup.add(this.iolOpticMesh);

    // Clear Diffractive Optics Rings (Presbyopia / EDOF optical micro-grooves)
    const ringGeo = new THREE.RingGeometry(0.2, 0.44, 48);
    ringGeo.rotateY(Math.PI * 0.5);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.0,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    this.iolRingMesh = new THREE.Mesh(ringGeo, ringMat);
    this.iolRingMesh.position.set(0.042, 0, 0);
    this.iolGroup.add(this.iolRingMesh);

    // Dual Flexible Open-Loop C-Haptics (Anchoring the clear IOL inside capsular bag)
    const curve1 = new THREE.CubicBezierCurve3(
      new THREE.Vector3(0.0, 0.52, 0.0),
      new THREE.Vector3(0.0, 0.82, 0.3),
      new THREE.Vector3(0.0, 0.82, 0.75),
      new THREE.Vector3(0.0, 0.4, 0.88)
    );
    const haptic1Mat = new THREE.MeshStandardMaterial({
      color: 0xe0f2fe,
      roughness: 0.15,
      metalness: 0.1,
      transparent: true,
      opacity: 0.0,
      depthWrite: false,
    });
    this.iolHaptic1Mesh = new THREE.Mesh(
      new THREE.TubeGeometry(curve1, 36, 0.024, 8, false),
      haptic1Mat
    );
    this.iolGroup.add(this.iolHaptic1Mesh);

    const curve2 = new THREE.CubicBezierCurve3(
      new THREE.Vector3(0.0, -0.52, 0.0),
      new THREE.Vector3(0.0, -0.82, -0.3),
      new THREE.Vector3(0.0, -0.82, -0.75),
      new THREE.Vector3(0.0, -0.4, -0.88)
    );
    const haptic2Mat = new THREE.MeshStandardMaterial({
      color: 0xe0f2fe,
      roughness: 0.15,
      metalness: 0.1,
      transparent: true,
      opacity: 0.0,
      depthWrite: false,
    });
    this.iolHaptic2Mesh = new THREE.Mesh(
      new THREE.TubeGeometry(curve2, 36, 0.024, 8, false),
      haptic2Mat
    );
    this.iolGroup.add(this.iolHaptic2Mesh);
  }

  private createParticleTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.35, 'rgba(255,255,255,0.75)');
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
    }
    return new THREE.CanvasTexture(canvas);
  }

  // ── OPTICAL RAY TRACING (Left -> Right: -X to +X) ──
  private buildOpticalLightPath() {
    this.rayGroup = new THREE.Group();
    this.eyeGroup.add(this.rayGroup);

    const rayCount = this.isMinimal ? 10 : 16;
    const incomingCoords: number[] = [];
    const internalCoords: number[] = [];
    const scatterCoords: number[] = [];

    for (let i = 0; i < rayCount; i++) {
      const angle = (i / rayCount) * Math.PI * 2;
      const radius = 0.08 + (i % 3) * 0.11;
      const startY = Math.cos(angle) * radius;
      const startZ = Math.sin(angle) * radius;

      // 1. External collimated rays entering cornea (X = -3.8 to -1.8)
      incomingCoords.push(-3.8, startY, startZ, -1.8, startY * 0.96, startZ * 0.96);

      // 2. Cornea -> Crystalline Lens -> Focused Retinal Macula (Fovea Centralis)
      internalCoords.push(
        -1.8,
        startY * 0.96,
        startZ * 0.96,
        -0.95,
        startY * 0.88,
        startZ * 0.88,
        -0.95,
        startY * 0.88,
        startZ * 0.88,
        this.maculaPos.x,
        this.maculaPos.y,
        this.maculaPos.z
      );

      // 3. Scatter rays emerging from denatured lens proteins
      const scatterAngle = angle + (Math.random() * 1.8 - 0.9);
      const scatterLen = 0.85 + Math.random() * 0.65;
      scatterCoords.push(
        -0.95,
        startY * 0.88,
        startZ * 0.88,
        -0.95 + (Math.random() * 0.7 - 0.25),
        startY * 0.88 + Math.cos(scatterAngle) * scatterLen,
        startZ * 0.88 + Math.sin(scatterAngle) * scatterLen
      );
    }

    const incomingGeo = new THREE.BufferGeometry();
    incomingGeo.setAttribute('position', new THREE.Float32BufferAttribute(incomingCoords, 3));
    this.incomingRays = new THREE.LineSegments(
      incomingGeo,
      new THREE.LineBasicMaterial({
        color: 0x7dd3fc,
        transparent: true,
        opacity: 0.9,
      })
    );
    this.rayGroup.add(this.incomingRays);

    const internalGeo = new THREE.BufferGeometry();
    internalGeo.setAttribute('position', new THREE.Float32BufferAttribute(internalCoords, 3));
    this.internalRays = new THREE.LineSegments(
      internalGeo,
      new THREE.LineBasicMaterial({
        color: 0xfde047,
        transparent: true,
        opacity: 0.94,
      })
    );
    this.rayGroup.add(this.internalRays);

    const scatterGeo = new THREE.BufferGeometry();
    scatterGeo.setAttribute('position', new THREE.Float32BufferAttribute(scatterCoords, 3));
    this.scatterRays = new THREE.LineSegments(
      scatterGeo,
      new THREE.LineBasicMaterial({
        color: 0xf59e0b,
        transparent: true,
        opacity: 0.0,
      })
    );
    this.rayGroup.add(this.scatterRays);
  }

  public setProgress(progress: number) {
    this.targetProgress = THREE.MathUtils.clamp(progress, 0.0, 1.0);
    this.isIOLMode = false;
    this.denseCataractHoldTimer = 0;
    this.iolHoldTimer = 0;
  }

  public setIOLMode(enabled: boolean) {
    this.isIOLMode = enabled;
    this.denseCataractHoldTimer = 0;
    this.iolHoldTimer = 0;
    if (enabled) {
      this.targetProgress = 1.0;
    }
  }

  public setStage(stageIndex: number) {
    this.lastEmittedStage = stageIndex;
    this.denseCataractHoldTimer = 0;
    this.iolHoldTimer = 0;
    if (stageIndex === 4) {
      this.isIOLMode = true;
      this.targetProgress = 1.0;
    } else {
      this.isIOLMode = false;
      const progressMap = [0.0, 0.24, 0.5, 0.85];
      const prog = progressMap[stageIndex] ?? 0.0;
      this.targetProgress = prog;
    }
  }

  public setPlaying(playing: boolean) {
    this.isPlaying = playing;
  }

  public setPlaySpeed(speed: number) {
    this.playSpeed = speed;
  }

  // Camera View Presets
  public setCameraView(view: CameraViewMode) {
    this.currentViewMode = view;
    if (view === 'crossSection') {
      this.targetAzimuth = this.isMinimal ? 0.12 : 0.1;
      this.targetElevation = 0.08;
      this.targetDistance = this.isMinimal ? 4.65 : 4.45;
      this.targetLookAt.set(-0.3, 0.0, 0.0);
    } else if (view === 'lensFocus') {
      // Zoomed macro view right onto Crystalline Lens & Zonules
      this.targetAzimuth = 0.16;
      this.targetElevation = 0.14;
      this.targetDistance = 2.2;
      this.targetLookAt.set(-0.95, 0.0, 0.0);
    } else if (view === 'anterior') {
      // Slit-lamp anterior pupil view looking straight into the lens
      this.targetAzimuth = -1.42;
      this.targetElevation = 0.05;
      this.targetDistance = 2.85;
      this.targetLookAt.set(-0.95, 0.0, 0.0);
    }
  }

  public resetCamera() {
    this.setCameraView('crossSection');
  }

  private updateOpticalPhysics(p: number, dt: number = 0.016) {
    const iolTarget = this.isIOLMode ? 1.0 : 0.0;
    // Silky smooth interpolation (~1.1s transition)
    const iolSpeed = this.isIOLMode ? 2.5 : 3.0;
    this.iolTransition += (iolTarget - this.iolTransition) * (1.0 - Math.exp(-dt * iolSpeed));
    if (Math.abs(iolTarget - this.iolTransition) < 0.002) {
      this.iolTransition = iolTarget;
    }

    // 1. Natural Lens & Cataract Pathology state based directly on biological progress p
    // Single unified anatomical crystalline lens matching zonular attachment at R = 0.65
    const lensMat = this.lensMesh.material as THREE.MeshPhysicalMaterial;
    const particleMat = this.proteinParticles.material as THREE.PointsMaterial;

    // Ensure transmission is 0 to guarantee pristine visibility from all angles & through cornea
    lensMat.transmission = 0.0;

    let baseLensOpacity = 0.85;

    if (p < 0.22) {
      // Stage 1: Youthful Crystal Clarity (Pristine cyan crystal sheen)
      const t = p / 0.22;
      lensMat.color.setRGB(
        THREE.MathUtils.lerp(0.78, 0.9, t),
        THREE.MathUtils.lerp(0.96, 0.94, t),
        THREE.MathUtils.lerp(0.99, 0.86, t)
      );
      baseLensOpacity = THREE.MathUtils.lerp(0.72, 0.8, t);
      lensMat.roughness = THREE.MathUtils.lerp(0.04, 0.1, t);
      lensMat.clearcoat = THREE.MathUtils.lerp(0.9, 0.78, t);
    } else if (p < 0.58) {
      // Stages 2 & 3: Nuclear Sclerosis (Rich Golden Honey Amber)
      const t = (p - 0.22) / 0.36;
      lensMat.color.setRGB(
        THREE.MathUtils.lerp(0.9, 0.96, t),
        THREE.MathUtils.lerp(0.94, 0.62, t),
        THREE.MathUtils.lerp(0.86, 0.12, t)
      );
      baseLensOpacity = THREE.MathUtils.lerp(0.8, 0.9, t);
      lensMat.roughness = THREE.MathUtils.lerp(0.1, 0.28, t);
      lensMat.clearcoat = THREE.MathUtils.lerp(0.78, 0.5, t);
    } else {
      // Stage 4: Advanced Brunescent Opacity (Dense Dark Mahogany)
      const t = (p - 0.58) / 0.42;
      lensMat.color.setRGB(
        THREE.MathUtils.lerp(0.96, 0.42, t),
        THREE.MathUtils.lerp(0.62, 0.16, t),
        THREE.MathUtils.lerp(0.12, 0.02, t)
      );
      baseLensOpacity = THREE.MathUtils.lerp(0.9, 0.97, t);
      lensMat.roughness = THREE.MathUtils.lerp(0.28, 0.6, t);
      lensMat.clearcoat = THREE.MathUtils.lerp(0.5, 0.22, t);
    }

    // 2. Protein Particles Density & Clumping based on p
    const baseParticleOpacity =
      p > 0.08 ? THREE.MathUtils.lerp(0.06, 0.95, (p - 0.08) / 0.92) : 0.0;

    const colorsAttr = this.proteinParticles.geometry.attributes.color as THREE.BufferAttribute;
    const count = this.proteinPositions.length / 3;
    for (let i = 0; i < count; i++) {
      if (p < 0.22) {
        colorsAttr.setXYZ(i, 0.96, 0.98, 1.0);
      } else if (p < 0.62) {
        colorsAttr.setXYZ(i, 0.98, 0.7, 0.18);
      } else {
        colorsAttr.setXYZ(i, 0.52, 0.2, 0.05);
      }
    }
    colorsAttr.needsUpdate = true;

    // 3. Surgical Removal / Dissolve of Cataract Lens during IOL Transition
    // Cataract dissolves gracefully during the first 65% of the IOL transition without reverse-aging!
    const dissolveProgress = THREE.MathUtils.clamp(1.0 - this.iolTransition * 1.55, 0.0, 1.0);
    // Smooth cubic hermite ease for natural surgical aspiration
    const cataractVisibility = dissolveProgress * dissolveProgress * (3 - 2 * dissolveProgress);

    // Apply visibility and dissolve to natural lens group
    lensMat.opacity = baseLensOpacity * cataractVisibility;
    particleMat.opacity = baseParticleOpacity * cataractVisibility;

    const cataractScale = THREE.MathUtils.lerp(0.92, 1.0, cataractVisibility);
    this.lensGroup.scale.set(cataractScale, cataractScale, cataractScale);

    const showNaturalLens = cataractVisibility > 0.005;
    this.lensMesh.visible = showNaturalLens;
    this.proteinParticles.visible = showNaturalLens && particleMat.opacity > 0.01;

    // 4. IOL Unfolding & Implantation
    // IOL unfolds from 15% to 100% of the transition
    const iolProgress = THREE.MathUtils.clamp((this.iolTransition - 0.15) / 0.85, 0.0, 1.0);
    // Cubic ease out for luxurious mechanical seating
    const easeIOL = 1.0 - Math.pow(1.0 - iolProgress, 3);

    if (this.iolTransition > 0.01) {
      this.iolGroup.visible = true;
      // Entire IOL expands into the capsular bag from folded state (72% to 100%)
      const iolScale = THREE.MathUtils.lerp(0.72, 1.0, easeIOL);
      this.iolGroup.scale.set(iolScale, iolScale, iolScale);
      this.iolGroup.rotation.x = THREE.MathUtils.lerp(0.08, 0.0, easeIOL);

      // Optic material fade & transmission
      const opticMat = this.iolOpticMesh.material as THREE.MeshPhysicalMaterial;
      opticMat.opacity = THREE.MathUtils.lerp(0.0, 0.98, easeIOL);
      opticMat.transmission = THREE.MathUtils.lerp(0.75, 0.99, easeIOL);

      // Clear diffractive optics rings fade (transparent crystalline refraction)
      const ringMat = this.iolRingMesh.material as THREE.MeshBasicMaterial;
      ringMat.opacity = THREE.MathUtils.lerp(0.0, 0.28, easeIOL);

      // C-loop haptics fade & anchoring
      const haptic1Mat = this.iolHaptic1Mesh.material as THREE.MeshStandardMaterial;
      const haptic2Mat = this.iolHaptic2Mesh.material as THREE.MeshStandardMaterial;
      haptic1Mat.opacity = THREE.MathUtils.lerp(0.0, 1.0, easeIOL);
      haptic2Mat.opacity = THREE.MathUtils.lerp(0.0, 1.0, easeIOL);
    } else {
      this.iolGroup.visible = false;
    }

    // 5. Optical Light Rays & Retinal Macular Focus Physics
    const internalMat = this.internalRays.material as THREE.LineBasicMaterial;
    const scatterMat = this.scatterRays.material as THREE.LineBasicMaterial;
    const focalSpotMat = this.retinalFocalSpot.material as THREE.MeshBasicMaterial;

    // Cataract beam attenuation vs 100% IOL crystal clarity
    const cataractThrough = Math.max(0.06, 0.94 - p * 0.86);
    const throughIntensity = THREE.MathUtils.lerp(cataractThrough, 0.96, easeIOL);
    internalMat.opacity = throughIntensity;

    // Cataract scatter rays diminish as cataract is dissolved
    const cataractScatter = p > 0.1 ? THREE.MathUtils.lerp(0.05, 0.88, (p - 0.1) / 0.9) : 0.0;
    scatterMat.opacity = cataractScatter * cataractVisibility;

    // Retinal macular convergence spot
    const cataractRetinal = Math.max(0.02, 1.0 - Math.pow(p, 1.15) * 0.96);
    const cataractSpotScale = THREE.MathUtils.lerp(1.0, 0.2, p);
    const retinalIntensity = THREE.MathUtils.lerp(cataractRetinal, 0.98, easeIOL);
    const spotScale = THREE.MathUtils.lerp(cataractSpotScale, 1.0, easeIOL);

    focalSpotMat.opacity = retinalIntensity * 0.96;
    this.retinalFocalSpot.scale.setScalar(spotScale);
    this.retinalFocalGlow.intensity = retinalIntensity * 3.2;

    // 6. Clinical Stage Emission
    if (this.onProgressUpdate) {
      let stage = 0;
      if (this.iolTransition >= 0.45) {
        stage = 4;
      } else if (p < 0.22) {
        stage = 0;
      } else if (p < 0.48) {
        stage = 1;
      } else if (p < 0.78) {
        stage = 2;
      } else {
        stage = 3;
      }

      if (this.isMinimal) {
        if (stage !== this.lastEmittedStage) {
          this.lastEmittedStage = stage;
          this.onProgressUpdate(p, stage);
        }
      } else {
        this.lastEmittedStage = stage;
        this.onProgressUpdate(p, stage);
      }
    }
  }

  private bindEvents() {
    const el = this.renderer.domElement;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      this.isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      this.prevPointerX = clientX;
      this.prevPointerY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!this.isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - this.prevPointerX;
      const deltaY = clientY - this.prevPointerY;
      this.prevPointerX = clientX;
      this.prevPointerY = clientY;

      // Orbit camera around target
      this.targetAzimuth -= deltaX * 0.006;
      this.targetElevation += deltaY * 0.004;

      // Clamp so the camera always looks into the open anatomical cutaway
      this.targetElevation = THREE.MathUtils.clamp(this.targetElevation, -0.3, 0.65);
      this.targetAzimuth = THREE.MathUtils.clamp(this.targetAzimuth, -1.5, 1.2);
    };

    const onPointerUp = () => {
      this.isDragging = false;
    };

    el.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    el.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);
  }

  private updateCameraPosition() {
    const cosElev = Math.cos(this.currentElevation);
    const sinElev = Math.sin(this.currentElevation);
    const sinAzim = Math.sin(this.currentAzimuth);
    const cosAzim = Math.cos(this.currentAzimuth);

    this.camera.position.set(
      this.currentLookAt.x + this.currentDistance * cosElev * sinAzim,
      this.currentLookAt.y + this.currentDistance * sinElev,
      this.currentLookAt.z + this.currentDistance * cosElev * cosAzim
    );
    this.camera.lookAt(this.currentLookAt);
  }

  private renderLoop = () => {
    if (this.isDisposed) return;

    const now = performance.now() * 0.001;
    if (this.lastFrameTime === 0) {
      this.lastFrameTime = now;
    }
    const dt = Math.min(now - this.lastFrameTime, 1.0);
    this.lastFrameTime = now;

    if (this.isPlaying) {
      if (!this.isIOLMode) {
        // Advance cataract formation
        if (this.targetProgress < 1.0) {
          this.targetProgress += this.playSpeed * dt;
          if (this.targetProgress >= 1.0) {
            this.targetProgress = 1.0;
            this.denseCataractHoldTimer = 0;
          }
        } else {
          // Hold at peak Stage 4 (Mature Dense Cataract)
          this.denseCataractHoldTimer += dt;
          const stage4Hold = this.isMinimal ? 1.8 : 2.2;
          if (this.denseCataractHoldTimer >= stage4Hold) {
            this.denseCataractHoldTimer = 0;
            this.isIOLMode = true;
            this.iolHoldTimer = 0;
          }
        }
      } else {
        // In IOL Mode (Stage 5)
        // Wait until IOL has fully unfolded (iolTransition >= 0.90) before ticking hold timer
        if (this.iolTransition >= 0.9) {
          this.iolHoldTimer += dt;
          const iolHold = this.isMinimal ? 2.8 : 3.4;
          if (this.iolHoldTimer >= iolHold) {
            // Smooth loop restart back to Stage 1 (Youthful Lens)
            // Setting isIOLMode to false triggers a smooth cross-dissolve fade out of the IOL
            // while fading back in the youthful crystal lens (currentProgress set to 0.0)
            this.isIOLMode = false;
            this.iolHoldTimer = 0;
            this.denseCataractHoldTimer = 0;
            this.targetProgress = 0.0;
            this.currentProgress = 0.0;
          }
        }
      }
    }

    const lerpRate = 1.0 - Math.exp(-dt * 9.0);
    this.currentProgress += (this.targetProgress - this.currentProgress) * lerpRate;
    this.updateOpticalPhysics(this.currentProgress, dt);

    // Smooth camera spherical interpolation
    this.currentAzimuth += (this.targetAzimuth - this.currentAzimuth) * lerpRate;
    this.currentElevation += (this.targetElevation - this.currentElevation) * lerpRate;
    this.currentDistance += (this.targetDistance - this.currentDistance) * lerpRate;
    this.currentLookAt.lerp(this.targetLookAt, lerpRate);

    this.updateCameraPosition();

    // Subtle breathing micro-motion
    this.eyeGroup.position.y = Math.sin(now * 0.8) * 0.025;

    if (this.incomingRays) {
      (this.incomingRays.material as THREE.LineBasicMaterial).opacity =
        0.8 + Math.sin(now * 2.5) * 0.15;
    }

    this.renderer.render(this.scene, this.camera);

    // Periodically emit 3D projected anatomical landmark coordinates
    const nowMs = now * 1000;
    if (this.onLandmarksUpdate && !this.isMinimal && nowMs - this.lastLandmarkEmit > 32) {
      this.lastLandmarkEmit = nowMs;
      this.onLandmarksUpdate(this.getLandmarks());
    }

    this.animFrameId = requestAnimationFrame(this.renderLoop);
  };

  public getLandmarks(): LandmarkMap {
    const defaultRes: LandmarkMap = {
      cornea: { x: 32, y: 50, visible: true },
      lens: { x: 42, y: 44, visible: true },
      macula: { x: 74, y: 52, visible: true },
      opticNerve: { x: 72, y: 42, visible: true },
    };

    if (!this.renderer || !this.camera || !this.container) return defaultRes;
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    if (w <= 0 || h <= 0) return defaultRes;

    const v = new THREE.Vector3();
    const project = (localPos: THREE.Vector3): LandmarkScreenCoord => {
      v.copy(localPos);
      v.applyMatrix4(this.eyeGroup.matrixWorld);
      v.project(this.camera);
      const nx = (v.x + 1) * 0.5;
      const ny = (-v.y + 1) * 0.5;
      return {
        x: Math.round(nx * 1000) / 10,
        y: Math.round(ny * 1000) / 10,
        visible: v.z < 1.0 && nx >= 0.02 && nx <= 0.98 && ny >= 0.02 && ny <= 0.98,
      };
    };

    return {
      cornea: project(new THREE.Vector3(-1.58, 0.16, 0.0)),
      lens: project(new THREE.Vector3(-0.95, 0.2, 0.0)),
      macula: project(this.maculaPos),
      opticNerve: project(new THREE.Vector3(1.404, 0.28, -0.58)),
    };
  }

  public resize() {
    if (!this.container || this.isDisposed) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    if (width === 0 || height === 0) return;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  public dispose() {
    this.isDisposed = true;
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
    }
    if (this.renderer && this.renderer.domElement) {
      this.renderer.domElement.remove();
      this.renderer.dispose();
    }
  }
}
