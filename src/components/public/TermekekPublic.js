import React, { useEffect, useState } from 'react';
import TermekPublic from './TermekPublic';
import { myAxios } from '../../contexts/MyAxios'; // Helyes importútvonal



function TermekekPublic() {
  const [termekek, setTermekek] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTermekek = async () => {
      try {
        const response = await myAxios.get('/api/termekek'); // Backend API végpont
        setTermekek(response.data); // API válasz beállítása az állapotba
      } catch (error) {
        console.error('Hiba a termékek lekérésekor:', error);
      } finally {
        setLoading(false); // Betöltési állapot frissítése
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
