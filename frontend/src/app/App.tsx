import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { addLocale, locale, PrimeReactProvider } from "primereact/api";
import "primeicons/primeicons.css";
import "../../node_modules/primeflex/primeflex.css";
import Layout from "../layouts/MainLayout";
import Index from "../features/main";
import Items from "../features/items";
import Withdrawals from "../features/withdrawals";
import Reports from "../features/reports";

function App() {
  addLocale("es", {
    startsWith: "Comienza con",
    contains: "Contiene",
    notContains: "No contiene",
    endsWith: "Termina con",
    equals: "Igual a",
    notEquals: "Diferente de",
    noFilter: "Sin filtro",
    lt: "Menor que",
    lte: "Menor o igual a",
    gt: "Mayor que",
    gte: "Mayor o igual a",
    dateIs: "Fecha es",
    dateIsNot: "Fecha no es",
    dateBefore: "Fecha es antes",
    dateAfter: "Fecha es después",
    clear: "Limpiar",
    apply: "Aplicar",
    matchAll: "Coincidir con todo",
    matchAny: "Coincidir con cualquiera",
    addRule: "Agregar regla",
    removeRule: "Eliminar regla",
    accept: "Sí",
    reject: "No",
    choose: "Elegir",
    upload: "Subir",
    cancel: "Cancelar",
    dayNames: [
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
    ],
    dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
    dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
    monthNames: [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ],
    monthNamesShort: [
      "ene",
      "feb",
      "mar",
      "abr",
      "may",
      "jun",
      "jul",
      "ago",
      "sep",
      "oct",
      "nov",
      "dic",
    ],
    today: "Hoy",
    weekHeader: "Sm",
    firstDayOfWeek: 1,
    emptyFilterMessage: "No se encontraron resultados",
    emptyMessage: "No hay opciones disponibles",
  });

  locale("es");

  return (
    <PrimeReactProvider>
      <div className="w-full h-full">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="withdraw/" element={<Withdrawals />} />
              <Route path="items/" element={<Items />} />
              <Route path="reports/" element={<Reports />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </PrimeReactProvider>
  );
}

export default App;
