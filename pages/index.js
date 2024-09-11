import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Sphere, Box, Torus, Text, Html } from '@react-three/drei';
import { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';

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

export default function Home() {
  const [hovered, setHovered] = useState({ sphere: true, box: true, torus: true });

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-purple-900 to-blue-800 text-white">
      <Head>
        <title>3D Interactive Portfolio</title>
      </Head>

      <main className="relative z-10 flex flex-col items-center justify-center h-screen">
        {/* Header Section */}
        <motion.h1
          className="text-5xl font-bold mb-10"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          Explore My 3D World
        </motion.h1>

        {/* 3D Canvas with Suspense for Loading */}
        <Canvas className="w-full h-96">
          <Suspense fallback={<Loader />}>
            <OrbitControls />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color={'white'} />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />

            {/* Sphere */}
            <Sphere
              args={[1, 32, 32]}
              position={[-2, 0, 0]}
              onPointerOver={() => setHovered((prev) => ({ ...prev, sphere: true }))}
              onPointerOut={() => setHovered((prev) => ({ ...prev, sphere: false }))}
            >
              <meshStandardMaterial color="lightgreen" />
              {hovered.sphere && (
                <motion.group
                  animate={{ rotateY: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </Sphere>

            {/* Box */}
            <Box
              args={[1, 1, 1]}
              position={[2, 0, 0]}
              onPointerOver={() => setHovered((prev) => ({ ...prev, box: true }))}
              onPointerOut={() => setHovered((prev) => ({ ...prev, box: false }))}
            >
              <meshStandardMaterial color="skyblue" />
              {hovered.box && (
                <motion.group
                  animate={{ rotateX: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </Box>

            {/* Torus */}
            <Torus
              args={[1, 0.4, 16, 100]}
              position={[0, 2, 0]}
              onPointerOver={() => setHovered((prev) => ({ ...prev, torus: true }))}
              onPointerOut={() => setHovered((prev) => ({ ...prev, torus: false }))}
            >
              <meshStandardMaterial color="purple" />
              {hovered.torus && (
                <motion.group
                  animate={{ rotateZ: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </Torus>

            {/* 3D Text */}
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
