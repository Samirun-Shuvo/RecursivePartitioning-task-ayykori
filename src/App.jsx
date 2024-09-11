import TaskOne from "./components/TaskOne";
import TaskTwo from "./components/TaskTwo";

const App = () => {
  return (
    <div>
      <div className="min-h-screen">
        <TaskOne></TaskOne>
      </div>
      <div className="h-1 bg-red-700">
        <hr />
      </div>
      <div className="min-h-screen">
        <TaskTwo></TaskTwo>
      </div>
    </div>
  );
};

export default App;
