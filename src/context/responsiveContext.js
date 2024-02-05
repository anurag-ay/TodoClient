import React, { createContext, useContext, useState } from "react";

const ResponsiveContext = createContext(null);

export function useResponsive() {
  return useContext(ResponsiveContext);
}

function ResponsiveProvider({ children }) {
  const [isCategory, setIsCategory] = useState(true);

  return (
    <ResponsiveContext.Provider value={[isCategory, setIsCategory]}>
      {children}
    </ResponsiveContext.Provider>
  );
}

export default ResponsiveProvider;
