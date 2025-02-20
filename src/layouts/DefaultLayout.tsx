import { Routes, Route } from "react-router-dom";
import GeneratePage from "@pages/GeneratePage/GeneratePage";
import MainPage from "@pages/MainPage/MainPage";
import ResponsiveContainer from "@components/ui/container/ResponsiveContainer";
import Header from "@components/ui/header/Header";

export default function DefaultLayout() {
  return (
    <ResponsiveContainer>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/generate" element={<GeneratePage />} />
      </Routes>
    </ResponsiveContainer>
  );
}
