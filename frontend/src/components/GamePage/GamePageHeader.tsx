import {
  BackgroundImage,
  rgba,
  Flex,
  Stack,
  Title,
  Image,
  Paper,
} from "@mantine/core";
import {
  IGDBDate,
  IGDBGameArt,
  IGDBInvolvedCompany,
} from "../../interfaces";
import { useMemo } from "react";
import { GamePageGeneric } from "./interfaces";

const IGDBImageUrlBase = "https://images.igdb.com/igdb/image/upload";

interface GamePageHeaderProps extends GamePageGeneric {}
export default function GamePageHeader({ game }: GamePageHeaderProps) {
  const developers = useMemo(() => {
    if (!game.involved_companies) return null;
    const res = new Array<string>();
    game.involved_companies?.forEach((e) => {
      if (
        (e as IGDBInvolvedCompany).developer
      )
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
    <BackgroundImage
      src={`${IGDBImageUrlBase}/t_screenshot_big/${(game.artworks as IGDBGameArt[])[0].image_id}.jpg`}
      radius="sm"
    >
      <Paper bg={rgba("#ffffff", 0.6)} shadow="xs" withBorder>
        <Flex align="flex-end">
          <Image
            p={8}
            w="auto"
            fit="contain"
            radius="sm"
            src={`${IGDBImageUrlBase}/t_cover_big/${(game.cover as IGDBGameArt)!.image_id}.jpg`}
          />
          <Stack p={8}>
            <Title>{game.name}</Title>
            <Title order={2}>
              {years.join(", ")} - {developers?.join(", ")}
            </Title>
          </Stack>
        </Flex>
      </Paper>
    </BackgroundImage>
  );
}
