import {
  BackgroundImage,
  rgba,
  Flex,
  Stack,
  Title,
  Image,
  Paper,
  RingProgress,
  Box,
} from "@mantine/core";
import { IGDBDate, IGDBGameArt, IGDBInvolvedCompany } from "../../interfaces";
import { useMemo } from "react";
import { GamePageGeneric } from "./interfaces";
import scoreColor from "../../util/scoreColor";

const IGDBImageUrlBase = "https://images.igdb.com/igdb/image/upload";

interface GamePageHeaderProps extends GamePageGeneric {}
export default function GamePageHeader({ game }: GamePageHeaderProps) {
  const developers = useMemo(() => {
    if (!game.involved_companies) return null;
    const res = new Array<string>();
    game.involved_companies?.forEach((e) => {
      if ((e as IGDBInvolvedCompany).developer)
        res.push((e as IGDBInvolvedCompany).company.name!);
    });
    return res;
  }, [game]);
  const years = useMemo(() => {
    const res = new Set<number>();
    for (const e of game.release_dates) {
      res.add((e as IGDBDate).y);
    }
    return [...res].sort((a, b) => a - b);
  }, [game]);
  return (
    <Box py={8}>
      <BackgroundImage
        src={`${IGDBImageUrlBase}/t_screenshot_big/${(game.artworks as IGDBGameArt[])[0].image_id}.jpg`}
        radius="sm"
      >
        <Paper bg={rgba("#ffffff", 0.6)} shadow="xs" withBorder>
          <Flex align="flex-end" justify="space-between">
            <Image
              p={8}
              w="auto"
              fit="contain"
              radius="sm"
              src={`${IGDBImageUrlBase}/t_cover_big/${(game.cover as IGDBGameArt)!.image_id}.jpg`}
            />
            <Stack p={8} style={{ flexGrow: "1" }}>
              <Title>{game.name}</Title>
              <Title order={2}>
                {years.join(", ")} - {developers?.join(", ")}
              </Title>
            </Stack>
            <RingProgress
              size={140}
              thickness={16}
              label={
                <Title ta="center" order={4}>
                  {game.rating ? Math.floor(game.rating) : `--`}%
                </Title>
              }
              sections={[
                { value: game.rating || 0, color: scoreColor(game.rating || 0) },
              ]}
            />
          </Flex>
        </Paper>
      </BackgroundImage>
    </Box>
  );
}
