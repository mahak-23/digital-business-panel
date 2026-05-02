import "./App.css";
import { Suspense, useMemo, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider, CircularProgress, Box } from "@mui/material";
import { CssBaseline } from "@mui/material";
import Layout from "./components/Layouts/Layout";

const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Calender = lazy(() => import("./pages/Calender/Calender"));
const Boards = lazy(() => import("./pages/Board/Board"));
const DataGrid = lazy(() => import("./pages/DataGrid/DataGrid"));

const PageLoader = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="50vh"
  >
    <CircularProgress />
  </Box>
);

function App() {
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "dark",
          primary: {
            main: "#5dc9ff",
          },
          background: {
            default: "#090d1a",
            paper: "#0f1628",
          },
          text: {
            primary: "#f8fafc",
          },
        },
        typography: {
          fontFamily: "Public Sans, Inter, sans-serif",
          button: {
            textTransform: "none",
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 999,
                padding: "10px 18px",
                minHeight: "44px",
              },
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                minWidth: 0,
              },
            },
          },
          MuiTableCell: {
            styleOverrides: {
              root: {
                padding: "12px 16px",
                fontSize: "0.95rem",
              },
            },
          },
          MuiTypography: {
            styleOverrides: {
              h5: {
                fontSize: "1.35rem",
                fontWeight: 700,
              },
            },
          },
        },
      }),
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div id="dashboard" className="dark-theme">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route
                path="dashboard"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <Dashboard />
                  </Suspense>
                }
              />
              <Route
                path="calender"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <Calender />
                  </Suspense>
                }
              />
              <Route
                path="board"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <Boards />
                  </Suspense>
                }
              />
              <Route
                path="users"
                element={
                  <Suspense fallback={<PageLoader />}>
                    <DataGrid />
                  </Suspense>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;