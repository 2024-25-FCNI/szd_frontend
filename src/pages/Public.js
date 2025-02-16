import { useContext } from "react";
import TermekekPublic from "../components/public/TermekekPublic";
import { ApiContext } from "../contexts/ApiContext";
import Kosar from "../components/public/Kosar";
import { KosarContext } from "../contexts/KosarContext";

function Public() {
  const { apiData, kategoriaData } = useContext(ApiContext);
  const { kosar } = useContext(KosarContext);

  return (
    <main className="row g-5">
      {/* <aside className="col-lg-4">
        <h3>Kosár</h3>
        {/* Kosár biztonságos átadása */}
        {/* <Kosar kosar={kosar || []} /> */}
      {/* </aside> */} 
      <article className="col-lg-8">
        {apiData ? <TermekekPublic termekek={apiData} /> : "Nincs adat"}
      </article>
    </main>
  );
}

export default Public;
