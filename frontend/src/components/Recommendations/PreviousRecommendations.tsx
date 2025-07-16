import {
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Loader,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import RecAccordion from "./RecAccordion";
import { IGDBGame } from "../../interfaces";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PreviousRecommendations() {
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState<{ game: IGDBGame }[]>([]);
  const [offset, setOffset] = useState<number>(0);
  useEffect(() => {
    async function getRecommendations() {
      const r = await fetch("/games/getPreviousRecommendations");
      const data = await r.json();
      console.log(data);
      setGames(data);
      setLoading(false);
      return data;
    }
    getRecommendations();
  }, []);
  if (loading)
    return (
      <Center className="centered">
        <Loader />
      </Center>
    );
  if (!games || !games.length)
    return (
      <Center className="centered">
        <Title order={1} size="h4">
          No recommendations yet!
        </Title>
      </Center>
    );
  return (
    <Container>
      <RecAccordion recommendations={games.slice(offset, offset + 10)} />
      <Divider p={8} mx="auto" w={64} />{" "}
      <Flex direction="row" justify="space-between">
        <Button
          leftSection={<FontAwesomeIcon icon={faChevronLeft} />}
          variant="transparent"
          onClick={() => setOffset((prev) => prev - 5)}
          disabled={offset - 5 < 0}
        >
          Previous
        </Button>
        <Button
          rightSection={<FontAwesomeIcon icon={faChevronRight} />}
          variant="transparent"
          onClick={() => setOffset((prev) => prev + 5)}
          disabled={offset + 5 >= games.length}
        >
          Next
        </Button>
      </Flex>
    </Container>
  );
}
