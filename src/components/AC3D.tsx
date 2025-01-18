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
    <group ref={acRef}>
      {/* Main AC Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4, 1, 1]} />
        <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.2} />
      </mesh>
      
      {/* Front Panel */}
      <mesh position={[0, 0, 0.51]}>
        <boxGeometry args={[3.8, 0.9, 0.05]} />
        <meshStandardMaterial color="#f5f5f5" metalness={0.3} roughness={0.4} />
      </mesh>
      
      {/* Vents */}
      <mesh position={[0, -0.3, 0.52]}>
        <boxGeometry args={[3.5, 0.1, 0.02]} />
        <meshStandardMaterial color="#e0e0e0" metalness={0.2} roughness={0.3} />
      </mesh>
      
      {/* Display Panel */}
      <mesh position={[1.5, 0, 0.52]}>
        <boxGeometry args={[0.5, 0.3, 0.02]} />
        <meshStandardMaterial color="#333333" metalness={0.5} roughness={0.2} />
      </mesh>
    </group>
  );
};

const AC3D = () => {
  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[300px] h-[300px] opacity-70">
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <AC />
        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={4}
          enablePan={false}
        />
      </Canvas>
    </div>
  );
};

export default AC3D;