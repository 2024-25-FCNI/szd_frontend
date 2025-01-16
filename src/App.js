
import Nav from "./pages/Nav";
import Public from "./pages/Public";
import Admin from "./pages/Admin";
import {  Routes, Route } from "react-router-dom";
import Bejelentkezes from "./pages/Login";
import Regisztracio from "./pages/SignUp";
import NoPage from "./pages/NoPage";
import UjJelszo from "./pages/UjJelszo";



function App() {
  return (
    <div className="container">
      <header className="">

      </header>

      
        <Routes>
          <Route path="/" element={<Nav />}>
            <Route index element={<Public />} />
            <Route path="admin" element={<Admin />} />
            <Route path="*" element={<NoPage />} />
            <Route path="bejelentkezes" element={<Bejelentkezes />} />
            <Route path="regisztracio" element={<Regisztracio />} />
            <Route path="elfelejtett-jelszo" element={<UjJelszo />} /> 
          </Route>
        </Routes>
      
    </div>
  );
}

export default App;
