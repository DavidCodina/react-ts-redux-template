import React from 'react'; 
import { useTypedSelector, useActions } from '../../../redux';  // eslint-disable-line   
import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom'; // eslint-disable-line
import { Page, Title, HR } from '../../shared';
import { ContactInput }    from './ContactInput';
import { ContactList }     from './ContactList';



interface ContactsPageProps {
}


/* =============================================================================

============================================================================= */


export function ContactsPage(props: ContactsPageProps): React.ReactElement | null {
  // const state = useTypedSelector(state => state); 
  // console.log("state: ", state);
  
  
  return (
    <Page>
      <Page.Container>
        <Title as="h2"className="mb-3 text-white-3d text-center">Contacts</Title>
        <h5 className="font-montserrat text-blue text-center">Redux (fetch with no thunks)</h5>

        <HR />

        <ContactInput />
        <ContactList />
      </Page.Container>
    </Page>  
  );
}
