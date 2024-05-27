import { useEffect, useState } from "react";
import { Group, ScrollArea } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import Navbar from "./components/Navbar/Navbar";
import GamePage from "./components/GamePage/GamePage";
import { persona3reload, persona4 } from "./mockGames";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [_profile, setProfile] = useState(null);
  const { height } = useViewportSize();

  useEffect(() => {
    fetch("steam/valid", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.profileurl) {
          setProfile(res);
          localStorage.setItem("steam-profile", JSON.stringify(res));
          setIsLoggedIn(true);
        }
      });
  }, []);

  return (
    <>
      <Group>
        <Sidebar isLoggedIn={isLoggedIn} h={height} />

        <ScrollArea.Autosize h={height} scrollbars="y">
          <Navbar isLoggedIn={isLoggedIn} />
          <GamePage game={persona3reload} />
          <GamePage game={persona4} />
        </ScrollArea.Autosize>
      </Group>
    </>
  );
}

export default App;
