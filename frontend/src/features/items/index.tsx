import { Dialog } from "primereact/dialog";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Toast } from "primereact/toast";
import { getItems, updateStock } from "../../api/api";
import type { Item } from "../../types/withdrawals";
import { DataTable, type DataTableValue } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { FilterMatchMode } from "primereact/api";
import { InputNumber } from "primereact/inputnumber";
import { FloatLabel } from "primereact/floatlabel";

function Items() {
  const [refresh, setRefresh] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(false);
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<DataTableValue | null>();
  const [stockToAdd, setStockToAdd] = useState<number>(0);
  const [filters] = useState({
    reference_code: { value: null, matchMode: FilterMatchMode.CONTAINS },
    description: { value: null, matchMode: FilterMatchMode.CONTAINS },
    location__code: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const mainToast = useRef<Toast>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getItems();
        setItems(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchItems();
  }, [refresh]);

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-900 font-bold pl-2 py-2">ARTÍCULOS</span>
    </div>
  );

  const footer = (
    <span className="font-italic font-light">
      Se han encontrado {items ? items.length : 0} artículos.
    </span>
  );

  const addStockTemplate = (rowData: DataTableValue) => {
    return (
      <Button
        icon="pi pi-plus"
        size="small"
        severity="info"
        text
        onClick={() => manageStockDialog(rowData)}
      />
    );
  };

  const manageStockDialog = (rowData: DataTableValue) => {
    setSelectedItem(rowData);
    setVisible(true);
  };

  const addStock = async () => {
    try {
      await updateStock({
        reference_code: selectedItem?.reference_code,
        stock: stockToAdd,
      });
      setRefresh(!refresh);
      setStockToAdd(0);
      setVisible(false);
      mainToast.current?.show({
        severity: "success",
        summary: "¡Hecho!",
        detail: "Se ha añadido el stock correctamente",
        life: 3000,
      });
      console.log("Exito");
    } catch (err) {
      console.error(err);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addStock();
    }
  };

  return (
    <div className="basic-panel items">
      <Dialog
        header="Añadir stock"
        visible={visible}
        style={{ width: "18vw" }}
        onHide={() => {
          setStockToAdd(0);
          if (!visible) return;
          setVisible(false);
        }}
      >
        <div className="flex flex-column gap-2 m-2">
          <label className="font-italic">
            Ref. {selectedItem?.reference_code}
          </label>
          <label className="font-italic">{selectedItem?.description}</label>

          <div className="flex flex-row gap-3 mt-3">
            <FloatLabel>
              <InputNumber
                id="in-stock-to-add"
                value={stockToAdd}
                onChange={(e) => setStockToAdd(e.value as number)}
                min={0}
                onKeyDown={handleKeyDown}
              />
              <label htmlFor="in-stock-to-add">Unidades</label>
            </FloatLabel>
            <Button
              size="small"
              severity="success"
              label="Añadir"
              onClick={() => addStock()}
            />
          </div>
        </div>
      </Dialog>
      <Toast ref={mainToast} />
      <div className="flex flex-row gap-2 justify-content-center">
        <DataTable
          header={header}
          footer={footer}
          stripedRows
          showGridlines
          paginator
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          rows={50}
          rowsPerPageOptions={[50, 100, 200]}
          size="small"
          scrollable
          scrollHeight="41rem"
          editMode="row"
          tableStyle={{ minWidth: "85rem" }}
          className="text-sm compact-table shadow-4 border-round-lg p-1"
          value={items}
          removableSort
          filters={filters}
          filterDisplay="row"
        >
          <Column
            field="reference_code"
            header="Referencia"
            style={{ minWidth: "9.41rem" }}
            sortable
            filter
            filterPlaceholder="Buscar por referencia"
          />
          <Column
            field="description"
            header="Descripción"
            style={{ minWidth: "26.3rem" }}
            filter
            filterPlaceholder="Buscar por descripción"
          />
          <Column
            field="location__code"
            header="Ubicación"
            style={{ minWidth: "6.7rem" }}
            sortable
            filter
            filterPlaceholder="Buscar por ubicación"
          />
          <Column field="stock" header="Stock" style={{ minWidth: "4rem" }} />
          <Column
            field="safety_stock"
            header="B.M."
            style={{ minWidth: "4rem" }}
            headerTooltip="Stock Bajo Mínimos"
            headerTooltipOptions={{ showDelay: 300, position: "top" }}
          />
          <Column
            field="observations"
            header="Observaciones"
            style={{ width: "17rem" }}
          />
          <Column body={addStockTemplate} />
        </DataTable>
      </div>
    </div>
  );
}

export default Items;
