import { Container, Stack, Title } from "@mantine/core";
import RecAccordion from "./RecAccordion";
import { persona3reload, persona4 } from "../../mockGames";

export default function Recommendations() {
  return (
    <Container>
      <Stack>
        <Title>
          Because you beat <span>Elden Ring</span> and <span>Dark Souls</span>
          ...
        </Title>
        <Title>
          You <span>obviously</span> have a knack for <span>souls-like</span>{" "}
          games
        </Title>
        <Title>
          and we checked your library and saw you have also put{" "}
          <span>764 hours</span> into RPGs overall...
        </Title>
        <Title>so we recommend these titles:</Title>
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
