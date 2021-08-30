import React               from 'react'; 
import { Page, Title, HR } from '../../shared';


interface HomePageProps {
}


/* =============================================================================

============================================================================= */


export function HomePage(props: HomePageProps): React.ReactElement | null {  
  return (
    <Page>
      <Page.Container>
        <Title as="h2"className="mb-5 text-white-3d text-center">Home</Title>

        <HR />

      </Page.Container>
    </Page>  
  );
}
