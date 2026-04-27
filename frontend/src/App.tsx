import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { PrimeReactProvider } from "primereact/api";
import "primeicons/primeicons.css";
import "../node_modules/primeflex/primeflex.css";
import Layout from "./layouts/MainLayout";
import Index from "./pages/Index";
import ListWithdraws from "./pages/Withdraws/ListWithdraws";
import NewWithdraw from "./pages/Withdraws/NewWithdraw";

function App() {
  return (
    <PrimeReactProvider>
      <div className="w-full h-full">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="withdraw/">
                <Route index element={<ListWithdraws />} />
                <Route path="new/" element={<NewWithdraw />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </PrimeReactProvider>
  );
}

export default App;
