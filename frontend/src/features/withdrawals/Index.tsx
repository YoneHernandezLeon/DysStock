import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import {
  DataTable,
  type DataTableExpandedRows,
  type DataTableValue,
  type DataTableValueArray,
} from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { useEffect, useRef, useState } from "react";
import NewWithdrawalPanel from "./components/NewWIthdrawalPanel";
import { Toast } from "primereact/toast";
import { deleteWithdrawalLine, getWithdrawals } from "../../api/api";

function Withdrawals() {
  const [visible, setVisible] = useState<boolean>(false);
  const [withdrawals, setWithdrawals] = useState<DataTableValue[]>([]);
  const [expandedRows, setExpandedRows] = useState<
    DataTableExpandedRows | DataTableValueArray | undefined
  >(undefined);
  const [refresh, setRefresh] = useState<boolean>(false);

  const toast = useRef<Toast>(null);

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

  // You can customize this further based on your specific needs.
  // For instance, you might want to add a delete button on the row:
  const actionTemplate = (rowData: DataTableValue) => {
    return (
      <Button
        icon="pi pi-trash"
        size="small"
        severity="danger"
        text
        onClick={() => {
          deleteConfirmation(rowData.id);
        }}
      />
    );
  };

  const deleteConfirmation = (id: number) => {
    confirmDialog({
      message: "¿Seguro que quieres eliminar esta línea?",
      header: "Confirmación de eliminación",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      accept: () => deleteRow(id),
      reject: () => {},
    });
  };

  const deleteRow = async (id: number) => {
    try {
      const data = await deleteWithdrawalLine(id);
      console.log(data);
      toast.current?.show({
        severity: "success",
        summary: "¡Hecho!",
        detail: "Se ha eliminado la linea correctamente",
        life: 3000,
      });
      setRefresh(!refresh);
    } catch (err) {
      console.error(err);
    }
  };

  const rowExpansionTemplate = (data: DataTableValue) => {
    return (
      <div>
        <DataTable
          value={data.lines}
          size="small"
          className="text-xs p-1"
          id="expanded-row"
        >
          <Column field="id"></Column>
          <Column field="reference_code" header="Referencia"></Column>
          <Column field="description" header="Producto"></Column>
          <Column field="quantity" header="Cantidad"></Column>
          <Column field="location" header="Ubicación"></Column>
          <Column body={actionTemplate} />
        </DataTable>
      </div>
    );
  };

  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const data = await getWithdrawals();
        setWithdrawals(data);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchWithdrawals();
  }, [refresh]);

  const closeDialog: CallableFunction = () => {
    setVisible(false);
    toast.current?.show({
      severity: "success",
      summary: "¡Hecho!",
      detail: "Se ha creado la salida correctamente",
      life: 3000,
    });
    setRefresh(!refresh);
  };

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
        <NewWithdrawalPanel updateDialog={closeDialog} />
      </Dialog>
      <ConfirmDialog />
      <Toast ref={toast} />
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
        <Column field="id" header="Código" />
        <Column field="worker" header="Técnico" />
        <Column field="date" header="Fecha" />
      </DataTable>
    </div>
  );
}

export default Withdrawals;
