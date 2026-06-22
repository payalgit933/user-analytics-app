(function () {

  let sessionId = localStorage.getItem("session_id");

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem("session_id", sessionId);
  }

  async function sendEvent(eventData) {

    try {

      await fetch("http://localhost:5000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(eventData)
      });

    } catch (error) {

      console.log(error);

    }
  }

  sendEvent({
    sessionId,
    eventType: "page_view",
    pageUrl: window.location.href,
    timestamp: new Date()
  });

  document.addEventListener("click", (e) => {

    sendEvent({
      sessionId,
      eventType: "click",
      pageUrl: window.location.href,
      timestamp: new Date(),
      x: e.clientX,
      y: e.clientY
    });

  });

})();