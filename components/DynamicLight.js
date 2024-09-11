import { useState } from 'react';
import { useFrame } from '@react-three/fiber';

export default function DynamicLight() {
  const [lightColor, setLightColor] = useState('#ffffff');
  useFrame(() => {
    setLightColor(`hsl(${(performance.now() / 100) % 360}, 100%, 50%)`);
  });
  return <directionalLight position={[2, 5, 2]} intensity={1} color={lightColor} />;
}
