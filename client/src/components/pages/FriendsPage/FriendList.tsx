import React             from 'react';
import axios             from 'axios';
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Icon, Spinner } from '../../shared';


interface SerializedError {
  name?: string;
  message?: string;
  code?: string;
  stack?: string;
}


const getFriends = async () => {
  const { data } = await axios.get(`http://localhost:5000/contacts`);
  return data;
}


const deleteFriend = async (id: number) => {
  const { data } = await axios.delete(`http://localhost:5000/contacts/${id}`);
  data.deletedId = id;
  data.message   = `Friend ${id} has been deleted from friends.`;
  return data;
}


/* =============================================================================

============================================================================= */
// This example is completely independent from Redux!


export function FriendList(){ 
  // No need to run a useEffect on mount. Just do this!
  const { data: friends, error, isLoading, isError } = useQuery("friends", getFriends);


  /* ======================

  ====================== */


  const queryClient = useQueryClient();


  // Pass deleteFriend to useMutation(), then when mutateAsync()
  // is called it  will execute deleteFriend() internally.
  // https://react-query.tanstack.com/reference/useMutation#_top
  const { mutateAsync, isLoading: isDeleting } = useMutation(deleteFriend, { 
    onSuccess: (res) => { 
      // Waiting for queries to become stale before they are fetched again doesn't always work, 
      // especially when you know for a fact that a query's data is out of date because 
      // of something the user has done. For that purpose, the queryClient has an 
      // invalidateQueries method that lets you intelligently mark queries as stale 
      // and potentially refetch them too!
      queryClient.invalidateQueries('friends'); 
    },
    onError: (err) => { console.log("Error from onError(): ", err); }
  });


  /* ======================

  ====================== */

  
  const handleDeleteFriend = /*async*/ (id: number) => {
    if (typeof id === 'undefined'){ return; }
    // useMutation allows you to define onSuccess, and onError handlers, so
    // there's no need to cache the result here. Nor do you need to wrap
    // this in a try/catch. That said, I previously had Axios set up such that:
    // axios.defaults.validateStatus = function(status){ return true; };
    // That's an anti-pattern. Obviously, it was causing EVERYTHING to be seen 
    // as successful. This meant that the onError handler couldn't do its job.
    
    /*await*/ mutateAsync(id); // If an error occurs, nothing in the function executes below this line.
  }


  /* ======================

  ====================== */


  const renderFriends = () => {
    if (isError){ 
      const err = error as SerializedError;
      if (err.message){
        return <div className="my-5 fs-5 font-montserrat text-center text-red">Whoops! {err.message}</div>;
      }
      return <div className="my-5 fs-5 font-montserrat text-center text-red">Error: Could not get friends!</div>;
    }


    if (isLoading){
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


    if (Array.isArray(friends) && friends.length === 0){
      return <div className="my-5 fs-5 font-montserrat text-center text-red">Looks like you have no friends!</div>;
    }


    if (Array.isArray(friends) && friends.length > 0){
      return (
        <ul className="list-group mx-auto mb-5" style={{ maxWidth: 400 }}>
          {
            friends.map(friend => {
              return (
                <li key={friend.id} className="d-flex position-relative list-group-item mb-3 p-0 bg-light border border-blue rounded-3 shadow-sm">
                  <div className="p-3 text-blue">
                    <svg width="50" height="50" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                      <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                    </svg>
                  </div>
                  
        
                  <div className="flex-1 d-flex flex-column justify-content-center">
                    <div className="text-blue font-montserrat">
                      <Icon name="person" className="me-2" />
                      {friend.name}
                    </div>
      
      
                    <div className="text-blue font-montserrat">   
                      <Icon name="telephone" className="me-2" />   
                      {friend.phone}
                    </div>


                    <button 
                      className="btn m-0 p-0 text-red" 
                      style={{ position: 'absolute', top: 5, right: 5 }}
                      onClick={() => handleDeleteFriend(friend.id as number)}
                      disabled={isDeleting} 
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
      { renderFriends() }
    </div>
  );
}