import { Checkbox, Grid, Paper, Title } from "@mantine/core";
import { GamePageGeneric } from "./interfaces";
import toTitleCase from "../../util/toTitleCase";
import { IGDBGame } from "../../interfaces";

interface GamePageBoxGeneric {
  id: number;
  name: string;
  slug: string;
}
interface GamePageBoxProps extends GamePageGeneric {
  type: keyof IGDBGame;
  size: number;
  list: string[];
  setter: ((value: string[]) => void) | undefined;
}
export default function GamePageBox({ game, type, size, list, setter }: GamePageBoxProps) {
  console.log(type, game[type]);
  if(!game[type]) return null
  return (
    <Grid.Col span={size}>
      <Paper shadow="xs" p={8} h="100%" withBorder>
        <form>
          <Checkbox.Group
            defaultValue={[]}
            value={list}
            onChange={setter}
            label={
              <Title order={3} pb={4}>
                {toTitleCase(type)}
              </Title>
            }
          >
            {(game[type] as GamePageBoxGeneric[]).map((e) => {
              return (
                <Checkbox key={e.id} label={e.name} value={e.slug} p={4} />
              );
            })}
          </Checkbox.Group>
        </form>
      </Paper>
    </Grid.Col>
  );
}
