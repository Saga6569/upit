import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ButtonRequestDate } from "./buttons/index.ts";
import { Modal, TableRendering } from "./components/index.ts";
import { ButtonCleanTab } from "./buttons/index.ts";
createRoot(document.getElementById("root")!).render(
 <StrictMode>
  <App>
   <TableRendering />
   <ButtonRequestDate />
   <ButtonCleanTab />
   <Modal/>
  </App>
 </StrictMode>
);
