import { createSlice, PayloadAction /*, createAsyncThunk */ } from '@reduxjs/toolkit';


interface Contact {
  id?: number;
  name: string;
  phone: string;
}

type Contacts = Contact[];


interface InitialState {
  contacts: Contacts;
}


const initialState:InitialState = { 
  contacts: []
};


//////////////////////////////////////////////////////////////////////////////////////////
//
//  createSlice(): accepts an object of reducer functions, a slice name, and an initial state value, 
//  and automatically generates a slice reducer with corresponding action creators and action types.
// 
//  So... We no longer need to create any of that. On the whole, createSlice is kind of like a 
//  reducer replacement, but it does more than just that. It's probably better described as a
//  reducer factory, but it also seems to be an action and action creator factory all in one.
//  This is corroborated by the fact that one can extract both action creators and a reducer 
//  from createSlice:
//
//    export const contactSlice = createSlice({ ... });
//
//    export const { setContacts, deleteContact } = contactSlice.actions;
//
//    export default contactSlice.reducer;
//
//
//  The so-called 'reducer functions' are named like action creator functions, but they don't 
//  return an action: { type: ... , payload: ... }. Instead they handle the logic that would
//  otherwise be executed in a particular reducer's matching switch case. 
//  They kind of act like mini-reducers [ notice their signature: (state, action) => {} ]
//
//  It gets even more simple because we can write what 'looks like' mutating logic 
//  inside of each function:
//
//    Redux Toolkit allows us to write "mutating" logic in reducers. It
//    doesn't actually mutate the state because it uses the Immer library,
//    which detects changes to a "draft state" and produces a brand new
//    immutable state based off those changes
//
//
//////////////////////////////////////////////////////////////////////////////////////////


export const contactSlice = createSlice({
  name: 'contacts', 
  initialState,
  reducers: {
    setContacts: (state, action:PayloadAction<Contacts>) => {   
      // console.log(action); // => { type: "contacts/setContacts", payload: [ ... ] }
      state.contacts = action.payload;
    },

    addContact: (state, action: PayloadAction<Contact>) => {  
      // console.log(action); // => { type: "contacts/addContact", payload: {name: "Muffy", phone: "333-444-555", id: 4} }
      state.contacts.push(action.payload);
    },


    deleteContact: (state, action: PayloadAction<number>) => {   
      // console.log(action); // => { type: "contacts/deleteContact", payload: 1 }
      state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
    },
  }
});


// Action creators are generated for each case reducer function.
// There's no need to destructure the actions here. Instead it's done
// in store.js after they've been bound.
export const contactActions = contactSlice.actions;
export const contactReducer = contactSlice.reducer;