import { useEffect, useState } from "react";
import { Alert, Anchor, Button, Card, Center, Container, Group, Loader, Progress, SimpleGrid, Stack, Text, Title } from "@mantine/core";

interface RankedCategory { id: number; name: string; minutes: number; games: number }
interface UserStats {
  totalGames: number;
  playedGames: number;
  unplayedGames: number;
  totalMinutes: number;
  matchedGames: number;
  mostPlayed: { steamId: number; name: string; minutes: number }[];
  genres: RankedCategory[];
  themes: RankedCategory[];
  tags: RankedCategory[];
}
const hours = (minutes: number) => `${(minutes / 60).toLocaleString(undefined, { maximumFractionDigits: 1 })} h`;

function Ranking({ title, items, total }: { title: string; items: RankedCategory[]; total: number }) {
  return <Card withBorder radius="md" padding="lg">
    <Stack>
      <Title order={2} size="h4">{title}</Title>
      {items.length === 0 ? <Text c="dimmed">No category data for your played games yet.</Text> : items.map((item) => (
        <Stack key={item.id} gap={4}>
          <Group justify="space-between"><Text fw={500}>{item.name}</Text><Text size="sm">{hours(item.minutes)}</Text></Group>
          <Progress value={total > 0 ? item.minutes / total * 100 : 0} aria-label={`${item.name} share of total playtime`} />
          <Text size="xs" c="dimmed">{item.games} {item.games === 1 ? "game" : "games"}</Text>
        </Stack>
      ))}
    </Stack>
  </Card>;
}

export default function Stats() {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("/games/stats", { signal: controller.signal });
        if (!response.ok) throw new Error(response.status === 401 ? "Please sign in to view your stats." : "Unable to load your stats. Please try again.");
        const data: UserStats = await response.json();
        if (!controller.signal.aborted) setStats(data);
      } catch (cause) {
        if (!controller.signal.aborted) setError(cause instanceof Error ? cause.message : "Unable to load your stats.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, [attempt]);

  return <Container size="lg"><Stack gap="lg">
    <div><Title order={1} size="h2">Your stats</Title><Text c="dimmed">Your Steam playtime and the kinds of games you spend it on.</Text></div>
    {loading ? <Center py="xl"><Loader aria-label="Loading stats" /></Center> : error ? (
      <Alert color="red" title="Stats unavailable" role="alert"><Stack align="flex-start"><Text>{error}</Text><Button onClick={() => setAttempt((value) => value + 1)}>Try again</Button></Stack></Alert>
    ) : stats && (stats.totalGames === 0 ? (
      <Card withBorder><Text>No synced games yet. Connect your Steam account in Settings, then sync your library to see your stats.</Text></Card>
    ) : <>
      <SimpleGrid cols={{ base: 2, md: 4 }}>
        {[["Total playtime", hours(stats.totalMinutes)], ["Games owned", stats.totalGames], ["Games played", stats.playedGames], ["Unplayed games", stats.unplayedGames]].map(([label, value]) => (
          <Card key={label} withBorder radius="md"><Text size="sm" c="dimmed">{label}</Text><Text size="xl" fw={700}>{value}</Text></Card>
        ))}
      </SimpleGrid>
      <Text size="sm" c="dimmed">Based on your last library sync. Metadata matched for {stats.matchedGames} of {stats.totalGames} games. Tags are IGDB keywords. Categories are ranked by playtime; games can belong to several categories, so their hours overlap.</Text>
      <Card withBorder radius="md" padding="lg"><Stack>
        <Title order={2} size="h4">Most played games</Title>
        {stats.mostPlayed.length === 0 ? <Text c="dimmed">No recorded playtime yet.</Text> : stats.mostPlayed.map((game, index) => (
          <Group key={game.steamId} justify="space-between" wrap="nowrap">
            <Anchor href={`https://store.steampowered.com/app/${game.steamId}`} target="_blank" rel="noopener noreferrer">{index + 1}. {game.name}</Anchor>
            <Text size="sm" style={{ whiteSpace: "nowrap" }}>{hours(game.minutes)}</Text>
          </Group>
        ))}
      </Stack></Card>
      <SimpleGrid cols={{ base: 1, md: 3 }}>
        <Ranking title="Top genres" items={stats.genres} total={stats.totalMinutes} />
        <Ranking title="Top themes" items={stats.themes} total={stats.totalMinutes} />
        <Ranking title="Top tags" items={stats.tags} total={stats.totalMinutes} />
      </SimpleGrid>
    </>)}
  </Stack></Container>;
}
