import { useEffect, useState } from "react";
import {
  AppShell,
  Burger,
  Center,
  Divider,
  Image,
  Flex,
  Group,
  Menu,
  NavLink,
  Stack,
  Text,
  Loader,
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
import { User } from "./interfaces";
import Pages from "./components/Pages/Pages";
import { UserButton } from "./components/elements/UserButton";
import { blankUser } from "./constants";
import Search from "./components/Search/Search";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User>(blankUser);
  const [page, setPage] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const { width } = useViewportSize();
  const [opened, { toggle }] = useDisclosure();

  useEffect(() => {
    async function onLoad() {
      setLoading(true);
      const opt = {
        method: "POST",
      };
      try {
        const r = await fetch("/verify", opt);
        if (![200, 201].includes(r.status)) {
          throw new Error(r.status + "");
        }
        const res = await r.json();
        console.log(res);
        setIsLoggedIn(true);
        if (!res || !res.profile || !res.profile.id) {
          setPage("login");
          throw new Error("No profile received");
        }
        setUser(res.profile);
        if (localStorage.getItem("sync")) {
          setPage("sync");
          fetch("/steam/processLibrary").then((r) => r.json());
        }
        setLoading(false);
      } catch (e) {
        setIsLoggedIn(false);
        setPage("login");
        setLoading(false);
      }
    }
    onLoad();
  }, []);

  useEffect(() => {
    if (isLoggedIn && ["login", ""].includes(page)) {
      setPage("recommendations");
    }
  }, [isLoggedIn, page]);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, idx: string) {
    e.preventDefault();
    setPage(idx);
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
            <Flex>
              <Image src={logo} w="auto" fit="contain" px={8} />
              <Text fw={500} size="xl">
                matched.gg
              </Text>
            </Flex>
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
              disabled={!isLoggedIn || loading}
              href="#"
              label="Recommendations"
              onClick={(e) => handleClick(e, "recommendations")}
              rightSection={<FontAwesomeIcon icon={faChevronRight} size="sm" />}
              leftSection={<FontAwesomeIcon icon={faGamepad} />}
              active={page === "recommendations"}
            />
            <NavLink
              disabled={!isLoggedIn || loading}
              href="#"
              label="Previously recommended"
              onClick={(e) => handleClick(e, "previous")}
              rightSection={<FontAwesomeIcon icon={faChevronRight} size="sm" />}
              leftSection={<FontAwesomeIcon icon={faThumbsUp} />}
              active={page === "previous"}
            />
            <NavLink
              disabled={!isLoggedIn || loading}
              href="#"
              label="Sync your libraries"
              onClick={(e) => handleClick(e, "sync")}
              rightSection={<FontAwesomeIcon icon={faChevronRight} size="sm" />}
              leftSection={<FontAwesomeIcon icon={faArrowsRotate} />}
              active={page === "sync"}
            />
          </Stack>
          <Divider />
          <Stack p={8}>
            {isLoggedIn ? (
              <Menu
                position={width < 768 ? "top" : "left-end"}
                disabled={!isLoggedIn || loading}
                offset={28}
              >
                <Menu.Target>
                  {!user || !user.name.length ? (
                    <Loader />
                  ) : (
                    <UserButton
                      name={user.name}
                      email={user.email}
                      image={
                        user.steam
                          ? `https://avatars.steamstatic.com/${user.steam.avatar}.jpg`
                          : "https://placehold.co/36"
                      }
                      width={width < 768 ? width - 28 : 222}
                    />
                  )}
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    leftSection={<FontAwesomeIcon icon={faUser} />}
                    onClick={() => setPage("settings")}
                  >
                    Account Settings
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
                disabled={!isLoggedIn || loading}
                href="/steam/auth"
                label="Logged out"
                leftSection={<FontAwesomeIcon icon={faUser} />}
              />
            )}
          </Stack>
        </Flex>
      </AppShell.Navbar>
      <AppShell.Main bg="rgb(16, 17, 19)">
        {loading ? (
          <Center className="centered">
            <Loader />
          </Center>
        ) : (
          <>
            {["login", "signup", "settings", "sync"].includes(page) ? null : (
              <Search />
            )}
            <Pages page={page} user={user} setUser={setUser} />
          </>
        )}
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
