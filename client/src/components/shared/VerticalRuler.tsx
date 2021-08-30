import React from 'react'; 


interface VerticalRulerProps {
  color?:     string;
  height?:    number | string;
  className?: string;
  style?:     React.CSSProperties;
}


export function VerticalRuler({ 
  color     = '#333', 
  height    = '75%', 
  className = '', 
  style     = {} }: VerticalRulerProps): React.ReactElement | null {
  return (
    <div
      className={className}
      style={{ 
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1, 
        height: height,
        backgroundColor: color,
        ...style
      }}
    />
  );
}


/* Usage:

<div className="position-relative w-90 mx-auto mb-5 border border-2 border-blue bg-light rounded-3" style={{ minHeight: '75vh' }}>
  <VerticalRuler color="var(--bs-blue)" style={{ width: 2 }} />
</div>

*/