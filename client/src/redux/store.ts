import { configureStore, bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { 
  contactReducer, contactActions, 
  kontaktReducer, kontaktActions, kontaktThunks,
  counterReducer, counterActions 
} from './slices';


// Export all actions and thunks from each slice. Import them here, 
// and spread them into a single actionCreators object,
// which will then be passed into bindActionCreators().
// Do the same for thunks.

export const { addKontakt } = kontaktThunks;

const actionCreators = {
  ...contactActions,
  ...kontaktActions,
  ...counterActions
};


const thunks = {
  ...kontaktThunks
};


// No need for combineReducers. Just add the reducers here.
export const store = configureStore({
  reducer: { 
    contacts: contactReducer,
    kontakts: kontaktReducer,
    counter:  counterReducer
  }
});


// Infer the RootState and AppDispatch types from the store itself.
export type RootState   = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;


// https://redux-toolkit.js.org/usage/usage-with-typescript
export const useAppDispatch = () => useDispatch<AppDispatch>();  // Export a hook that can be reused to resolve types


const boundActionCreators = bindActionCreators(actionCreators, store.dispatch);


// No need to remember to destructure all the action creators.
// Just export this, and destructure them as needed later.
// This is technically not even a hook, but it still makes sense
// to name it like one.
export const useActions = () => {
  return { ...boundActionCreators };
};


////////////////////////////////////////////////////////////////////////////////////
//
//  https://github.com/reduxjs/redux-toolkit/issues/849
//  bindActionCreators doesn't infer your custom dispatch type, and instead uses the default Dispatch.
//
//  https://github.com/reduxjs/redux-toolkit/issues/579
//  bindActionCreators does not take thunks into account. This is not really a RTK issue, 
//  but an incompatiblity between redux and redux-thunk. 
//
//  There seems to be no easy way to pre-bind thunks. It becomes even more
//  complicated given that a thunk may have an argument passed into it.
//  The closest that I could get to a convenience function was useThunks() below.
//  It returns the typed dispatch and all possible thunks -from which one can
//  destructre what they need. Then in the component that is using them, you will
//  have to call dispatch(someThunk(arg?)).
//
////////////////////////////////////////////////////////////////////////////////////
export const useThunks = () => {
  const dispatch = useAppDispatch();
  return { dispatch, thunks };
};



