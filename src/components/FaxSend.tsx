import React, { useState } from "react";
import {
  Input,
  Button,
  TextField,
  Dialog,
  InputAdornment,
  IconButton,
  Box,
} from "@mui/material";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import Tenkey from "./Tenkey";
import DocView from "./DocView";
import axios, { AxiosResponse, AxiosError } from "axios";

export default function FaxSend() {
  const [open, setOpen] = useState<boolean>(false);
  const [pdf, setPdf] = useState(null);
  const [telno, setTelno] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const tenkeyOpen = (v: boolean) => () => {
    setOpen(v);
  };

  const loadDocument = (f: React.ChangeEvent) => {
    console.log(f.target);
    const files: [string] = f.target.files;
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = (e) => {
        const r: string = e.target.result;
        setPdf(r);
      };
      reader.readAsDataURL(files[0]);
      setFile(files[0]);
    } else {
      setFile(null);
      setPdf(null);
    }
  };

  const sendFax = async () => {
    if (file === null) {
      return;
    }
    const uri = new URL(window.location.href);
    const url = `http://${uri.hostname}:5000/fax/send`;
    console.log(url);
    const formData = new FormData();
    formData.append("tel_no", telno);
    formData.append("send_file", file);
    console.log(formData);
    await axios
      .post(url, formData)
      .then((res: AxiosResponse) => {
        console.log(res);
      })
      .catch((e: AxiosError) => {
        console.log(e);
      });
  };

  function setTelNumber(n: string) {
    setTelno(n);
    setOpen(false);
  }

  return (
    <>
      <Box sx={{ display: "flex", mb: 2, mt: 2 }}>
        <TextField
          label="Tel."
          variant="outlined"
          value={telno}
          denstiy="compact"
          onChange={(e: React.ChangeEvent) => {
            setTelno(e.target.value);
          }}
          sx={{ flexGrow: 1, mr: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={tenkeyOpen(true)}>
                  <KeyboardIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        ></TextField>
        <Input
          type="file"
          accept="application/pdf"
          onChange={loadDocument}
          sx={{ flexGrow: 6, mr: 2 }}
        />
        <Button
          variant="contained"
          disabled={pdf === null || telno === ""}
          onClick={sendFax}
          sx={{ flexGrow: 1 }}
        >
          送信
        </Button>
        <Dialog open={open} onClose={tenkeyOpen(false)}>
          <Tenkey setHandler={setTelNumber} />
        </Dialog>
      </Box>
      <Box sx={{ boxShadow: 5 }}>
        {pdf ? (
          <embed src={pdf} className="doc-view" type="application/pdf"></embed>
        ) : (
          <p></p>
        )}
      </Box>
    </>
  );
}
