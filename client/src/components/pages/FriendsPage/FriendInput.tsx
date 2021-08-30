import React, { useState }              from 'react';
import axios                            from 'axios';
import { useMutation, useQueryClient  } from "react-query";


interface Friend {
  name: string;
  phone: string;
}


const addFriend = async (friend: Friend) => {
  const { data } = await axios.post('http://localhost:5000/contacts', friend);
  // await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate slow request.
  return data;
}


/* =============================================================================

============================================================================= */


export function FriendInput(){
  const queryClient           = useQueryClient();
  const [name,    setName]    = useState('');
  const [phone,   setPhone]   = useState('');


  const { mutateAsync, isLoading: isAdding, isError, error } = useMutation(addFriend, { // eslint-disable-line
    onSuccess: (res) => { 
      queryClient.invalidateQueries('friends'); 
      setName('');
      setPhone('');
    }, 
    onError:   (err) => { console.log("Error from onError(): ", err); }
  });

  
  /* ======================

  ====================== */


  const handleSubmit =/*  async */ (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name === '' || phone === ''){ 
      alert("Please fill out both fields.")
      return; 
    }

    /*await*/ mutateAsync({ name, phone }); 
    // Add await above if you need to do some logic afterwards.
  };


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
        isAdding ? (
          <button 
            className="btn btn-green d-block w-100 font-montserrat"
            disabled
          >
            <span className="spinner-border spinner-border-sm me-3" role="status"></span>
            <span className="visually-hidden">Adding...</span>
            Adding...
          </button>
        ) : (
          <button className="btn btn-green d-block w-100 font-montserrat">Add Friend</button>
        )
      }
    </form>
  );
}
