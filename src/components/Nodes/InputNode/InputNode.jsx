import { Typography, Grid, Sheet } from "@mui/joy";
import * as React from "react";
import { Handle, Position } from "reactflow";
import "../style.css";
import { Comment, WhatsApp } from "@mui/icons-material";
export default function InputNode({ data, isConnectable }) {
  return (
    <Sheet
      sx={{
        width: 130,
        borderRadius: 5,
        boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.1)",
        borderColor: "#d1d6ea",
      }}
      variant="outlined"
    >
      <Handle
        type="target"
        position={Position.Left}
        id="a"
        isConnectable={isConnectable}
      />
      <Grid
        container
        spacing={1}
        sx={{
          m: 0,
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <Grid
          xs={12}
          sx={{
            bgcolor: "#b2f0e2",
          }}
        >
          <Typography
            startDecorator={<Comment fontSize="sm" />}
            endDecorator={<WhatsApp fontSize="sm" />}
            level="body-xs"
            sx={{
              width: "100%",
              justifySelf: "unset",
              fontSize: ".4rem",
            }}
            slotProps={{
              endDecorator: {
                sx: {
                  marginLeft: "auto",
                },
              },
            }}
            aria-label="Node label"
          >
            {data.label}
          </Typography>
        </Grid>
        <Grid xs={12}>
          <Typography
            level="body-xs"
            sx={{
              fontSize: ".45rem",
              wordWrap: "break-word",
            }}
            aria-label="Node text"
          >
            {data.text}
          </Typography>
        </Grid>
      </Grid>
      <Handle
        type="source"
        position={Position.Right}
        id="b"
        isConnectable={isConnectable}
      />
    </Sheet>
  );
}
