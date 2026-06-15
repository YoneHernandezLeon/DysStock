import { Badge } from "primereact/badge";
import { Menubar } from "primereact/menubar";
import type { MenuItem, MenuItemOptions } from "primereact/menuitem";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getItemsUnderSafety } from "../api/api";

interface CustomMenuItem extends MenuItem {
  badge?: string | number;
  badgeSeverity?:
    | "success"
    | "info"
    | "warning"
    | "danger"
    | "secondary"
    | "contrast";
}

function Header() {
  const isDevelopment = import.meta.env.VITE_APP_ENV === "development";

  const navigate = useNavigate();
  const [underSafety, setUnderSafety] = useState<number>(0);

  useEffect(() => {
    const fetchUnderSafety = async () => {
      try {
        const data = await getItemsUnderSafety();
        setUnderSafety(data.length);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUnderSafety();
  }, []);

  const itemTemplate = (item: CustomMenuItem, options: MenuItemOptions) => {
    return (
      <a className="p-menuitem-link" onClick={options.onClick} role="menuitem">
        <span className={item.icon} />
        <span className="mx-2">{item.label}</span>
        {item.badge && (
          <Badge
            value={item.badge}
            severity={item.badgeSeverity}
            size="normal"
            className="ml-auto"
          />
        )}
      </a>
    );
  };

  const items: CustomMenuItem[] = [
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
      badge: underSafety,
      badgeSeverity: "danger",
      template: (item, options) =>
        itemTemplate(item as CustomMenuItem, options),
      command: () => {
        navigate("/reports");
      },
    },
    {
      label: "Gráficos",
      icon: "pi pi-chart-bar",
      command: () => {
        window.location.href = "/graphs/";
      },
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
        className={
          isDevelopment
            ? "dev-env text-sm h-3rem w-5 mx-auto justify-content-center shadow-4"
            : "text-sm h-3rem w-5 mx-auto justify-content-center shadow-4"
        }
      />
    </div>
  );
}

export default Header;
