import { useEffect, useState } from "react";
import axios from "axios";

function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedSession, setSelectedSession] = useState("");
  const [search, setSearch] = useState("");
  const [showAbout, setShowAbout] = useState(false);

  // 🔗 Central API URL (easy to share for testing)
  const API_BASE = "https://user-analytics-app-lhpn.onrender.com";

  const totalSessions = sessions.length;

  const totalEvents = sessions.reduce(
    (sum, session) => sum + session.totalEvents,
    0
  );

  const filteredSessions = sessions.filter((session) =>
    session._id.toLowerCase().includes(search.toLowerCase())
  );

  const totalClicks = events.filter(
    (event) => event.eventType === "click"
  ).length;

  const totalPageViews = events.filter(
    (event) => event.eventType === "page_view"
  ).length;

  useEffect(() => {
    axios
      .get(`${API_BASE}/sessions`)
      .then((res) => setSessions(res.data))
      .catch((err) => console.error(err));
  }, []);

  const loadSessionEvents = async (sessionId) => {
    setSelectedSession(sessionId);

    const res = await axios.get(`${API_BASE}/sessions/${sessionId}`);
    setEvents(res.data);
  };

  return (
    <div className="container-fluid mt-4">

      {/* ================= ABOUT SECTION ================= */}
      <div className="card shadow mb-4">
        <div
          className="card-header bg-dark text-white d-flex justify-content-between align-items-center"
          style={{ cursor: "pointer" }}
          onClick={() => setShowAbout(!showAbout)}
        >
          <h5 className="mb-0">ℹ About This Project</h5>
          <span>{showAbout ? "▲" : "▼"}</span>
        </div>

        {showAbout && (
          <div className="card-body">
            <p>
              This dashboard demonstrates how modern analytics platforms like
              Google Analytics, Hotjar, and Microsoft Clarity track user behavior.
            </p>

            <hr />

            <h6>Workflow</h6>
            <pre>
Portfolio Website → Tracker.js → Express API → MongoDB Atlas → React Dashboard
            </pre>

            <h6>Features</h6>
            <ul>
              <li>✔ Session Tracking</li>
              <li>✔ Page View Tracking</li>
              <li>✔ Click Tracking</li>
              <li>✔ User Journey Visualization</li>
            </ul>

            <h6>Tech Stack</h6>
            <p>React • Node.js • Express • MongoDB Atlas • Bootstrap • Axios</p>

            <h6>Deployment</h6>
            <p>
              Frontend: Vercel <br />
              Backend: Render <br />
              Database: MongoDB Atlas
            </p>

            <hr />

            <h6>🔗 Test API</h6>
            <code>{API_BASE}</code>

            <div className="mt-3 d-flex gap-2 flex-wrap">
              <a
                href="https://payalgit933.github.io/portfolio-main/"
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                🌐 Live Portfolio
              </a>

              <a
                href="https://github.com/payalgit933/user-analytics-app"
                target="_blank"
                rel="noreferrer"
                className="btn btn-dark"
              >
                💻 GitHub Repository
              </a>

              <a
                href="https://github.com/payalgit933/user-analytics-app/blob/main/README.md"
                target="_blank"
                rel="noreferrer"
                className="btn btn-success"
              >
                📄 README
              </a>
            </div>
          </div>
        )}
      </div>

      {/* ================= TOP STATS ================= */}
      <div className="row mb-4">

        <div className="col-md-3">
          <div className="card shadow text-center">
            <div className="card-body">
              <h3>{totalSessions}</h3>
              <p>Total Sessions</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow text-center">
            <div className="card-body">
              <h3>{totalClicks}</h3>
              <p>Clicks</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow text-center">
            <div className="card-body">
              <h3>{totalPageViews}</h3>
              <p>Page Views</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow text-center">
            <div className="card-body">
              <h3>{totalEvents}</h3>
              <p>Total Events</p>
            </div>
          </div>
        </div>

      </div>

      {/* ================= MAIN AREA ================= */}
      <div className="row">

        {/* SESSIONS */}
        <div className="col-md-4">
          <div className="card shadow" style={{ height: "650px", overflowY: "auto" }}>

            <div className="card-header bg-dark text-white">
              <h4>📁 Sessions</h4>
            </div>

            <div className="card-body">

              <input
                className="form-control mb-3"
                placeholder="Search session..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              {filteredSessions.map((session) => (
                <div
                  key={session._id}
                  className={`card mb-3 ${
                    selectedSession === session._id ? "border-primary border-2" : ""
                  }`}
                  onClick={() => loadSessionEvents(session._id)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="card-body">
                    <p className="text-muted small">
                      {session._id.substring(0, 12)}...
                    </p>

                    <span className="badge bg-primary">
                      {session.totalEvents} Events
                    </span>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>

        {/* USER JOURNEY */}
        <div className="col-md-8">
          <div className="card shadow" style={{ height: "650px", overflowY: "auto" }}>

            <div className="card-header bg-primary text-white">
              <h4>🛣 User Journey</h4>
            </div>

            <div className="card-body">

              {events.length === 0 ? (
                <div className="alert alert-info">
                  Select a session to view data
                </div>
              ) : (
                events.map((event) => (
                  <div key={event._id} className="card mb-3 shadow-sm">
                    <div className="card-body">

                      <h6>
                        {event.eventType === "click"
                          ? "🖱 Click"
                          : "👀 Page View"}
                      </h6>

                      <p>{event.pageUrl}</p>

                      <small className="text-muted">
                        {new Date(event.timestamp).toLocaleString()}
                      </small>

                    </div>
                  </div>
                ))
              )}

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Sessions;
