export default function GroundPlane() {
    return (
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -10, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#8FBC8F" />
      </mesh>
    );
  }
  