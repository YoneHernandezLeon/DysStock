import { Button } from "primereact/button";
import { TabPanel, TabView } from "primereact/tabview";
import type { Item, ItemsByLocation } from "../../types/withdrawals";
import { useEffect, useState } from "react";
import {
  getItems,
  getItemsByLocation,
  getItemsUnderSafety,
} from "../../api/api";
import {
  printByLocation,
  printByReferenceCode,
  printBySafetyStock,
  xlsxByReferenceCode,
  xlsxBySafetyStock,
} from "./utils/utils";

function Reports() {
  const [itemsByReference, setItemsByReference] = useState<Item[]>();
  const [itemsByLocation, setItemsByLocation] = useState<ItemsByLocation[]>();
  const [itemsBySafetyStock, setItemsBySafetyStock] = useState<Item[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [byReference, byLocation, bySafetyStock] = await Promise.all([
          getItems(),
          getItemsByLocation(),
          getItemsUnderSafety(),
        ]);
        setItemsByReference(byReference);
        setItemsByLocation(byLocation);
        setItemsBySafetyStock(bySafetyStock);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className="basic-panel items shadow-4 mt-3"
      style={{ width: "55 rem" }}
    >
      <TabView style={{ width: "55 rem" }}>
        <TabPanel header="Listado por ref.">
          <h2 className="text-center">Listado de artículos por referencia</h2>
          <div className="flex gap-6 justify-content-center my-4">
            <Button
              size="large"
              severity="danger"
              onClick={() => printByReferenceCode(itemsByReference as Item[])}
              icon="pi pi-file-pdf"
            >
              Imprimir pdf
            </Button>
            <Button
              size="large"
              severity="success"
              onClick={() => xlsxByReferenceCode()}
              icon="pi pi-file-excel"
            >
              Descargar xlsx
            </Button>
          </div>
        </TabPanel>
        <TabPanel header="Listado por ubi.">
          <h2 className="text-center">Listado de artículos por ubicación</h2>
          <div className="flex gap-6 justify-content-center my-4">
            <Button
              size="large"
              severity="danger"
              onClick={() =>
                printByLocation(itemsByLocation as ItemsByLocation[])
              }
              icon="pi pi-file-pdf"
            >
              Imprimir pdf
            </Button>
            <Button
              size="large"
              severity="success"
              icon="pi pi-file-excel"
              tooltip="En desarrollo"
            >
              Descargar xlsx
            </Button>
          </div>
        </TabPanel>
        <TabPanel header="Listado bajo min.">
          <h2 className="text-center">Listado de artículos bajo mínimos</h2>
          <div className="flex gap-6 justify-content-center my-4">
            <Button
              size="large"
              severity="danger"
              onClick={() => printBySafetyStock(itemsBySafetyStock as Item[])}
              icon="pi pi-file-pdf"
            >
              Imprimir pdf
            </Button>
            <Button
              size="large"
              severity="success"
              onClick={() => xlsxBySafetyStock()}
              icon="pi pi-file-excel"
            >
              Descargar xlsx
            </Button>
          </div>
        </TabPanel>
      </TabView>
    </div>
  );
}

export default Reports;
