import Registration from "./pages/Registration";
import Login from "./pages/Login";
import RootLayout from "./components/RootLayout";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import Message from "./pages/Message";

let router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Registration />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/pechal" element={<RootLayout />}>
        <Route index element={<Home />}></Route>
        <Route path="message" element={<Message />}></Route>
      </Route>
    </>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
