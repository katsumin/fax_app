import { useState } from "react";
import {
  Button,
  TextField,
  IconButton,
  Toolbar,
  Typography,
  AppBar,
  DialogTitle,
} from "@mui/material";
import FaxIcon from "@mui/icons-material/Fax";
import CloseIcon from "@mui/icons-material/Close";

type TenkeyProp = {
  handler: (v: string) => void;
};

export default function Tenkey({ setHandler }: TenkeyProp): JSX.Element {
  const [telno, setTelno] = useState("");

  function numberClick(value: string) {
    setTelno(telno + value);
  }
  function setClick() {
    setHandler(telno);
  }
  function clearClick() {
    setTelno("");
  }
  function delClick() {
    setTelno(telno.substring(0, telno.length - 1));
  }
  return (
    <>
      <div className="Tenkey">
        <Typography color="primary" sx={{ mt: 2, flexGraw: 1 }}>
          送信先電話番号
        </Typography>
        <TextField
          label="Tel."
          variant="filled"
          size="small"
          margin="normal"
          value={telno}
        ></TextField>
        <div>
          <TenkeyButton value="1" handler={numberClick} />
          <TenkeyButton value="2" handler={numberClick} />
          <TenkeyButton value="3" handler={numberClick} />
        </div>
        <div>
          <TenkeyButton value="4" handler={numberClick} />
          <TenkeyButton value="5" handler={numberClick} />
          <TenkeyButton value="6" handler={numberClick} />
        </div>
        <div>
          <TenkeyButton value="7" handler={numberClick} />
          <TenkeyButton value="8" handler={numberClick} />
          <TenkeyButton value="9" handler={numberClick} />
        </div>
        <div>
          <TenkeyButton value="*" handler={numberClick} />
          <TenkeyButton value="0" handler={numberClick} />
          <TenkeyButton value="#" handler={numberClick} />
        </div>
        <div>
          <TenkeyButton value="CLR" handler={clearClick} />
          <TenkeyButton value="SET" handler={setClick} />
          <TenkeyButton value="DEL" handler={delClick} />
        </div>
      </div>
    </>
  );
}

type TenkeyButtonProp = {
  value: string;
  handler: (v: string) => void;
};

function TenkeyButton({ value, handler }: TenkeyButtonProp): JSX.Element {
  function buttonClick() {
    handler(value);
  }

  return (
    <Button variant="outlined" onClick={buttonClick}>
      {value}
    </Button>
  );
}
