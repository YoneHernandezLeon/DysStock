import axios from "axios";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dropdown, type DropdownChangeEvent } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";

interface Worker {
  codcliente: number;
  nombre: string;
}

interface Item {
  codarticulo: number;
  referencia: string;
  descripcion: string;
  stock: number;
  stock_minimo: number;
}

function NewWithdrawalPanel() {
  const [description, setDescription] = useState<string>("");
  const [items, setItems] = useState<Item[]>([]);
  const [articleVisibility, setArticleVisibility] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);

  const workerOptionTemplate = (option: Worker) => {
    return (
      <span>
        {option.codcliente} - {option.nombre}
      </span>
    );
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/workers/")
      .then((res) => {
        setWorkers(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

    axios
      .get("http://localhost:8000/api/items/")
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const selectWorker = (e: DropdownChangeEvent) => {
    setSelectedWorker(e.value);
    setArticleVisibility(true);
  };

  const selectItem = (e: DropdownChangeEvent) => {
    setSelectedItem(e.value);
    setDescription(e.value.descripcion);
  };

  return (
    <div className="flex flex-column">
      <div className="p-inputgroup flex-1 my-2">
        <span className="p-inputgroup-addon">
          <i className="pi pi-user"></i>
        </span>
        <FloatLabel>
          <Dropdown
            inputId="dd-worker"
            value={selectedWorker}
            itemTemplate={workerOptionTemplate}
            onChange={(e) => selectWorker(e)}
            options={workers}
            optionLabel="nombre"
            className="w-full md:w-14rem"
          />
          <label htmlFor="dd-worker">Empleado</label>
        </FloatLabel>
      </div>
      <div
        className="flex w-full my-2 gap-2"
        style={{ visibility: articleVisibility ? "visible" : "hidden" }}
      >
        <FloatLabel>
          <Dropdown
            inputId="dd-item"
            value={selectedItem}
            onChange={(e) => selectItem(e)}
            options={items}
            optionLabel="referencia"
            className="w-full md:w-14rem"
            virtualScrollerOptions={{ itemSize: 38 }}
            filter
          />
          <label htmlFor="dd-item">Artículo</label>
        </FloatLabel>
        <FloatLabel className="flex flex-grow-1">
          <InputText
            id="it-description"
            value={description}
            disabled
            className="flex-grow-1"
          />
          <label htmlFor="it-description">Descripción</label>
        </FloatLabel>
        <FloatLabel>
          <InputNumber inputId="in-quantity" value={1}></InputNumber>
          <label htmlFor="in-quantity">Cantidad</label>
        </FloatLabel>
        <Button icon="pi pi-plus" className="my-1" size="small" />
      </div>
      <Card
        className="item-panel my-2 shadow-0"
        style={{ height: "34rem" }}
      ></Card>
      <Button
        className="mt-2 ml-auto mr-1"
        label="Crear salida"
        severity="success"
      />
    </div>
  );
}

export default NewWithdrawalPanel;
