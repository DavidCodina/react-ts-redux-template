////////////////////////////////////////////////////////////////////////////////
//
//  https://github.com/facebook/create-react-app/blob/main/packages/react-app-polyfill/README.md
//  If you are supporting Internet Explorer 9 or Internet Explorer 11 
//  you should include both the ie9 or ie11 and stable. If you're using 
//  this in Create React App, it will automatically use the browserslist 
//  you've defined to only include polyfills needed by your target browsers 
//  when importing the stable polyfill.
//
//  // This must be the first line in src/index.js
//  import 'react-app-polyfill/ie11';
//  import 'react-app-polyfill/stable';
//
////////////////////////////////////////////////////////////////////////////////


import React              from 'react';
import ReactDOM           from 'react-dom';
import { Provider }       from "react-redux"; 
import { store }          from './redux';
import { QueryClientProvider, QueryClient } from "react-query";
import App                from './App';
import * as serviceWorker from './serviceWorker';


const queryClient = new QueryClient();


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}> 
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>   
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
