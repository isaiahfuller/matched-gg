import { Stack, Image, Text, Flex, Divider, NavLink } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/logo.svg";

export default function Sidebar({
  isLoggedIn,
  h,
}: {
  isLoggedIn: boolean;
  h: number;
}) {
  return (
    <Stack justify="space-between" h={h}>
      <Flex align="center" p={24} mx="auto">
        <Image src={logo} p={4} />
        <Text>matched.gg</Text>
      </Flex>
      <Stack>
        <NavLink
          label="Recommendations"
          rightSection={<FontAwesomeIcon icon={faChevronRight} size="xs" />}
        />
        <NavLink
          label="Previously Recommended"
          rightSection={<FontAwesomeIcon icon={faChevronRight} size="xs" />}
        />
        <NavLink
          label="Sync your Libraries"
          rightSection={<FontAwesomeIcon icon={faChevronRight} size="xs" />}
        />
      </Stack>
      <Stack>
        <Divider />
        <Text p={24}>{isLoggedIn ? "Account" : "Logged out"}</Text>
      </Stack>
    </Stack>
  );
}
