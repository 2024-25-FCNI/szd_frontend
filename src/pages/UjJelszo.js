import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import myAxios from "../contexts/MyAxios";

export default function UjJelszo() {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (!token || !email) {
      setError("Hiányzó token vagy e-mail információ. Ellenőrizze az URL-t.");
      return;
    }

    try {
      const response = await myAxios.post("/reset-password", {
        token,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      setMessage("Jelszó sikeresen megváltoztatva!");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Hiba történt a jelszó megváltoztatása során."
      );
    }
  };

  return (
    <div className="uj-jelszo-container m-auto" style={{ maxWidth: "400px" }}>
      <h1 className="text-center">Új jelszó beállítása</h1>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-3">
          <label htmlFor="password" className="form-label">
            Új jelszó:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="passwordConfirmation">Jelszó megerősítése:</label>
          <input
            type="password"
            id="passwordConfirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="btn w-100"
          style={{ backgroundColor: "#d2b48c" }}>
          Jelszó beállítása
        </button>
      </form>
    </div>
  );
}
