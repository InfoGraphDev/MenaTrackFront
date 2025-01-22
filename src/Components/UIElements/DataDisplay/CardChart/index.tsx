import React from 'react';
import styles from "./style.module.scss";

interface FlexProps {
    children: React.ReactNode;
    style?: React.CSSProperties; 
    onClick?: React.MouseEventHandler<HTMLDivElement>; 
    title?: string;
    onBlur?: React.FocusEventHandler<HTMLDivElement>;
    onFocus?: React.FocusEventHandler<HTMLDivElement>;
}

const CardChartComponent = React.forwardRef<HTMLDivElement, FlexProps>(({
  children,
  style: customStyle,
  onClick, 
  title,
  onBlur,
  onFocus,
}, ref) => {
  const combinedStyles = {
    display: 'flex', 
    ...customStyle, 
  };

  return (
    <div 
      className={styles.CardChart} 
      style={combinedStyles} 
      onClick={onClick} 
      ref={ref} 
      title={title}
      onBlur={onBlur}
      onFocus={onFocus}
    >
      {children}
    </div>
  );
});

export default CardChartComponent;
