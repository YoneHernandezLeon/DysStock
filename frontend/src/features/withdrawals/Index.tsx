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

interface WithdrawalLine {
  id: number;
  reference_code: string;
  description: string;
  quantity: number;
  location: string;
}

interface Withdrawal {
  id: number;
  worker: string;
  date: string;
  lines: WithdrawalLine[];
}

function Withdrawals() {
  const [visible, setVisible] = useState<boolean>(false);
  const [withdrawals, setWithdrawals] = useState<DataTableValue[]>([]);
  const [expandedRows, setExpandedRows] = useState<
    DataTableExpandedRows | DataTableValueArray | undefined
  >(undefined);
  const [refresh, setRefresh] = useState<boolean>(false);

  const mainToast = useRef<Toast>(null);
  const safetyToast = useRef<Toast>(null);

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

  const printSubRows = (rowData: Withdrawal): void => {
    console.log(rowData);
    const subRows: WithdrawalLine[] = rowData.lines || [];

    if (subRows.length === 0) {
      alert("Esta fila no tiene datos expandidos para imprimir.");
      return;
    }

    // Abrir la ventana del navegador (puede retornar null si un bloqueador de popups actúa)
    const printWindow = window.open("", "_blank", "width=800,height=800");

    if (!printWindow) {
      alert("Por favor, permite los pop-ups para poder imprimir los detalles.");
      return;
    }

    // Construir el documento HTML estático
    const htmlContent = `
          <html>
            <head>
                <title>Imprimir Detalles - Salida nº ${rowData.id}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
                    h2 { border-bottom: 2px solid #333; padding-bottom: 5px; }
                    table { width: 100%; border-collapse: collapse; margin-top: 25px; font-size: 13px; }
                    th { border: 1px solid #ddd; padding: 10px; text-align: left; background-color: #f4f4f4;}
                    td { border-left: 1px solid #ddd;; border-right solid #ddd;: 1px; padding: 10px; text-align: left; }
                    tbody { border: 1px solid #ddd; }
                </style>
            </head>
            <body>
                <h2>Detalles Expandidos de salida nº ${rowData.id}</h2>
                <p><strong>Empleado:</strong> <i>${rowData.worker}</i></p>
                <p><strong>Fecha:</strong>  <i>${rowData.date}</i></p>
                <table>
                    <thead>
                        <tr>
                            <th>Referencia</th>
                            <th>Artículo</th>
                            <th>Cantidad</th>
                            <th>Ubicación</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${subRows
                          .map(
                            (item) => `
                            <tr>
                                <td>${item.reference_code}</td>
                                <td>${item.description}</td>
                                <td>${item.quantity}</td>
                                <td>${item.location}</td>
                            </tr>
                        `,
                          )
                          .join("")}
                    </tbody>
                </table>
                <script>
                    window.onload = function() {
                        window.print();
                        window.close();
                    }
                </script>
            </body>
          </html>
        `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  const secondActionTemplate = (rowData: Withdrawal) => {
    return (
      <Button
        icon="pi pi-print"
        className="p-button-rounded p-button-text p-button-help"
        tooltip="Imprimir subfilas"
        onClick={() => printSubRows(rowData)}
      />
    );
  };

  const actionTemplate = (rowData: WithdrawalLine) => {
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
      mainToast.current?.show({
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

  const rowExpansionTemplate = (data: Withdrawal) => {
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
      } catch (err) {
        console.error(err);
      }
    };

    fetchWithdrawals();
  }, [refresh]);

  const closeDialog: CallableFunction = (data: string[]) => {
    setVisible(false);
    mainToast.current?.show({
      severity: "success",
      summary: "¡Hecho!",
      detail: "Se ha creado la salida correctamente",
      life: 3000,
    });
    if (data.length != 0) {
      data.forEach((item) => {
        safetyToast.current?.show({
          severity: "error",
          summary: "¡Articulo bajo mínimos!",
          detail: item,
          sticky: true,
        });
      });
    }
    setRefresh(!refresh);
  };

  return (
    <div className="basic-panel withdrawal">
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
      <Toast ref={mainToast} />
      <Toast ref={safetyToast} position="bottom-left" />
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
        <Column body={secondActionTemplate} />
      </DataTable>
    </div>
  );
}

export default Withdrawals;
