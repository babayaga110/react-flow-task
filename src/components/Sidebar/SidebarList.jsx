import * as React from "react";
import { Box, Typography } from "@mui/joy";
import { Comment } from "@mui/icons-material";

export default function SidebarList() {
  const onDragStart = (event, nodeType, data) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("additionalData", JSON.stringify(data));
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, p: 1 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
          border: "1px solid #f3f3f3",
          borderRadius: 5,
          boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.1)",
          flexBasis: "48%",
        }}
        onDragStart={(event) =>
          onDragStart(event, "textUpdater", {
            label: "Send Message",
            text: "demo text",
          })
        }
        draggable
      >
        <Comment fontSize="sm" />
        <Typography level="body-xs">Message Node</Typography>
      </Box>
    </Box>
  );
}
