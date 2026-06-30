import Sessions from "./pages/Sessions";
import Heatmap from "./pages/Heatmap";

function App() {
  return (
    <div style={{ backgroundColor: "#f4f7fc", minHeight: "100vh" }}>
      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg shadow"
        style={{
          background: "linear-gradient(90deg,#0f172a,#1e3a8a)",
        }}
      >
        <div className="container">
          <span
            className="navbar-brand fw-bold text-white"
            style={{ fontSize: "28px" }}
          >
            📊 User Analytics Dashboard
          </span>

          <span className="text-white">
            React • Express • MongoDB
          </span>
        </div>
      </nav>

      <div className="container py-4">

        {/* Welcome */}

        <div className="text-center mb-5">
          <h2 className="fw-bold">
            Analytics Overview
          </h2>

          <p className="text-muted fs-5">
            Track user sessions, monitor user journeys and visualize click
            heatmaps.
          </p>
        </div>

        {/* Main Dashboard */}

        <Sessions />

        {/* Heatmap */}

        <div className="mt-5">
          <Heatmap />
        </div>

        {/* Footer */}

        <footer className="text-center text-muted mt-5 pb-3">
          <hr />

          <p>
            Built with ❤️ using React, Express, MongoDB & Bootstrap
          </p>

        </footer>

      </div>
    </div>
  );
}

export default App;