import { useState } from "react";
import axios from "axios";

function Heatmap() {
  const [pageUrl, setPageUrl] = useState("");
  const [clicks, setClicks] = useState([]);

  const loadHeatmap = async () => {
    try {
      const response = await axios.get(
        `https://user-analytics-app-lhpn.onrender.com/heatmap?pageUrl=${encodeURIComponent(pageUrl)}`
      );

      setClicks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-5">
      <h2 className="mb-4">🔥 Click Heatmap</h2>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Page URL"
          value={pageUrl}
          onChange={(e) => setPageUrl(e.target.value)}
        />

        <button
          className="btn btn-primary"
          onClick={loadHeatmap}
        >
          Load Heatmap
        </button>
      </div>

      <div className="alert alert-secondary">
        Total Clicks: <strong>{clicks.length}</strong>
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          height: "500px",
          border: "2px solid #dee2e6",
          borderRadius: "12px",
          position: "relative",
          backgroundColor: "#f8f9fa",
          overflow: "hidden",
        }}
      >
        {clicks.map((click) => (
          <div
            key={click._id}
            title={`(${click.x}, ${click.y})`}
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              backgroundColor: "#ff4d4f",
              boxShadow: "0 0 10px red",
              position: "absolute",
              left: click.x,
              top: click.y,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Heatmap;