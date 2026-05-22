import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { FloatLabel } from "primereact/floatlabel";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useState } from "react";

function ItemRegistrationPanel() {
  const [referenceCode, setReferenceCode] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [stock, setStock] = useState<number>(0);
  const [safetyStock, setSafetyStock] = useState<number>(0);
  const [safetyWarning, setSafetyWarning] = useState<boolean>(true);
  const [observations, setObservations] = useState<string>("");

  return (
    <div className="flex flex-column gap-3 m-2">
      <FloatLabel>
        <InputText
          id="it-reference-code"
          value={referenceCode}
          onChange={(e) => setReferenceCode(e.target.value)}
          className="w-full"
        />
        <label htmlFor="it-reference-code">Referencia</label>
      </FloatLabel>
      <FloatLabel>
        <InputText
          id="it-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full"
        />
        <label htmlFor="it-description">Descripción</label>
      </FloatLabel>
      <div className="flex flex-wrap gap-2 justify-content-between">
        <FloatLabel>
          <InputNumber
            id="in-stock"
            value={stock}
            onChange={(e) => setStock(e.value as number)}
            size={2}
          />
          <label htmlFor="in-stock">Stock</label>
        </FloatLabel>
        <FloatLabel>
          <InputNumber
            id="in-safety-stock"
            value={safetyStock}
            onChange={(e) => setSafetyStock(e.value as number)}
            size={2}
          />
          <label htmlFor="in-safety-stock">B.M.</label>
        </FloatLabel>
        <div className="flex flex-wrap gap-1 justify-content-between">
          <label
            className="mx-auto align-self-center"
            style={{ height: "18px" }}
          >
            ¿Aviso B.M.?
          </label>
          <Checkbox
            checked={safetyWarning}
            onChange={() => setSafetyWarning(!safetyWarning)}
            className="align-self-center"
          />
        </div>
      </div>
      <FloatLabel>
        <InputTextarea
          id="ita-observations"
          value={observations}
          onChange={(e) => setObservations(e.target.value)}
          className="w-full text-sm"
          rows={5}
        />
        <label htmlFor="ita-observations">Observaciones</label>
      </FloatLabel>
      <Button
        size="small"
        severity="success"
        label="Dar de alta"
        onClick={() => console.log()}
      />
    </div>
  );
}

export default ItemRegistrationPanel;
