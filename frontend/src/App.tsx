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
              disabled={page === 0 ? true : false}
              href="#"
              label="Recommendations"
              onClick={(e) => handleClick(e, 1)}
              rightSection={<FontAwesomeIcon icon={faChevronRight} size="sm" />}
              leftSection={<FontAwesomeIcon icon={faGamepad} />}
              active={page === 1}
            />
            <NavLink
              disabled={page === 0 ? true : false}
              href="#"
              label="Previously recommended"
              onClick={(e) => handleClick(e, 2)}
              rightSection={<FontAwesomeIcon icon={faChevronRight} size="sm" />}
              leftSection={<FontAwesomeIcon icon={faThumbsUp} />}
              active={page === 2}
            />
            <NavLink
              disabled={page === 0 ? true : false}
              href="#"
              label="Sync your libraries"
              onClick={(e) => handleClick(e, 3)}
              rightSection={<FontAwesomeIcon icon={faChevronRight} size="sm" />}
              leftSection={<FontAwesomeIcon icon={faArrowsRotate} />}
              active={page === 3}
            />
          </Stack>
          <Divider />
          <Stack p={8}>
            {isLoggedIn ? (
              <Menu
                position={width < 768 ? "top" : "left-end"}
                disabled={page === 0 ? true : false}
                offset={28}
              >
                <Menu.Target>
                  <UserButton
                    name="Place Holder"
                    email="placeholder@example.com"
                    image="https://placehold.co/36"
                    width={width < 768 ? width - 28 : 222}
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
        {page !== 0 ? <Search /> : null}
        <Pages page={page} />
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
