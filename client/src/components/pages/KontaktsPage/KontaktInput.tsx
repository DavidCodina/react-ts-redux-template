import React, { useState }             from 'react';
import { useThunks, useTypedSelector } from '../../../redux'; 


/* =============================================================================

============================================================================= */


export function KontaktInput(){
  const { dispatch, thunks: { addKontakt } }  = useThunks();

  const { 
    addingKontakt, 
    addingKontaktError // eslint-disable-line
  } = useTypedSelector(state => state.kontakts); 

  const [name,  setName]  = useState('');
  const [phone, setPhone] = useState('');


  /* ======================

  ====================== */


  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name === '' || phone === ''){ return; } 

    dispatch(addKontakt({ name, phone })).unwrap().then(result => {
      console.log(result); 
    })

    .catch(err => {
      console.log("An error occurred.", err);
    })

    .finally(() => {
      setName('');
      setPhone('');
    });
  };


  /* ======================

  ====================== */


  return (
    <form 
      className="mx-auto mb-3 p-3 bg-light border border-blue rounded-3 shadow-sm" style={{ maxWidth: 400 }}
      onSubmit={submitForm} 
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
        addingKontakt ? (
          <button 
            className="btn btn-green d-block w-100 font-montserrat"
            disabled
          >
            <span className="spinner-border spinner-border-sm me-3" role="status"></span>
            Adding...
          </button>
        ) : (
          <button className="btn btn-green d-block w-100 font-montserrat">Add Kontakt</button>
        )
      }
    </form>
  );
}
