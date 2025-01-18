import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const AC = () => {
  const acRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (acRef.current) {
      acRef.current.rotation.x = 0.2;
    }
  }, []);

  return (
    <group ref={acRef} position={[0, 0, 0]}>
      {/* AC Body */}
      <mesh castShadow>
        <boxGeometry args={[4, 1, 1]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* AC Vents */}
      <mesh position={[0, -0.3, 0.51]}>
        <boxGeometry args={[3.5, 0.1, 0.01]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
      
      {/* AC Display */}
      <mesh position={[1.5, 0, 0.51]}>
        <boxGeometry args={[0.5, 0.3, 0.01]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
    </group>
  );
};

const AC3D = () => {
  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[300px] h-[300px] opacity-70">
      <Canvas shadows>
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
        />
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <AC />
        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={4}
        />
      </Canvas>
    </div>
  );
};

export default AC3D;