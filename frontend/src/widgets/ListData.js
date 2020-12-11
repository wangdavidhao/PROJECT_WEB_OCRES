import React, { useState, useEffect, useRef } from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './ListData.css';
import {FaUser } from 'react-icons/fa';

import axios from '../axios';

///LISTFORM

const ListForm = (props) => {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current !== null)
      inputRef.current.focus();
  });

  const addRule = async (e) => {
    e.preventDefault();
    //On vérifie s'il y a un contenu
    if(input){
        try{
        const response = await axios.post('/rule', {
          content:input,
          debutDate:startDate.toISOString().split('T')[0],
          endDate:endDate.toISOString().split('T')[0]
        }, {
          headers: {
            'auth-token':sessionStorage.getItem("token"),
          }
        });
        //On réinitialise les valeurs à l'état initial
        setInput('');
        setStartDate(new Date());
        setEndDate(new Date());
      }catch(error){
        console.log(error);
      }
    }

  };

  const updateRule = async (e) => {
    e.preventDefault();
    console.log("notre id : ", props.edit._id);
    if(input){
      try{
        const response = await axios.put(`/rule/${props.edit._id}`, {
          content:input,
        }, {
          headers: {
            'auth-token':sessionStorage.getItem("token"),
          }
        });
        //On réinitialise les valeurs à l'état initial
        setInput('');
      }catch(error){
        console.log(error);
      }
    }
  }

  return (
    <form onSubmit={addRule} className='item-form'>
    {(props.isAdmin || props.isAdmin === undefined)? (
      props.edit ? (
        <>
          <textarea
            placeholder='Ajouter une règle'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            name='text'
            className='item-input'
            rows="5" cols="30"
            maxlength = "255"
            ref={inputRef}
          />
          
          <button onClick={updateRule} className='item-button edit'>
            Modifier
          </button>
        </>
      ) : (
        <>
          <label>Règle : </label>
          <textarea
            placeholder='Ajouter une règle'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            name='text'
            className='item-input'
            rows="5" cols="30"
            maxlength = "255"
            ref={inputRef}
          />
              <label>Date début : </label>
              <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
              <label>Date fin : </label>
              <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
          <button onClick={addRule} className='item-button'>
            Ajouter
          </button>
        </>
      )) : ""}
    </form>
  );
}

///LIST

const List = ({ items,isAdmin}) => {
  const [edit, setEdit] = useState({
    _id: null,
    value: ''
  });

  const submitUpdate = (value) => {
    setEdit({
      _id: null,
      value: ''
    });
  };

  const removeItem = async (id) => {
    console.log("notre id : ", items);
    try{
      const response = await axios.delete(`/rule/${id}`, {
        headers: {
          'auth-token':sessionStorage.getItem("token"),
        }
      });
    }catch(error){
      console.log(error);
    }
  }

  if (edit._id) {
    return <ListForm edit={edit} onSubmit={submitUpdate} />;
  }

  return( 
    <div>
      {!isAdmin ? <p>Attestation : <a href="https://media.interieur.gouv.fr/deplacement-covid-19/" target="_blank">cliquez-ici</a></p> : ''}
      
      {items.map((item, index) => (
      <div
        className={item.isComplete ? 'item-row complete' : 'item-row'}
        key={index}
      >
        <div className="textDiv w-100" key={item._id}>
          <p style={{fontWeight:'bolder'}}>{item.content.toUpperCase()}</p>
          <span ><i>Valable du <span style={{color:"#ffd32a"}}>{item.debutDate.substring(0,10)} 
          </span> au <span style={{color:"#ffd32a"}}>{item.endDate.substring(0,10)}</span></i></span>
        </div>
        {(isAdmin || isAdmin === undefined) &&
        <div className='icons'>
          <RiCloseCircleLine
            onClick={() => removeItem(item._id)}
            className='delete-icon'
          />
          <TiEdit
            onClick={() => setEdit({ _id: item._id, value: item.content })}
            className='edit-icon'
          />
        </div>
        }
      </div>))}

    </div>
    
  );
};


///LISTDATA

export const ListData = ({isAdmin}) => {
  const [items, setItems] = useState([]);

  //Fonction qui va get les règles depuis le backend
  const fetchRules = async () => {
      try{
        const response = await axios.get('/rule');
        setItems(response.data);
      }catch(error){
        console.log(error);
      }
  };

  
  useEffect(() => {
    fetchRules();
  }, []);


  return (
    <>
      <div className={isAdmin ? 'item-appAdmin' : 'item-app'}>
        {isAdmin ? <div className="d-flex flex-row align-items-center justify-content-center">
          <h3 style={{color:'#fff'}} className="my-4">Page admin</h3>
          <FaUser fontSize={24} color={'white'} className="mx-3"/>
          </div> 
          :''}
        <ListForm 
          isAdmin={isAdmin}
          items={items}
          />
        <List
          items={items}
          isAdmin={isAdmin}
        />
      </div>
    </>
  );
}

export default React.memo(ListData);
