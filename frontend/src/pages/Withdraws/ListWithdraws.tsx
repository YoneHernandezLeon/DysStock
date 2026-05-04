import axios from "axios";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import {
  DataTable,
  type DataTableExpandedRows,
  type DataTableValue,
  type DataTableValueArray,
} from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import NewWithdrawalPanel from "../../components/NewWIthdrawalPanel";

function ListWithdraws() {
  const [visible, setVisible] = useState<boolean>(false);
  const [withdrawals, setWithdrawals] = useState<DataTableValue[]>([]);
  const [expandedRows, setExpandedRows] = useState<
    DataTableExpandedRows | DataTableValueArray | undefined
  >(undefined);

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-900 font-bold pl-2 py-2">SALIDAS</span>
      <Button
        label="Nueva salida"
        icon="pi pi-plus"
        severity="success"
        raised
        size="small"
        className="text-sm"
        onClick={() => setVisible(true)}
      />
    </div>
  );
  const footer = (
    <span className="font-italic font-light">
      Se han encontrado {withdrawals ? withdrawals.length : 0} salidas.
    </span>
  );

  const rowExpansionTemplate = (data: DataTableValue) => {
    return (
      <div>
        <DataTable
          value={data.lineas}
          size="small"
          className="text-xs p-1"
          id="expanded-row"
        >
          <Column field="numlinea" header="Linea"></Column>
          <Column field="cantidad" header="Cantidad"></Column>
          <Column field="referencia" header="Referencia"></Column>
          <Column field="producto" header="Producto"></Column>
        </DataTable>
      </div>
    );
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/withdrawals/")
      .then((res) => {
        setWithdrawals(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="basic-panel">
      <Dialog
        header="Nueva salida"
        visible={visible}
        style={{ width: "60vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <NewWithdrawalPanel />
      </Dialog>
      <DataTable
        value={withdrawals}
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
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data)}
        rowExpansionTemplate={rowExpansionTemplate}
      >
        <Column expander={true} style={{ width: "5rem" }} />
        <Column field="codfactura" header="Código" />
        <Column field="cliente" header="Técnico" />
        <Column field="fecha" header="Fecha" />
      </DataTable>
    </div>
  );
}

export default ListWithdraws;
