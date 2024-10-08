/*
  Auto-generated by Spline
*/

import useSpline from '@splinetool/r3f-spline'
import { OrthographicCamera } from '@react-three/drei'

export default function SplineScene({ ...props }) {
  const { nodes, materials } = useSpline('https://prod.spline.design/XOjm2eEE6-s3A1nX/scene.splinecode');
  
  return (
    <group {...props} dispose={null}>
      <mesh
        name="Cube 4"
        geometry={nodes['Cube 4'].geometry}
        material={materials['Untitled Material']}
        castShadow
        receiveShadow
        position={[0, -560, 0]}
      />
      {/* Add other parts of the Spline model as needed */}
    </group>
  )
}
