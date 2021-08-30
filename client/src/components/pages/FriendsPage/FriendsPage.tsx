import React from 'react'; 
import { useTypedSelector, useActions } from '../../../redux';  // eslint-disable-line   
import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom'; // eslint-disable-line
import { Page, Title, HR } from '../../shared';
import { FriendInput }     from './FriendInput';
import { FriendList }      from './FriendList';


interface FriendsPageProps {
}


/* =============================================================================

============================================================================= */


export function FriendsPage(props: FriendsPageProps): React.ReactElement | null {
  return (
    <Page>
      <Page.Container>
        <Title as="h2"className="mb-3 text-white-3d text-center">Friends</Title>
        <h5 className="font-montserrat text-blue text-center">React Query Fetch (No Redux)</h5>

        <HR />

        <FriendInput />
        <FriendList />
      </Page.Container>
    </Page>  
  );
}
