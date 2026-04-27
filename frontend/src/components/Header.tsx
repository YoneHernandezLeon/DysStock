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
      items: [
        {
          label: "Nueva salida",
          command: () => {
            navigate("/");
          },
        },
        {
          label: "Ver salidas",
          command: () => {
            navigate("/test");
          },
        },
      ],
    },
    {
      label: "Almacen",
      icon: "pi pi-warehouse",
      items: [
        {
          label: "Repuestos/Mod.",
        },
        {
          label: "Alta rep.",
        },
        {
          label: "Ubicaciones",
        },
        {
          label: "Técnicos",
        },
      ],
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
      label: "Mantenimiento",
      icon: "pi pi-wrench",
      items: [
        {
          label: "Almacenes",
        },
        {
          label: "Entrada proveedores",
        },
      ],
    },
    {
      label: "Copias de seguridad",
      icon: "pi pi-clock",
      items: [
        {
          label: "Crear",
        },
        {
          label: "Restaurar",
        },
      ],
    },
  ];

  return (
    <div className="w-full">
      <Menubar
        model={items}
        className="text-sm h-3rem w-6 mx-auto justify-content-center bg-primary"
      />
    </div>
  );
}

export default Header;
