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

export default function Login() {
  const { width, height } = useViewportSize();
  return (
    <Center h={height}>
      <Paper shadow="xs" px={24} py={18} withBorder>
        <Title order={1} size="h2" lh={2}>
          Sup Gamer?
        </Title>
        <Title order={2} size="h5" lh={2}>
          Login with your provider
        </Title>
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
        <Divider my="xs" label="Or sign up with email" labelPosition="center" />
        <form>
          <Stack>
            <TextInput
              label="Email"
              withAsterisk
              placeholder="matched@matched.gg"
            />
            <PasswordInput
              label="Password"
              withAsterisk
              placeholder="Your password"
            />
            <Button fullWidth variant="light">
              Login
            </Button>
          </Stack>
        </form>
      </Paper>
    </Center>
  );
}
