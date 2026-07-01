import { useEffect, useState } from "react";
import axios from "axios";

function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedSession, setSelectedSession] = useState("");
  const [search, setSearch] = useState("");
  const [showAbout, setShowAbout] = useState(false);
  const [copied, setCopied] = useState(false);

  const API_BASE = "https://user-analytics-app-lhpn.onrender.com";

  // 🌐 Portfolio URL
  const PORTFOLIO_URL = "https://payalgit933.github.io/portfolio-main/";

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

  // 📋 Copy handler
  const handleCopy = async () => {
    await navigator.clipboard.writeText(PORTFOLIO_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="container-fluid mt-3">

      {/* ================= COMPACT HEATMAP URL BAR ================= */}
      <div className="d-flex align-items-center justify-content-between p-2 mb-3 border rounded bg-light shadow-sm">

        <div className="small">
          🌐 <b>Heatmap URL:</b>{" "}
          <span className="text-primary">{PORTFOLIO_URL}</span>
        </div>

        <div className="d-flex align-items-center gap-2">

          <button
            className="btn btn-sm btn-outline-primary"
            onClick={handleCopy}
          >
            {copied ? "Copied ✔" : "Copy"}
          </button>

          <a
            href={PORTFOLIO_URL}
            target="_blank"
            rel="noreferrer"
            className="btn btn-sm btn-primary"
          >
            Open
          </a>

        </div>
      </div>

      {/* ================= ABOUT SECTION ================= */}
      <div className="card shadow mb-3">

        <div
          className="card-header bg-dark text-white d-flex justify-content-between"
          onClick={() => setShowAbout(!showAbout)}
          style={{ cursor: "pointer" }}
        >
          <span>ℹ About</span>
          <span>{showAbout ? "▲" : "▼"}</span>
        </div>

        {showAbout && (
          <div className="card-body small">

            <p>
              Analytics dashboard (Google Analytics / Hotjar style) tracking user behavior.
            </p>

            <pre className="bg-light p-2 rounded small">
Portfolio → Tracker → API → MongoDB → Dashboard
            </pre>

            <p>
              Tech: React • Node • Express • MongoDB • Axios
            </p>

            <p className="text-muted small">
              API: {API_BASE}
            </p>

          </div>
        )}
      </div>

      {/* ================= TOP STATS ================= */}
      <div className="row mb-3 text-center">

        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body p-2">
              <h5>{totalSessions}</h5>
              <small>Sessions</small>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body p-2">
              <h5>{totalClicks}</h5>
              <small>Clicks</small>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body p-2">
              <h5>{totalPageViews}</h5>
              <small>Views</small>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body p-2">
              <h5>{totalEvents}</h5>
              <small>Events</small>
            </div>
          </div>
        </div>

      </div>

      {/* ================= MAIN AREA ================= */}
      <div className="row">

        {/* SESSIONS */}
        <div className="col-md-4">
          <div className="card shadow" style={{ height: "600px", overflowY: "auto" }}>

            <div className="card-header bg-dark text-white">
              📁 Sessions
            </div>

            <div className="card-body">

              <input
                className="form-control form-control-sm mb-2"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              {filteredSessions.map((session) => (
                <div
                  key={session._id}
                  className={`card mb-2 ${
                    selectedSession === session._id ? "border-primary" : ""
                  }`}
                  onClick={() => loadSessionEvents(session._id)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="card-body p-2 small">
                    <div className="text-muted">
                      {session._id.substring(0, 10)}...
                    </div>
                    <span className="badge bg-primary">
                      {session.totalEvents}
                    </span>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>

        {/* USER JOURNEY */}
        <div className="col-md-8">
          <div className="card shadow" style={{ height: "600px", overflowY: "auto" }}>

            <div className="card-header bg-primary text-white">
              🛣 User Journey
            </div>

            <div className="card-body small">

              {events.length === 0 ? (
                <div className="alert alert-info p-2">
                  Select session
                </div>
              ) : (
                events.map((event) => (
                  <div key={event._id} className="card mb-2 shadow-sm">
                    <div className="card-body p-2">

                      <b>
                        {event.eventType === "click" ? "🖱 Click" : "👀 View"}
                      </b>

                      <div>{event.pageUrl}</div>

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
