import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { Mesh } from "three";

const AC = () => {
  const meshRef = useRef<Mesh>(null);

  return (
    <group>
      {/* Modern AC Unit Shape */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 0.8, 0.6]} />
        <meshStandardMaterial 
          color="#ffffff"
          metalness={0.8}
          roughness={0.2}
          transparent={false}
          opacity={1}
        />
      </mesh>
      
      {/* Front Panel with Vents */}
      <mesh position={[0, 0, 0.31]} castShadow>
        <boxGeometry args={[2.9, 0.7, 0.02]} />
        <meshStandardMaterial 
          color="#f8f9fa"
          metalness={0.5}
          roughness={0.5}
          transparent={false}
          opacity={1}
        />
      </mesh>

      {/* Vents */}
      {[-1, 0, 1].map((x, i) => (
        <mesh key={i} position={[x, 0, 0.32]} castShadow>
          <boxGeometry args={[0.5, 0.6, 0.01]} />
          <meshStandardMaterial 
            color="#e9ecef"
            metalness={0.3}
            roughness={0.7}
            transparent={false}
            opacity={1}
          />
        </mesh>
      ))}

      {/* Display Panel */}
      <mesh position={[1.2, 0.2, 0.32]} castShadow>
        <boxGeometry args={[0.4, 0.2, 0.01]} />
        <meshStandardMaterial 
          color="#212529"
          emissive="#0ea5e9"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
          transparent={false}
          opacity={1}
        />
      </mesh>
    </group>
  );
};

const AC3D = () => {
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[5, 2, 5]} />
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <Suspense fallback={null}>
          <AC />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};

export default AC3D;