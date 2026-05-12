import axios from "axios";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dropdown, type DropdownChangeEvent } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import {
  InputNumber,
  type InputNumberValueChangeEvent,
} from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { useEffect, useState } from "react";

interface Worker {
  id: number;
  code: number;
  name: string;
}

interface Item {
  id: number;
  reference_code: string;
  description: string;
  stock: number;
  safety_stock: number;
}

interface SelectedItem {
  id: number;
  reference_code: string;
  description: string;
  quantity: number;
}

interface Props {
  updateDialog: CallableFunction;
}

function NewWithdrawalPanel(props: Props) {
  const [quantity, setQuantity] = useState<number>(0);
  const [invalidQuantity, setInvalidQuantity] = useState<boolean>(false);
  const [disabledAddButton, setDisabledAddButton] = useState<boolean>(true);
  const [actualStock, setActualStock] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [disabledArticleSelector, setDisabledArticleSelector] =
    useState<boolean>(true);
  const [disabledQuantitySelector, setDisabledQuantitySelector] =
    useState<boolean>(true);
  const [disabledWithdrawButton, setDisabledWithdrawButton] =
    useState<boolean>(true);
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [withdrawalList, setWithdrawalList] = useState<SelectedItem[]>([]);

  const workerOptionTemplate = (option: Worker) => {
    return (
      <span>
        {option.code} - {option.name}
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
    resetArticleForm();
  };

  const resetArticleForm = (fullReset: boolean = true) => {
    setSelectedItem(null);
    setDescription("");
    setActualStock(0);
    setQuantity(0);
    setDisabledArticleSelector(false);
    setDisabledQuantitySelector(true);
    setInvalidQuantity(true);
    setDisabledAddButton(true);
    if (fullReset) {
      setWithdrawalList([]);
      setDisabledWithdrawButton(true);

      axios
        .get("http://localhost:8000/api/items/")
        .then((res) => {
          setItems(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const selectItem = (e: DropdownChangeEvent) => {
    setSelectedItem(e.value);
    setDescription(e.value.description);
    setActualStock(e.value.stock);
    setQuantity(0);
    setInvalidQuantity(true);
    setDisabledQuantitySelector(false);
    setDisabledAddButton(true);
  };

  const checkStock = (e: InputNumberValueChangeEvent) => {
    if (e.value) {
      setQuantity(e.value);
      if (e.value > actualStock || e.value == 0) {
        setInvalidQuantity(true);
        setDisabledAddButton(true);
      } else {
        setInvalidQuantity(false);
        setDisabledAddButton(false);
      }
    }
  };

  const addItem = () => {
    const list = [...withdrawalList];
    const stocks = [...items];

    let item: SelectedItem = {
      id: 0,
      reference_code: "",
      description: "",
      quantity: 0,
    };

    const modifiedStock: Item = {
      id: 0,
      reference_code: "",
      description: "",
      stock: 0,
      safety_stock: 0,
    };

    const existingItemId = list.findIndex(
      (a) => a.reference_code === (selectedItem?.reference_code as string),
    );

    if (existingItemId >= 0) {
      item.id = list[existingItemId].id as number;
      item.reference_code = list[existingItemId].reference_code as string;
      item.description = list[existingItemId].description as string;
      item.quantity = list[existingItemId].quantity + quantity;

      list.splice(existingItemId, 1);
    } else {
      item = {
        id: selectedItem?.id as number,
        reference_code: selectedItem?.reference_code as string,
        description: selectedItem?.description as string,
        quantity: quantity,
      };
    }

    const stockedItemId = stocks.findIndex(
      (a) => a.reference_code === (selectedItem?.reference_code as string),
    );

    modifiedStock.id = stocks[stockedItemId].id;
    modifiedStock.reference_code = stocks[stockedItemId].reference_code;
    modifiedStock.description = stocks[stockedItemId].description;
    modifiedStock.stock = stocks[stockedItemId].stock - quantity;
    modifiedStock.safety_stock = stocks[stockedItemId].safety_stock;

    stocks.splice(stockedItemId, 1);

    setWithdrawalList([...list, item]);
    setItems([...stocks, modifiedStock]);
    setDisabledWithdrawButton(false);

    resetArticleForm(false);
  };

  const withdraw = () => {
    axios({
      method: "POST",
      url: "http://localhost:8000/api/withdrawals/",
      data: { worker: selectedWorker?.id, lines: withdrawalList },
    })
      .then((res) => console.log(res))
      .catch((err) => {
        console.error(err);
      });
    props.updateDialog();
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
            optionLabel="name"
            className="w-full md:w-14rem"
          />
          <label htmlFor="dd-worker">Empleado</label>
        </FloatLabel>
      </div>
      <div className="flex w-full my-2 gap-2">
        <FloatLabel>
          <Dropdown
            inputId="dd-item"
            value={selectedItem}
            disabled={disabledArticleSelector}
            onChange={(e) => selectItem(e)}
            options={items}
            optionLabel="reference_code"
            className="w-full md:w-14rem h-full"
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
        <FloatLabel className="p-inputgroup flex-1 flex">
          <InputNumber
            invalid={invalidQuantity}
            disabled={disabledQuantitySelector}
            inputId="in-quantity"
            value={quantity}
            onValueChange={(e) => checkStock(e)}
          ></InputNumber>
          <label htmlFor="in-quantity">Cantidad</label>
          <Tag severity="contrast" className="border-round-right-sm">
            /{actualStock} u.
          </Tag>
        </FloatLabel>
        <Button
          icon="pi pi-plus"
          className="my-1"
          size="small"
          severity="success"
          disabled={disabledAddButton}
          onClick={() => addItem()}
        />
      </div>
      <Card style={{ height: "34rem" }} title="Lista de articulos">
        <DataTable
          value={withdrawalList}
          stripedRows
          scrollable
          scrollHeight="29rem"
          editMode="row"
          tableStyle={{ minWidth: "55rem" }}
          className="text-sm compact-table shadow-4 border-round-lg p-1"
          emptyMessage="No se han añadido artículos."
        >
          <Column field="reference_code" header="Referencia" />
          <Column field="description" header="Descripción" />
          <Column field="quantity" header="Cantidad" />
        </DataTable>
      </Card>
      <Button
        className="mt-2 ml-auto mr-1"
        label="Crear salida"
        severity="success"
        disabled={disabledWithdrawButton}
        onClick={() => withdraw()}
      />
    </div>
  );
}

export default NewWithdrawalPanel;
