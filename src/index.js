// import React from "react";
// import { createRoot } from "react-dom/client";
// import {
//   createBrowserRouter,
//   RouterProvider,
//   Route,
//   Link,
//   Outlet,
//   createRoutesFromElements,
// } from "react-router-dom";
// import Zone from "./routes/Zone";
// import Pharmacie from "./routes/Pharmacie";
// import Ville from "./routes/Ville";
// import Map from "./routes/Map";
// import Garde from "./routes/GardePage"
// import PharmaDeGarde from "./routes/PharmacieDeGardePage"
// import GestPharm from './routes/GestionPharmacie'
// import Navbar from "./components/Navbar";
// import Stats from "./routes/Stats"
// import Login from "./routes/Login"
// import "./App.css";
// import PharmaDetails from "./routes/PharmaDetails";
//
// const AppLayout = () => (
//   <>
//     <Navbar />
//     <Outlet />
//   </>
// );
//
// // const router = createBrowserRouter(
// //   createRoutesFromElements(
// //     <Route element={<AppLayout />}>
// //       <Route path="/" element={<Pharmacie />} />
// //       <Route path="/products" element={<Zone />} />
// //       <Route path="/reports" element={<Ville />} />
// //     </Route>
// //   )
// // );
//
// const router = createBrowserRouter([
//   {
//     element: <AppLayout />,
//     children: [
//       {
//         path: "/",
//         element: <Login />,
//       },
//       {
//         path: "/AddPharm",
//         element: <Pharmacie />,
//       },
//       {
//         path: "zones",
//         element: <Zone />,
//       },
//       {
//         path: "villes",
//         element: <Ville />,
//       },
//       {
//         path: "map",
//         element: <Map />,
//       },
//       {
//         path: "garde",
//         element: <Garde />,
//       },
//       {
//         path: "pharmadegarde",
//         element: <PharmaDeGarde />,
//       },
//       {
//         path: "pharmadetails/:id",
//         element: < PharmaDetails />,
//       },
//       {
//         path: "stats",
//         element: < Stats />,
//       },
//       {
//         path: "gest",
//         element: < GestPharm />,
//       },
//     ],
//   },
// ]);
//
// createRoot(document.getElementById("root")).render(
//   <RouterProvider router={router} />
// );


import React from "react";
import { createRoot } from "react-dom/client";
import { useLocation } from "react-router-dom";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
  createRoutesFromElements,
} from "react-router-dom";
import Zone from "./routes/Zone";
import Pharmacie from "./routes/Pharmacie";
import Ville from "./routes/Ville";
import Map from "./routes/Map";
import Garde from "./routes/GardePage"
import PharmaDeGarde from "./routes/PharmacieDeGardePage"
import GestPharm from './routes/GestionPharmacie'
import Navbar from "./components/Navbar";
import Stats from "./routes/Stats"
import Login from "./routes/Login"
import Regi from "./routes/Register"
import "./App.css";
import PharmaDetails from "./routes/PharmaDetails";

const AppLayout = () => {
  const location = useLocation();

  // Check if the URL is at http://localhost:3000/
  const isHomePage = location.pathname === "/";
  const isRegi = location.pathname === "/register";

  return (
      <>
        {!isHomePage && !isRegi && <Navbar />}
        <Outlet />
      </>
  );
};

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Regi />,
      },
      {
        path: "/AddPharm",
        element: <Pharmacie />,
      },
      {
        path: "zones",
        element: <Zone />,
      },
      {
        path: "villes",
        element: <Ville />,
      },
      {
        path: "map",
        element: <Map />,
      },
      {
        path: "garde",
        element: <Garde />,
      },
      {
        path: "pharmadegarde",
        element: <PharmaDeGarde />,
      },
      {
        path: "pharmadetails/:id",
        element: <PharmaDetails />,
      },
      {
        path: "stats",
        element: <Stats />,
      },
      {
        path: "gest",
        element: <GestPharm />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
