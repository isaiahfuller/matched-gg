import { Button, Center, Paper, Stack, Text, Title } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";

export default function Settings() {
  const { height } = useViewportSize();
  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      const res = await fetch("/local/auth/delete", {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Account deleted successfully.");
        window.location.href = "/";
      } else {
        alert("Failed to delete account. Please try again later.");
      }
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
