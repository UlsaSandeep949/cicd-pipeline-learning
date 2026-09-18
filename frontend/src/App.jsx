import { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [pipelines, setPipelines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPipelines = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:8000/pipelines"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch pipelines");
      }

      const data = await response.json();

      setPipelines(data.pipelines);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPipelines();
  }, []);

  return (
    <div className="container">
      <h1>Pipeline Dashboard - CI/CD Learning</h1>

      <p>Welcome to the Pipeline Platform</p>

      <button onClick={fetchPipelines}>
        Refresh Pipelines
      </button>

      {loading && <p>Loading pipelines...</p>}

      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Pipeline Name</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {pipelines.map((pipeline) => (
              <tr key={pipeline.id}>
                <td>{pipeline.id}</td>
                <td>{pipeline.name}</td>
                <td>{pipeline.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
