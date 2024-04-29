import * as React from "react";
import { Alert, Box, Button, Typography } from "@mui/joy";
import "./App.css";
import ReactFlow, {
  updateEdge,
  addEdge,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  getConnectedEdges,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";

import InputNode from "./components/Nodes/InputNode/InputNode";
import Sidebar from "./components/Sidebar/Sidebar";
import SideModel from "./components/Models/SideModel";
import {  Warning } from "@mui/icons-material";

let id = 0;
const getId = () => `dnd_${id++}`;

const initialNodes = [];
const initialEdges = [];

const nodeTypes = {
  textUpdater: InputNode,
};

function App() {
  const reactFlowWrapper = React.useRef(null);
  const edgeUpdateSuccessful = React.useRef(true);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = React.useState(null);
  const [updateNode, setUpdateNode] = React.useState(null);
  const [error, setError] = React.useState(false);
  const [reactFlowInstance, setReactFlowInstance] = React.useState(null);

  const handleSubmit = () => {
    const connectedEdges = getConnectedEdges(nodes, edges);
  
    const isError = nodes.some((node) => {
      return !connectedEdges.some(
        (edge) => edge.source === node.id || edge.target === node.id
      );
    });
  
    setError(isError);
  };

  const onConnect = React.useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, markerEnd: { type: MarkerType.ArrowClosed } }, eds)),
    []
  );
  const onDragOver = React.useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = React.useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      const data = event.dataTransfer.getData("additionalData");
      if (typeof type === "undefined" || !type) {
        return;
      }
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: JSON.parse(data),
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const onNodeClick = React.useCallback((event, node) => {
    setSelectedNode(node);
  });

  React.useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode?.id && node.id === updateNode?.id) {
          node.data = {
            ...node.data,
            text: updateNode.data.text,
          };
        }

        return node;
      })
    );
  }, [selectedNode, updateNode]);

  const onEdgeUpdateStart = React.useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = React.useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = React.useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);

  const deleteNode = (nodeId) => {
    setNodes(nodes.filter(node => node.id !== nodeId));
    setEdges(edges.filter(edge => edge.source !== nodeId && edge.target !== nodeId));
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          height: "50px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          bgcolor: "#f3f3f3",
          boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.1)",
        }}
      >
        <Typography level="title-md">Flow Builder</Typography>
        {error && (
          <Alert
            sx={{ py: 0.5 }}
            startDecorator={<Warning />}
            variant="soft"
            color="danger"
          >
            <Typography level="body-sm" color={"danger"}>
              One Node and more than one Node has empty target handles .
            </Typography>
          </Alert>
        )}

        <Button
          variant="outlined"
          color="primary"
          size="sm"
          onClick={handleSubmit}
        >
          Save Changes
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          height: "calc(100% - 50px)",
        }}
      >
        <ReactFlowProvider>
          <Box
            sx={{
              flex: 1,
            }}
            ref={reactFlowWrapper}
          >
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onEdgeUpdate={onEdgeUpdate}
              onEdgeUpdateStart={onEdgeUpdateStart}
              onEdgeUpdateEnd={onEdgeUpdateEnd}
              onInit={setReactFlowInstance}
              onNodeClick={onNodeClick}
              onDrop={onDrop}
              onDragOver={onDragOver}
              fitView
              nodeTypes={nodeTypes}
            />
          </Box>
          {selectedNode ? (
            <SideModel
              selectedNode={selectedNode}
              setSelectedNode={setSelectedNode}
              setUpdateNode={setUpdateNode}
              deleteNode={deleteNode}
            />
          ) : (
            <Sidebar />
          )}
        </ReactFlowProvider>
      </Box>
    </Box>
  );
}

export default App;
