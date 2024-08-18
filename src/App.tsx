import { useState } from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import {
  Button,
  Toolbar,
  IconButton,
  Typography,
  AppBar,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SendIcon from "@mui/icons-material/FileUpload";
import ReceiveIcon from "@mui/icons-material/FileDownload";
import styled from "@emotion/styled";
import "./App.css";
import FaxReceive from "./components/FaxReceive";
import FaxSend from "./components/FaxSend";

const TextButton = styled(Button)`
  text-transform: none;
`;

function App(): JSX.Element {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar variant="regular">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            href="/"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            HylaFAX操作ツール
          </Typography>
          <Tooltip title="FAX送信">
            <IconButton
              color="inherit"
              component="a"
              href="/send"
              onClick={() => {
                console.log("send");
              }}
            >
              <SendIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="FAX受信">
            <IconButton color="inherit" component="a" href="/receive">
              <ReceiveIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<></>}></Route>
          <Route path="/send" element={<FaxSend />}></Route>
          <Route path="/receive" element={<FaxReceive />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
