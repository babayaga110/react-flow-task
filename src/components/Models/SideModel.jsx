import * as React from "react";
import { Box, IconButton, Typography } from "@mui/joy";
import { ArrowBack, Delete, Done } from "@mui/icons-material";
import InputNodeForm from "../Nodes/InputNode/UpdateForm";
export default function SideModel({
  selectedNode,
  setSelectedNode,
  setUpdateNode,
  deleteNode,
}) {
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
        <Typography
          level="title-sm"
          startDecorator={
            <IconButton
              size="small"
              variant="plain"
              sx={{ py: 0.5 }}
              onClick={() => setSelectedNode(null)}
              aria-label="Go back"
            >
              <ArrowBack fontSize="sm" />
            </IconButton>
          }
          endDecorator={
            <IconButton
              size="small"
              variant="plain"
              color="danger"
              sx={{ py: 0.5 }}
              onClick={() => {
                deleteNode(selectedNode?.id);
                setSelectedNode(null);
              }}
              aria-label="Delete node"
            >
              <Delete fontSize="sm" />
            </IconButton>
          }
          justifyContent="space-between"
        >
          {selectedNode?.id} Message Node
        </Typography>
      </Box>
      {selectedNode?.type === "textUpdater" && (
        <InputNodeForm
          selectedNode={selectedNode}
          setUpdateNode={setUpdateNode}
        />
      )}
    </Box>
  );
}
