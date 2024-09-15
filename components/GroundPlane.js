// Create a static ground plane
function GroundPlane() {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], position: [0, -1, 0] }));
  return (
    <mesh ref={ref} position={[0, -1, 0]}>
      {/* Increase the size of the plane geometry */}
      <planeGeometry args={[2000, 2000]} />  {/* Increased size */}
      <meshStandardMaterial color="grey" />
    </mesh>
  );
}
