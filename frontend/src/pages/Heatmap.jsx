import { useState } from "react";
import axios from "axios";

function Heatmap() {
  const [pageUrl, setPageUrl] = useState("");
  const [clicks, setClicks] = useState([]);

  const loadHeatmap = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/heatmap?pageUrl=${encodeURIComponent(pageUrl)}`
      );

      setClicks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>

      <h2>Heatmap</h2>

      <input
        type="text"
        placeholder="Enter Page URL"
        value={pageUrl}
        onChange={(e) => setPageUrl(e.target.value)}
        style={{ width: "500px" }}
      />

      <button onClick={loadHeatmap}>
        Load Heatmap
      </button>

      <div
        style={{
          width: "800px",
          height: "500px",
          border: "2px solid black",
          position: "relative",
          marginTop: "20px"
        }}
      >

        {clicks.map((click) => (
          <div
            key={click._id}
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              backgroundColor: "red",
              position: "absolute",
              left: click.x,
              top: click.y
            }}
          />
        ))}

      </div>

    </div>
  );
}

export default Heatmap;