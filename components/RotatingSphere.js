import { Sphere, MeshDistortMaterial } from '@react-three/drei';

export default function RotatingSphere() {
  return (
    <Sphere visible args={[1, 100, 200]} scale={5} position={[-20, 10, 0]}>
      <MeshDistortMaterial
        color="#8352FD"
        attach="material"
        distort={0.6}
        speed={2}
      />
    </Sphere>
  );
}
