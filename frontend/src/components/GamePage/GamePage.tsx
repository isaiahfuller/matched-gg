import { Container } from "@mantine/core";
import GamePageHeader from "./GamePageHeader";
import { GamePageGeneric } from "./interfaces";
import GamePageBoxList from "./GamePageBoxList";

interface GamePageProps extends GamePageGeneric {}
export default function GamePage({ game }: GamePageProps) {
  return (
    <Container>
      <GamePageHeader game={game} />
      <GamePageBoxList game={game} />
    </Container>
  );
}
