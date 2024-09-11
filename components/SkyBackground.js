import { Sky } from '@react-three/drei';

export default function SkyBackground() {
  return (
    <Sky
      distance={450000}
      sunPosition={[1, 0.1, 0]}
      inclination={0.55}
      azimuth={0.25}
      turbidity={10}
      rayleigh={0.2}
      mieCoefficient={0.005}
      mieDirectionalG={0.8}
    />
  );
}
