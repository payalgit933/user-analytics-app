import { useEffect, useState } from "react";
import axios from "axios";

function Sessions() {

  const [sessions, setSessions] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {

    axios
      .get("http://localhost:5000/sessions")
      .then((response) => {
        setSessions(response.data);
      });

  }, []);

  const loadSessionEvents = async (sessionId) => {

    const response = await axios.get(
      `http://localhost:5000/sessions/${sessionId}`
    );

    setEvents(response.data);
  };

  return (
    <div>

      <h2>Sessions</h2>

      {sessions.map((session) => (

        <div
          key={session._id}
          style={{
            border: "1px solid black",
            padding: "10px",
            marginBottom: "10px",
            cursor: "pointer"
          }}
          onClick={() => loadSessionEvents(session._id)}
        >

          <p>
            Session: {session._id}
          </p>

          <p>
            Events: {session.totalEvents}
          </p>

        </div>

      ))}

      <h2>User Journey</h2>

      {events.map((event) => (

        <div key={event._id}>

          <p>Type: {event.eventType}</p>

          <p>Page: {event.pageUrl}</p>

          <p>Time: {new Date(event.timestamp).toLocaleString()}</p>

          <hr />

        </div>

      ))}

    </div>
  );
}

export default Sessions;