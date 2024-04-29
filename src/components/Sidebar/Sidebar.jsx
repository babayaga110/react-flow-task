import * as React from "react";
import {
  Box,
  Typography,
} from "@mui/joy";
import SidebarList from "./SidebarList";
export default function Sidebar() {
  return (
    <Box
      sx={{
        width: 300,
        borderLeft: "1px solid #f3f3f3",
        boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.1)",
      }}
    >
      <Box
        sx={{
          padding: 1,
          borderBottom: "1px solid #f3f3f3",
        }}
      >
        <Typography level="title-sm">Nodes Panel</Typography>
      </Box>
      <SidebarList />
    </Box>
  );
}
