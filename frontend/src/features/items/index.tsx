import { Dialog } from "primereact/dialog";
import { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { getWithdrawals } from "../../api/api";
import ItemPanel from "./components/ItemPanel";

function Items() {
  const [visible, setVisible] = useState<boolean>(false);

  const toast = useRef<Toast>(null);

  // You can customize this further based on your specific needs.
  // For instance, you might want to add a delete button on the row:

  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const data = await getWithdrawals();
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchWithdrawals();
  }, []);

  return (
    <div className="basic-panel items">
      <Dialog
        header="Nueva salida"
        visible={visible}
        style={{ width: "60vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      ></Dialog>
      <Toast ref={toast} />
      <div className="flex flex-row gap-2 justify-content-center">
        <ItemPanel />
      </div>
    </div>
  );
}

export default Items;
