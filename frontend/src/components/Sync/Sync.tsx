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
  name: string;
  url: string;
}

export default function Sync() {
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
  if (!steam) return;
  <Center>
    <Loader p={24} />
  </Center>;
  return (
    <Container maw="66%">
      <Flex align="center" justify="space-between">
        <Flex align="center" gap={4}>
          <FontAwesomeIcon icon={faSteam} size="xl" />
          <Avatar
            src={`https://avatars.steamstatic.com/${steam.avatar}.jpg`}
            radius={0}
          />
          <Text span>{steam.name}</Text>
        </Flex>
        <Flex align="center" gap={4}>
          <Text span hidden={syncLoading || steamCount === -1}>
            {steamCount} games
          </Text>
          {steamCount !== -1 ? null : (
            <Button
              variant="outline"
              onClick={processSteamLibrary}
              loading={syncLoading}
              disabled={steamCount !== -1}
            >
              Sync
            </Button>
          )}
        </Flex>
      </Flex>
    </Container>
  );
}
