import React, { useEffect, useState } from "react";
import { myAxios } from "../../contexts/MyAxios";
// Az API konfiguráció importálása

export function TermekPublic() {
  const [termekek, setTermekek] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Termékek betöltése az API-ból
    const fetchTermekek = async () => {
      try {
        const response = await myAxios.get("/api/termekek"); // Helyes API végpont
        setTermekek(response.data); // Termékek állapot frissítése
      } catch (error) {
        console.error("Hiba a termékek betöltése során:", error);
      } finally {
        setLoading(false); // Betöltési állapot kikapcsolása
      }
    };

    fetchTermekek();
  }, []);

  if (loading) {
    return <div>Betöltés...</div>; // Betöltés közbeni állapot
  }

  return (
    <div className="row">
      {termekek.map((termek) => (
        <div className="col-md-4" key={termek.termek_id}>
          <div className="card h-100">
            <div className="card-header bg-transparent border-success">
              <h5 className="card-title">{termek.cim}</h5>
            </div>
            <div className="card-body">
              <img src={termek.kep} alt={termek.cim} className="card-img-top" />
              <p className="card-text">{termek.leiras}</p>
            </div>
            <div className="card-footer">
              <b className="card-link">{termek.ar} €</b>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TermekPublic;
