import { useContext, useEffect } from "react";
import { Global } from "./Global";
import axios from "axios";

const URL = "http://localhost:3006/modal";

function ModalBtns({ li }) {
  const { setEditSum, editSum, setEditSumResponse, lastUpdate, cartList } =
    useContext(Global);
  const changeCartAmountPlusHandler = () => {
    setEditSum({ id: li.id, amount: li.amount + 1 });
  };

  useEffect(() => {
    if (editSum === null) {
      return;
    }
    axios
      .put(URL + "/" + editSum.id, { id: editSum.id, amount: editSum.amount })
      .then((res) => {
        setEditSumResponse(res.data);
      });
  }, [editSum]);

  return (
    <div className="modal-container__modal__list--right">
      <button onClick={changeCartAmountPlusHandler}>+</button>
      <button>-</button>
    </div>
  );
}

export default ModalBtns;
