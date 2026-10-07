import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function NotFound() {
  return (
    <section className="not-found-page">
      <span>404</span>

      <h1>We couldn't find that page.</h1>

      <p>
        The page may have moved or the address may
        be incorrect.
      </p>

      <Link to="/">
        <ArrowLeft size={18} />
        Return home
      </Link>
    </section>
  );
}

export default NotFound;