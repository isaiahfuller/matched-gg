import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiscord,
  faPlaystation,
  faSteam,
  faXbox,
} from "@fortawesome/free-brands-svg-icons";

import {
  Button,
  Center,
  Divider,
  Flex,
  Paper,
  PasswordInput,
  SimpleGrid,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";

import classes from "./Login.module.css";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import { useViewportSize } from "@mantine/hooks";
import { matches, useForm } from "@mantine/form";
import { useState } from "react";

export default function Login({ initSignup }: { initSignup: boolean }) {
  const [signup, setSignup] = useState(initSignup);
  const { width, height } = useViewportSize();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      name: "",
      password: "",
      passwordConfirm: "",
    },

    validate: {
      email: (value) =>
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          value
        )
          ? null
          : "Invalid email",
      name: (value) => (value.length > 2 ? null : "Invalid name"),
      password: matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-])(?=.*?.).{8,}$/m,
        "Invalid password"
      ),
      passwordConfirm: (value: string): string | null =>
        value === form.getValues().password ? null : "Passwords do not match",
    },
  });

  async function handleSubmit() {
    const { name, email, password } = form.getValues();
    const body = JSON.stringify({
      user: {
        email: email,
        name: name,
        password: password,
      },
    });
    // works
    if (signup) {
      const res = await fetch("/local/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });
      const ret = await res.json();
      console.log(ret);
    }
  }

  return (
    <Center h={height}>
      <Paper shadow="xs" px={24} py={18} withBorder>
        <Title order={1} size="h2" lh={2}>
          Sup Gamer?
        </Title>
        <Title order={2} size="h5" lh={2}>
          {!signup ? "Login with your provider" : "Create an account"}
        </Title>
        {!signup ? (
          <>
            <SimpleGrid cols={width < 768 ? 1 : 2} spacing="xs" py={8}>
              <Button
                variant="filled"
                classNames={{ root: classes.button }}
                color="rgba(47,45,46,1)"
                leftSection={<FontAwesomeIcon icon={faGamepad} />}
              >
                Epic Games
              </Button>
              <a href="/steam/auth">
                <Button
                  variant="filled"
                  classNames={{ root: classes.button }}
                  color="rgba(27,40,56,1)"
                  leftSection={<FontAwesomeIcon icon={faSteam} />}
                >
                  Steam
                </Button>
              </a>
              <Button
                variant="filled"
                classNames={{ root: classes.button }}
                color="rgba(16,124,16,1)"
                leftSection={<FontAwesomeIcon icon={faXbox} />}
              >
                Xbox
              </Button>
              <Button
                variant="filled"
                classNames={{ root: classes.button }}
                color="rgba(0,111,205,1)"
                leftSection={<FontAwesomeIcon icon={faPlaystation} />}
              >
                PlayStation
              </Button>
              <Button
                variant="filled"
                classNames={{ root: classes.button }}
                color="rgba(221,32,32,1)"
                leftSection={<FontAwesomeIcon icon={faGamepad} />}
              >
                Nintendo
              </Button>
              <Button
                variant="filled"
                classNames={{ root: classes.button }}
                color="rgba(88,101,242,1)"
                leftSection={<FontAwesomeIcon icon={faDiscord} />}
              >
                Discord
              </Button>
            </SimpleGrid>
            <Divider
              my="xs"
              label="Or sign up with email"
              labelPosition="center"
            />
          </>
        ) : null}

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            {signup ? (
              <TextInput
                label="Name"
                withAsterisk
                placeholder="John Gamer"
                key={form.key("name")}
                {...form.getInputProps("name")}
              />
            ) : null}
            <TextInput
              label="Email"
              withAsterisk
              placeholder="matched@matched.gg"
              key={form.key("email")}
              {...form.getInputProps("email")}
            />
            <PasswordInput
              label="Password"
              withAsterisk
              placeholder="Your password"
              key={form.key("password")}
              {...form.getInputProps("password")}
            />
            {signup ? (
              <PasswordInput
                label="Confirm password"
                withAsterisk
                placeholder="Confirm your password"
                key={form.key("passwordConfirm")}
                {...form.getInputProps("passwordConfirm")}
              />
            ) : null}
            <Flex direction="row-reverse">
              <Flex>
                <Button
                  variant="light"
                  mx={8}
                  onClick={() => setSignup(!signup)}
                >
                  {!signup ? "Sign up" : "Login"}
                </Button>
                <Button variant="light" type="submit">
                  {signup ? "Sign up" : "Login"}
                </Button>
              </Flex>
            </Flex>
          </Stack>
        </form>
      </Paper>
    </Center>
  );
}
