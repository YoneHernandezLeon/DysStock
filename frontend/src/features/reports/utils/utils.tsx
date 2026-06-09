import { getXlsxByReferenceCode, getXlsxBySafetyStock } from "../../../api/api";
import type {
  Item,
  ItemByLocation,
  ItemsByLocation,
} from "../../../types/withdrawals";

export const xlsxByReferenceCode = async () => {
  try {
    const data = await getXlsxByReferenceCode();

    const url = window.URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "articulos_por_referencia.xlsx");
    document.body.appendChild(link);
    link.click();

    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error(err);
  }
};

export const printByReferenceCode = (itemsByReference: Item[]): void => {
  const printWindow = window.open("", "_blank", "width=800,height=800");

  if (!printWindow) {
    alert("Por favor, permite los pop-ups para poder imprimir los detalles.");
    return;
  }

  const htmlContent = `
          <html>
            <head>
                <title>Listado de artículos por referencia</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
                    h2 { border-bottom: 2px solid #333; padding-bottom: 5px; }
                    table { width: 100%; border-collapse: collapse; margin-top: 25px; font-size: 14px; }
                    th { border: 1px solid #ddd; padding: 10px; text-align: left; background-color: #dbebd1;}
                    td { border: 1px solid #ddd; padding: 2px; text-align: left; }
                    tbody { border: 1px solid #ddd; }
                </style>
            </head>
                <table>
                    <thead>
                        <tr>
                            <th>Referencia</th>
                            <th>Artículo</th>
                            <th>Ubicación</th>
                            <th>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsByReference
                          ?.map(
                            (item: Item) => `
                            <tr>
                                <td>${item.reference_code}</td>
                                <td>${item.description}</td>
                                <td>${item.location__code}</td>
                                <td>${item.stock}</td>
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

export const xlsxByLocation = async () => {
  try {
    const data = await getXlsxByReferenceCode();

    const url = window.URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "articulos_por_referencia.xlsx");
    document.body.appendChild(link);
    link.click();

    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error(err);
  }
};

export const printByLocation = (itemsByLocation: ItemsByLocation[]): void => {
  const printWindow = window.open("", "_blank", "width=800,height=800");

  if (!printWindow) {
    alert("Por favor, permite los pop-ups para poder imprimir los detalles.");
    return;
  }

  const htmlContent = `
          <html>
            <head>
                <title>Listado de artículos por ubicación</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
                    h2 { border-bottom: 2px solid #333; padding-bottom: 5px; }
                    table { width: 100%; border-collapse: collapse; margin-top: 25px; font-size: 14px; }
                    th { border: 1px solid #ddd; padding: 10px; text-align: left; background-color: #ebd1d1;}
                    td { border: 1px solid #ddd; padding: 2px; text-align: left; }
                    tbody { border: 1px solid #ddd; }

                    .col-referencia { width: 170px; }
                    .col-stock { width: 10px; text-align: center; } /* Alineado a la derecha por estética de números */
                    .col-check { width: 10px; text-align: center; } /* Centrado para el checkbox */
                </style>
            </head>
                ${itemsByLocation
                  ?.map(
                    (locatedItems: ItemsByLocation) => `
                        <table>
                            <colgroup>
                                <col class="col-referencia">
                                <col> <!-- Sin clase: ocupa todo el ancho restante (Artículo) -->
                                <col class="col-stock">
                                <col class="col-check">
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>Referencia (${locatedItems.location})</th>
                                    <th>Artículo</th>
                                    <th>Stock</th>
                                    <th>Check</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${locatedItems.items
                                  ?.map(
                                    (item: ItemByLocation) => `
                                    <tr>
                                        <td>${item.reference_code}</td>
                                        <td>${item.description}</td>
                                        <td>${item.stock}</td>
                                        <td></td>
                                    </tr>
                                `,
                                  )
                                  .join("")}
                            </tbody>
                        </table>
                    `,
                  )
                  .join("")}
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

export const xlsxBySafetyStock = async () => {
  try {
    const data = await getXlsxBySafetyStock();

    const url = window.URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "articulos_bajo_minimos.xlsx");
    document.body.appendChild(link);
    link.click();

    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error(err);
  }
};

export const printBySafetyStock = (itemsBySafetyStock: Item[]): void => {
  const printWindow = window.open("", "_blank", "width=800,height=800");

  if (!printWindow) {
    alert("Por favor, permite los pop-ups para poder imprimir los detalles.");
    return;
  }

  const htmlContent = `
          <html>
            <head>
                <title>Listado de artículos bajo mínimos</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
                    h2 { border-bottom: 2px solid #333; padding-bottom: 5px; }
                    table { width: 100%; border-collapse: collapse; margin-top: 25px; font-size: 14px; }
                    th { border: 1px solid #ddd; padding: 10px; text-align: left; background-color: #d1e1eb;}
                    td { border: 1px solid #ddd; padding: 2px; text-align: left; }
                    tbody { border: 1px solid #ddd; }
                </style>
            </head>
                <table>
                    <thead>
                        <tr>
                            <th>Referencia</th>
                            <th>Artículo</th>
                            <th>Ubicación</th>
                            <th>Stock</th>
                            <th>Mínimo</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsBySafetyStock
                          ?.map(
                            (item: Item) => `
                            <tr>
                                <td>${item.reference_code}</td>
                                <td>${item.description}</td>
                                <td>${item.location__code}</td>
                                <td>${item.stock}</td>
                                <td>${item.safety_stock}</td>
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
