import React, { useState, useEffect, useRef } from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './ListData.css';
import {FaUser } from 'react-icons/fa';
import {Modal, Button} from 'react-bootstrap';

import axios from '../axios';

///LISTFORM
const ListForm = (props) => {
  const [input, setInput] = useState(props.edit ? props.edit.content : '');

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
        await axios.post('/rule', {
          content:input,
          debutDate:startDate.toISOString().split('T')[0],
          endDate:endDate.toISOString().split('T')[0]
        }, {
          headers: {
            'auth-token':sessionStorage.getItem("token"),
          }
        })
        .then(() => {
            //On réinitialise les valeurs à l'état initial
            setInput('');
            setStartDate(new Date());
            setEndDate(new Date());
            props.fetchRules();
        })
      .catch((error) =>{
        console.log(error);
      })
    }

  };

  const updateRule = async (e) => {
    e.preventDefault();
    if(input){
        await axios.put(`/rule/${props.edit._id}`, {
          content:input,
        }, {
          headers: {
            'auth-token':sessionStorage.getItem("token"),
          }
        })
        .then(() => {
            //On réinitialise les valeurs à l'état initial
            setInput('');
            props.onSubmit();
        })
      .catch((error) =>{
        console.log(error);
      })
    }
  }
  console.log(props.edit);

  return (
    <form  className='item-form'>
    {(props.isAdmin || props.isAdmin === undefined)? (
      props.edit ? (
        <>
          <label>Règle (150 carac.) : </label>
          <textarea
            placeholder='Modifier une règle'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            name='text'
            className='item-input'
            rows="5" cols="30"
            maxLength = "150"
            ref={inputRef}
          />
          
          <button onClick={updateRule} className='item-button edit'>
            Modifier
          </button>
        </>
      ) : (
        <>
          <label>Règle (150 carac.) : </label>
          <textarea
            placeholder='Ajouter une règle'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            name='text'
            className='item-input'
            rows="5" cols="30"
            maxLength = "150"
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

const List = ({ items,isAdmin, removeItem, fetchRules}) => {

    const [edit, setEdit] = useState({
      _id: null,
      content: ''
    });

    const submitUpdate = () => {
      setEdit({
        id: null,
        content: ''
      });
      fetchRules();
    };

  if (edit._id) {
    return <ListForm edit={edit} onSubmit={submitUpdate}/>;
  }

  return( 
    <div className="item-container">
      {!isAdmin ? <p>Attestation : <a href="https://media.interieur.gouv.fr/deplacement-covid-19/" target="_blank" rel="noopener noreferrer">cliquez-ici</a></p> : ''}
      
      {items.map((item, index) => (
      <div
        className='item-row'
        key={index}
      >
        <div className="textDiv w-100" key={item._id}>
          <div className="pDiv">
            <p style={{fontWeight:'bolder'}}>{item.content.toUpperCase()}</p>
          </div>
          
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
            onClick={() => setEdit({ _id: item._id, content: item.content })}
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
  
  const removeItem = (id) => {
    
    axios.delete(`/rule/${id}`, {
      headers: {
        'auth-token':sessionStorage.getItem("token"),
      }
    })
    .then(() => {
        fetchRules();
    })
    .catch((error) => {
      console.log(error);
    });
    
  }

  return (
    <>
      <div className={isAdmin ? 'item-appAdmin' : 'item-app'}>
        {isAdmin ? <div className="d-flex flex-row align-items-center justify-content-center">
          <h3 style={{color:'#fff'}} className="my-4">Page admin pour le widget règles</h3>
          <FaUser fontSize={24} color={'white'} className="mx-3"/>
          </div> 
          :''}
        <ListForm 
          isAdmin={isAdmin}
          items={items}
          fetchRules={fetchRules}
          />
        <List
          items={items}
          isAdmin={isAdmin}
          removeItem={removeItem}
          fetchRules={fetchRules}
        />
      </div>
    </>
  );
}

export default React.memo(ListData);
