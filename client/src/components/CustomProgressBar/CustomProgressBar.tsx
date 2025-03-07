import React from 'react';

interface CustomProgressBarProps {
  percentage: number;
}

const CustomProgressBar: React.FC<CustomProgressBarProps> = ({ percentage }) => {
  const containerStyles = {
    height: '25px',
    width: '100%',
    backgroundColor: '#e0e0df',
    borderRadius: '50px',
    overflow: 'hidden',
    marginBottom: '20px',
  };

  const fillerStyles = {
    height: '100%',
    width: `${percentage}%`,
    backgroundColor: percentage > 50 ? '#4caf50' : '#f00',
    borderRadius: 'inherit',
    transition: 'width 0.5s ease-in-out',
  };

  const labelStyles = {
    padding: '5px',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'right' as 'right',
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${percentage}%`}</span>
      </div>
    </div>
  );
};

export default CustomProgressBar;
