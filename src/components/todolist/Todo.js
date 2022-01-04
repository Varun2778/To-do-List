import React, { useState, useEffect } from 'react'
import "./style.css";

const getLocalData = () => {
    const lists = localStorage.getItem("myTodoList");

    if (lists) {
        return JSON.parse(lists);
    } else {
        return [];
    }
};

const Todo = () => {

    const [state, setstate] = useState();
    const [items, setItems] = useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);

    const addItem = () => {
        if (!state) {
          alert("plz fill the data");
        } else if (state && toggleButton) {
          setItems(
            items.map((curElem) => {
              if (curElem.id === isEditItem) {
                return { ...curElem, name: state };
              }
              return curElem;
            })
          );
          
          setstate([]);
          setIsEditItem(null);
          setToggleButton(false);
         

        } else {
            const myNewInputdata = {
                id: new Date().getTime().toString(),
                name: state,
            }
            setItems([...items, myNewInputdata]);
            setstate("");
        }
    };

    const eidtItem = (index) => {
        const item_todo_edited = items.find((curElem) => {
            return curElem.id === index;
        });
        setstate(item_todo_edited.name);
        setIsEditItem(index);
        setToggleButton(true);
    };


    const deleteItem = (index) => {
        const updatedItem = items.filter((curElem) => {
            return curElem.id !== index;
        });
        setItems(updatedItem);
    };

    const removeAll = () => {
        setItems([]);
    }

    useEffect(() => {
        localStorage.setItem("myTodoList", JSON.stringify(items))
    }, [items]);

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="https://images.pexels.com/photos/3299/postit-scrabble-to-do.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="todologo" />
                        <figcaption>Add to your List Here 👌</figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text"
                            placeholder="✍ Add Items"
                            className="form-control"
                            value={state}
                            onChange={(event) => setstate(event.target.value)}
                        />
                        {toggleButton ? (
                            <i className="far fa-edit add-btn" onClick={addItem}></i>
                        ) : (
                            <i className="fa fa-plus add-btn" onClick={addItem}></i>
                        )}

                    </div>



                    <div className="showItems">
                        {items.map((curElem) => {
                            return (
                                <div className="eachItem" key={curElem.id}>
                                    <h3>{curElem.name}</h3>
                                    <div className="todo-btn">
                                        <i className="far fa-edit add-btn" onClick={() => eidtItem(curElem.id)}>

                                        </i>
                                        <i className="far fa-trash-alt add_btn"
                                            onClick={() => deleteItem(curElem.id)}></i>
                                    </div>
                                </div>

                            )
                        })}

                    </div>



                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Are you Sure?"
                            onClick={removeAll}>
                            <span>Remove All</span>
                        </button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Todo
