import { Html, useProgress } from "@react-three/drei";

const CanvasLoader = () => {
  const { progress } = useProgress();
  return (
    <Html
      as="div"
      center
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        fontFamily: "JetBrains Mono, monospace",
      }}
    >
      <span className="canvas-loader" />
      <p
        style={{
          fontSize: 12,
          color: "#7ee787",
          fontWeight: 700,
          marginTop: 30,
          letterSpacing: "0.1em",
        }}
      >
        loading {progress.toFixed(0)}%
      </p>
    </Html>
  );
};

export default CanvasLoader;
