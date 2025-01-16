import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";
import myAxios from "../contexts/MyAxios";
import "./Gomb.css";

export default function Bejelentkezes() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const csrf = () => myAxios.get("/sanctum/csrf-cookie");
  const navigate = useNavigate();
  const { loginReg, errors } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const adat = {
      email: email,
      password: password,
    };
    try {
      await myAxios.post("/bejelentkezes", adat);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-auto" style={{ maxWidth: "400px" }}>
      <h1 className="text-center">Bejelentkezés</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            // value beállítása a state értékére
            value={email}
            // state értékének módosítása ha változik a beviteli mező tartalma
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="form-control"
            id="email"
            placeholder="email"
            name="email"
          />
        </div>
        <div>
          {errors.email && (
            <span className="text-danger">{errors.email[0]}</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="pwd" className="form-label">
            Jelszó:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="form-control"
            id="pwd"
            placeholder="jelszó"
            name="pwd"
          />
          <div>
            {errors.password && (
              <span className="text-danger">{errors.password[0]}</span>
            )}
          </div>
        </div>

        <div className=" text-center">
          <button
            type="submit"
            className= "gomb"
          >
            Bejelentkezés
          </button>

          <p>
            Még nincs fiókja?
            <Link className="nav-link" style={{ color: 'rgba(170, 136, 110, 0.65)' }} to="/regisztracio">
              Regisztráció
            </Link>
          </p>
        </div>
        <div className="text-center">
          <Link className="nav-link" style={{ color: 'rgba(170, 136, 110, 0.65)' }} to="/elfelejtett-jelszo">
            Elfelejtettem a jelszavam
          </Link>
        </div>
      </form>
    </div>
  );
}
