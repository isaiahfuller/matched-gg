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
import GamePage from "./components/GamePage/GamePage";
import { persona3reload, persona4 } from "./mockGames";
import logo from "./assets/logo.svg";
import {
  faArrowsRotate,
  faChevronRight,
  faGamepad,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp, faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [_page, setPage] = useState(0);
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
        if (res.profileurl) {
          console.log(res);
          setProfile(res);
          localStorage.setItem("steam-profile", JSON.stringify(res));
          setIsLoggedIn(true);
        }
      });
  }, []);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, idx: number) {
    e.preventDefault();
    setPage(idx);
  }

  return (
    <AppShell
      navbar={{ width: 250, breakpoint: "sm", collapsed: { mobile: !opened } }}
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
          <Center p={8}>
            {width < 768 && opened ? (
              <Burger opened={opened} onClick={toggle} />
            ) : null}
            <img src={logo} />
            <Text fw={500} size="xl" px={8}>
              matched.gg
            </Text>
          </Center>
          <Divider mx="md" />
          <Stack h="100%" justify="center" p={8}>
            <NavLink
              href="#"
              label="Recommendations"
              onClick={(e) => handleClick(e, 0)}
              rightSection={<FontAwesomeIcon icon={faChevronRight} />}
              leftSection={<FontAwesomeIcon icon={faGamepad} />}
            />
            <NavLink
              href="#"
              label="Previously recommended"
              onClick={(e) => handleClick(e, 1)}
              rightSection={<FontAwesomeIcon icon={faChevronRight} />}
              leftSection={<FontAwesomeIcon icon={faThumbsUp} />}
            />
            <NavLink
              href="#"
              label="Sync your libraries"
              onClick={(e) => handleClick(e, 2)}
              rightSection={<FontAwesomeIcon icon={faChevronRight} />}
              leftSection={<FontAwesomeIcon icon={faArrowsRotate} />}
            />
          </Stack>
          <Divider mx="md" />
          <Stack p={8}>
            {isLoggedIn ? (
              <Menu position="left-end">
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
                href="/steam/auth"
                label="Login"
                leftSection={<FontAwesomeIcon icon={faUser} />}
              />
            )}
          </Stack>
        </Flex>
      </AppShell.Navbar>
      <AppShell.Main bg="rgb(16, 17, 19)">
        <GamePage game={persona3reload} />
        <GamePage game={persona4} />
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
