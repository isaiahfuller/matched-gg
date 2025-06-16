import {
  Button,
  Center,
  Checkbox,
  Paper,
  PasswordInput,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { User } from "../../interfaces";
import { matches, useForm } from "@mantine/form";
import { emailRegex, passwordRegex } from "../../constants";
import { useViewportSize } from "@mantine/hooks";
import { useEffect } from "react";

interface SettingsProps {
  user: User;
  setUser?: (arg: User) => void;
}

export default function Settings({ user }: SettingsProps) {
  const { width, height } = useViewportSize();
  const form = useForm({
    mode: "controlled",
    initialValues: {
      email: user.email,
      name: user.name,
      password: "",
      verify: "",
      changeName: false,
      changeEmail: false,
      changePassword: false,
    },
    validate: {
      email: matches(emailRegex, "Invalid email"),
      password: (value: string): string | null =>
        passwordRegex.test(value) || !form.getValues().changePassword
          ? null
          : "Invalid password",
      verify: (value: string): string | null =>
        value === form.getValues().password || !form.getValues().changePassword
          ? null
          : "Passwords do not match",
    },
  });

  useEffect(() => {
    if (localStorage.getItem("settings")) {
      localStorage.removeItem("settings");
    }
  }, []);

  return (
    <Center h={height * 0.9}>
      <Paper shadow="xs" px={24} py={18} withBorder>
        <Stack>
          <Title order={1} size="h2" lh={2}>
            Account Settings
          </Title>
          <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <SimpleGrid cols={width < 768 ? 1 : 2}>
              <Checkbox
                label="Change name:"
                key={form.key("changeName")}
                {...form.getInputProps("changeName", { type: "checkbox" })}
              />
              <TextInput
                key={form.key("name")}
                {...form.getInputProps("name")}
                disabled={!form.getValues().changeName}
              />
              <Checkbox
                label="Change email:"
                key={form.key("changeEmail")}
                {...form.getInputProps("changeEmail", { type: "checkbox" })}
              />
              <TextInput
                key={form.key("email")}
                {...form.getInputProps("email")}
                disabled={!form.getValues().changeEmail}
              />
              <Checkbox
                label="Change password:"
                key={form.key("changePassword")}
                {...form.getInputProps("changePassword", { type: "checkbox" })}
              />
              <PasswordInput
                key={form.key("password")}
                {...form.getInputProps("password")}
                disabled={!form.getValues().changePassword}
              />
              <Text size="sm">Verify password: </Text>
              <PasswordInput
                key={form.key("verify")}
                {...form.getInputProps("verify")}
              />
              <div />
              <Button type="submit" variant="light">
                Submit
              </Button>
            </SimpleGrid>
          </form>
        </Stack>
      </Paper>
    </Center>
  );
}
