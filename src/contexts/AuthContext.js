import { createContext, useContext, useState } from "react";
import { myAxios } from "./MyAxios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const csrf = () => myAxios.get("/sanctum/csrf-cookie");

  //bejelentkezett felhasználó adatainak lekérdezése
  const getUser = async () => {
    const { data } = await myAxios.get("/api/user");
    console.log(data)
    setUser(data);
  };
  const logout = async () => {
    await csrf();

    myAxios.post("/logout").then((resp) => {
      setUser(null);
      console.log(resp);
    });
  };
  const loginReg = async ({ ...adat }, vegpont) => {
    // lekérjük a csrf tokent
    await csrf();
    console.log(adat, vegpont);
  
    try {
      await myAxios.post(vegpont, adat);
      console.log("siker");
      // sikeres bejelentkezés/regisztráció esetén
      await getUser();
      navigate("/login");
    } catch (error) {
      console.error("Hiba történt:", error);
  
      // Ellenőrizzük, hogy az `error.response` létezik-e
      if (error.response) {
        console.log("Hibás válasz:", error.response);
  
        // Ellenőrizzük, hogy a státuszkód 422-e
        if (error.response.status === 422) {
          setErrors(error.response.data.errors);
        }
      } else {
        // Ha az `error.response` nem létezik, loggoljuk a teljes hibát
        console.error("Nem HTTP hiba történt:", error.message || error);
      }
    }
  };
  

  return (
    <AuthContext.Provider value={{ logout, loginReg, errors, getUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};
export default function useAuthContext() {
  return useContext(AuthContext);
}