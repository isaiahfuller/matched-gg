import { useEffect, useState } from "react";
import {
  Alert, Anchor, Badge, Button, Card, Center, Container, Group,
  Image, Loader, Pagination, Select, SimpleGrid, Stack, Text, TextInput, Title,
} from "@mantine/core";

import { IGDBGame } from "../../interfaces";

interface Recommendation {
  game: IGDBGame;
}

const PAGE_SIZE = 24;
const gameName = (game: IGDBGame) => game.name || "Untitled game";

export default function PreviousRecommendations() {
  const [games, setGames] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<string | null>("name");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const controller = new AbortController();
    async function loadRecommendations() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("/games/getPreviousRecommendations", { signal: controller.signal });
        if (!response.ok) throw new Error("Unable to load your previous recommendations. Please try again.");
        const data = await response.json();
        if (!Array.isArray(data)) throw new Error("Your recommendations could not be loaded. Please try again.");
        if (!controller.signal.aborted) setGames(data);
      } catch (cause) {
        if (!controller.signal.aborted) setError(cause instanceof Error ? cause.message : "Your recommendations could not be loaded.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    loadRecommendations();
    return () => controller.abort();
  }, [attempt]);

  const filtered = games
    .filter(({ game }) => gameName(game).toLowerCase().includes(search.trim().toLowerCase()))
    .sort((a, b) => sort === "rating"
      ? (b.game.rating ?? -1) - (a.game.rating ?? -1) || gameName(a.game).localeCompare(gameName(b.game))
      : gameName(a.game).localeCompare(gameName(b.game)));

  return (
    <Container size="lg">
      <Stack gap="lg">
        <div>
          <Title order={1} size="h2">Previously recommended</Title>
          <Text c="dimmed">Rediscover games recommended for you.</Text>
        </div>
        {loading ? <Center py="xl"><Loader aria-label="Loading recommendations" /></Center> : error ? (
          <Alert color="red" title="Recommendations unavailable" role="alert">
            <Stack align="flex-start">
              <Text>{error}</Text>
              <Button onClick={() => setAttempt((value) => value + 1)}>Try again</Button>
            </Stack>
          </Alert>
        ) : games.length === 0 ? (
          <Text c="dimmed">No recommendations yet!</Text>
        ) : (
          <>
            <Group align="flex-end">
              <TextInput label="Search your recommendations" placeholder="Search games" value={search}
                onChange={(event) => { setSearch(event.currentTarget.value); setPage(1); }} style={{ flex: 1, minWidth: 200 }} />
              <Select label="Sort by" value={sort} allowDeselect={false}
                data={[{ value: "name", label: "Name" }, { value: "rating", label: "Highest rated" }]}
                onChange={(value) => { setSort(value); setPage(1); }} />
            </Group>
            <Text size="sm" c="dimmed">{filtered.length} of {games.length} games</Text>
            {filtered.length === 0 ? <Text>No games match your search.</Text> : (
              <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }}>
                {filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map(({ game }, index) => (
                  <Card key={game.id ?? game.igdbId ?? index} withBorder padding="md" radius="md">
                    <Card.Section>
                      {game.cover?.imageId ? (
                        <Image src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.imageId}.jpg`}
                          alt={gameName(game)} h={140} fit="contain" loading="lazy" />
                      ) : (
                        <Center h={140} bg="dark.6"><Text c="dimmed">No cover available</Text></Center>
                      )}
                    </Card.Section>
                    <Stack gap="xs" mt="md">
                      {game.url ? (
                        <Anchor href={game.url} target="_blank" rel="noopener noreferrer" fw={600}>
                          {gameName(game)}
                        </Anchor>
                      ) : <Text fw={600}>{gameName(game)}</Text>}
                      {game.summary && <Text size="sm" c="dimmed" lineClamp={3}>{game.summary}</Text>}
                      <Badge variant="light" w="fit-content">
                        {game.rating != null ? `${Math.round(game.rating)}% user rating` : "Not rated yet"}
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
