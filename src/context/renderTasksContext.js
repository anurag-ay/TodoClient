import React, { createContext, useContext, useState } from "react";
const RenderTaskContext = createContext(null);

export function useRenderTask() {
  return useContext(RenderTaskContext);
}

function RenderTasksProvider({ children }) {
  const [renderTask, setRenderTask] = useState([]);

  return (
    <RenderTaskContext.Provider value={[renderTask, setRenderTask]}>
      {children}
    </RenderTaskContext.Provider>
  );
}

export default RenderTasksProvider;
