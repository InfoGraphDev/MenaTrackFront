import React from 'react';

interface SpaceProps {
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
  leftAndRight?: string;
  topAndBottom?: string;
}

const SpaceComponent: React.FC<SpaceProps> = ({
  left,
  right,
  top,
  bottom,
  leftAndRight,
  topAndBottom,
}) => {
  const style: React.CSSProperties = {
    marginLeft: left || leftAndRight,
    marginRight: right || leftAndRight,
    marginTop: top || topAndBottom,
    marginBottom: bottom || topAndBottom,
  };

  return (
    <div style={style}></div>
  );
};

export default SpaceComponent;
