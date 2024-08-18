import { useState, useEffect } from "react";
import { Container, Button, Box } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridCsvExportOptions,
  GridToolbar,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import RefreshIcon from "@mui/icons-material/Refresh";
import PreviewIcon from "@mui/icons-material/Preview";
import axios, { AxiosResponse, AxiosError } from "axios";
import { TIFFViewer } from "react-tiff";

type ReceiveData = {
  id: integer;
  date: string;
  pages: integer;
  sender: string;
  time: string;
  file: string;
};

export default function FaxReceive(): JSX.Element {
  const uri = new URL(window.location.href);
  const [receives, setReceives] = useState<[ReceiveData]>(null);
  const [docFile, setDocfile] = useState("");
  const [tiffUrl, setTiffUrl] = useState("");

  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "date", headerName: "受信日時", width: 200 },
    { field: "pages", headerName: "ページ数", width: 100 },
    { field: "sender", headerName: "発信元電話番号", width: 200 },
    { field: "time", headerName: "受信時間", width: 150 },
    { field: "file", headerName: "ファイル", width: 500 },
  ];
  const getReceives = async () => {
    const url = `http://${uri.hostname}:5000/fax/receives`;
    console.log(url);
    await axios
      .get(url)
      .then((res: AxiosResponse) => {
        const { data, status } = res;
        console.log(status);
        console.log(data.receives);
        const l: [ReceiveData] = [];
        data.receives.map((e, index) => {
          e.id = index;
          l.push(e);
        });
        console.log(l);
        setReceives(l);
      })
      .catch((e: AxiosError) => {
        console.log(e);
      });
  };

  const getDocument = async () => {
    if (docFile === "") {
      return;
    }
    setTiffUrl("");
    const url = `http://${uri.hostname}:5000/fax/receive/${docFile}`;
    console.log(url);
    await axios
      .get(url, {
        responseType: "arraybuffer",
      })
      .then((res: AxiosResponse) => {
        console.log(res.data);
        const blob = new Blob([res.data]);
        const tiffUrl = URL.createObjectURL(blob);
        console.log(tiffUrl);
        setTiffUrl(tiffUrl);
      })
      .catch((e: AxiosError) => {
        console.log(e);
      });
  };

  function CustomToolBar(): JSX.Element {
    return (
      <GridToolbarContainer>
        <GridToolbar sx={{ flexGrow: 1 }} />
        <Button onClick={getReceives}>
          <RefreshIcon />
          refresh
        </Button>
        <Button onClick={getDocument} disabled={docFile === ""}>
          <PreviewIcon />
          preview
        </Button>
      </GridToolbarContainer>
    );
  }

  useEffect(() => {
    getReceives();
  }, []);

  const initialState = {
    sorting: {
      sortModel: [{ field: "date", sort: "asc" }],
    },
    pagination: {
      paginationModel: {
        pageSize: 5,
      },
    },
  };
  return (
    <Container>
      <DataGrid
        slots={{ toolbar: CustomToolBar }}
        rows={receives}
        columns={columns}
        sx={{
          m: 2,
          boxShadow: 5,
        }}
        initialState={initialState}
        pageSizeOptions={[5]}
        onRowClick={(e) => {
          const f = e.row["file"];
          console.log(f);
          setDocfile(f);
        }}
      />
      <Box sx={{ boxShadow: 5 }} overflow="clip">
        <Box overflow="auto" className="tiff-view">
          {tiffUrl ? <TIFFViewer tiff={tiffUrl}></TIFFViewer> : <p></p>}
        </Box>
      </Box>
    </Container>
  );
}
