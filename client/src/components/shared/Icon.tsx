// import React from 'react'; 
// This component works in conjunction with bootstrap-icons.css, and bootstrap-icons.woff2 / woff.
// However, I have made it so it's also compatible with FontAwesome.


interface IconProps {
  name?:      string;
  size?:      string | number;
  color?:     string;
  className?: string;
  style?:     React.CSSProperties;
}


/* =============================================================================

============================================================================= */


export function Icon({ 
  name      = 'question-circle', 
  size      = 'inherit', 
  color     = 'currentColor', 
  className = '',
  style     = {} 
}: IconProps){

  const classNameParts      = className.split(' ');
  const isAFontAwesomeClass = classNameParts.indexOf("fas") !== -1 || 
                              classNameParts.indexOf("far") !== -1 ||
                              classNameParts.indexOf("fal") !== -1 ||
                              classNameParts.indexOf("fad") !== -1 ||
                              classNameParts.indexOf("fab") !== -1 ? true : false;

  if (isAFontAwesomeClass){
    return <i className={className} style={{ fontSize: size, color: color, ...style }}></i>;
  }


  return (
    <i 
      className={ className ? `bi bi-${name} ${className}` : `bi bi-${name}`} 
      style={{ fontSize: size, color: color, ...style }}
    ></i>   
  );
}