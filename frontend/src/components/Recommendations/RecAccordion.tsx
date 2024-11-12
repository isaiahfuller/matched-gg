import {
  Accordion,
  Flex,
  Stack,
  Text,
  Image,
  Center,
  Divider,
} from "@mantine/core";
import { IGDBGame, IGDBGameArt } from "../../interfaces";
import { ReactElement, useState } from "react";
import classes from "./index.module.css";
import { useViewportSize } from "@mantine/hooks";

function getScreenUrl(
  id: string,
  size:
    | "cover_small"
    | "screenshot_med"
    | "cover_big"
    | "logo_med"
    | "screenshot_big"
    | "screenshot_huge"
    | "thumb"
    | "micro"
    | "720p"
    | "1080p"
) {
  return `https://images.igdb.com/igdb/image/upload/t_${size}/${id}.jpg`;
}

export default function RecAccordion({
  recommendations,
}: {
  recommendations: {
    game: IGDBGame;
    type: "company" | "tag" | "wildcard" | string;
    typeText: string;
  }[];
}) {
  const [screenIdx, setScreenIdx] = useState<number>(0);
  const { width } = useViewportSize();

  const items = recommendations.map((item) => {
    let controlHeader = "";
    switch (item.type) {
      case "company":
        controlHeader = ` Because you enjoy titles from `;
        break;
      case "tag":
        controlHeader = ` We recommend this because you enjoy `;
        break;
      case "wildcard":
        controlHeader = ` This is our `;
        break;
    }
    const rating = item.game.rating ? Math.floor(item.game.rating) : null;
    return (
      <Accordion.Item key={item.game.id} value={item.game.name!}>
        <AccordionControl icon={item.game.cover!}>
          <Text>
            <Text fw={700} span>
              {item.game.name!}
            </Text>
            <Text c="dimmed" span>
              {" "}
              -{controlHeader}
            </Text>
            <span className={classes.highlight}>{item.typeText}</span>
          </Text>
        </AccordionControl>
        <Accordion.Panel>
          <Stack>
            {rating ? (
              <Text size="sm" c="dimmed" lh={0} pb={4}>
                Users recommended this title{" "}
                <Text span lh={0} pb={4}>
                  {rating}%
                </Text>{" "}
                of the time.
              </Text>
            ) : null}
            <Flex direction={width < 1000 ? "column" : "row"}>
              <Text>{item.game.summary}</Text>
              {item.game.screenshots && item.game.screenshots.length ? (
                <Stack
                  miw="40%"
                  pl={width < 1000 ? 0 : 8}
                  pt={width < 1000 ? 8 : 0}
                >
                  <Image
                    src={getScreenUrl(
                      item.game.screenshots[screenIdx].ss.imageId,
                      "screenshot_med"
                    )}
                  />
                  <Divider mx="auto" w={64} />
                  <Flex wrap="nowrap" justify="space-between">
                    {item.game.screenshots.slice(0, 4).map((e, i) => (
                      <img
                        key={e.ss.igdbId}
                        src={getScreenUrl(e.ss.imageId, "micro")}
                        style={{
                          objectFit: "contain",
                        }}
                        onClick={() => setScreenIdx(i)}
                      />
                    ))}
                  </Flex>
                </Stack>
              ) : null}
            </Flex>
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>
    );
  });
  if (recommendations)
    return (
      <Accordion
        defaultValue={recommendations[0].game.name!}
        classNames={{ chevron: classes.chevron }}
        chevronPosition="left"
        variant="filled"
      >
        {items}
      </Accordion>
    );
}

function AccordionControl({
  icon,
  children,
}: {
  icon: IGDBGameArt;
  children: ReactElement;
}) {
  return (
    <Center>
      <Accordion.Control>{children}</Accordion.Control>
      {icon ? (
        <Image src={getScreenUrl(icon.imageId, "micro")} w={35} h={35} m={4} />
      ) : null}
    </Center>
  );
}
