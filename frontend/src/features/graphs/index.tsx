function Graphs() {
  const baseUrl = import.meta.env.VITE_GRAFANA_URL || "http://localhost:3000";

  const grafanaUrl = `${baseUrl}/d/ad5wcsr/cantidad-de-salidas-cada-mes?orgId=1&from=now-1y&to=now&timezone=browser&var-reference_code=ACT9R70200&kiosk`;

  return (
    <div
      className="shadow-4"
      style={{ width: "100vw", margin: "0", padding: "0" }}
    >
      <div style={{ width: "100%", height: "900px" }}>
        <iframe
          src={grafanaUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          title="Grafana Dashboard"
        ></iframe>
      </div>
    </div>
  );
}

export default Graphs;
