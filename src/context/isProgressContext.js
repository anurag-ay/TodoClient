import React, { createContext, useContext, useState } from "react";

const IsProgressContext = createContext();

export function useIsProgress() {
  return useContext(IsProgressContext);
}

function IsProgressProvider({ children }) {
  const [isProgress, setIsProgress] = useState(false);
  return (
    <IsProgressContext.Provider value={[isProgress, setIsProgress]}>
      {children}
    </IsProgressContext.Provider>
  );
}

export default IsProgressProvider;
