import { Box, Button, Flex } from "@mantine/core";

interface NavbarProps {
  isLoggedIn: boolean;
}

export default function Navbar({ isLoggedIn }: NavbarProps) {
  return (
    <Flex justify="space-around">
      <Box>G4MR</Box>
      <Box></Box>
      <Box>
        {isLoggedIn ? (
          <Button disabled>Logout</Button>
        ) : (
          <a href="/auth/steam">
            <Button>Login</Button>
          </a>
        )}
      </Box>
    </Flex>
  );
}
