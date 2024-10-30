import { Text } from "@mantine/core";

import { User } from "../../interfaces";
import Login from "../Login/Login";
import Recommendations from "../Recommendations/Recommendations";
import Settings from "../Settings/Settings";

interface PagesProps {
  page: string;
  user: User;
  setUser: (arg: User) => void;
}
export default function Pages({ page, user, setUser }: PagesProps) {
  switch (page) {
    case "recommendations":
      return <Recommendations />;
    case "previous":
      return <Text>Previously recommended</Text>;
    case "sync":
      return <Text>Sync your libraries</Text>;
    case "settings":
      return <Settings user={user} setUser={setUser} />;
    case "signup":
    case "login":
    default:
      return <Login initSignup={page === "signup"} />;
  }
}
