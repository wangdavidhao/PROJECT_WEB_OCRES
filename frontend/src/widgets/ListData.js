import React, { useState, useEffect, useRef } from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import './ListData.css';

const infoTest = [
  {
    id : 1,
    text : "Interdiction d'ouvrir pour les bars et restaurants",
  },
  {
    id : 2,
    text : "Les sorties sont limitées à 1 heure",
  },
  {
    id : 3,
    text : "Interdiction d'ouvrir pour les bars et restaurants",
  },
  {
    id : 4,
    text : "Les sorties sont limitées à 1 heure",
  },
  {
    id : 5,
    text : "Interdiction d'ouvrir pour les bars et restaurants",
  },
  {
    id : 6,
    text : "Les sorties sont limitées à 1 heure",
  },
  {
    id : 7,
    text : "Interdiction d'ouvrir pour les bars et restaurants",
  },
  {
    id : 8,
    text : "Les sorties sont limitées à 1 heure",
  },
];

function ListForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current !== null)
      inputRef.current.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit({
      id: Math.floor(Math.random() * 10000),  //Maniere de trouver un id très contestable
      text: input
    });
    setInput('');
  };
  // console.log(props.isAdmin);

  return (
    <form onSubmit={handleSubmit} className='item-form'>
    {(props.isAdmin || props.isAdmin === undefined)? (
      props.edit ? (
        <>
          <input
            placeholder='Update your item'
            value={input}
            onChange={handleChange}
            name='text'
            ref={inputRef}
            className='item-input edit'
          />
          <button onClick={handleSubmit} className='item-button edit'>
            Update
          </button>
        </>
      ) : (
        <>
          <input
            placeholder='Add an item'
            value={input}
            onChange={handleChange}
            name='text'
            className='item-input'
            ref={inputRef}
          />
          <button onClick={handleSubmit} className='item-button'>
            Add item
          </button>
        </>
      )) : ""}
    </form>
  );
}

const List = ({ items, completeItem, removeItem, updateItem, isAdmin}) => {
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });

  const submitUpdate = value => {
    updateItem(edit.id, value);
    setEdit({
      id: null,
      value: ''
    });
  };

  if (edit.id) {
    return <ListForm edit={edit} onSubmit={submitUpdate} />;
  }

  return items.map((item, index) => (
    <div
      className={item.isComplete ? 'item-row complete' : 'item-row'}
      key={index}
    >
      <div key={item.id} onClick={() => completeItem(item.id)}>
        {item.text}
      </div>
      {(isAdmin || isAdmin === undefined) &&
      <div className='icons'>
        <RiCloseCircleLine
          onClick={() => removeItem(item.id)}
          className='delete-icon'
        />
        <TiEdit
          onClick={() => setEdit({ id: item.id, value: item.text })}
          className='edit-icon'
        />
      </div>
      }
    </div>
  ));
};

export const ListData = ({isAdmin}) => {
  const [items, setItems] = useState(infoTest);

  const addItem = (item) => {
    if (!item.text || /^\s*$/.test(item.text)) {
      return;
    }
    const newItems = [item, ...items];
    setItems(newItems);
    // console.log(...items);
  };

  const updateItem = (itemId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    setItems(prev => prev.map(item => (item.id === itemId ? newValue : item)));
  };

  const removeItem = id => {
    const removedArr = [...items].filter(item => item.id !== id);

    setItems(removedArr);
  };

  const completeItem = (id) => {
    let updatedItems = items.map(item => {
      if (item.id === id) {
        item.isComplete = !item.isComplete;
      }
      return item;
    });
    setItems(updatedItems);
  };

  return (
    <>
      <div className="item-app">
        <ListForm onSubmit={addItem} isAdmin={isAdmin}/>
        <List
          items={items}
          completeItem={completeItem}
          removeItem={removeItem}
          updateItem={updateItem}
          isAdmin={isAdmin}
        />
      </div>
    </>
  );
}

export default ListData;
