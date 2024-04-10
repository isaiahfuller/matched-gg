import { Grid, Paper, Title } from "@mantine/core";
import { GamePageGeneric } from "./interfaces";
import toTitleCase from "../../util/toTitleCase";

interface GamePageBoxProps extends GamePageGeneric {
  type: string;
  size: number;
}
export default function GamePageBox({ game, type, size }: GamePageBoxProps) {
  return (
    <Grid.Col span={size}>
      <Paper shadow="xs" withBorder>
        <Title>
          {game.name}: {toTitleCase(type)}
        </Title>
      </Paper>
    </Grid.Col>
  );
}
