import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

function ItemPanel() {
  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-900 font-bold pl-2 py-2">ARTÍCULOS</span>
      <Button
        label="Nuevo item"
        icon="pi pi-plus"
        severity="success"
        raised
        size="small"
        className="text-sm"
        onClick={() => {}}
      />
    </div>
  );

  const footer = (
    <span className="font-italic font-light">Se han encontrado artículos.</span>
  );

  return (
    <div>
      <DataTable
        header={header}
        footer={footer}
        stripedRows
        paginator
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        rows={50}
        rowsPerPageOptions={[50, 100, 200]}
        size="small"
        scrollable
        scrollHeight="41rem"
        editMode="row"
        tableStyle={{ minWidth: "55rem" }}
        className="text-sm compact-table shadow-4 border-round-lg p-1"
      >
        <Column expander={true} style={{ width: "5rem" }} />
        <Column field="id" header="Referencia" />
        <Column field="worker" header="Descripción" />
        <Column field="date" header="Ubicación" />
        <Column field="date" header="Stock" />
        <Column field="date" header="Stock bajo mínimos" />
        <Column field="date" header="Observaciones" />
      </DataTable>
    </div>
  );
}

export default ItemPanel;
