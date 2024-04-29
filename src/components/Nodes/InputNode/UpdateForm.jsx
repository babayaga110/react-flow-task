import { FormControl, FormLabel, Textarea, Grid } from "@mui/joy";
import * as React from "react";

export default function UpdateForm({ selectedNode, setUpdateNode}) {
  const [text, setText] = React.useState(selectedNode?.data.text || "");

  React.useEffect(() => {
    setText(selectedNode?.data.text || "");
  }, [selectedNode]);

    const onChange = (event) => {
      setText(event.target.value);
        setUpdateNode({
        ...selectedNode,
        data: {
            ...selectedNode.data,
            text: event.target.value,
        },
        });
    };
  return (
    <Grid container sx={{ p: 2 }}>
      <Grid item xs={12}>
        <FormControl>
          <FormLabel>Text</FormLabel>
          <Textarea
            size="sm"
            minRows={4}
            maxRows={4}
            value={text}
            aria-label="Update text"
            onChange={onChange}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
}
