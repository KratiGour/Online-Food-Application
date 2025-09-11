import React, { useContext } from "react";
import "./Menubar.css";
import { assets } from "../../assets/assets.js";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Pages/Context/StoreContext.jsx";

const Menubar = () => {
  // Destructure setToken and setQuantities from context for logout functionality
  const { quantities, token, setToken, setQuantities } = useContext(StoreContext);
  const navigate = useNavigate();

  const uniqueItemsInCart = Object.values(quantities).filter(qty => qty > 0).length;

  const logout = () => {
    localStorage.removeItem("token");
    if (setToken) setToken("");
    if (setQuantities) setQuantities({}); // Safely call setQuantities
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link to="/">
          <img src={assets.logo} alt="Logo" className="mx-4" height={48} width={48} />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/explore">Explore</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact Us</Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-4">
            <Link to="/cart">
              <div className="position-relative">
                <img
                  src={assets.cart}
                  alt="Cart"
                  height={32}
                  width={32}
                />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
                  {uniqueItemsInCart}
                </span>
              </div>
            </Link>

            {!token ? (
              <>
                <button className="btn btn-outline-primary" onClick={() => navigate('/login')}>
                  Login
                </button>

                <button className="btn btn-outline-success" onClick={() => navigate('/register')}>
                  Register
                </button>
              </>
            ) : (
              <div className="dropdown text-end">
                <a
                  href="#"
                  className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onClick={e => e.preventDefault()}
                >
                  <img
                    src={assets.profile}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="rounded-circle"
                  />
                </a>

                <ul className="dropdown-menu text-small">
                  <li className="dropdown-item" onClick={() => navigate('/myorders')}>
                    Orders
                  </li>

                  <li className="dropdown-item" onClick={logout}>
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Menubar;