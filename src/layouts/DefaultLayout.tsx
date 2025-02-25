import { Routes, Route } from "react-router-dom";
import { HeaderFooterProvider } from "@components/ui/headerFooterProvider/HeaderFooterProvider";
import GeneratePage from "@pages/GeneratePage/GeneratePage";
import Header from "@components/ui/header/Header";
import Footer from "@components/ui/footer/Footer";
import ResponsiveContainer from "@components/ui/container/ResponsiveContainer";
import ResponsiveInnerContainer from "@components/ui/container/ResponsiveInnerContainer";

export default function DefaultLayout() {
  return (
    <ResponsiveContainer>
      <HeaderFooterProvider>
        <Header />
        <ResponsiveInnerContainer>
          <Routes>
            <Route path="/" element={<GeneratePage />} />
          </Routes>
        </ResponsiveInnerContainer>
        <Footer />
      </HeaderFooterProvider>
    </ResponsiveContainer>
  );
}
