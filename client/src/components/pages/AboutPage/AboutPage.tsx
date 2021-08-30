import React from 'react'; 
import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom'; // eslint-disable-line
import { useTypedSelector, useActions  } from '../../../redux';  // eslint-disable-line    
import { Page, Title, HR } from '../../shared';


interface AboutPageProps {
}


export function AboutPage(props: AboutPageProps){
  return (
    <Page>
      <Page.Container>
        <Title as="h2"className="mb-5 text-white-3d text-center">About</Title>

        <HR />

        <article className="mt-5 article">
          <h2 className="text-white-3d">Dependencies:</h2>

   
          <p>This project was created using the official React Redux template:</p>


          <pre><code>{`
  npx create-react-app demo --template redux-typescript
          `}</code></pre>


          <p>Among other things it adds <code>"@reduxjs/toolkit"</code>. Other packages added include:</p>


          <pre><code>{`
  npm install react-router-dom
  npm install --save @types/react-router

  npm install node-sass --save
  npm install bootstrap
  npm install react-bootstrap@next
  npm i bootstrap-icons

  npm install formik --save
  npm install -S yup

  npm install axios
  npm i react-query

  npm i react-error-boundary
  npm i eslint-plugin-testing-library eslint-plugin-jest-dom    
          `}</code></pre>


          <p>I'm considering adding <code>react-query</code>, but Redux toolkit has something called RTK Query
          that may work better.</p>


          <p><strong>Note:</strong> <code>lodash</code> and <code>react-app-polyfill</code> are already
          included as part of a Create React App.</p>
        </article>  


        {/* ====================================================================
        
        ===================================================================== */}


        <article className="mt-5 article">
          <h2 className="text-white-3d">src/assets folder:</h2>


          <p>https://stackoverflow.com/questions/41676054/how-to-add-fonts-to-create-react-app-based-projects</p>


          <p>You generally don't want assets in the public folder
          because you want them to go through the 'build pipeline' so that they get hashes during compilation,
          browser caching works correctly, and that you get compilation errors if the files are missing.
          As described in the guide [https://create-react-app.dev/docs/adding-images-fonts-and-files], 
          you should be using JS imports in almost all cases, not the public folder. </p>


          <p>If for some reason you prefer not to use the build pipeline, and instead do it the “classic way”, 
          you can use the public folder and put your fonts there. The downside of this approach is that the files don’t 
          get hashes when you compile for production so you’ll have to update their names every time you change them, 
          or browsers will cache the old versions.</p>

          <p>– Dan Abramov </p>
        </article>


        {/* ====================================================================
        
        ===================================================================== */}


        <article className="mt-5 article">
          <h2 className="text-white-3d">Page Props:</h2>


          <p>Before switching to <code>useTypedSelector</code> in each page, I was
          implementing it in App.tsx, then passing state into <code>&#60;Router state=&#123;state&#125; /&#62;</code>.
          From there it was getting passed into each <code>&#60;Route /&#62;</code>:</p>


          <pre><code>{`
  <Route 
    exact path="/"
    render={(props) => {
    return <HomePage {...props} state={state} />;
    }}
  />
          `}</code></pre>


          <p> Then in each page the props had to be set up as follows:</p>


          <pre><code>{`
  import { RootState }           from '../../../redux';
  import { RouteComponentProps } from 'react-router-dom';

  ...

  interface HomePageProps extends RouteComponentProps {
    state: RootState; 
  }

  ...
          `}</code></pre>


          <p>All of this is was just extra work. It's easier to use:</p>


          <pre><code>{`
  const state = useTypedSelector(state => state); 
          `}</code></pre>
        </article>


        {/* ====================================================================
        
        ===================================================================== */}


        <article className="mt-5 article">
          <h2 className="text-white-3d">CSS Modules:</h2>


        </article>


        {/* ====================================================================
        
        ===================================================================== */}


        <article className="mt-5 article">
          <h2 className="text-white-3d">React Query:</h2>
        </article>


        {/* ====================================================================
        
        ===================================================================== */}


        <article className="mt-5 article">
          <h2 className="text-white-3d">Redux:</h2>


        </article>


        {/* ====================================================================
        
        ===================================================================== */}


        <article className="mt-5 article">
          <h2 className="text-white-3d">Bootstrap Theming:</h2>


          <p className="text-blue">This section will document important information related to 
          the Sass/Bootstrap theme...</p>
          {/*
          <div className="horizontal-ruler">
            <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
            <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
            <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
          </div>
          */}
        </article>


        {/* ====================================================================
        
        ===================================================================== */}


        <article className="mt-5 article">
          <h2 className="text-white-3d">.eslintrc.json:</h2>


        </article>


        {/* ====================================================================
        
        ===================================================================== */}


        <article className="mt-5 article">
          <h2 className="text-white-3d">.env:</h2>


          <p>This file has global variables in it. For example, initially it had:</p>


          <pre><code>{`
  REACT_APP_SERVER=http://localhost:5000
          `}</code></pre>


          <p>This variable was used as the <code>baseUrl</code> for development, but may be removed 
          in the near future. However, in production it is useful for storing global variables, and
          should <strong>not</strong> be removed by the <code>.gitignore</code>.</p>
        </article>


        {/* ====================================================================
        
        ===================================================================== */}


        <article className="mt-5 article">
          <h2 className="text-white-3d">tsconfig.json:</h2>


          <p>This file got generated with the initial project. Unless there's something you
          really want to change, and you know what you're doing, then I would recommmend
          leaving this file as it is.</p>
        </article>

      </Page.Container>  
    </Page>
  );
}
