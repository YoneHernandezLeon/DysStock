import { Menubar } from "primereact/menubar";
import type { MenuItem } from "primereact/menuitem";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const items: MenuItem[] = [
    {
      label: "Inicio",
      icon: "pi pi-home",
      command: () => {
        navigate("/");
      },
    },
    {
      label: "Salidas",
      icon: "pi pi-file-export",
      command: () => {
        navigate("/withdraw");
      },
    },
    {
      label: "Almacen",
      icon: "pi pi-wrench",
      command: () => {
        navigate("/items");
      },
    },
    {
      label: "Listados",
      icon: "pi pi-file-pdf",
      items: [
        {
          label: "Por referencia",
        },
        {
          label: "Por ubicación",
        },
        {
          label: "Por stock",
        },
      ],
    },
    {
      label: "Administración",
      icon: "pi pi-clock",
      command: () => {
        window.location.href = "/admin/";
      },
    },
  ];

  return (
    <div className="w-full">
      <Menubar
        model={items}
        className="text-sm h-3rem w-5 mx-auto justify-content-center bg-primary shadow-4"
      />
    </div>
  );
}

export default Header;
