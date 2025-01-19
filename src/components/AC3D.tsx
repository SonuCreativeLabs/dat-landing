import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
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
    <group ref={acRef}>
      {/* Main AC Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4, 1, 1]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      
      {/* Front Panel */}
      <mesh position={[0, 0, 0.51]}>
        <boxGeometry args={[3.8, 0.9, 0.05]} />
        <meshBasicMaterial color="#f5f5f5" />
      </mesh>
      
      {/* Vents */}
      <mesh position={[0, -0.3, 0.52]}>
        <boxGeometry args={[3.5, 0.1, 0.02]} />
        <meshBasicMaterial color="#e0e0e0" />
      </mesh>
      
      {/* Display Panel */}
      <mesh position={[1.5, 0, 0.52]}>
        <boxGeometry args={[0.5, 0.3, 0.02]} />
        <meshBasicMaterial color="#333333" />
      </mesh>
    </group>
  );
};

const AC3D = () => {
  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px]">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
      >
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} />
        <AC />
        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={2}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};

export default AC3D;