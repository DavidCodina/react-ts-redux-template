import React from 'react';
import './CustomToggle.scss'; //# Make into CSS Module.


interface CustomToggleProps {
  show: boolean;
  toggleCollapse: () => void;
}

export const CustomToggle = ({ show, toggleCollapse }: CustomToggleProps) => { 
  return (
    <button
      className={`btn hamburger-container hamburger-squeeze align-self-center user-select-none${show ? ' active' : ''}`}
      onClick={toggleCollapse} 
    >
      <div className="hamburger-inner"></div>
    </button>
  );
};

