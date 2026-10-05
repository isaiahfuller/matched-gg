import { useEffect, useState } from "react";
import {
  Alert, Anchor, Badge, Button, Card, Center, Container, Group,
  Image, Loader, Pagination, Select, SimpleGrid, Stack, Text, TextInput, Title,
} from "@mantine/core";

interface LibraryGame {
  appid: number;
  name?: string;
  playtime_forever: number;
}

const PAGE_SIZE = 24;
const gameName = (game: LibraryGame) => game.name || `Steam game ${game.appid}`;

export default function Library() {
  const [games, setGames] = useState<LibraryGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<string | null>("name");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const controller = new AbortController();
    async function loadLibrary() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("/steam/getOwnedGames", { signal: controller.signal });
        if (!response.ok) throw new Error("Unable to load your library. Check that your Steam account is connected and your game details are public.");
        const data = await response.json();
        if (!Array.isArray(data)) throw new Error("Your library could not be loaded. Please try again.");
        if (!controller.signal.aborted) setGames(data);
      } catch (cause) {
        if (!controller.signal.aborted) setError(cause instanceof Error ? cause.message : "Your library could not be loaded.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    loadLibrary();
    return () => controller.abort();
  }, [attempt]);

  const filtered = games
    .filter((game) => gameName(game).toLowerCase().includes(search.trim().toLowerCase()))
    .sort((a, b) => sort === "playtime"
      ? b.playtime_forever - a.playtime_forever || gameName(a).localeCompare(gameName(b))
      : gameName(a).localeCompare(gameName(b)));

  return (
    <Container size="lg">
      <Stack gap="lg">
        <div>
          <Title order={1} size="h2">Your library</Title>
          <Text c="dimmed">Browse the games you own on Steam.</Text>
        </div>
        {loading ? <Center py="xl"><Loader aria-label="Loading library" /></Center> : error ? (
          <Alert color="red" title="Library unavailable" role="alert">
            <Stack align="flex-start">
              <Text>{error}</Text>
              <Button onClick={() => setAttempt((value) => value + 1)}>Try again</Button>
            </Stack>
          </Alert>
        ) : games.length === 0 ? (
          <Text c="dimmed">No games found in your Steam library yet.</Text>
        ) : (
          <>
            <Group align="flex-end">
              <TextInput label="Search your library" placeholder="Search games" value={search}
                onChange={(event) => { setSearch(event.currentTarget.value); setPage(1); }} style={{ flex: 1, minWidth: 200 }} />
              <Select label="Sort by" value={sort} allowDeselect={false}
                data={[{ value: "name", label: "Name" }, { value: "playtime", label: "Most played" }]}
                onChange={(value) => { setSort(value); setPage(1); }} />
            </Group>
            <Text size="sm" c="dimmed">{filtered.length} of {games.length} games</Text>
            {filtered.length === 0 ? <Text>No games match your search.</Text> : (
              <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }}>
                {filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map((game) => (
                  <Card key={game.appid} withBorder padding="md" radius="md">
                    <Card.Section>
                      <Image src={`https://cdn.akamai.steamstatic.com/steam/apps/${game.appid}/header.jpg`}
                        alt={gameName(game)} h={140} fit="cover" loading="lazy" />
                    </Card.Section>
                    <Stack gap="xs" mt="md">
                      <Anchor href={`https://store.steampowered.com/app/${game.appid}`} target="_blank" rel="noopener noreferrer" fw={600}>
                        {gameName(game)}
                      </Anchor>
                      <Badge variant="light" w="fit-content">
                        {game.playtime_forever > 0 ? `${(game.playtime_forever / 60).toFixed(1)} hours played` : "Not played yet"}
                      </Badge>
                    </Stack>
                  </Card>
                ))}
              </SimpleGrid>
            )}
            {filtered.length > PAGE_SIZE && <Pagination total={Math.ceil(filtered.length / PAGE_SIZE)} value={page} onChange={setPage} />}
          </>
        )}
      </Stack>
    </Container>
  );
}
