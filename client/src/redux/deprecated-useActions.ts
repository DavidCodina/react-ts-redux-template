import { useDispatch }        from 'react-redux';
import { bindActionCreators } from 'redux';
import { contactActions }     from './slices/contactSlice';


//////////////////////////////////////////////////////////////////////////////////////////
//
//  The biggest downside of this useActions() is that it's called inside of
//  the component. This means each time it rerenders, it recreates the bound action creators,
//  so you're getting a function instances. 
//
//  If you're trying to use one of the bound action creators in a useEffect, 
//  it will end up creating an infintite loop. This is not resolved by using 
//  useCallback in that component. Nor can it be solived by implementing
//  useCallback here in a for in loop (it's not allowed).
//
//  So the only real solution is to implement a useEffectOnce: 
//  https://github.com/streamich/react-use/blob/master/docs/useEffectOnce.md
//  Or you can just build your own with a const hasMounted = useRef(false);
//
//  If you forget this rule, you're likely to run into a gotcha.
//  Fortunately, this isn't the only way to pre-bind action creators.
//  In store.js you can import actions:
//
//    import { contactActions } from './slices';
//
//
//  Then destructure and export them back out once they've been bound.
//  
//    export const { setContacts, deleteContact, addContact } = bindActionCreators(actionCreators, store.dispatch);
//
//  Then import as follows:
//
//    import { setContacts, deleteContact } from '../redux';
//
//
//  Because we import them ONCE, OUTSIDE OF THE COMPONENT, they don't cause rerenders.
//  The only gotcha is forgetting one of the implementation steps.
//
//  Update: or just export boundActionCreators in a useActions from inside store.js.
//  The difference being that we DO NOT bind the action creators in useActions. Rather,
//  that version of useActions is basically a glorified way of exporting.
//
//////////////////////////////////////////////////////////////////////////////////////////


const actionCreators = {
  ...contactActions
};


// This hook binds all action creator function to dispatch.
export const useActions = () => {
  const dispatch = useDispatch();
  // bindActionCreators will give us back an object that contains
  // all of the different action creator functions,
  // but now whenever we call the bound action creator functions, 
  // the returned value from them will be automatically taken from
  // them and provided to dispatch.
  return bindActionCreators(actionCreators, dispatch);
};