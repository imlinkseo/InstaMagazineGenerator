import { Routes, Route } from "react-router-dom";
import Header from "@components/ui/header/Header";
import GeneratePage from "@pages/GeneratePage/GeneratePage";
import MainPage from "@pages/MainPage/MainPage";
import ResponsiveContainer from "@components/ui/container/ResponsiveContainer";
import Footer from "@components/ui/footer/Footer";
export default function DefaultLayout() {
  return (
    <ResponsiveContainer>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/generate" element={<GeneratePage />} />
      </Routes>
      <Footer />
    </ResponsiveContainer>
  );
}
