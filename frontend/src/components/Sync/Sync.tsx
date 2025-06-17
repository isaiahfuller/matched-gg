import { faSteam } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  Button,
  Center,
  Divider,
  Flex,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { SteamProfile } from "../../interfaces";

export default function Sync() {
  const { height } = useViewportSize();
  const [syncLoading, setSyncLoading] = useState<boolean>(false);
  const [steam, setSteam] = useState<SteamProfile>();
  const [steamCount, setSteamCount] = useState<number>(-1);

  useEffect(() => {
    fetch("profile", {
      method: "POST",
    })
      .then((r) => r.json())
      .then((r) => {
        setSteam(r.steam);
      });
  }, []);

  async function processSteamLibrary() {
    setSyncLoading(true);
    const res = await fetch("/steam/processLibrary");
    const library = await res.json();
    console.log(library);
    setSteamCount(library.length);
    setSyncLoading(false);
    return library;
  }
  if (!steam)
    return (
      <Center className="centered">
        <Loader p={24} />
      </Center>
    );
  return (
    <Center h={height * 0.9}>
      <Paper shadow="xs" px={24} py={18} withBorder>
        <Title order={1} size="h2" lh={2}>
          Link your accounts
        </Title>
        <Title order={2} size="h5" lh={2}>
          For login and libraries
        </Title>
        <Stack>
          <Divider
            label={
              <>
                <Text>
                  <FontAwesomeIcon icon={faSteam} size="xl" /> Steam
                </Text>
              </>
            }
            labelPosition="left"
          />
          <Flex justify="space-between" align="center">
            <a href={steam.url} target="_blank">
              {steam ? (
                <Group>
                  <Avatar src={`${steam.avatar}`} radius={0} />
                  <Text>{steam.personaname}</Text>
                </Group>
              ) : (
                "Not connected"
              )}
            </a>{" "}
            <Text span hidden={syncLoading || !steamCount || steamCount === -1}>
              {steamCount} games
            </Text>
            {steamCount > -1 ? null : (
              <Button
                variant="outline"
                onClick={processSteamLibrary}
                loading={syncLoading}
                disabled={steamCount > -1}
              >
                Sync
              </Button>
            )}
            {steam ? null : (
              <a
                href="steam/auth"
                onClick={() => localStorage.setItem("sync", "s")}
              >
                <Button variant="outline">Link</Button>
              </a>
            )}
          </Flex>
        </Stack>
      </Paper>
    </Center>
  );
}
