import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, HoverCard, Input, Menu } from "@mantine/core";
import { useEffect, useState } from "react";
import { IGDBDate, IGDBGame } from "../../interfaces";
import { persona3reload, persona4 } from "../../mockGames";
import GameHover from "./GameHover";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<IGDBGame[]>([]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.currentTarget.value);
  }

  useEffect(() => {
    if (searchTerm.length) {
      setResults([persona3reload, persona4]);
      console.log(persona3reload, persona4);
    } else setResults([]);
  }, [searchTerm]);

  return (
    <Box py={32} m="auto" maw={512}>
      <Menu opened={results.length ? true : false} trapFocus={false}>
        <Menu.Target>
          <Input
            leftSection={<FontAwesomeIcon icon={faMagnifyingGlass} />}
            placeholder="Search for games"
            value={searchTerm}
            onChange={handleChange}
            radius={8}
          />
        </Menu.Target>
        <Menu.Dropdown maw={512} w="100%">
          {results.map((e) => {
            const label = `${e.name} (${e.year || (e.release_dates[0] as IGDBDate).y})`; // Ideally would be first_release_date. Didn't save that for mocks
            return (
              <HoverCard position="bottom">
                <HoverCard.Target>
                  <Menu.Item rightSection={null}>{label}</Menu.Item>
                </HoverCard.Target>
                <HoverCard.Dropdown>
                  <GameHover game={e} />
                </HoverCard.Dropdown>
              </HoverCard>
            );
          })}
        </Menu.Dropdown>
      </Menu>
    </Box>
  );
}
