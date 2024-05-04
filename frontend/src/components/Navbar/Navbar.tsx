import { Box, Button, Flex, useMantineColorScheme } from "@mantine/core";
import { useEffect } from "react";
interface NavbarProps {
  isLoggedIn: boolean;
}

export default function Navbar({ isLoggedIn }: NavbarProps) {
  const { toggleColorScheme, colorScheme } = useMantineColorScheme();
  useEffect(() => {
    console.log(colorScheme);
  }, [colorScheme]);
  async function owned() {
    const games = await fetch("/steam/getOwnedGames").then((res) => res.json());
    console.log(games);
  }
  return (
    <Flex justify="space-around" p={8}>
      <Box>G4MR</Box>
      <Box></Box>
      <Box>
        <Button onClick={toggleColorScheme}>toggle</Button>
        {isLoggedIn ? (
          <>
            <Button disabled>Logout</Button>
            <Button onClick={owned}>test</Button>
          </>
        ) : (
          <a href="/steam/auth">
            <Button>Login</Button>
          </a>
        )}
      </Box>
    </Flex>
  );
}
