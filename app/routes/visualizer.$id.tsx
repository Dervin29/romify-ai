import { useLocation } from "react-router";

const visualizerId = () => {
  const location = useLocation();
  const { initialImage, name } = location.state || {};
  return (
    <section>
      <h1>Visualizer - {name}</h1>

      <div className="visualizer">
        {initialImage && (
          <div className="image-container">
            <h2>Initial Image</h2>
            <img
              src={initialImage}
              alt="Initial"
              style={{ maxWidth: "300px" }}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default visualizerId;
