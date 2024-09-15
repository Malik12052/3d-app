import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Text, Html } from '@react-three/drei';
import { Physics, useBox, useSphere, usePlane } from '@react-three/cannon';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Footer from '../components/Footer'; // Correct path for a components folder
import Spline from '@splinetool/react-spline';

// Loader Component
function Loader() {
  return (
    <Html center>
      <div className="spinner"></div>
      <style jsx>{`
        .spinner {
          width: 50px;
          height: 50px;
          border: 5px solid rgba(0, 0, 0, 0.1);
          border-left-color: #09f;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </Html>
  );
}

// Create a physics-enabled box
function PhysicsBox() {
  const [ref] = useBox(() => ({ mass: 1, position: [2, 0, 0] }));

  return (
    <mesh ref={ref} position={[2, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="skyblue" />
    </mesh>
  );
}

// Create a physics-enabled sphere
function PhysicsSphere() {
  const [ref] = useSphere(() => ({ mass: 1, position: [-2, 2, 0] }));

  return (
    <mesh ref={ref} position={[-2, 2, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="lightgreen" />
    </mesh>
  );
}

// Create a static ground plane
function GroundPlane() {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], position: [0, -1, 0] }));
  return (
    <mesh ref={ref} position={[0, -1, 0]}>
      <planeGeometry args={[1000000, 1000000]} />
      <meshStandardMaterial color="grey" />
    </mesh>
  );
}

// Spline 3D Model - Positioned outside of the Canvas
function SplineModel() {
  return (
    <div style={{ position: 'absolute', top: '0', left: '0', zIndex: '10', width: '100%', height: '100%' }}>
      <Suspense fallback={<Loader />}>
        <Spline scene="https://prod.spline.design/XOjm2eEE6-s3A1nX/scene.splinecode" />
      </Suspense>
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-purple-900 to-blue-800 text-white">
      <Head>
        <title>3D Interactive Portfolio</title>
      </Head>

      <main className="relative z-1 flex flex-col items-center justify-center h-screen">
        {/* Header Section */}
        <motion.h1
          className="text-5xl font-bold mb-10"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          Explore My 3D World
        </motion.h1>

        {/* Spline Model */}
        <SplineModel />

        {/* Three.js Canvas */}
        <div className="w-full h-screen relative">
          <Canvas className="w-full h-full" camera={{ position: [0, 10, 20], fov: 75 }}>
            <Suspense fallback={<Loader />}>
              <OrbitControls 
                enableZoom={true} 
                maxDistance={100} // Adjust to allow zooming out further
                minDistance={5}   // Adjust to avoid too much zoom in
                target={[0, 0, 0]} // Focus on the center of the scene
                dampingFactor={0.1} // Add smooth damping
              />
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} color={'white'} />
              <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />

              <Physics>
                <GroundPlane />
                <PhysicsSphere />
                <PhysicsBox />
              </Physics>
              <Text
                position={[0, -2, 0]}
                color="white"
                fontSize={0.5}
                maxWidth={200}
                lineHeight={1}
                letterSpacing={0.02}
                textAlign="center"
                font="https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Me5Q.ttf"
              >
                Welcome to My Interactive 3D Portfolio
              </Text>
            </Suspense>
          </Canvas>
        </div>

        {/* Call to Action */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <button className="px-6 py-3 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition">
            Discover More
          </button>
        </motion.div>
      </main>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          className="absolute bg-purple-400 rounded-full w-20 h-20 opacity-70"
          animate={{ x: [100, 100, -100], y: [0, 100, -100] }}
          transition={{ duration: 5, repeat: Infinity }}
          style={{ top: '20%', left: '10%' }}
        />
        <motion.div
          className="absolute bg-blue-400 rounded-full w-28 h-28 opacity-70"
          animate={{ x: [100, -50, 0], y: [-50, 100, -100] }}
          transition={{ duration: 6, repeat: Infinity }}
          style={{ top: '50%', left: '70%' }}
        />
        <motion.div
          className="absolute bg-pink-500 rounded-full w-16 h-16 opacity-80"
          animate={{ x: [-100, 50, 0], y: [100, -100, 50] }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{ bottom: '30%', right: '20%' }}
        />
      </div>
    </div>
  );
}
