import { useEffect, useState } from "react";
import axios from "axios";

function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedSession, setSelectedSession] = useState("");
  const [search, setSearch] = useState("");
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
      .get("https://user-analytics-app-lhpn.onrender.com/sessions")
      .then((response) => {
        setSessions(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const loadSessionEvents = async (sessionId) => {
    try {
      setSelectedSession(sessionId);

      const response = await axios.get(
        `https://user-analytics-app-lhpn.onrender.com/sessions/${sessionId}`
      );

      setEvents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container-fluid mt-4">
    <div className="row mb-4">

    <div className="col-md-3">
      <div className="card shadow text-center">
        <div className="card-body">
          <h2>👥</h2>
          <h3>{totalSessions}</h3>
          <p>Total Sessions</p>
        </div>
      </div>
    </div>

    <div className="col-md-3">
      <div className="card shadow text-center">
        <div className="card-body">
          <h2>🖱</h2>
          <h3>{totalClicks}</h3>
          <p>Clicks</p>
        </div>
      </div>
    </div>

    <div className="col-md-3">
      <div className="card shadow text-center">
        <div className="card-body">
          <h2>👀</h2>
          <h3>{totalPageViews}</h3>
          <p>Page Views</p>
        </div>
      </div>
    </div>

    <div className="col-md-3">
      <div className="card shadow text-center">
        <div className="card-body">
          <h2>📊</h2>
          <h3>{totalEvents}</h3>
          <p>Total Events</p>
        </div>
      </div>
    </div>

  </div>

      <div className="row">
        <div className="card shadow-sm border-0 mb-4">
  <div className="card-body">
    <h3 className="mb-3">📊 About This Project</h3>

    <p className="text-muted">
      User Analytics Dashboard is a full-stack analytics platform that
      tracks user interactions such as page views, clicks, and browsing
      sessions. It stores user events in MongoDB Atlas through a Node.js
      & Express backend and visualizes the collected data using a React
      dashboard.
    </p>

    <h5>✨ Features</h5>

    <ul>
      <li>📄 Page View Tracking</li>
      <li>🖱 Click Tracking</li>
      <li>📁 Session Management</li>
      <li>🛣 User Journey Visualization</li>
      <li>🔥 Click Heatmap</li>
    </ul>

    <h5>⚙ Tech Stack</h5>

    <p>
      React • Node.js • Express • MongoDB Atlas • Bootstrap • Axios
    </p>

    <h5>🔄 Workflow</h5>

    <p className="mb-0">
      Portfolio Website → Tracker.js → Express API → MongoDB Atlas →
      React Dashboard
    </p>
  </div>
</div>
        {/* Sessions */}

        <div className="col-md-4">

          <div
            className="card shadow"
            style={{
              height: "650px",
              overflowY: "auto",
            }}
          >
            <div className="card-header bg-dark text-white">
              <h4 className="mb-0">📁 Sessions</h4>
            </div>

            <div className="card-body">

              {filteredSessions.map((session) => (

                <div
                  key={session._id}
                  className={`card mb-3 ${
                    selectedSession === session._id
                      ? "border-primary border-3"
                      : ""
                  }`}
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => loadSessionEvents(session._id)}
                >
                  <div className="card-body">

                    <input
                      type="text"
                      className="form-control mb-3"
                      placeholder="🔍 Search Session ID..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    
                    <h6>
                      Session
                    </h6>

                    <p
                      className="text-muted"
                      style={{
                        fontSize: "13px",
                      }}
                    >
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

        {/* User Journey */}

        <div className="col-md-8">

          <div
            className="card shadow"
            style={{
              height: "650px",
              overflowY: "auto",
            }}
          >
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">🛣 User Journey</h4>
            </div>

            <div className="card-body">

              {events.length === 0 ? (

                <div className="alert alert-info">
                  Select a session to view its journey.
                </div>

              ) : (

                events.map((event) => (

                  <div
                    key={event._id}
                    className="card mb-3 shadow-sm border-start border-4 border-primary"
                  >
                    <div className="card-body">

                      <h5>

                        {event.eventType === "click"
                          ? "🖱 Click"
                          : "👀 Page View"}

                      </h5>

                      <p className="mb-1">
                        <strong>Page:</strong>
                        <br />
                        {event.pageUrl}
                      </p>

                      <p className="mb-1">
                        <strong>Time:</strong>
                        <br />
                        {new Date(event.timestamp).toLocaleString()}
                      </p>

                      {event.x !== undefined && (

                        <p className="mb-0">

                          <strong>Coordinates:</strong>

                          ({event.x}, {event.y})

                        </p>

                      )}

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
