import { createSlice /*, createAction, createReducer */ } from '@reduxjs/toolkit';


////////////////////////////////////////////////////////////////////////////////////
//
//  Builder Notation: https://redux-toolkit.js.org/api/createReducer#usage-with-the-builder-callback-notation
//
//  In the free Udemy tutorial at 3 minutes into video 5 : https://www.udemy.com/course/react-redux-toolkit-complete-guide/learn/lecture/27572894#overview
//  He imported createAction and createReducer : 
//
//    https://redux-toolkit.js.org/api/createAction
//    https://redux-toolkit.js.org/api/createReducer
//
//
//  This seems to be an alternate way of creating action creators functions and reducers.
//
//      import { createAction, createReducer } from '@reduxjs/toolkit';
//
//
//      const increment = createAction('counter/increment');
//      const decrement = createAction('counter/decrement');
//      const reset     = createAction('counter/reset');
//
//
//      const initialState = { value: 0 };
//
//
//      export const counterReducer = createReducer(initialState, (builder) => {
//        builder
//        .addCase(increment, (state, action) => {
//          state.value++;
//        })
//
//        .addCase(decrement, (state, action) => {
//          state.value--;
//        })
//        
//        .addCase(reset, (state, action) => {
//          state.value = 0;
//        });
//      });
//
//
//      export const counterActions = { increment, decrement, reset };
//
//
//  This notation is more useful for when one creates async thunks and implements them
//  them in extraReducers.
//
//////////////////////
//
//  Map Object Notation: https://redux-toolkit.js.org/api/createReducer#usage-with-the-map-object-notation
//
//      import { createAction, createReducer } from '@reduxjs/toolkit';
//
//
//      const increment = createAction('counter/increment');
//      const decrement = createAction('counter/decrement');
//      const reset     = createAction('counter/reset');
//
//
//      const initialState = { value: 0 };
//
//
//      export const counterReducer = createReducer(initialState, {
//        [increment]: (state, action) => { state.value += action.payload },
//        [decrement]: (state, action) => { state.value -= action.payload },
//        [reset]:     (state, action) => { state.value = 0 }
//      });
//
//
//      export const counterActions = { increment, decrement, reset };
//
////////////////////////////////////////////////////////////////////////////////////


const initialState = { value: 0 };


export const counterSlice = createSlice({
  name: 'counter', 
  initialState,
  reducers: {
    increment: (state, action) => { state.value += action.payload; },
    decrement: (state, action) => { state.value -= action.payload; },
    reset:     (state, action) => { state.value = 0; }
  }
});


export const counterActions = counterSlice.actions;
export const counterReducer = counterSlice.reducer;