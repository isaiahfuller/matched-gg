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
// import { persona3reload, persona4 } from "../../mockGames";

import classes from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { IGDBGame } from "../../interfaces";

export default function Recommendations() {
  const [games, setGames] = useState<
    {
      game: IGDBGame;
      type: string;
      typeText: string;
    }[]
  >([]);
  const [accLoading, setAccLoading] = useState<boolean>(true);

  useEffect(() => {
    setAccLoading(true);
    fetch("/games/getRecommendations")
      .then((r) => r.json())
      .then((r: { game: IGDBGame; type: string; typeText: string }[]) => {
        for (const g of r) {
          if(!g.type)
            g.type = "company";
          if(!g.typeText)
            g.typeText = "qwerty";
        }
        console.log(r);
        setGames([...r]);
        setAccLoading(false);
      });
  }, []);

  return (
    <Container size="sm">
      <Stack gap="xl">
        <Title
          order={1}
          classNames={{
            root: classes.title,
          }}
        >
          Because you beat{" "}
          <a href="#" className={classes.link}>
            Elden Ring
          </a>
          , and{" "}
          <a href="#" className={classes.link}>
            Dark Souls
          </a>
          ...
        </Title>
        <Title style={{ textAlign: "right" }} order={2} size="h4">
          You <span style={{ fontStyle: "italic" }}>obviously</span> have a
          knack for{" "}
          <a href="#" className={classes.link}>
            souls-like
          </a>{" "}
          games
        </Title>
        <Title order={2} size="h4">
          and we checked your library and saw you have also put{" "}
          <a href="#" className={classes.link}>
            764 hours
          </a>{" "}
          into RPGs overall...
        </Title>
        <Divider mx="auto" w={64} />
        <Title order={2} size="h4">
          so we recommend these titles:
        </Title>
      </Stack>
      {games.length && !accLoading ? (
        <>
          <RecAccordion
            // recommendations={[
            //   { game: persona4, type: "company", typeText: "Sega" },
            //   { game: persona3reload, type: "tag", typeText: "Role-playing (RPG)" },
            // ]}
            recommendations={games.slice(0, 5)}
          />
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
        <Center>
          <Loader p={64} />
        </Center>
      )}
    </Container>
  );
}
