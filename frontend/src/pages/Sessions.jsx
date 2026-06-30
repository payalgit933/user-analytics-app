import { useEffect, useState } from "react";
import axios from "axios";

function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("https://user-analytics-app-lhpn.onrender.com/sessions")
      .then((response) => {
        setSessions(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const loadSessionEvents = async (sessionId) => {
    try {
      const response = await axios.get(
        `https://user-analytics-app-lhpn.onrender.com/sessions/${sessionId}`
      );

      setEvents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="mb-4">📁 Sessions</h2>

      {sessions.map((session) => (
        <div
          key={session._id}
          className="card mb-3 shadow-sm"
          style={{
            cursor: "pointer",
            transition: "0.3s",
          }}
          onClick={() => loadSessionEvents(session._id)}
        >
          <div className="card-body">
            <h5 className="card-title">Session ID</h5>

            <p
              className="text-muted"
              style={{
                wordBreak: "break-all",
              }}
            >
              {session._id}
            </p>

            <span className="badge bg-primary">
              {session.totalEvents} Events
            </span>
          </div>
        </div>
      ))}

      <div className="mt-5">
        <h2 className="mb-4">🛣️ User Journey</h2>

        {events.length === 0 ? (
          <div className="alert alert-info">
            Click a session card to view user journey.
          </div>
        ) : (
          events.map((event) => (
            <div
              key={event._id}
              className="card mb-3 border-start border-4 border-primary shadow-sm"
            >
              <div className="card-body">
                <h5 className="card-title">
                  {event.eventType === "click"
                    ? "🖱️ Click Event"
                    : "👀 Page View"}
                </h5>

                <p className="mb-1">
                  <strong>Page:</strong> {event.pageUrl}
                </p>

                <p className="mb-1">
                  <strong>Time:</strong>{" "}
                  {new Date(event.timestamp).toLocaleString()}
                </p>

                {event.x !== undefined && event.y !== undefined && (
                  <p className="mb-0">
                    <strong>Position:</strong> ({event.x}, {event.y})
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Sessions;