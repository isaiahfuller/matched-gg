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
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { IGDBGame, RecommendationsResult } from "../../interfaces";

function TimeText({
  recommendations,
}: {
  recommendations: RecommendationsResult;
}) {
  console.log(recommendations);
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
              {e.genre.name}
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

  useEffect(() => {
    setAccLoading(true);
    fetch("/games/getRecommendations")
      .then((r) => r.json())
      .then((r: RecommendationsResult) => {
        if (!r) return;
        for (const g of r.games) {
          if (!g.type) g.type = "company";
          if (!g.typeText) g.typeText = "qwerty";
        }
        setGames([...r.games]);
        setRecommended(r);
        setAccLoading(false);
      });
  }, []);

  return (
    <Container size="sm">
      {games.length && !accLoading ? (
        <>
          {recommended && recommended.type ? (
            <TimeText recommendations={recommended} />
          ) : null}
          <RecAccordion recommendations={games.slice(0, 5)} />
          <Divider p={8} mx="auto" w={64} />
          <Flex direction="row-reverse">
            <Button
              rightSection={<FontAwesomeIcon icon={faChevronRight} />}
              variant="transparent"
            >
              Get more
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
