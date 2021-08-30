import React from 'react'; 
import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom'; // eslint-disable-line
import { useTypedSelector, useActions  } from '../../../redux';  // eslint-disable-line    
import { Page, Title } from '../../shared';


interface TemplatePageProps {
}


/* =============================================================================

============================================================================= */


export function SomePage(props: TemplatePageProps): React.ReactElement | null {
  const state = useTypedSelector(state => state); // eslint-disable-line


  return (
    <Page>
      <Page.Container>
        <Title as="h2"className="mb-5 text-white-3d text-center">Template</Title>


        <article className="mt-5 article">
          <h2 className="text-white-3d">Overview:</h2>


        </article>  
      </Page.Container>
    </Page>  
  );
}
