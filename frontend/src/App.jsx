import Sessions from "./pages/Sessions";
import Heatmap from "./pages/Heatmap";

function App() {
  return (
    <div className="container mt-4">

      <div className="text-center mb-5">
        <h1>📊 User Analytics Dashboard</h1>
        <p className="text-muted">
          Session Tracking & Heatmap Visualization
        </p>
      </div>

      <div className="row mb-4">

        <div className="col-md-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5>Total Sessions</h5>
              <h2>📁</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5>User Journey</h5>
              <h2>🛣️</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5>Heatmap</h5>
              <h2>🔥</h2>
            </div>
          </div>
        </div>

      </div>

      <Sessions />

      <hr className="my-5" />

      <Heatmap />

    </div>
  );
}

export default App;