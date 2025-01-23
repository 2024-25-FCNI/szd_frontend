import React, { useEffect, useState } from 'react';
import TermekPublic from './TermekPublic';
import apiClient from '../api/axios'; // Axios konfiguráció

function TermekekPublic() {
  const [termekek, setTermekek] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Termékek lekérése a backend API-ról
    const fetchTermekek = async () => {
      try {
        const response = await apiClient.get('/api/termekek'); // API végpont
        setTermekek(response.data); // Termékek állapot frissítése
      } catch (error) {
        console.error('Hiba a termékek lekérésekor:', error);
      } finally {
        setLoading(false); // Betöltés befejezése
      }
    };

    fetchTermekek();
  }, []);

  if (loading) {
    return <div>Betöltés...</div>;
  }

  return (
    <div className="row cols-1 row-cols-sm-2 row-cols-md-3 g-4">
      {termekek.map((termek) => (
        <TermekPublic termek={termek} key={termek.id} />
      ))}
    </div>
  );
}

export default TermekekPublic;
