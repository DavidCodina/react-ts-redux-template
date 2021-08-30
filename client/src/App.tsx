import React             from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Router }        from './components/navigation/Router';
import { NavBar }        from './components/navigation/NavBar';

// Font icons are used in conjunction with custom component. One could also
// use: https://www.npmjs.com/package/react-bootstrap-icons, but that's unnecessary.
import 'bootstrap-icons/font/bootstrap-icons.css';

////////////////////////////////////////////////////////////////////////////////
//
//  Rather than importing custom-bootstrap.scss here:
//    import './scss/bootstrap/custom-bootstrap.scss';
//
//  It is imported inside of App.scss. This gives App.scss
//  full access to all of the bootstrap variables, mixins, etc.
//
//  For Bootstrap color system:       https://getbootstrap.com/docs/5.1/customize/color/
//  For Material Design color system: https://material.io/design/color/the-color-system.html
//  To make your own system:          https://maketintsandshades.com/:
//  Make 500 THE color, then take the 4 lighter as 1-400, and the 4 darker as 600-900.
//
////////////////////////////////////////////////////////////////////////////////
import './scss/App.scss';


/* =============================================================================

============================================================================= */


function App(): React.ReactElement | null {
  return (
    <BrowserRouter>
      <header id="primary-header">
        <NavBar />
      </header>

      <main>
        <Router />      
      </main>
    </BrowserRouter>
  );
}


export default App;