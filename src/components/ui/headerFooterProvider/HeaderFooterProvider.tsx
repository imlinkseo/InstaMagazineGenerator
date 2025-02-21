import React, { createContext, useContext, useEffect, useState } from "react";

interface HeaderFooterContextType {
  headerHeight: number;
  footerHeight: number;
}

const HeaderFooterHeightContext = createContext<
  HeaderFooterContextType | undefined
>(undefined);

export const HeaderFooterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    const updateHeights = () => {
      const header = document.querySelector("header");
      const footer = document.querySelector("footer");

      if (header) {
        setHeaderHeight(parseFloat(window.getComputedStyle(header).height));
      }
      if (footer) {
        setFooterHeight(parseFloat(window.getComputedStyle(footer).height));
      }
    };

    // 높이 업데이트
    updateHeights();

    // 창 크기가 변경될 때 높이 다시 계산
    window.addEventListener("resize", updateHeights);

    return () => window.removeEventListener("resize", updateHeights);
  }, []);

  return (
    <HeaderFooterHeightContext.Provider value={{ headerHeight, footerHeight }}>
      {children}
    </HeaderFooterHeightContext.Provider>
  );
};

export const useHeaderFooterHeight = () => {
  const context = useContext(HeaderFooterHeightContext);
  if (!context) {
    throw new Error(
      "useHeaderFooterHeight must be used within a HeaderFooterProvider"
    );
  }
  return context;
};
