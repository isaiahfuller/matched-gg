import { useEffect, useState } from "react";
import { Container, Flex } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
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
      <Flex>
        <Sidebar isLoggedIn={isLoggedIn} h={height} />

        <Container
          h={height}
          bg="rgb(16, 17, 19)"
          w="100%"
          style={{
            overflowY: "scroll",
          }}
          fluid
        >
          <GamePage game={persona3reload} />
          <GamePage game={persona4} />
        </Container>
      </Flex>
    </>
  );
}

export default App;
