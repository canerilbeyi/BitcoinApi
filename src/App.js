import Counter from "./components/Counter";
import Graph from "./components/Graph";

function App() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
      }}
    >
      <Graph />
      <Counter />
    </div>
  );
}

export default App;
