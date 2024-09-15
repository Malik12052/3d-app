import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import { Physics, useBox, useSphere } from '@react-three/cannon';
import { Suspense, useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
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
  const [ref] = useBox(() => ({ mass: -1, position: [2, 2, 0] }));

  return (
    <mesh ref={ref} position={[2, 2, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="skyblue" />
    </mesh>
  );
}

// Create a physics-enabled sphere
function PhysicsSphere() {
  const [ref] = useSphere(() => ({ mass: -1, position: [-2, 3, 0] }));

  return (
    <mesh ref={ref} position={[-2, 3, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="lightgreen" />
    </mesh>
  );
}

// Spline 3D Model outside the Canvas, rendered in the top-right corner
function SplineModel({ isModelActive, toggleModelActive }) {
  const handleModelClick = () => {
    toggleModelActive((prev) => !prev); // Toggle model activation
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '10px', // Adjust this value as needed to position the model
        right: '10px', // Adjust this value as needed to position the model
        width: '225%', // Control the width and height of the 3D model container
        height: '225%',
        pointerEvents: 'none', // Ensure it's visible but doesn't block other interactions
        zIndex: 2, // Ensure it's above other content
      }}
      onClick={handleModelClick} // Toggle active state on click
    >
      <div style={{ pointerEvents: 'auto' }}> {/* Enable pointer events for interactions */}
        <Suspense fallback={<Loader />}>
          <Spline scene="https://prod.spline.design/XOjm2eEE6-s3A1nX/scene.splinecode" />
        </Suspense>
      </div>
    </div>
  );
}

function Scene({ isModelActive }) {
  const { camera } = useThree();
  const controlsRef = useRef();

  useEffect(() => {
    // Set the camera position and controls target to frame both the sphere and the box
    camera.position.set(0, 30, 10); // Position the camera further back and slightly above
    controlsRef.current.target.set(0, 1, 0); // Focus on the midpoint
    controlsRef.current.update();

    // Scroll event listener for zooming in/out
    const handleScroll = (event) => {
      event.preventDefault(); // Prevent default page scroll
      if (isModelActive) {
        // Only apply zoom to the 3D model when it's active
        camera.position.z -= event.deltaY * 0.05; // Adjust zoom speed for 3D model
      } else {
        // Apply zoom to the stars scene when the model is not active
        camera.position.z -= event.deltaY * 0.02; // Adjust zoom for stars scene
      }

      // Limit the camera zoom-in and zoom-out range
      camera.position.z = Math.max(20, Math.min(camera.position.z, 100)); // Adjust the min/max range to suit your needs
    };

    // Add scroll event listener
    window.addEventListener('wheel', handleScroll, { passive: false });

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [camera, isModelActive]);

  return (
    <>
      {/* Global OrbitControls for zooming and rotating */}
      <OrbitControls
        ref={controlsRef}
        enableZoom={false} // Disable default zoom to handle custom zoom
        maxDistance={300} // Allows zooming out further
        minDistance={10} // Sets minimum zoom distance
        maxPolarAngle={Math.PI / 2} // Restricts vertical rotation
        target={[0, 1, 0]} // Ensures camera targets the midpoint between the objects
      />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color={'white'} />

      {/* Stars in the background */}
      <Stars radius={200} depth={50} count={5000} factor={4} saturation={0} fade />

      {/* Physics-enabled elements */}
      <Physics>
        <PhysicsSphere />
        <PhysicsBox />
      </Physics>
    </>
  );
}

export default function Home() {
  const [isModelActive, setIsModelActive] = useState(false); // State to track if 3D model is active

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-purple-900 to-blue-800 text-white overflow-hidden">
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

        {/* Canvas containing the 3D scene with global controls */}
        <div className="w-full h-screen relative">
          <Canvas
            camera={{ position: [0, 30, 10], fov: 70, near: 0.1, far: 10000 }} // Adjust the far value here
          >
            <Suspense fallback={<Loader />}>
              <Scene isModelActive={isModelActive} />
            </Suspense>
          </Canvas>
        </div>

        {/* Spline model rendered outside the Canvas, fixed in the top-right corner */}
        <SplineModel isModelActive={isModelActive} toggleModelActive={setIsModelActive} />

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
