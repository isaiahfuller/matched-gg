import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UnstyledButton, Flex, Avatar, Box, Text } from "@mantine/core";
import { forwardRef } from "react";

interface UserButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  image: string;
  name: string;
  email: string;
  width: number;
  icon?: React.ReactNode;
}

export const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ image, name, email, width, icon, ...others }: UserButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      style={{
        color: "var(--mantine-color-text)",
        borderRadius: "var(--mantine-radius-sm)",
      }}
      {...others}
      py={16}
      w={width}
    >
      <Flex justify="space-between" align="center">
        <Avatar src={image} radius="xl" />

        <Box style={{ flex: 1 }} px={8} w={75}>
          <Text size="sm" fw={500} truncate="end">
            {name}
          </Text>

          <Text c="dimmed" size="xs" truncate="end">
            {email}
          </Text>
        </Box>

        {icon || <FontAwesomeIcon icon={faChevronRight} size="sm" />}
      </Flex>
    </UnstyledButton>
  )
);
