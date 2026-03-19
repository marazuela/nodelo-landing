import { useRef, useMemo, useCallback, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 70;
const EDGE_COUNT = 90;
const MOBILE_NODE_COUNT = 35;
const MOBILE_EDGE_COUNT = 45;

function isMobile() {
  return typeof window !== "undefined" && window.innerWidth < 768;
}

interface GraphNode {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  size: number;
  color: THREE.Color;
}

function generateGraph(count: number, edgeCount: number) {
  const nodes: GraphNode[] = [];
  const colors = [
    new THREE.Color("#58a6ff"),
    new THREE.Color("#58a6ff"),
    new THREE.Color("#58a6ff"),
    new THREE.Color("#bc8cff"),
    new THREE.Color("#bc8cff"),
    new THREE.Color("#3fb950"),
    new THREE.Color("#d29922"),
  ];

  for (let i = 0; i < count; i++) {
    nodes.push({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.003,
        (Math.random() - 0.5) * 0.003,
        (Math.random() - 0.5) * 0.002
      ),
      size: 0.04 + Math.random() * 0.08,
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  }

  const edges: [number, number][] = [];
  for (let i = 0; i < edgeCount; i++) {
    const a = Math.floor(Math.random() * count);
    let b = Math.floor(Math.random() * count);
    if (b === a) b = (a + 1) % count;
    edges.push([a, b]);
  }

  return { nodes, edges };
}

function Nodes({ graph }: { graph: ReturnType<typeof generateGraph> }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const initialized = useRef(false);

  useFrame(() => {
    if (!meshRef.current) return;

    if (!initialized.current) {
      graph.nodes.forEach((node, i) => {
        meshRef.current!.setColorAt(i, node.color);
      });
      meshRef.current.instanceColor!.needsUpdate = true;
      initialized.current = true;
    }

    graph.nodes.forEach((node, i) => {
      node.position.add(node.velocity);
      if (Math.abs(node.position.x) > 9) node.velocity.x *= -1;
      if (Math.abs(node.position.y) > 6) node.velocity.y *= -1;
      if (Math.abs(node.position.z) > 5) node.velocity.z *= -1;

      dummy.position.copy(node.position);
      dummy.scale.setScalar(node.size);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, graph.nodes.length]}>
      <sphereGeometry args={[1, 12, 12]} />
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  );
}

function Edges({ graph }: { graph: ReturnType<typeof generateGraph> }) {
  const lineRef = useRef<THREE.LineSegments>(null);
  const positionArray = useMemo(
    () => new Float32Array(graph.edges.length * 6),
    [graph.edges.length]
  );

  useFrame(() => {
    if (!lineRef.current) return;
    const geo = lineRef.current.geometry;
    const pos = geo.attributes.position;

    graph.edges.forEach(([a, b], i) => {
      const na = graph.nodes[a];
      const nb = graph.nodes[b];
      positionArray[i * 6] = na.position.x;
      positionArray[i * 6 + 1] = na.position.y;
      positionArray[i * 6 + 2] = na.position.z;
      positionArray[i * 6 + 3] = nb.position.x;
      positionArray[i * 6 + 4] = nb.position.y;
      positionArray[i * 6 + 5] = nb.position.z;
    });

    (pos as THREE.BufferAttribute).set(positionArray);
    pos.needsUpdate = true;
  });

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positionArray, 3]}
          count={graph.edges.length * 2}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#30363d" transparent opacity={0.4} />
    </lineSegments>
  );
}

function Pulses({ graph }: { graph: ReturnType<typeof generateGraph> }) {
  const count = Math.min(graph.edges.length, 30);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const progress = useMemo(() => {
    const arr = new Float32Array(count);
    for (let i = 0; i < count; i++) arr[i] = Math.random();
    return arr;
  }, [count]);
  const speeds = useMemo(() => {
    const arr = new Float32Array(count);
    for (let i = 0; i < count; i++) arr[i] = 0.002 + Math.random() * 0.004;
    return arr;
  }, [count]);

  useFrame(() => {
    if (!meshRef.current) return;
    for (let i = 0; i < count; i++) {
      progress[i] += speeds[i];
      if (progress[i] > 1) progress[i] = 0;

      const [a, b] = graph.edges[i];
      const na = graph.nodes[a].position;
      const nb = graph.nodes[b].position;
      const t = progress[i];

      dummy.position.set(
        na.x + (nb.x - na.x) * t,
        na.y + (nb.y - na.y) * t,
        na.z + (nb.z - na.z) * t
      );
      dummy.scale.setScalar(0.03);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#58a6ff" toneMapped={false} transparent opacity={0.8} />
    </instancedMesh>
  );
}

function CameraRig() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  useFrame(() => {
    camera.position.x += (mouse.current.x * 0.5 - camera.position.x) * 0.02;
    camera.position.y += (-mouse.current.y * 0.3 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function Scene() {
  const mobile = isMobile();
  const graph = useMemo(
    () =>
      generateGraph(
        mobile ? MOBILE_NODE_COUNT : NODE_COUNT,
        mobile ? MOBILE_EDGE_COUNT : EDGE_COUNT
      ),
    [mobile]
  );

  return (
    <>
      <CameraRig />
      <Nodes graph={graph} />
      <Edges graph={graph} />
      <Pulses graph={graph} />
    </>
  );
}

export default function KnowledgeGraph3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, #0d1117 75%)",
        }}
      />
    </div>
  );
}
