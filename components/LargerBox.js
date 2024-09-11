import { Box } from '@react-three/drei';

export default function LargerBox() {
  return (
    <Box args={[1, 1, 1]} scale={4.5} position={[10, 10, 0]}>
      <meshStandardMaterial color="orange" />
    </Box>
  );
}
