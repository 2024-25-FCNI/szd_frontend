import React from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";
import { Outlet } from "react-router-dom";
import { FaShoppingCart, FaUser  } from "react-icons/fa"; // React Icons importálása

export default function Nav() {
  const { user, logout } = useAuthContext();

  return (
    <>
      {/* Google Fonts importálása */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
          .navbar {
            font-family: 'Poppins', sans-serif;
            background-color: #a67b5b; /* Szebb barna árnyalat */
            color: white;
            padding: 10px 20px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .navbar .nav-link {
            color: white;
            margin-right: 15px;
            font-weight: 500;
            transition: color 0.3s ease;
          }
          .navbar .nav-link:hover {
            color: rgb(242, 223, 199);
          }
          .navbar-brand {
            font-size: 1.5rem;
            font-weight: 600;
            color: white;
          }
          .navbar-brand:hover {
            color: rgb(199, 186, 144);
          }
          .container {
            max-width: 100%; /* Szélesség beállítása a képernyő széléig */
          }
        `}
      </style>

      <nav className="navbar navbar-expand-sm">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Webshop
          </Link>

          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Kezdőlap
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin">
                Admin
              </Link>
            </li>
            {user ? (
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={logout}>
                  Kijelentkezés
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/bejelentkezes">
                Bejelentkezés <FaUser /> 
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/kosar">
                Kosár <FaShoppingCart /> {/* Kosár ikon */}
                
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Ide kerül majd az útvonalak/linkek által meghatározott tartalom */}
      <Outlet />
    </>
  );
}
