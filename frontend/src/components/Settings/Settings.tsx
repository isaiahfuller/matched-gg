import { Button, Center, Paper, Stack, Text, Title } from "@mantine/core";
import { User } from "../../interfaces";
import { useViewportSize } from "@mantine/hooks";

interface SettingsProps {
  user: User;
  setUser?: (arg: User) => void;
}

export default function Settings({ user }: SettingsProps) {
  const { height } = useViewportSize();
  // Handler for deleting the account
  const handleDeleteAccount = () => {
    // TODO: Implement actual delete logic (API call, confirmation, etc.)
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      console.log("Account deletion requested for:", user.email);
      // Place API call or logic here
    }
  };

  return (
    <Center h={height * 0.9}>
      <Paper shadow="xs" px={24} py={18} withBorder>
        <Stack>
          <Title order={1} size="h2" lh={2}>
            Delete Account
          </Title>
          <Text c="red" mb="md">
            Warning: Deleting your account is permanent and cannot be undone.
          </Text>
          <Button color="red" variant="filled" onClick={handleDeleteAccount}>
            Delete Account
          </Button>
        </Stack>
      </Paper>
    </Center>
  );
}
