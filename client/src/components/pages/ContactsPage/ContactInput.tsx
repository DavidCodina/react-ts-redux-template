import React, { useState } from 'react';
import axios               from 'axios';
import { useActions }      from '../../../redux'; 


/* =============================================================================

============================================================================= */


export function ContactInput(){
  const { addContact }        = useActions();
  const [name,    setName]    = useState('');
  const [phone,   setPhone]   = useState('');
  const [loading, setLoading] = useState(false);

  
  /* ======================

  ====================== */


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    if (name === '' || phone === ''){ return; } 

    setLoading(true); 


    try {      
      const res  = await axios.post('http://localhost:5000/contacts', { name, phone });
      const data = res.data;

      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate slow request.

      addContact(data);
      setName('');
      setPhone('');
      setLoading(false);
    } catch (err){
      setLoading(false);
      console.log(err);
    }
  }


  /* ======================

  ====================== */


  return (
    <form 
      className="mx-auto mb-3 p-3 bg-light border border-blue rounded-3 shadow-sm" style={{ maxWidth: 400 }}
      onSubmit={handleSubmit} 
      noValidate
    >
      <div className="mb-3">
        <input
          className="form-control"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name..."
        />
      </div>


      <div className="mb-3">
        <input
          className="form-control"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone..."
        />
      </div>

      {
        loading ? (
          <button 
            className="btn btn-green d-block w-100 font-montserrat"
            disabled
          >
            <span className="spinner-border spinner-border-sm me-3" role="status"></span>
            <span className="visually-hidden">Adding...</span>
            Adding...
          </button>
        ) : (
          <button className="btn btn-green d-block w-100 font-montserrat">Add Contact</button>
        )
      }
    </form>
  );
}
