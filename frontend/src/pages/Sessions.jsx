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
      .then((res) => setSessions(res.data))
      .catch((err) => console.error(err));
  }, []);

  const loadSessionEvents = async (sessionId) => {
    setSelectedSession(sessionId);

    const res = await axios.get(
      `https://user-analytics-app-lhpn.onrender.com/sessions/${sessionId}`
    );

    setEvents(res.data);
  };

  return (
    <div className="container-fluid mt-4">

      {/* TOP STATS */}
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

      {/* MAIN AREA */}
      <div className="row">

        {/* SESSIONS */}
        <div className="col-md-4">

          <div className="card shadow" style={{ height: "650px", overflowY: "auto" }}>

            <div className="card-header bg-dark text-white">
              <h4>📁 Sessions</h4>
            </div>

            <div className="card-body">

              {/* SEARCH (ONLY ONCE) */}
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
