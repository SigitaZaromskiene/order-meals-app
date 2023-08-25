import { Global } from "./Global";
import AddBtn from "./AddBtn";
import { useContext, useEffect } from "react";
// import axios from "axios";
import Message from "./Message";

const URL = "http://localhost:3006/menu";

function List() {
  const { menuList, setErrMessage, setMenuList } = useContext(Global);

  // option with axios:

  //   useEffect(() => {
  //     axios
  //       .get(URL)
  //       .then((res) => {
  //         setMenuList(res.data);
  //       })
  //       .catch((err) => setErrMessage(err.message));
  //   }, [setErrMessage, setMenuList]);

  useEffect(() => {
    getMenu();
  }, []);

  async function getMenu() {
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error("OOOPS, something is wrong");
      }
      const data = await response.json();
      setMenuList(data);
    } catch (error) {
      setErrMessage(error.message);
    }
  }

  const addAmountHandler = ({ li }) => {
    return li.amount + 1;
  };
  return (
    <div className="wrapper">
      <ul className="list-container">
        {menuList === null ? (
          <Message />
        ) : (
          menuList.map((li) => (
            <li className="list-container__list" key={li.id}>
              <div className="list-container__list--left">
                <h3>{li.name}</h3>
                <i>{li.description}</i>
                <p>{li.price} &euro;</p>
              </div>
              <div className="list-container__list--right">
                <div className="list-container__list--right--input">
                  <h4>Amount</h4>
                  <input value={li.amount}></input>
                </div>
                <AddBtn li={li} />
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default List;
