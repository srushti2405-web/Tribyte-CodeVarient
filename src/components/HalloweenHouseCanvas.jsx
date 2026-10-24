import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Volume2, VolumeX, Moon } from "lucide-react";
import { toggleHalloweenAudio } from "../utils/halloweenAudio";

export function HalloweenHouseCanvas() {
  const mountRef = useRef(null);
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060c18, 0.038); // Atmospheric midnight mist

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 10.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // =========================================================================
    // LIGHTING SPECIFICATIONS (Strictly Matching User Requirements)
    // "light source i.e. the Moon on the top left of the house using ambient light
    //  and direction light, hemisphere, point light used less, no rectArea"
    // =========================================================================

    // Ambient Light (deep eerie midnight blue)
    const ambientLight = new THREE.AmbientLight(0x0e1b2e, 0.75);
    scene.add(ambientLight);

    // Hemisphere Light (sky midnight slate vs ground damp earth)
    const hemisphereLight = new THREE.HemisphereLight(0x23354d, 0x050a12, 0.85);
    scene.add(hemisphereLight);

    // Directional Light: The Moon located at top left of the house
    const moonDirectional = new THREE.DirectionalLight(0xdbeafe, 1.6);
    moonDirectional.position.set(-6, 9, 4); // Top-left angle
    scene.add(moonDirectional);

    // Minimal Point Light for the flickering Jack-o'-Lantern eyes
    const pumpkinPointLight = new THREE.PointLight(0xf59e0b, 1.8, 6.5, 2.0);
    pumpkinPointLight.position.set(0.6, -0.6, 1.8);
    scene.add(pumpkinPointLight);

    // =========================================================================
    // 3D HALLOWEEN SCENE MESHES (Haunted House, Tree, Tombstones R.I.P., Pumpkins)
    // =========================================================================

    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // 1. The Glowing Moon (Top Left of House)
    const moonGeo = new THREE.CircleGeometry(1.6, 32);
    const moonMat = new THREE.MeshBasicMaterial({
      color: 0xfef08a,
      transparent: true,
      opacity: 0.95,
    });
    const moonMesh = new THREE.Mesh(moonGeo, moonMat);
    moonMesh.position.set(-4.5, 4.2, -6);
    scene.add(moonMesh);

    // Moon Halo Ring
    const haloGeo = new THREE.RingGeometry(1.6, 2.6, 32);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.position.copy(moonMesh.position);
    scene.add(haloMesh);

    // 2. The Haunted House on the Right
    const houseGroup = new THREE.Group();
    houseGroup.position.set(2.4, 0.4, -0.5);

    // Main House Body (Weathered dark timber)
    const bodyGeo = new THREE.BoxGeometry(3.6, 3.2, 3.2);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x18151f,
      roughness: 0.92,
      metalness: 0.1,
    });
    const houseBody = new THREE.Mesh(bodyGeo, bodyMat);
    houseBody.position.y = 1.0;
    houseGroup.add(houseBody);

    // Steep Gothic Gabled Roof
    const roofGeo = new THREE.ConeGeometry(2.8, 2.4, 4);
    const roofMat = new THREE.MeshStandardMaterial({
      color: 0x2b1016, // Dark gothic crimson shingle
      roughness: 0.85,
    });
    const roofMesh = new THREE.Mesh(roofGeo, roofMat);
    roofMesh.position.y = 3.6;
    roofMesh.rotation.y = Math.PI * 0.25;
    houseGroup.add(roofMesh);

    // Tall Creaky Chimney
    const chimneyGeo = new THREE.BoxGeometry(0.55, 1.8, 0.55);
    const chimneyMat = new THREE.MeshStandardMaterial({ color: 0x140e11 });
    const chimney = new THREE.Mesh(chimneyGeo, chimneyMat);
    chimney.position.set(1.1, 4.1, -0.4);
    chimney.rotation.z = 0.08;
    houseGroup.add(chimney);

    // Glowing Eerie Windows
    const winGeo = new THREE.PlaneGeometry(0.65, 0.9);
    const winMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.88,
    });
    const win1 = new THREE.Mesh(winGeo, winMat);
    win1.position.set(-0.7, 1.4, 1.62);
    houseGroup.add(win1);

    const win2 = new THREE.Mesh(winGeo, winMat);
    win2.position.set(0.7, 1.4, 1.62);
    houseGroup.add(win2);

    const atticWinGeo = new THREE.CircleGeometry(0.35, 16);
    const atticWin = new THREE.Mesh(atticWinGeo, winMat);
    atticWin.position.set(0, 3.0, 1.35);
    houseGroup.add(atticWin);

    worldGroup.add(houseGroup);

    // 3. Eerie Gnarled Silhouette Tree on the Right
    const treeGroup = new THREE.Group();
    treeGroup.position.set(5.2, -0.8, 0.5);

    const trunkGeo = new THREE.CylinderGeometry(0.28, 0.65, 4.2, 8);
    const trunkMat = new THREE.MeshStandardMaterial({
      color: 0x09080c,
      roughness: 0.98,
    });
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.y = 2.1;
    trunk.rotation.z = -0.12;
    treeGroup.add(trunk);

    // Twisted Branches
    const branchGeo = new THREE.CylinderGeometry(0.12, 0.22, 2.2, 6);
    const branch1 = new THREE.Mesh(branchGeo, trunkMat);
    branch1.position.set(-0.6, 3.4, 0);
    branch1.rotation.z = 0.85;
    treeGroup.add(branch1);

    const branch2 = new THREE.Mesh(branchGeo, trunkMat);
    branch2.position.set(0.7, 3.1, 0.2);
    branch2.rotation.z = -0.75;
    treeGroup.add(branch2);

    worldGroup.add(treeGroup);

    // 4. Gothic Lantern Post & Stone Pedestal (Front cover: Halloween house & warm lantern)
    const lanternPostGroup = new THREE.Group();
    lanternPostGroup.position.set(-0.9, -0.7, 1.6);

    const postBaseGeo = new THREE.CylinderGeometry(0.35, 0.45, 0.8, 8);
    const postMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.9,
    });
    const postBase = new THREE.Mesh(postBaseGeo, postMat);
    postBase.position.y = 0.4;
    lanternPostGroup.add(postBase);

    const postPoleGeo = new THREE.CylinderGeometry(0.08, 0.1, 1.6, 8);
    const postPole = new THREE.Mesh(postPoleGeo, postMat);
    postPole.position.y = 1.4;
    lanternPostGroup.add(postPole);

    // Glowing Amber Porch Lantern
    const lanternGlassGeo = new THREE.BoxGeometry(0.42, 0.55, 0.42);
    const lanternGlassMat = new THREE.MeshBasicMaterial({
      color: 0xfbbf24,
      transparent: true,
      opacity: 0.95,
    });
    const lanternGlass = new THREE.Mesh(lanternGlassGeo, lanternGlassMat);
    lanternGlass.position.y = 2.3;
    lanternPostGroup.add(lanternGlass);

    const lanternCapGeo = new THREE.ConeGeometry(0.35, 0.3, 4);
    const lanternCap = new THREE.Mesh(lanternCapGeo, postMat);
    lanternCap.position.y = 2.65;
    lanternCap.rotation.y = Math.PI * 0.25;
    lanternPostGroup.add(lanternCap);

    worldGroup.add(lanternPostGroup);

    // 5. Carved Halloween Pumpkins Surrounding the Lantern Post
    const pumpkinMat = new THREE.MeshStandardMaterial({
      color: 0xd97706, // Autumn pumpkin orange
      roughness: 0.7,
    });
    const stemMat = new THREE.MeshStandardMaterial({ color: 0x166534 });

    const createPumpkin = (x, y, z, scale, rotY) => {
      const pGroup = new THREE.Group();
      pGroup.position.set(x, y, z);
      pGroup.scale.setScalar(scale);
      pGroup.rotation.y = rotY;

      // Squashed sphere body
      const pBody = new THREE.Mesh(
        new THREE.SphereGeometry(0.42, 16, 12),
        pumpkinMat
      );
      pBody.scale.set(1.15, 0.85, 1.05);
      pGroup.add(pBody);

      // Green stem
      const pStem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.06, 0.22, 6),
        stemMat
      );
      pStem.position.y = 0.42;
      pStem.rotation.z = 0.2;
      pGroup.add(pStem);

      // Glowing carved face eyes
      const eyeGeo = new THREE.ConeGeometry(0.07, 0.05, 3);
      const glowMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
      const eyeL = new THREE.Mesh(eyeGeo, glowMat);
      eyeL.position.set(-0.14, 0.08, 0.42);
      eyeL.rotation.x = Math.PI * 0.5;
      pGroup.add(eyeL);

      const eyeR = new THREE.Mesh(eyeGeo, glowMat);
      eyeR.position.set(0.14, 0.08, 0.42);
      eyeR.rotation.x = Math.PI * 0.5;
      pGroup.add(eyeR);

      return pGroup;
    };

    const p1 = createPumpkin(0.5, -0.65, 1.8, 1.1, -0.2);
    const p2 = createPumpkin(-1.7, -0.72, 1.5, 0.85, 0.4);
    const p3 = createPumpkin(1.6, -0.75, 1.2, 0.95, -0.5);
    worldGroup.add(p1);
    worldGroup.add(p2);
    worldGroup.add(p3);

    // 6. Cloudy Mist Plane in the Air
    const mistGeo = new THREE.PlaneGeometry(16, 8);
    const mistMat = new THREE.MeshBasicMaterial({
      color: 0x1e293b,
      transparent: true,
      opacity: 0.28,
      side: THREE.DoubleSide,
    });
    const mistMesh = new THREE.Mesh(mistGeo, mistMat);
    mistMesh.position.set(0, 0.5, -2);
    scene.add(mistMesh);

    // Ground Plane with eerie gradient
    const groundGeo = new THREE.PlaneGeometry(24, 16);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x070b14,
      roughness: 0.98,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI * 0.5;
    ground.position.y = -0.85;
    scene.add(ground);

    // =========================================================================
    // ANIMATION & TICK LOOP (60fps Candlelight flicker, mist drift)
    // =========================================================================

    let animFrame = null;
    let clock = new THREE.Clock();

    const animate = () => {
      animFrame = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Organic flickering of candle inside jack-o'-lanterns
      const flicker = Math.sin(time * 8) * 0.25 + Math.cos(time * 14) * 0.15;
      pumpkinPointLight.intensity = 1.8 + flicker;

      // Slow cloudy mist drift
      mistMesh.position.x = Math.sin(time * 0.3) * 0.6;
      mistMesh.rotation.z = Math.cos(time * 0.2) * 0.02;

      // Tree subtle breeze swing
      treeGroup.rotation.z = Math.sin(time * 1.2) * 0.015;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Observer
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animFrame);
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  const handleToggleSound = () => {
    const nextState = toggleHalloweenAudio();
    setSoundOn(nextState);
  };

  return (
    <div className="relative w-full h-full min-h-[22rem] sm:min-h-[28rem] flex flex-col justify-between overflow-hidden select-none">
      {/* Three.js 3D Viewport */}
      <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-auto" />

      {/* Floating Halloween Ambience Header Bar */}
      <div className="relative z-10 flex items-center justify-between p-[0.75rem] sm:p-[1rem]">
        <div className="inline-flex items-center gap-[0.45rem] px-[0.75rem] py-[0.25rem] rounded-full bg-[#081220]/85 border border-sky-400/40 text-sky-200 text-[0.65rem] font-cinzel uppercase tracking-widest backdrop-blur-md shadow-lg">
          <Moon className="w-[0.75rem] h-[0.75rem] text-amber-300" />
          <span>Midnight Manor · R.I.P. Graveyard</span>
        </div>

        {/* Ambient Eerie Breeze Sound Toggle */}
        <button
          type="button"
          onClick={handleToggleSound}
          aria-label={soundOn ? "Mute Eerie Breeze SFX" : "Play Eerie Breeze SFX"}
          className={`flex items-center gap-[0.4rem] px-[0.75rem] py-[0.3rem] rounded-full text-[0.68rem] font-cinzel uppercase tracking-wider transition-all cursor-pointer backdrop-blur-md shadow-md ${
            soundOn
              ? "bg-amber-500/25 border border-amber-400 text-amber-200 shadow-[0_0_1rem_rgba(251,191,36,0.4)]"
              : "bg-[#0b1626]/80 border border-sky-600/40 text-slate-300 hover:text-white hover:border-amber-400"
          }`}
        >
          {soundOn ? (
            <>
              <Volume2 className="w-[0.85rem] h-[0.85rem] text-amber-400 animate-pulse" />
              <span>Eerie Breeze: On</span>
            </>
          ) : (
            <>
              <VolumeX className="w-[0.85rem] h-[0.85rem] text-slate-400" />
              <span>Eerie Breeze: SFX</span>
            </>
          )}
        </button>
      </div>

      {/* Subtle Bottom Scene Annotation */}
      <div className="relative z-10 p-[0.75rem] sm:p-[1rem] flex items-center justify-between text-[0.65rem] text-slate-400 pointer-events-none">
        <span className="font-cormorant italic text-[0.85rem] text-sky-200/80">
          Moonlight illumination over resting dreams
        </span>
        <span className="font-snell text-[0.95rem] text-[#d69a62] italic">
          "Where uncompleted work sleeps peacefully."
        </span>
      </div>
    </div>
  );
}

export default HalloweenHouseCanvas;
