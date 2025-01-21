import axios from "axios";
// Létrehozunk egy új Axios példányt a create metódus segítségével.
export const myAxios = axios.create({
    // Alap backend API kiszolgáló elérési útjának beállítása
    baseURL: "http://localhost:8000",
    // Beállítjuk, hogy a kérések azonosítása cookie-k segítségével történik.
    withCredentials: true,
});






  // import axios from "axios";

  // //Saját myAxios példány létrehozása és configurálása
  // export const myAxios = axios.create({
  //     baseURL: 'https://fakestoreapi.com',
  //     timeout: 10000,
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });

  export default myAxios;

  myAxios.interceptors.request.use(
    (config) => {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("XSRF-TOKEN="))
        ?.split("=")[1];
      if (token) {
        config.headers["X-XSRF-TOKEN"] = decodeURIComponent(token);
      }
      return config;
    },
    (error) => {
      // Hiba esetén írjuk ki a hibát, vagy végezzünk hibakezelést
      console.error("Request interceptor error:", error);
      return Promise.reject(error);
    }

  );

 