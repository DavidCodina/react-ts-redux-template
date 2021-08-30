import React from 'react'; 
// https://levelup.gitconnected.com/create-more-extensible-react-components-with-the-as-prop-pattern-b79bcbcf4024
// https://stevekinney.github.io/react-and-typescript/polymorphic-components


/////////////////////////////////////////////////////////////////////////////////////
//
// Polymorphic Component example.
//
// This pattern is fairly complicated, but it makes it so a developer
// can do:
//
//    [Error] :Property 'href' does not exist on type 'IntrinsicAttributes & TitleOwnProps<"h2"> & Omit<DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>, keyof TitleOwnProps<...>>'.
//    <Title as="h2" className="mb-5 text-white-3d text-center" href="https://www.google.com/">Home Center</Title>
//
//
//  While doing this will work fine.
//
//    <Title as="a" className="mb-5 text-white-3d text-center" href="https://www.google.com/">Home Center</Title>
//
//
///////////////////////////////////////////////////////////////////////////////////////


// T should be an HTML element, and it should default to React.ElementType
type TitleOwnProps<T extends React.ElementType = React.ElementType> = {
  as?:        T;
  className?: string;
  style?:     React.CSSProperties;
  children:   React.ReactNode;
};


// TitleProps includes everything in TitleOwnProps & combine that with
// everything that is in the React component the E represents, minus
// the ones that we define.
type TitleProps<U extends React.ElementType> = TitleOwnProps<U> & Omit<React.ComponentProps<U>, keyof TitleOwnProps>



const defaultElement = 'h1';
export function Title<E extends React.ElementType = typeof defaultElement>(props: TitleProps<E>): React.ReactElement | null {
  const { as: Component = defaultElement, className = '', style = {}, children } = props;
  // Include || defaultElement: const Component = as || defaultElement; Otherwise you get:
  // JSX element type 'Component' does not have any construct or call signatures.
  // I did this within the object destructuring above.
  
  // {...props} is included here, so that other properties will automatically be passed through.
  // For example, if it's an <a>, then href and target might also get passed in.
  return <Component className={className} style={style} {...props}>{children}</Component>;
}





