import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ButtonNavForm, ButtonRequestDate } from "./buttons/index.ts";
import { Modal, TableRendering } from "./components/index.ts";
import { ButtonCleanTab } from "./buttons/index.ts";
import Form from "./pages/Form.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
 {
  path: "/",
  element: (
   <App>
    <TableRendering />
    <ButtonNavForm />
    <ButtonRequestDate />
    <ButtonCleanTab />
    <Modal />
   </App>
  ),
 },
 {
  path: "form",
  element: <Form />,
 },
]);

createRoot(document.getElementById("root")!).render(
 <RouterProvider router={router} />
);
