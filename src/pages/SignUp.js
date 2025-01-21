import React, { useState } from "react";
import useAuthContext from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import myAxios from "../contexts/MyAxios";

export default function Regisztracio() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Felhasználói visszajelzés
  const [isLoading, setIsLoading] = useState(false); // Betöltés állapota
  const [passwordError, setPasswordError] = useState(""); // Jelszóhiba üzenet
  const [nameError, setNameError] = useState(""); // Név hibaüzenet
  const [emailError, setEmailError] = useState(""); // Email hibaüzenet

  const navigate = useNavigate();
  const { loginReg, errors } = useAuthContext();

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const validateName = (name) => {
    const regex = /^[a-zA-ZÁÉÍÓÖŐÚÜŰáéíóöőúüű ]+$/;
    return regex.test(name);
  };

  const validateEmail = (email) => {
    const regex = /^[a-z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Betöltési állapot bekapcsolása
    setPasswordError(""); // Jelszóhiba törlése
    setNameError(""); // Név hiba törlése
    setEmailError(""); // Email hiba törlése

    if (!validateName(name)) {
      setNameError("A név csak betűket tartalmazhat.");
      setIsLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Az emailnek érvényes formátumúnak kell lennie, és nem kezdődhet nagybetűvel.");
      setIsLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError(
        "A jelszónak legalább 8 karakter hosszúnak kell lennie, és tartalmaznia kell kis- és nagybetűt, számot és speciális karaktert."
      );
      setIsLoading(false);
      return;
    }

    const adat = {
      name: name,
      email: email,
      password: password,
      password_confirmation: password_confirmation,
    };
    loginReg(adat, "/register");
   
      setSuccessMessage("Sikeres regisztráció! Átirányítunk a bejelentkezéshez...");
     
  };

  return (
    <div className=" m-auto" style={{ maxWidth: "400px" }}>
      <h1 className="text-center">Regisztráció</h1>
      {successMessage && (
        <div className="alert alert-success text-center" role="alert">
          {successMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-3">
          <label htmlFor="name" className="form-label">
            Név:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="form-control"
            id="name"
            placeholder="Név"
            name="name"
          />
          <div>
            {nameError && (
              <span className="text-danger">{nameError}</span>
            )}
            {errors.name && (
              <span className="text-danger">{errors.name[0]}</span>
            )}
          </div>
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="form-control"
            id="email"
            placeholder="email"
            name="email"
          />
          <div>
            {emailError && (
              <span className="text-danger">{emailError}</span>
            )}
            {errors.email && (
              <span className="text-danger">{errors.email[0]}</span>
            )}
          </div>
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
            {passwordError && (
              <span className="text-danger">{passwordError}</span>
            )}
            {errors.password && (
              <span className="text-danger">{errors.password[0]}</span>
            )}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="pwd2" className="form-label">
            Jelszó újra:
          </label>
          <input
            type="password"
            value={password_confirmation}
            onChange={(e) => {
              setPasswordConfirmation(e.target.value);
            }}
            className="form-control"
            id="pwd2"
            placeholder="jelszó újra"
            name="pwd2"
          />
          <div>
            {errors.password_confirmation && (
              <span className="text-danger">
                {errors.password_confirmation[0]}
              </span>
            )}
          </div>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="gomb"
            disabled={isLoading} // Betöltés alatt a gomb letiltva
          >
            {isLoading ? "Feldolgozás..." : "Regisztrálok"}
          </button>
          <p>
            Már van fiókja?
            <Link className="nav-link" style={{ color: "rgba(170, 136, 110, 0.65)" }} to="/login">
              Bejelentkezés
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
