import React from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";
import { Outlet } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa"; // React Icons importálása

export default function Nav() {
  const { user, logout } = useAuthContext();

  return (
    <>
      <style>
        {`
          .navbar {
            
            background-color:rgba(170, 136, 110, 0.65); 
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
            color: rgb(242, 223, 199);
          }
          .container {
            max-width: 100%; /* Szélesség beállítása a képernyő széléig */
          }
        `}
      </style>

      <nav className="navbar navbar-expand-sm">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <div
              style={{
                backgroundImage: "url('/kepek/wehologo.png')",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                height: "60px",
                width: "120px",
              }}
            ></div>
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
                <Link className="nav-link" to="/login">
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
