import { faSteam } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  Button,
  Center,
  Container,
  Flex,
  Loader,
  Text,
} from "@mantine/core";
import { useEffect, useState } from "react";

interface SteamProfile {
  avatar: string;
  createdAt: string;
  personaname: string;
  url: string;
}

export default function Sync() {
  const [syncLoading, setSyncLoading] = useState<boolean>(false);
  const [steam, setSteam] = useState<SteamProfile>();
  const [steamCount, setSteamCount] = useState(-1);

  useEffect(() => {
    fetch("profile", {
      method: "POST",
    })
      .then((r) => r.json())
      .then((r) => {
        setSteam(r.steam);
      });
    fetch("/steam/getOwnedGames")
      .then((r) => r.json())
      .then((r) => setSteamCount(r.length));
  }, []);

  async function processSteamLibrary() {
    setSyncLoading(true);
    const res = await fetch("/steam/processLibrary");
    const library = await res.json();
    setSyncLoading(false);
    return library;
  }

  return (
    <Container maw="66%">
      {steam && steamCount >= 0 ? (
        <>
          <Flex align="center" justify="space-between">
            <Flex align="center" gap={4}>
              <FontAwesomeIcon icon={faSteam} size="xl" />
              <Avatar src={`${steam.avatar}`} radius={0} />
              <Text span>{steam.personaname}</Text>
            </Flex>
            <Flex align="center" gap={4}>
              <Text span hidden={syncLoading}>
                {steamCount} games
              </Text>
              <Button
                variant="outline"
                onClick={processSteamLibrary}
                loading={syncLoading}
              >
                Sync
              </Button>
            </Flex>
          </Flex>
        </>
      ) : (
        <Center>
          <Loader p={24} />
        </Center>
      )}
    </Container>
  );
}
