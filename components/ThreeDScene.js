import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Environment, EffectComposer, Bloom, DepthOfField } from '@react-three/drei';
import RotatingTorus from './RotatingTorus';
import DynamicLight from './DynamicLight';
import SkyBackground from './SkyBackground';
import RotatingSphere from './RotatingSphere';
import LargerBox from './LargerBox';
import GroundPlane from './GroundPlane';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export default function ThreeDScene() {
  const cameraRef = useRef();

  // Camera animation logic
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    cameraRef.current.position.x = Math.sin(t / 2) * 10;
    cameraRef.current.position.z = Math.cos(t / 2) * 10;
    cameraRef.current.lookAt(0, 0, 0);
  });

  return (
    <Canvas
      ref={cameraRef}
      camera={{ position: [0, 59, 8], fov: 90 }}
      style={{ height: '100vh', width: '100vw' }}
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
      <FloatingText />
      
      {/* Particle effects */}
      <fog attach="fog" args={['#fff', 1, 100]} />
      
      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
        <DepthOfField focusDistance={0.01} focalLength={0.02} bokehScale={2} />
      </EffectComposer>
    </Canvas>
  );
}
