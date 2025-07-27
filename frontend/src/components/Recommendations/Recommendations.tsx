import {
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Loader,
  Stack,
  Title,
} from "@mantine/core";
import RecAccordion from "./RecAccordion";

import classes from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { IGDBGame, RecommendationsResult } from "../../interfaces";

/**
 * Generates header text based on the recommendations.
 * @param props - The props for the component.
 * @returns
 */
function TimeText({
  recommendations,
}: {
  recommendations: RecommendationsResult;
}) {
  return (
    <Stack gap="xl">
      <Title order={1}>
        Because you played{" "}
        {recommendations.highlights.map((e, i) => (
          <React.Fragment key={i}>
            <a href="#" className={classes.link}>
              {e.steam.igdbGame.name}
            </a>
            {i === recommendations.highlights.length - 2
              ? ", and "
              : i !== recommendations.highlights.length - 1
                ? ", "
                : null}
          </React.Fragment>
        ))}
        ...
      </Title>
      <Title style={{ textAlign: "right" }} order={2} size="h4">
        You <span style={{ fontStyle: "italic" }}>obviously</span> have a knack
        for{" "}
        {recommendations.genres.map((e, i) => (
          <React.Fragment key={i}>
            <a href="#" className={classes.link}>
              {e.name}
            </a>
            {i === recommendations.highlights.length - 2
              ? ", and "
              : i !== recommendations.highlights.length - 1
                ? ", "
                : null}
          </React.Fragment>
        ))}{" "}
        games
      </Title>
      <Title order={2} size="h4">
        and we checked your library and saw you have also put{" "}
        <a href="#" className={classes.link}>
          {Math.floor(recommendations.time / 60)} hours
        </a>{" "}
        into these games overall...
      </Title>
      <Divider mx="auto" w={64} />
      <Title order={2} size="h4">
        so we recommend these titles:
      </Title>
    </Stack>
  );
}

/**
 * Gets recommendations for the user from the server.
 */
export default function Recommendations() {
  const [games, setGames] = useState<
    {
      game: IGDBGame;
      type: string;
      typeText: string;
    }[]
  >([]);
  const [accLoading, setAccLoading] = useState<boolean>(true);
  const [recommended, setRecommended] = useState<RecommendationsResult>();
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    getRecommendations();
  }, []);

  async function getRecommendations() {
    setAccLoading(true);
    try {
      const r = await fetch("/games/getRecommendations");
      console.log(r);
      const recs: RecommendationsResult = await r.json();
      if (!recs) return;
      console.log(recs);
      setGames([...recs.games]);
      setRecommended(recs);
      setAccLoading(false);
    } catch (e) {
      console.error(e);
    } finally {
      setAccLoading(false);
    }
  }
  if (!games.length && !accLoading) {
    return (
      <Center className="centered">
        <Title order={1} size="h4">
          No games in library! Link your accounts in <a>Account Settings</a>
        </Title>
      </Center>
    );
  }
  return (
    <Container size="sm">
      {games.length && !accLoading ? (
        <>
          {recommended && recommended.type && recommended.type !== "top" ? (
            <TimeText recommendations={recommended} />
          ) : null}
          {recommended && recommended.type && recommended.type === "top" ? (
            <Stack>
              <Title order={1}>Welcome to Matched!</Title>
              <Title order={2}>
                Log in with Steam to get personalized recommendations
              </Title>
              <Divider mx="auto" w={64} />
              <Title order={3} size="h4">
                Here are some recommendations based on popular games to get you
                started:
              </Title>
            </Stack>
          ) : null}
          <RecAccordion recommendations={games.slice(offset, offset + 5)} />
          <Divider p={8} mx="auto" w={64} />
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
        </>
      ) : (
        <Center className="centered">
          <Loader p={64} />
        </Center>
      )}
    </Container>
  );
}
