import { IGDBGame } from "../../interfaces";

interface GameHoverProps {
  game: IGDBGame;
}
export default function GameHover({ game }: GameHoverProps) {
  return <p>GameHover</p>;
}
