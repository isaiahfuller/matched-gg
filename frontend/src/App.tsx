import { forwardRef, useEffect, useState } from "react";
import {
  AppShell,
  Avatar,
  Box,
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
  UnstyledButton,
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
import Recommendations from "./components/Recommendations/Recommendations";
import Login from "./components/Login/Login";
import Search from "./components/Search/Search";
import { Tokens, User } from "./interfaces";
import { generateSHA256Hash } from "./util/generateSha256Hash";

function Pages({
  page,
  setTokens,
}: {
  page: string;
  tokens: Tokens;
  setTokens: (arg: Tokens) => void;
}) {
  switch (page) {
    case "recommendations":
      return <Recommendations />;
    case "previous":
      return <Text>Previously recommended</Text>;
    case "sync":
      return <Text>Sync your libraries</Text>;
    case "signup":
    case "login":
    default:
      return <Login initSignup={page === "signup"} setTokens={setTokens} />;
  }
}
interface UserButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  image: string;
  name: string;
  email: string;
  width: number;
  icon?: React.ReactNode;
}
const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ image, name, email, width, icon, ...others }: UserButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      style={{
        color: "var(--mantine-color-text)",
        borderRadius: "var(--mantine-radius-sm)",
      }}
      {...others}
      py={16}
      w={width}
    >
      <Flex justify="space-between" align="center">
        <Avatar src={image} radius="xl" />

        <Box style={{ flex: 1 }} px={8} w={75}>
          <Text size="sm" fw={500} truncate="end">
            {name}
          </Text>

          <Text c="dimmed" size="xs" truncate="end">
            {email}
          </Text>
        </Box>

        {icon || <FontAwesomeIcon icon={faChevronRight} size="sm" />}
      </Flex>
    </UnstyledButton>
  )
);

function refreshAccessToken(
  refreshToken: string,
  isLoggedIn: boolean,
  setIsLoggedIn: (arg: boolean) => void,
  setTokens: (arg: Tokens) => void,
  setPage: (arg: string) => void
) {
  const opt = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${refreshToken}`,
      "Content-Type": "application/json",
      body: JSON.stringify({
        refresh_token: refreshToken,
      }),
    },
  };
  fetch("auth/refresh", opt)
    .then((r) => {
      if (![200, 201].includes(r.status)) {
        throw new Error(r.status + "");
      }
      return r.json();
    })
    .then((res) => {
      localStorage.setItem("tokens", JSON.stringify(res));
      setTokens(res);
      if (!isLoggedIn) {
        setIsLoggedIn(true);
      }
    })
    .catch(() => {
      setIsLoggedIn(false);
      setTokens({ access_token: "", refresh_token: "" });
      localStorage.clear();
      setPage("login");
    });
}
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User>({
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "",
    email: "",
    id: 0,
    steamId: 0,
  });
  const [gravatarUrl, setGravatarUrl] = useState("");
  const [page, setPage] = useState("login");
  const [loading, setLoading] = useState(true);
  const { width, height } = useViewportSize();
  const [opened, { toggle }] = useDisclosure();
  const [tokens, setTokens] = useState<Tokens>(() => {
    if (localStorage.getItem("tokens"))
      return (
        JSON.parse(localStorage.getItem("tokens")!) || {
          access_token: "",
          refresh_token: "",
        }
      );
  });

  useEffect(() => {
    if (tokens && tokens.access_token.length) {
      const opt = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      };
      fetch("/verify", opt)
        .then((r) => {
          if (![200, 201].includes(r.status)) {
            throw new Error(r.status + "");
          }
          return r.json();
        })
        .then(() => {
          fetch("profile", opt)
            .then((r) => {
              if (![200, 201].includes(r.status)) {
                throw new Error(r.status + "");
              }
              return r.json();
            })
            .then((res) => {
              if (!res || !res.email) throw new Error("No profile received");
              setIsLoggedIn(true);
              setUser(res);
              generateSHA256Hash(res.email).then((hash) => {
                setGravatarUrl(`https://gravatar.com/avatar/${hash}`);
              });
              if (page === "login") setPage("recommendations");
            })
            .catch(() => {
              refreshAccessToken(
                tokens.refresh_token,
                isLoggedIn,
                setIsLoggedIn,
                setTokens,
                setPage
              );
            })
            .finally(() => {
              setLoading(false);
            });
        })
        .catch(() => {
          refreshAccessToken(
            tokens.refresh_token,
            isLoggedIn,
            setIsLoggedIn,
            setTokens,
            setPage
          );
        });
    } else {
      setLoading(false);
    }
  }, [tokens, page, isLoggedIn]);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, idx: string) {
    e.preventDefault();
    setPage(idx);
  }

  async function getGames() {
    const games = await fetch("/steam/getOwnedGames");
    console.log(await games.json());
  }
  if (loading)
    return (
      <Center h={height}>
        <Loader />
      </Center>
    );
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
              disabled={["login", "signup"].includes(page)}
              href="#"
              label="Recommendations"
              onClick={(e) => handleClick(e, "recommendations")}
              rightSection={<FontAwesomeIcon icon={faChevronRight} size="sm" />}
              leftSection={<FontAwesomeIcon icon={faGamepad} />}
              active={page === "recommendations"}
            />
            <NavLink
              disabled={["login", "signup"].includes(page)}
              href="#"
              label="Previously recommended"
              onClick={(e) => handleClick(e, "previous")}
              rightSection={<FontAwesomeIcon icon={faChevronRight} size="sm" />}
              leftSection={<FontAwesomeIcon icon={faThumbsUp} />}
              active={page === "previous"}
            />
            <NavLink
              disabled={["login", "signup"].includes(page)}
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
                disabled={page === "login" ? true : false}
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
                        gravatarUrl ? gravatarUrl : "https://placehold.co/36"
                      }
                      width={width < 768 ? width - 28 : 222}
                    />
                  )}
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
                disabled={["login", "signup"].includes(page)}
                href="/steam/auth"
                label="Logged out"
                leftSection={<FontAwesomeIcon icon={faUser} />}
              />
            )}
          </Stack>
        </Flex>
      </AppShell.Navbar>
      <AppShell.Main bg="rgb(16, 17, 19)">
        {["login", "signup"].includes(page) ? null : <Search />}
        <Pages page={page} tokens={tokens} setTokens={setTokens} />
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
