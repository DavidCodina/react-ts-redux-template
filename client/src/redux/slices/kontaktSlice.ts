////////////////////////////////////////////////////////////////////////////////////
//
//  If all of this seems like a major pain point, then you're in luck!
//  The code in this file, while correct in its implementation, is actually an anti-pattern:
//
//    https://redux-toolkit.js.org/rtk-query/overview
//    Over the last couple years, the React community has come to realize that "data fetching 
//    and caching" is really a different set of concerns than "state management". While you can 
//    use a state management library like Redux to cache data, the use cases are different enough 
//    that it's worth using tools that are purpose-built for the data fetching use case.
//
//
//  One solution is to use RTK Query. At first it may seem like a good idea because it's
//  already built into Redux Toolkit as an optional dependency. However, that's also a
//  good reason not to use it. RTK Query openly gets its inspiration from React Query and
//  other such libraries. React Query actually has a better API, is less clunky, and is 
//  not coupled to Redux.
//
//  The fact is that most global state would be used for storing server data, but with
//  React Query this entirely eliminates that need. 
//
//    https://react-query.tanstack.com/guides/does-this-replace-client-state
//    React Query replaces the boilerplate code and related wiring used to 
//    manage cache data in your client-state and replaces it with just a 
//    few lines of code... With all of those things removed, you may ask 
//    yourself, "Is it worth it to keep using our client state manager for 
//    this tiny global state?" And that's up to you!
//  
//
//  Thus if the App ends up using very little Redux state, we can easily remove it
//  later on, and just use Context to solve the issue of prop-drilling.
//  
////////////////////////////////////////////////////////////////////////////////////


import { 
  createSlice, 
  createAsyncThunk, 
  PayloadAction,
  SerializedError
} from '@reduxjs/toolkit';
import axios from 'axios';


interface Kontakt {
  id?: number;
  name: string;
  phone: string;
}


type Kontakts = Kontakt[];


interface InitialState {
  kontaktsError: SerializedError | null;
  loadingKontakts: boolean;
  kontakts: Kontakts;

  addingKontakt: boolean;
  addingKontaktError: SerializedError | null;

  deletingKontakt: boolean;
  deletingKontaktError: SerializedError | null;
}


/* ======================

====================== */


// https://redux-toolkit.js.org/api/createAsyncThunk
// https://www.udemy.com/course/react-redux-toolkit-complete-guide/learn/lecture/27575956#overview
const getKontakts = createAsyncThunk(
  'kontakts/getKontakts',
  async (thunkAPI) => { // https://redux-toolkit.js.org/api/createAsyncThunk#payloadcreator
    try {
      const { data }  = await axios.get('http://localhost:5000/contacts');
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate slow request.
      return data;
    } catch(err){
      // Intercept err and rethrow it, or create your own.
      // This will go to getKontakts.rejected, but then it also return a resolved Promise.
      throw new Error("Could not get kontakts!");
    }
  }
);


/* ======================

====================== */


export const addKontakt = createAsyncThunk(
  'kontakts/addKontakt',
  // Gotcha: if you don't type the first argument when passing data into a thunk,
  // Typescript will complain when invoking, but the error isn't all that illuminating.
  async (kontakt: { name: string; phone: string; }, thunkAPI) => { // https://redux-toolkit.js.org/api/createAsyncThunk#payloadcreator
    
    try {
      const { data } = await axios.post('http://localhost:5000/contacts', kontakt);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate slow request.
      return data;
      ////////////////////////////////////////////////////////////////////////////////////
      //
      //  data is only part of what actually gets returned by addKontact.
      //  When addKontakt.fulfilled, then the actual return value is:
      //  { meta: { ... }, payload: data, type: "kontakts/addKontakt/fulfilled" }
      //  (Assuming you haven't called .unwrap() prior to .then()).
      //
      ////////////////////////////////////////////////////////////////////////////////////
    
    } catch(err){
      ////////////////////////////////////////////////////////////////////////////////////
      //
      //  Without try / catch, err will be returned automatically.
      //  You can still return the err here: return err;
      //  Or you can intercept it, and throw something else.
      //  When addKontakt.rejected, then the actual return value is:
      //
      //    { 
      //      error: {name: "Error", message: "Could not add kontakt!", stack: "..." },
      //      meta { ... }
      //      payload: undefined,
      //      type: "kontakts/addKontakt/rejected"
      //    }
      //
      //  Again, this assumes you haven't called .unwrap prior to .then(). However, you
      //  should call .unwrap(), in which case the error will be passed to a catch block
      //  if there is one.
      //
      ////////////////////////////////////////////////////////////////////////////////////

      // throw { message: "Something went wrong!" };
      throw new Error("Could not add kontakt!");
    }
  }
);


/* ======================

====================== */


const deleteKontakt = createAsyncThunk(
  'kontakts/deleteKontakt',
  async (id: number, thunkAPI) => { // https://redux-toolkit.js.org/api/createAsyncThunk#payloadcreator
    try {
      const { data } = await axios.delete(`http://localhost:5000/contacts/${id}`);
      // jsonserver doesn't respond with anything but {}, when an item is deleted.
      // However, we can add in a suitable response.
      data.deletedId = id
      data.message   = `kontakt ${id} has been deleted from kontakts.`;
      return data;
    } catch(err){
      // Intercept err and rethrow it, or create your own.
      throw new Error("Could not delete kontakt!");
    }
  }
);


/* ======================

====================== */


const initialState:InitialState = { 
  kontaktsError: null,
  loadingKontakts: false,
  kontakts: [],

  addingKontakt: false, // Used for enabling/disabling button.
  addingKontaktError: null,
  ////////////////////////////////////////////////////////////////////////////////////
  //
  //  One could also handle errors locally:
  //
  //    dispatch( addKontakt({ name, phone }))
  //    .unwrap()
  //    .then(result => { ... })
  //    .catch(err   => { ... })
  //    .finally(()  => { ... })
  //
  //
  //  However, it makes more sense to handle ALL the logic in one place. 
  //  Then we can simply rely on the state values from within the component,
  //  without having to bloat it with more logic. Otherwise, it's kind of weird to 
  //  breaking it up like this.
  //
  ////////////////////////////////////////////////////////////////////////////////////
  deletingKontakt: false,
  deletingKontaktError: null,
};


/* ======================

====================== */


export const kontaktSlice = createSlice({
  name: 'kontakts', 
  initialState,
  reducers: { 
  },


  extraReducers: (builder) => { // https://redux-toolkit.js.org/api/createslice#extrareducers
    builder
    .addCase(getKontakts.pending, (state, action) => {
      state.kontaktsError   = null;
      state.loadingKontakts = true;
    })
    
    .addCase(getKontakts.fulfilled, (state, action:PayloadAction<Kontakts>) => {
      state.loadingKontakts = false;
      state.kontakts        = action.payload;
    })

    .addCase(getKontakts.rejected, (state, action) => {
      state.kontaktsError   = action.error;
      state.kontakts        = [];
      state.loadingKontakts = false;
    })


    /* ======================= */


    .addCase(addKontakt.pending, (state, action) => {
      state.addingKontaktError = null;
      state.addingKontakt      = true;
    })
    
    .addCase(addKontakt.fulfilled, (state, action) => {
      state.addingKontakt = false;
      // Add data to kontakts here, or dispatch getKontakts() to update from server data.
      state.kontakts.push(action.payload);
    })

    .addCase(addKontakt.rejected, (state, action) => {
      state.addingKontaktError = action.error;
      state.addingKontakt      = false;
    })


    /* ======================= */


    .addCase(deleteKontakt.pending, (state, action) => {
      state.deletingKontaktError = null;
      state.deletingKontakt      = true;
    })
    
    .addCase(deleteKontakt.fulfilled, (state, action) => {
      state.deletingKontakt = false;
      state.kontakts        = state.kontakts.filter(k => k.id !== action.payload.deletedId);
    })

    .addCase(deleteKontakt.rejected, (state, action) => {
      state.deletingKontaktError = action.error;
      state.deletingKontakt      = false;
    });
  }
});


//////////////////////////////////////////////////////////////////////////////////////////
//
//  Gotcha: Thunk functions returned from createAsyncThunk do not become
//  part of kontaktSlice.actions. 
//
//    https://redux-toolkit.js.org/api/createslice#extrareducers
//    As case reducers specified with extraReducers are meant to 
//    reference "external" actions, they will not have actions generated 
//    in slice.actions.
//
//
//  Export them separately, so that they can be spread into const thunks = {}
//  in store.js, and then exposed through the useThunks() convenience function.
//
//////////////////////////////////////////////////////////////////////////////////////////


export const kontaktActions = kontaktSlice.actions;
export const kontaktThunks  = { getKontakts, addKontakt, deleteKontakt }; 
export const kontaktReducer = kontaktSlice.reducer;