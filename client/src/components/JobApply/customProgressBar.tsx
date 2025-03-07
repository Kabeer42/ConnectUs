import React from 'react';

interface ProgressBarProps {
  percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  const containerStyles = {
    height: '25px',
    width: '100%',
    backgroundColor: '#e0e0df',
    borderRadius: '50px',
    overflow: 'hidden',
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

export default ProgressBar;
