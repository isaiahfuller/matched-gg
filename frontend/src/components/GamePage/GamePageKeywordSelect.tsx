import { Grid, MultiSelect, Paper, Title } from "@mantine/core";
import { GamePageGeneric } from "./interfaces";
import { useMemo } from "react";
import { IGDBGeneric } from "../../interfaces";

interface GamePageKeywordSelectProps extends GamePageGeneric {
  size: number;
  setter: ((value: string[]) => void) | undefined;
}
export default function GamePageKeywordSelect({
  game,
  size,
  setter,
}: GamePageKeywordSelectProps) {
  const titles = useMemo(() => {
    const res: string[] = [];
    if(!game.keywords) return res
    for (const keyword of game.keywords!) {
      res.push((keyword as IGDBGeneric).name!);
    }
    return res;
  }, [game]);
  if (!game.keywords || !game.keywords.length) return null;
  return (
    <Grid.Col span={size}>
      <Paper shadow="xs" p={8} h="100%" withBorder>
        <MultiSelect
          label={
            <Title order={3} pb={4}>
              Keywords
            </Title>
          }
          placeholder="Select Keywords..."
          data={titles as string[]}
          onChange={setter}
          clearable
        />
      </Paper>
    </Grid.Col>
  );
}
