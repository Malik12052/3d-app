import { Text } from '@react-three/drei';

export default function FloatingText() {
  return (
    <Text
      position={[0, 5, 0]}
      color="white"
      fontSize={2}
      maxWidth={200}
      lineHeight={1}
      letterSpacing={0.02}
      textAlign={'center'}
      anchorX="center"
      anchorY="middle"
    >
      3D Scene
    </Text>
  );
}
