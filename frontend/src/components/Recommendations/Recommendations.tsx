import { Container, Divider, Stack, Title } from "@mantine/core";
import RecAccordion from "./RecAccordion";
import { persona3reload, persona4 } from "../../mockGames";

import classes from "./index.module.css";

export default function Recommendations() {
  return (
    <Container size="sm">
      <Stack gap="xl">
        <Title
          order={1}
          classNames={{
            root: classes.title,
          }}
        >
          Because you beat <span className={classes.link}>Elden Ring</span>, and{" "}
          <span className={classes.link}>Dark Souls</span>
          ...
        </Title>
        <Title style={{ textAlign: "right" }} order={2} size="h4">
          You <span style={{ fontStyle: "italic" }}>obviously</span> have a
          knack for <span className={classes.link}>souls-like</span> games
        </Title>
        <Title order={2} size="h4">
          and we checked your library and saw you have also put{" "}
          <span>764 hours</span> into RPGs overall...
        </Title>
        <Divider mx="auto" w={64} />
        <Title order={2} size="h4">
          so we recommend these titles:
        </Title>
      </Stack>
      <RecAccordion
        recommendations={[
          { game: persona4, type: "company", typeText: "Sega" },
          { game: persona3reload, type: "tag", typeText: "Role-playing (RPG)" },
        ]}
      />
    </Container>
  );
}
