import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "Pharmacie",
    path: "/AddPharm",
    icon: <AiIcons.AiFillShop />,
    cName: "nav-text",
  },
  {
    title: "Ville",
    path: "/villes",
    icon: <FaIcons.FaCity />,
    cName: "nav-text",
  },
  {
    title: "Zone",
    path: "/zones",
    icon: <FaIcons.FaCircle />,
    cName: "nav-text",
  },
  {
    title: "Map",
    path: "/map",
    icon: <IoIcons.IoIosMap />,
    cName: "nav-text",
  },
  {
    title: "Garde",
    path: "/garde",
    icon: <FaIcons.FaFortAwesome />,
    cName: "nav-text",
  },
  {
    title: "Pharmacie de garde",
    path: "/pharmadegarde",
    icon: <IoIcons.IoMdHelpCircle />,
    cName: "nav-text",
  },
  {
    title: "Statistique",
    path: "/stats",
    icon: <IoIcons.IoIosStats />,
    cName: "nav-text",
  },
  {
    title: "Gestion Pharmacie",
    path: "/gest",
    icon: <IoIcons.IoIosList/>,
    cName: "nav-text",
  },
];
