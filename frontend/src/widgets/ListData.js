import React, { useState, useEffect, useRef } from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './ListData.css';
import {FaUser } from 'react-icons/fa';
import {Button, Modal} from 'react-bootstrap';

import axios from '../axios';

///LISTFORM
const ListForm = ({edit, onSubmit, isAdmin,fetchRules}) => {
  const [input, setInput] = useState(edit ? edit.content : '');

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [editSdate, setEditSdate] = useState(edit ? new Date(edit.debutDate): '');
  const [editEdate, setEditEdate] = useState(edit ? new Date(edit.endDate): '');

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const max_carac = 200;
  const [carac, setCarac] = useState(edit ? max_carac - input.length : max_carac);

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current !== null)
      inputRef.current.focus();
  });

  const addRule = async (e) => {
    e.preventDefault();
    //On vérifie s'il y a un contenu
    if(input && startDate && endDate){
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
            fetchRules();
        })
      .catch((error) =>{
        console.log(error);
      })
    }else{
      handleShow();
    }

  };

  const updateRule = async (e) => {
    e.preventDefault();
    if(input && editSdate && editEdate){
        await axios.put(`/rule/${edit._id}`, {
          content:input,
          debutDate:editSdate.toISOString().split('T')[0],
          endDate:editEdate.toISOString().split('T')[0]
        }, {
          headers: {
            'auth-token':sessionStorage.getItem("token"),
          }
        })
        .then(() => {
            //On réinitialise les valeurs à l'état initial
            setInput('');
            onSubmit();
        })
      .catch((error) =>{
        console.log(error);
      })
    }else{
      handleShow();
    }
  }

  const handleChange = (e) => {
    setInput(e.target.value);
    setCarac(max_carac - e.target.value.length);
  }


  return (
    <form  className='item-form'>
    {(isAdmin || isAdmin === undefined)? (
      edit ?(
        <>
          <label>Règle (200 carac.) : </label>
          <textarea
            placeholder='Modifier une règle'
            value={input}
            onChange={handleChange}
            name='text'
            className='item-input'
            rows="5" cols="30"
            maxLength = "200"
            ref={inputRef}
            onFocus={(e)=>e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
          />
          <p style={{color:'#fff'}}>Nb de carac. restants : {carac}</p>
          <label>Date début : </label>
          <DatePicker selected={editSdate} onChange={date => setEditSdate(date)} />
          <label>Date fin : </label>
          <DatePicker selected={editEdate} onChange={date => setEditEdate(date)} />
          <div className="listData__buttons">
            <button onClick={updateRule} className='item-button edit'>
              Modifier
            </button>
            <button onClick={() => onSubmit()} className='item-button edit'>
              Retour
            </button>
          </div>
          
        </>
      ) : (
        <>
        <div className="listData__form">
          <div className="listData__content">
            <label>Règle (200 carac.) : </label>
            <textarea
              placeholder='Ajouter une règle'
              value={input}
              onChange={handleChange}
              name='text'
              className='item-input'
              rows="5" cols="30"
              maxLength = "200"
              ref={inputRef}
              onFocus={(e)=>e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
            />
            <p style={{color:'#fff'}}>Nb de carac. restants : {carac}</p>

          </div>
        

          <div className="listData__dates">
            <label>Date début : </label>
            <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
            <label>Date fin : </label>
            <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
          </div>
        </div>
          <div className="listData__buttons">
            <button onClick={addRule} className='item-button'>
              Ajouter
            </button>
            <button onClick={() => setInput('')} className='item-button'>
              Effacer
            </button>
          </div>
        </>
        
      )) : ""}
      <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Erreur</Modal.Title>
                </Modal.Header>
                <Modal.Body>Un champ est erroné ou est vide</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Fermer
                </Button>
                </Modal.Footer>
            </Modal>
    </form>
  );
}

///LIST

const List = ({ items,isAdmin, removeItem, fetchRules}) => {

    const [edit, setEdit] = useState({});

    const submitUpdate = () => {
      setEdit({
        id: null,
        content: '',
        debutDate:'',
        endDate:''
      });
      fetchRules();
    };
  
  const [show, setShow] = useState(false);
  const [rule, setRule] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = (rule) => {
      setShow(true);
      setRule(rule);
  }

  const handleDelete = (id) => {
    removeItem(id);
    setShow(false);
  }

  if (edit._id) {
    return <ListForm edit={edit} onSubmit={submitUpdate}/>;
  }

  return( 
    <div className="item-container">
      <ListForm 
          isAdmin={isAdmin}
          fetchRules={fetchRules}
      />
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
            onClick={() => handleShow(item)}
            className='delete-icon'
          />
          <Modal show={show} onHide={handleClose} rule={rule} >
                <Modal.Header closeButton>
                <Modal.Title>Suppression</Modal.Title>
                </Modal.Header>
                <Modal.Body><span style={{'font-weight' :'bold'}}>Vous souhaitez supprimer ce post?</span><p>{rule.content}</p></Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Non
                </Button>
                <Button variant="primary" onClick={() => handleDelete(rule._id)}>
                    Valider
                </Button>
                </Modal.Footer>
          </Modal>
          <TiEdit
            onClick={() => setEdit({ _id: item._id, content: item.content, debutDate: item.debutDate, endDate: item.endDate })}
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
