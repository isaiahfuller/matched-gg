import { Container, Grid } from "@mantine/core";
import GamePageHeader from "./GamePageHeader";
import { GamePageGeneric } from "./interfaces";
import GamePageBox from "./GamePageBox";

interface GamePageProps extends GamePageGeneric {}
export default function GamePage({ game }: GamePageProps) {
  console.log(game);
  return (
    <Container>
      <GamePageHeader game={game} />
      <Grid p={8}>
      <GamePageBox game={game} type={"genre"} size={4} />
      <GamePageBox game={game} type={"player-perspective"} size={8} />
      </Grid>
    </Container>
  );
}
