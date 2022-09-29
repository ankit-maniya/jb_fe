import {
  IconNotes,
  IconFileInvoice,
  IconWallet,
  IconPercentage,
  IconUsers,
  IconChecklist,
  IconCalendar,
  IconTrash,
  IconDashboard,
  IconLogout,
  IconHome,
  IconList,
  IconPencilPlus,
} from "@tabler/icons";

export const menuData = [
  { label: "Home", icon: IconHome, pagelink: "/home" },
  { label: "Dashboard", icon: IconDashboard, pagelink: "/dashboard" },
  // {
  //   label: "Invoice",
  //   icon: IconFileInvoice,
  //   initiallyOpened: false,
  //   child: ["/invoices", "/invoices/party_invoices"],
  //   links: [
  //     { label: "All Invoices", pagelink: "/invoices" },
  //     { label: "party invoices", pagelink: "/invoices/party_invoices" },
  //   ],
  // },
  // { label: "Balance Sheet", icon: IconWallet, pagelink: "/balance_sheets" },
  // { label: "Average", icon: IconPercentage, pagelink: "/averages" },
  {
    label: "Party",
    icon: IconUsers,
    // pagelink: "/partys",
    child: ["/partys", "/partys/add_party"],
    initiallyOpened: false,
    links: [
      { label: "Partys", pagelink: "/partys" },
      { label: "Add Party", pagelink: "/partys/add_party" },
    ],
  },
  { label: "Cutting Types", icon: IconChecklist, pagelink: "/cutting_types" },
  // {
  //   label: "Party Wise Details",
  //   icon: IconNotes,
  //   pagelink: "/loats/party_loats",
  // },
  { label: "Date Wise Details", icon: IconCalendar, pagelink: "/datewise/year" },
  // {
  //   label: "Dustbin",
  //   icon: IconTrash,
  //   initiallyOpened: false,
  //   child: ["/dustbin/dt_partys", "/dustbin/dt_cutting_types"],
  //   links: [
  //     { label: "Party", pagelink: "/dustbin/dt_partys" },
  //     { label: "Cutting Type", pagelink: "/dustbin/dt_cutting_types" },
  //   ],
  // },
  { label: "Logout", icon: IconLogout },
];
