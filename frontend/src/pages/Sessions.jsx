import { useEffect, useState } from "react";
import axios from "axios";

function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedSession, setSelectedSession] = useState("");
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(false);

  const API_BASE = "https://user-analytics-app-lhpn.onrender.com";
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

  const copyUrl = async () => {
    await navigator.clipboard.writeText(PORTFOLIO_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="container-fluid mt-3">

      {/* ================= TOP STATS (COMPACT) ================= */}
      <div className="row mb-2 text-center">

        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body p-1">
              <h6>{totalSessions}</h6>
              <small>Sessions</small>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body p-1">
              <h6>{totalClicks}</h6>
              <small>Clicks</small>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body p-1">
              <h6>{totalPageViews}</h6>
              <small>Views</small>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body p-1">
              <h6>{totalEvents}</h6>
              <small>Events</small>
            </div>
          </div>
        </div>

      </div>

      {/* ================= MAIN ROW ================= */}
      <div className="row">

        {/* ================= SESSIONS ================= */}
        <div className="col-md-4">

          <div className="card shadow" style={{ height: "520px", overflowY: "auto" }}>

            <div className="card-header bg-dark text-white p-2">
              📁 Sessions
            </div>

            <div className="card-body p-2">

              <input
                className="form-control form-control-sm mb-2"
                placeholder="Search session..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              {filteredSessions.map((session) => (
                <div
                  key={session._id}
                  className={`card mb-1 ${
                    selectedSession === session._id ? "border-primary" : ""
                  }`}
                  onClick={() => loadSessionEvents(session._id)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="card-body p-1 small d-flex justify-content-between">

                    <span className="text-muted">
                      {session._id.substring(0, 8)}...
                    </span>

                    <span className="badge bg-primary">
                      {session.totalEvents}
                    </span>

                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>

        {/* ================= USER JOURNEY ================= */}
        <div className="col-md-8">

          <div className="card shadow" style={{ height: "520px", overflowY: "auto" }}>

            <div className="card-header bg-primary text-white p-2">
              🛣 User Journey
            </div>

            <div className="card-body p-2">

              {events.length === 0 ? (
                <div className="alert alert-info p-2">
                  Select a session
                </div>
              ) : (
                events.map((event) => (
                  <div key={event._id} className="card mb-1 shadow-sm">

                    <div className="card-body p-2 small d-flex justify-content-between">

                      <span>
                        {event.eventType === "click" ? "🖱 Click" : "👀 View"}
                      </span>

                      <span className="text-muted">
                        {event.pageUrl.substring(0, 25)}...
                      </span>

                      <span className="text-muted small">
                        {new Date(event.timestamp).toLocaleTimeString()}
                      </span>

                    </div>

                  </div>
                ))
              )}

            </div>
          </div>

          {/* ================= HEATMAP URL (ABOVE SEARCH BOX AREA) ================= */}
          <div className="card shadow mt-2 p-2 d-flex flex-row justify-content-between align-items-center">

            <div className="small">
              🌐 <b>Heatmap:</b> {PORTFOLIO_URL}
            </div>

            <div className="d-flex gap-2">

              <button
                className="btn btn-sm btn-outline-primary"
                onClick={copyUrl}
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

        </div>

      </div>
    </div>
  );
}

export default Sessions;
