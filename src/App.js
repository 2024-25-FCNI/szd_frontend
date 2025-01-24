
import Nav from "./pages/Nav";
import Public from "./pages/Public";
import Admin from "./pages/Admin";
import {  Routes, Route } from "react-router-dom";
import Bejelentkezes from "./pages/Login";
import Regisztracio from "./pages/SignUp";
import NoPage from "./pages/NoPage";
import ElfelejtettJelszo from "./pages/ElfelejtettJelszo";




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
            <Route path="login" element={<Bejelentkezes />} />
            <Route path="register" element={<Regisztracio />} />
            <Route path="forgot-password" element={<ElfelejtettJelszo />} /> 
          </Route>
        </Routes>
      
    </div>
  );
}

export default App;
