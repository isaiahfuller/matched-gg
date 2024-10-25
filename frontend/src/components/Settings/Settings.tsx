import { faSteam } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Checkbox,
  Container,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { User } from "../../interfaces";
import { matches, useForm } from "@mantine/form";
import { emailRegex, passwordRegex } from "../../constants";

interface SettingsProps {
  user: User;
  setUser: (arg: User) => void;
}

export default function Settings({ user, setUser }: SettingsProps) {
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
      password: matches(passwordRegex, "Invalid password"),
      verify: (value: string): string | null =>
        value === form.getValues().password ? null : "Passwords do not match",
    },
  });
  return (
    <Container>
      <Stack>
        <>
          <Title>Account Settings</Title>
          <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <SimpleGrid cols={2}>
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
              <TextInput
                key={form.key("password")}
                {...form.getInputProps("password")}
                disabled={!form.getValues().changePassword}
              />
              <Text size="sm">Verify password: </Text>
              <TextInput
                key={form.key("verify")}
                {...form.getInputProps("verify")}
              />
              <div />
              <Button type="submit" variant="light">
                Submit
              </Button>
            </SimpleGrid>
          </form>
        </>
        <>
          <Title>Connect Accounts</Title>
          <SimpleGrid cols={2}>
            <Text>
              <FontAwesomeIcon icon={faSteam} /> Steam
            </Text>
            <Button variant="light">Connect</Button>
          </SimpleGrid>
        </>
      </Stack>
    </Container>
  );
}
