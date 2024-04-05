import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [_profile, setProfile] = useState(null)
  
  useEffect(() => {
    fetch("auth/steam/valid", {
      method: "POST",
      headers: {'Content-Type': "application/json"},
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if(res.profile){
          setProfile(res)
          localStorage.setItem("steam-profile", JSON.stringify(res))
          setIsLoggedIn(true)
        }
      });
  }, []);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
    </>
  );
}

export default App;
