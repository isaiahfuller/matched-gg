import { Container, Text } from "@mantine/core";
import RecAccordion from "./RecAccordion";
import { persona3reload, persona4 } from "../../mockGames";

export default function Recommendations() {
  return (
    <Container>
      <Text>so we recommend these titles</Text>
      <RecAccordion
        recommendations={[
          { game: persona4, type: "company", typeText: "Sega" },
          { game: persona3reload, type: "tag", typeText: "Role-playing (RPG)" },
        ]}
      />
    </Container>
  );
}
