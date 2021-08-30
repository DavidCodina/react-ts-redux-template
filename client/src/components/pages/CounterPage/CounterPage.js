import React               from 'react';
import { Page, Title, HR } from  '../../shared';
import { Counter }         from './Counter';


/* =============================================================================

============================================================================= */


export function CounterPage(props){
  return (
    <Page>
      <Page.Container>
        <Title as="h2" className="mb-3 text-white-3d text-center">Counter</Title>
        <h5 className="font-montserrat text-blue text-center">Redux (Basic)</h5>
        
        <HR />

        <Counter />
      </Page.Container>
    </Page>     
  );
}
