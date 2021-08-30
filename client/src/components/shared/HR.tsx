import React from 'react'; 


interface HrProps {
  // color:      string;
  // className?: string;
  // style?:     React.CSSProperties;
}



export function HR(props: HrProps){
  return (
    <div className="horizontal-ruler">
      {
        [...Array(39)].map((value, index) => {
          return (
            <hr key={index} />
          );
        })
      }
    </div>
  );
}
