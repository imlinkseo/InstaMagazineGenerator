import { Route, Routes } from "react-router-dom";
import { Global } from "@emotion/react";
import "reset-css";
import { globalStyles } from "@common/globalStyles";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme";
import DefaultLayout from "@layouts/DefaultLayout";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyles} />
        <Routes>
          <Route path="/*" element={<DefaultLayout />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
