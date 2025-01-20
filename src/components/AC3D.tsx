import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";

const AC = () => {
  const meshRef = THREE.useRef();

  return (
    <group>
      {/* Modern AC Unit Shape */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 0.8, 0.6]} />
        <meshPhongMaterial 
          color="#ffffff" 
          metalness={0.8} 
          roughness={0.2} 
          envMapIntensity={1}
        />
      </mesh>
      
      {/* Front Panel with Vents */}
      <mesh position={[0, 0, 0.31]} castShadow>
        <boxGeometry args={[2.9, 0.7, 0.02]} />
        <meshPhongMaterial 
          color="#f8f9fa" 
          metalness={0.5} 
          roughness={0.5}
        />
      </mesh>
      
      {/* Decorative Lines */}
      {[-1, 0, 1].map((x, i) => (
        <mesh key={i} position={[x, 0, 0.32]} castShadow>
          <boxGeometry args={[0.5, 0.6, 0.01]} />
          <meshPhongMaterial 
            color="#e9ecef" 
            metalness={0.3} 
            roughness={0.7}
          />
        </mesh>
      ))}
      
      {/* Display Panel */}
      <mesh position={[1.2, 0.2, 0.32]} castShadow>
        <boxGeometry args={[0.4, 0.2, 0.01]} />
        <meshPhongMaterial 
          color="#212529" 
          emissive="#0ea5e9"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
};

const Scene = () => {
  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] z-10">
      <Canvas
        shadows
        camera={{ position: [4, 2, 4], fov: 50 }}
        gl={{ 
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: true,
          powerPreference: "high-performance"
        }}
      >
        <color attach="background" args={["transparent"]} />
        <ambientLight intensity={0.5} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={1} 
          castShadow 
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <Suspense fallback={null}>
          <AC />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={3}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};

export default Scene;