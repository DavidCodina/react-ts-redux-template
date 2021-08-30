import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useActions, useTypedSelector } from '../../../redux'; 
import { Icon, Spinner } from '../../shared';


//////////////////////////////////////////////////////////////////////////////////////////
//
//  The async calls in this component are able to avoid becoming part of the redux patttern.
//  In both cases actions are only dispatched after a successful response.
//  This approach is much more efficient than dealing with the huge amount of boilerplate
//  needed to create async thunks (see kontaktSlice).
//
//  However, even here we are interacting with Redux state inefficiently. One solution is to
//  use RTK Query to handle async data. This package is included with Redux Toolkit, and
//  is opt-in. However, a better solution is to use React Query. It's more intuitive,
//  has a better API, and is entirely decoupled from Redux. React Query will drastically
//  simplify state management. It doesn't replace a global state manager, but with so
//  much less dependence on Redux, one might instead opt for a friendlier App-level
//  Context to handle global state.
//
//////////////////////////////////////////////////////////////////////////////////////////


/* =============================================================================

============================================================================= */


export function ContactList(){
  const { contacts }                   = useTypedSelector(state => state.contacts);
  const { setContacts, deleteContact } = useActions();
  const [ loading, setLoading ]        = useState(false);
  const [ deletingContact, setDeletingContact ] = useState(false);


  /* ======================

  ====================== */

  
  const removeContact = async (id: number) => {
    if (deletingContact){ return; }
    if (!window.confirm('Are you sure?')){ return; } 

    setDeletingContact(true);

    try {
      await axios.delete(`http://localhost:5000/contacts/${id}`);
      // await new Promise(resolve => setTimeout(resolve, 5000)); // Simulate slow request.
      deleteContact(id);
      setDeletingContact(false);
    } catch (err){
      setDeletingContact(false);
      console.log(err);
    }
  };


  /* ======================

  ====================== */


  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true); 
  
      try {
        const res  = await axios.get('http://localhost:5000/contacts');
        const data = res.data;

        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate slow request.
        
        setContacts(data); 
        setLoading(false); 
      } catch (err){
        setLoading(false); 
        console.log(err);
      } 
    }

    fetchContacts();
  }, [setContacts]);


  /* ======================

  ====================== */


  const renderContacts = () => {
    // Will show stale contacts while loading new contacts in background.
    if (loading && contacts.length === 0){
      return (
        <Spinner 
          size={75} 
          variant="pink" 
          style={{ filter: 'drop-shadow(0px 1px 1px rgba(0,0,0,0.5))' }} 
          containerClassName="d-inline-block"
          containerStyle={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 100 }}
          useContainer={false}
        />
      );
    }

    if (contacts.length === 0){
      return <div className="my-5 fs-5 font-montserrat text-center text-red">You seem to have no contacts...</div>;
    }

    if (contacts.length > 0){
      return (
        <ul className="list-group mx-auto mb-5" style={{ maxWidth: 400 }}>
          {
            contacts.map(contact => {
              return (
                <li key={contact.id} className="d-flex position-relative list-group-item mb-3 p-0 bg-light border border-blue rounded-3 shadow-sm">
                  <div className="p-3 text-blue">
                    <svg width="50" height="50" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                      <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                    </svg>
                  </div>
                  
        
                  <div className="flex-1 d-flex flex-column justify-content-center">
                    <div className="text-blue font-montserrat">
                      <Icon name="person" className="me-2" />
                      {contact.name}
                    </div>
      
      
                    <div className="text-blue font-montserrat">   
                      <Icon name="telephone" className="me-2" />   
                      {contact.phone}
                    </div>


                    <button 
                      className="btn m-0 p-0 text-red" 
                      style={{ position: 'absolute', top: 5, right: 5 }}
                      onClick={() => removeContact(contact.id as number)}
                      disabled={deletingContact} 
                    >
                      <Icon name="trash" className="d-block" style={{ lineHeight: 1 }} />
                    </button>
                  </div>
                </li>
              );
            })
          }
        </ul>
      );
    }

    return null;
  };


  return (
    <div className="contacts-wrapper">
      { renderContacts() }
    </div>
  );
}