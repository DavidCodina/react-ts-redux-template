import React             from 'react';
import { Route, Switch } from 'react-router-dom';
import { HomePage }      from '../pages/HomePage';
import { ContactsPage }  from '../pages/ContactsPage';
import { KontaktsPage }  from '../pages/KontaktsPage';
import { CounterPage }   from '../pages/CounterPage';
import { FriendsPage }   from '../pages/FriendsPage';
import { AboutPage }     from '../pages/AboutPage';
import NotFoundPage      from '../pages/NotFoundPage';


interface RouterProps {
}


export function Router(props: RouterProps){
  return (
    <Switch>  
      <Route exact path="/"      component={HomePage} />
      <Route path="/contacts"    component={ContactsPage} />;
      <Route path="/kontakts"    component={KontaktsPage} />;
      <Route path="/friends"     component={FriendsPage} />;
      <Route path="/counter"     component={CounterPage} />;
      <Route exact path="/about" component={AboutPage} />
      <Route component={NotFoundPage} />
    </Switch>
  )
}
