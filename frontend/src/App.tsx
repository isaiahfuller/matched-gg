import { useEffect, useState } from "react";
import {
  AppShell,
  Burger,
  Center,
  Divider,
  Flex,
  Group,
  Menu,
  NavLink,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import logo from "./assets/logo.svg";
import {
  faArrowsRotate,
  faChevronRight,
  faGamepad,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp, faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Recommendations from "./components/Recommendations/Recommendations";
import Login from "./components/Login/Login";
import Search from "./components/Search/Search";

function Pages({ page }: { page: number }) {
  switch (page) {
    case 1:
      return <Recommendations />;
    case 2:
      return <Text>Previously recommended</Text>;
    case 3:
      return <Text>Sync your libraries</Text>;
    default:
      return <Login />;
  }
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [page, setPage] = useState(0);
  const [_profile, setProfile] = useState(null);
  const { width } = useViewportSize();
  const [opened, { toggle }] = useDisclosure();

  useEffect(() => {
    fetch("steam/valid", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if ("steamid" in res) {
          setProfile(res);
          localStorage.setItem("steam-profile", JSON.stringify(res));
          setIsLoggedIn(true);
          setPage(1);
        }
      });
  }, []);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, idx: number) {
    e.preventDefault();
    setPage(idx);
  }

  async function getGames() {
    const games = await fetch("/steam/getOwnedGames");
    console.log(await games.json());
  }

  return (
    <AppShell
      navbar={{ width: 250, breakpoint: "sm", collapsed: { mobile: !opened } }}
      header={width < 768 ? { height: 50 } : { height: 0 }}
      padding="md"
    >
      {width < 768 ? (
        <AppShell.Header>
          <Group p={8}>
            <Burger opened={opened} onClick={toggle} />
            <img src={logo} />
            <Text fw={500} size="xl">
              matched.gg
            </Text>
          </Group>
        </AppShell.Header>
      ) : null}
      <AppShell.Navbar>
        <Flex direction="column" justify="space-between" h="100%">
          {width >= 768 ? (
            <Center p={8}>
              <img src={logo} />
              <Text fw={500} size="xl" px={8}>
                matched.gg
              </Text>
            </Center>
          ) : null}
          <Stack h="100%" justify="center" p={8}>
            <NavLink
              disabled={page === 0 ? true : false}
              href="#"
              label="Recommendations"
              onClick={(e) => handleClick(e, 1)}
              rightSection={<FontAwesomeIcon icon={faChevronRight} />}
              leftSection={<FontAwesomeIcon icon={faGamepad} />}
            />
            <NavLink
              disabled={page === 0 ? true : false}
              href="#"
              label="Previously recommended"
              onClick={(e) => handleClick(e, 2)}
              rightSection={<FontAwesomeIcon icon={faChevronRight} />}
              leftSection={<FontAwesomeIcon icon={faThumbsUp} />}
            />
            <NavLink
              disabled={page === 0 ? true : false}
              href="#"
              label="Sync your libraries"
              onClick={(e) => handleClick(e, 3)}
              rightSection={<FontAwesomeIcon icon={faChevronRight} />}
              leftSection={<FontAwesomeIcon icon={faArrowsRotate} />}
            />
          </Stack>
          <Divider mx="md" />
          <Stack p={8}>
            {isLoggedIn ? (
              <Menu
                position={width < 768 ? "top" : "left-end"}
                disabled={page === 0 ? true : false}
              >
                <Menu.Target>
                  <NavLink
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    label="placeholder"
                    rightSection={<FontAwesomeIcon icon={faChevronRight} />}
                    leftSection={<FontAwesomeIcon icon={faUser} />}
                  />
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item onClick={getGames}>owned</Menu.Item>
                  <Menu.Label>Actions</Menu.Label>
                  <Menu.Item
                    leftSection={<FontAwesomeIcon icon={faArrowsRotate} />}
                  >
                    Change Account
                  </Menu.Item>
                  <Menu.Item
                    leftSection={<FontAwesomeIcon icon={faRightFromBracket} />}
                  >
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ) : (
              <NavLink
                disabled={page === 0 ? true : false}
                href="/steam/auth"
                label="Logged out"
                leftSection={<FontAwesomeIcon icon={faUser} />}
              />
            )}
          </Stack>
        </Flex>
      </AppShell.Navbar>
      <AppShell.Main bg="rgb(16, 17, 19)">
        <Search />
        <Pages page={page} />
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
