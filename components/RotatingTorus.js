import { useRef } from 'react';
import { Torus } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function RotatingTorus() {
  const torusRef = useRef();
  useFrame(() => {
    torusRef.current.rotation.x += 0.01;
    torusRef.current.rotation.y += 0.01;
  });
  return (
    <Torus ref={torusRef} args={[2, 0.8, 16, 100]} scale={3.5} position={[0, 5, 0]}>
      <meshStandardMaterial color="lightblue" />
    </Torus>
  );
}
