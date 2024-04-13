import { useEffect, useState } from "react";
import { Grid } from "@mantine/core";
import GamePageBox from "./GamePageBox";
import { GamePageGeneric } from "./interfaces";
import GamePageKeywordSelect from "./GamePageKeywordSelect";

interface GamePageBoxListProps extends GamePageGeneric {}
export default function GamePageBoxList({ game }: GamePageBoxListProps) {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedModes, setSelectedModes] = useState<string[]>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [selectedPerspectives, setSelectedPerspectives] = useState<string[]>(
    []
  );

  useEffect(() => {
    console.table({
      genres: selectedGenres,
      keywords: selectedKeywords,
      themes: selectedThemes,
      perspectives: selectedPerspectives,
      modes: selectedModes,
    });
  }, [
    selectedGenres,
    selectedPerspectives,
    selectedThemes,
    selectedKeywords,
    selectedModes,
  ]);

  return (
    <form>
      <Grid py={8} align="stretch">
        <GamePageKeywordSelect
          game={game}
          size={12}
          setter={setSelectedKeywords}
        />
        <GamePageBox
          game={game}
          type={"game_modes"}
          size={3}
          list={selectedModes}
          setter={setSelectedModes}
        />
        <GamePageBox
          game={game}
          type={"genres"}
          size={4}
          list={selectedGenres}
          setter={setSelectedGenres}
        />
        <GamePageBox
          game={game}
          type={"player_perspectives"}
          size={5}
          list={selectedPerspectives}
          setter={setSelectedPerspectives}
        />
        <GamePageBox
          game={game}
          type={"themes"}
          size={6}
          list={selectedThemes}
          setter={setSelectedThemes}
        />
      </Grid>
    </form>
  );
}
