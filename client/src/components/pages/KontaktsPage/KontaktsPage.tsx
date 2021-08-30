import React               from 'react';
import { Page, Title, HR } from  '../../shared';
import { KontaktInput }    from './KontaktInput';
import { KontaktList }     from './KontaktList';


interface KontaktsPageProps {
}


/* =============================================================================

============================================================================= */


export function KontaktsPage(props: KontaktsPageProps): React.ReactElement | null {
  return (
    <Page>
      <Page.Container>
        <Title as="h2" className="mb-3 text-white-3d text-center">Kontakts</Title>
        <h5 className="font-montserrat text-blue text-center">Redux (fetch with thunks)</h5>
        
        <HR />

        <KontaktInput />
        <KontaktList />
      </Page.Container>
    </Page>     
  );
}
