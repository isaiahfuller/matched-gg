import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import GamePage from "./components/GamePage/GamePage";
import { persona3reload, persona4 } from "./mockGames";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [_profile, setProfile] = useState(null);

  useEffect(() => {
    fetch("steam/valid", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.profileurl) {
          setProfile(res);
          localStorage.setItem("steam-profile", JSON.stringify(res));
          setIsLoggedIn(true);
        }
      });
  }, []);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      <GamePage game={persona3reload} />
      <GamePage game={persona4} />
    </>
  );
}

export default App;
