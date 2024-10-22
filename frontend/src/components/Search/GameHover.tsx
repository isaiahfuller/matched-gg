import { Image, Title, Stack, Text, Box, Flex, Divider } from "@mantine/core";
import { IGDBGame, IGDBGeneric, IGDBPlatform } from "../../interfaces";
import { Fragment } from "react";

interface GameHoverProps {
  game: IGDBGame;
}

export default function GameHover({ game }: GameHoverProps) {
  const coverSrc = `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover?.image_id}.jpg`;
  return (
    <Box maw={650}>
      <Flex justify="center">
        <Image src={coverSrc} h={374} w={264} fit="contain" px={8} />
        <Stack justify="center" px={8}>
          <Title size="h4">{game.name}</Title>
          <Text lh={1.2}>{game.summary}</Text>
          <Divider mx="auto" w={64} />
          <Box lh={1.2}>
            {game.platforms ? (
              <Text>
                Platforms:{" "}
                {(game.platforms as IGDBPlatform[])?.map(
                  (e: IGDBPlatform, i) => (
                    <Fragment key={e.id}>
                      <a href={e.url}>{e.abbreviation}</a>
                      {i < game.platforms!.length - 1 ? ", " : null}
                    </Fragment>
                  )
                )}
              </Text>
            ) : null}
            {game.genres ? (
              <Text>
                Genres:{" "}
                {game.genres?.map((e: IGDBGeneric, i) => (
                  <Fragment key={e.id}>
                    <a href={e.url}>{e.name}</a>
                    {i < game.genres!.length - 1 ? ", " : null}
                  </Fragment>
                ))}
              </Text>
            ) : null}
            {game.keywords ? (
              <Text>
                Keywords:{" "}
                {game.keywords?.map((e: IGDBGeneric, i) => (
                  <Fragment key={e.id}>
                    <a href={e.url}>{e.name}</a>
                    {i < game.keywords!.length - 1 ? ", " : null}
                  </Fragment>
                ))}
              </Text>
            ) : null}
          </Box>
        </Stack>
      </Flex>
    </Box>
  );
}
