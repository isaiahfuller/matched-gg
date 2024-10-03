import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, HoverCard, Input, NavLink, Popover } from "@mantine/core";
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

  useEffect(() => {
    if (results.length) {
    }
  }, [results]);

  return (
    <Box py={32} m="auto" maw={512}>
      <Popover opened={results.length ? true : false}>
        <Popover.Target>
          <Input
            leftSection={<FontAwesomeIcon icon={faMagnifyingGlass} />}
            placeholder="Search for games"
            value={searchTerm}
            onChange={handleChange}
            radius={8}
          />
        </Popover.Target>
        <Popover.Dropdown maw={512} w="100%">
          {results.map((e) => {
            const label = `${e.name} (${e.year || (e.release_dates[0] as IGDBDate).y})`; // Ideally would be first_release_date. Didn't save that for mocks
            return (
              <HoverCard>
                <HoverCard.Target>
                  <NavLink rightSection={null} label={label} href="#" />
                  {/* Hover color matches Popover bg right now */}
                </HoverCard.Target>
                <HoverCard.Dropdown>
                  <GameHover game={e} />
                </HoverCard.Dropdown>
              </HoverCard>
            );
          })}
        </Popover.Dropdown>
      </Popover>
    </Box>
  );
}
