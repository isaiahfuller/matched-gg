import {
  Accordion,
  Flex,
  Stack,
  Text,
  Image,
  AccordionControlProps,
  Center,
} from "@mantine/core";
import { IGDBGame, IGDBGameArt } from "../../interfaces";
import { useState } from "react";

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
        <AccordionControl icon={item.game.cover}>
          <Text>
            {item.game.name!} <span>-{controlHeader}</span>
            <span>{item.typeText}</span>
          </Text>
        </AccordionControl>
        <Accordion.Panel>
          <Stack>
            {rating ? (
              <Text>
                Users recommended this title <span>{rating}%</span> of the time.
              </Text>
            ) : null}
            <Flex>
              <Text>{item.game.summary}</Text>
              {item.game.screenshots ? (
                <Stack pl={8}>
                  <Image
                    src={getScreenUrl(
                      item.game.screenshots[screenIdx]["image_id"],
                      "screenshot_med"
                    )}
                  />
                  <Flex align="center">
                    {/* <Text>{"<"}</Text> */}
                    <Flex wrap="nowrap" justify="space-between" h="64px">
                      {item.game.screenshots.slice(0, 4).map((e) => (
                        <img
                          key={e.id}
                          src={getScreenUrl(e["image_id"], "thumb")}
                          style={{
                            objectFit: "contain",
                          }}
                        />
                      ))}
                    </Flex>
                    {/* <Text>{">"}</Text> */}
                  </Flex>
                </Stack>
              ) : null}
            </Flex>
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>
    );
  });
  return (
    <Accordion
      defaultValue={recommendations[0].game.name!}
      chevronPosition="left"
    >
      {items}
    </Accordion>
  );
}

function AccordionControl({
  stock,
  icon,
  children,
}: {
  stock: AccordionControlProps;
  icon: IGDBGameArt;
}) {
  return (
    <Center>
      <Accordion.Control {...stock}>{children}</Accordion.Control>
      <img src={getScreenUrl(icon["image_id"], "micro")} />
    </Center>
  );
}
