import React, { useState } from "react";
import myAxios from "../contexts/MyAxios";

export default function UjJelszo() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await myAxios.post("/forgot-password", { email });
      setMessage("Ellenőrizze az email fiókját a további lépésekért!");
    } catch (error) {
      setMessage("Hiba történt, próbálja újra.");
    }
  };

  return (
    <div className="m-auto" style={{ maxWidth: "400px" }}>
      <h1 className="text-center">Elfelejtett jelszó</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-3">
          <label htmlFor="email" className="form-label">
            Adja meg az email címét:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            id="email"
            placeholder="Email"
            name="email"
            required
          />
        </div>
        <button type="submit" className="btn w-100" style={{ backgroundColor: "#d2b48c" }}>
          Jelszó visszaállítása
        </button>
      </form>
      {message && <p className="text-center mt-3">{message}</p>}
    </div>
  );
}
