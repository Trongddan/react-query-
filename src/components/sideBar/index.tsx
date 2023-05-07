import { Box, Stack, Text } from "@chakra-ui/react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
export interface ISideBarProps {}

export default function SideBar(props: ISideBarProps) {
  const navigate = useNavigate();
  return (
    <Box minWidth="300px" bg="red.#500">
      <Stack>
        <Box>Dashboard</Box>
        <Box onClick={() => navigate("student")}>Student</Box>
      </Stack>
    </Box>
  );
}
