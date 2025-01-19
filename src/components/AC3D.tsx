import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useRef, Component, ReactNode } from "react";
import * as THREE from "three";

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-red-500">
          Error loading 3D model. Please refresh the page.
        </div>
      );
    }

    return this.props.children;
  }
}

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
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 1, 1]} />
        <meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.5} />
      </mesh>
      
      {/* Front Panel */}
      <mesh position={[0, 0, 0.51]} castShadow receiveShadow>
        <boxGeometry args={[3.8, 0.9, 0.05]} />
        <meshStandardMaterial color="#f5f5f5" metalness={0.2} roughness={0.8} />
      </mesh>
      
      {/* Vents */}
      <mesh position={[0, -0.3, 0.52]} castShadow receiveShadow>
        <boxGeometry args={[3.5, 0.1, 0.02]} />
        <meshStandardMaterial color="#e0e0e0" metalness={0.3} roughness={0.7} />
      </mesh>
      
      {/* Display Panel */}
      <mesh position={[1.5, 0, 0.52]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 0.3, 0.02]} />
        <meshStandardMaterial color="#333333" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
};

const AC3D = () => {
  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] z-10">
      <ErrorBoundary>
        <Canvas
          shadows
          camera={{ position: [0, 0, 8], fov: 50 }}
          gl={{ 
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: true,
            powerPreference: "high-performance"
          }}
        >
          <color attach="background" args={["transparent"]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
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
      </ErrorBoundary>
    </div>
  );
};

export default AC3D;