import "./Unauthorized.css"; // Import CSS
import { Link } from "react-router-dom";
//403
export default function Unauthorized() {
  return (
    <div className="unauthorized-container">
      <div className="unauthorized-message">
        <div className="head">403</div>
        <div className="content">Forbidden</div>
        <div className="description">
          Access to this resource on the server is denied
        </div>
        <Link to={"/"}>
          <div className="back-to-home">Back to Home</div>
        </Link>
      </div>
    </div>
  );
}
