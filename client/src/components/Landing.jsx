import { Link } from "react-router-dom";

import "./Landing.css";

function Landing() {
  return (
    <div>
      <head></head>
      <body>
        <section class="full">
          <div class="full-inner">
            <div class="content">
              <h1>¡Bienvenidos!</h1>
              <Link to="/countries"> Ingresar </Link>
            </div>
          </div>
        </section>
      </body>
    </div>
  );
}

export default Landing;
