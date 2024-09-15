import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Environment, EffectComposer, Bloom, DepthOfField } from '@react-three/drei';
import RotatingTorus from './RotatingTorus';
import DynamicLight from './DynamicLight';
import SkyBackground from './SkyBackground';
import RotatingSphere from './RotatingSphere';
import LargerBox from './LargerBox';
import GroundPlane from './GroundPlane';
import { useRef, Suspense } from 'react';
import { GodRays } from '@react-three/postprocessing';
import Footer from './Footer'; // Assuming you have the Footer component separately

export default function ThreeDScene() {
  const cameraRef = useRef();

  // Camera animation logic with mouse interaction
  useFrame(({ clock, mouse }) => {
    const t = clock.getElapsedTime();
    const x = Math.sin(t / 2) * 10;
    const z = Math.cos(t / 2) * 10;
    cameraRef.current.position.x = x + mouse.x * 2; // React to mouse movement
    cameraRef.current.position.z = z + mouse.y * 2; // React to mouse movement
    cameraRef.current.lookAt(0, 0, 0);
  });

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      {/* Full-Screen Three.js Canvas */}
      <Canvas
        ref={cameraRef}
        camera={{ position: [0, 59, 8], fov: 90 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw', // Full viewport width
          height: '100vh', // Full viewport height
          zIndex: 1, // Ensure it's the topmost layer
        }}
      >
        {/* Orbit controls */}
        <OrbitControls enableZoom={true} />

        {/* Ambient and dynamic lighting */}
        <ambientLight intensity={0.2} />
        <DynamicLight />
        <spotLight position={[10, 20, 10]} angle={0.3} penumbra={1} intensity={1} castShadow />

        {/* Stars for depth and atmosphere */}
        <Stars radius={200} depth={100} count={7000} factor={5} saturation={0} fade speed={1} />

        {/* Sky background and environment */}
        <SkyBackground />
        <Environment preset="sunset" background />

        {/* Animated 3D objects */}
        <RotatingSphere />
        <LargerBox />
        <RotatingTorus />
        <GroundPlane />

        {/* Particle effects */}
        <fog attach="fog" args={['#a9c9ff', 10, 100]} />

        {/* Post-processing effects */}
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
          <DepthOfField focusDistance={0.01} focalLength={0.02} bokehScale={2} />
          <GodRays sunPosition={[0, 100, -100]} />
        </EffectComposer>
      </Canvas>

      {/* Footer at the Bottom */}
      <footer className="bg-black text-white py-4 text-center" style={{ zIndex: 2, position: 'relative' }}>
        <p>© 2023 3D Interactive Portfolio. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500 transition">
            Twitter
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500 transition">
            GitHub
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500 transition">
            LinkedIn
          </a>
        </div>
      </footer>
    </div>
  );
}
