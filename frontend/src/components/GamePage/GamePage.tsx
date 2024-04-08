import { Box, Container, Flex, Image, Text, Title } from "@mantine/core";
import { IGDBGame, IGDBGameArt } from "../../interfaces";

interface GamePageProps {
  game: IGDBGame;
}
export default function GamePage({ game }: GamePageProps) {
  console.log(game);
  return (
    <Container>
      <Box bg={"red"}>
        <Flex align="flex-end">
          <Image
            w="auto"
            fit="contain"
            src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${(game.cover as IGDBGameArt)!.image_id}.jpg`}
          />
          <Title>{game.name}</Title>
        </Flex>
      </Box>
    </Container>
  );
}
