import { Center, Loader } from "@mantine/core";

import Login from "../Login/Login";
import Recommendations from "../Recommendations/Recommendations";
import Settings from "../Settings/Settings";
import Sync from "../Sync/Sync";
import PreviousRecommendations from "../Recommendations/PreviousRecommendations";

interface PagesProps {
  page: string;
}
export default function Pages({ page }: PagesProps) {
  switch (page) {
    case "recommendations":
      return <Recommendations />;
    case "previous":
      return <PreviousRecommendations />;
    case "sync":
      return <Sync />;
    case "settings":
      return <Settings />;
    case "signup":
    case "login":
      return <Login initSignup={page === "signup"} />;
    default:
      <Center className="centered">
        <Loader />
      </Center>;
  }
}
