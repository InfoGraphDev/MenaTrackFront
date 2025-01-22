import React from 'react';

interface FlexProps {
    justifyContent?: 'center' | 'space-between' | 'flex-start' | 'flex-end' | 'space-around' | 'space-evenly' | 'safe' | 'unsafe' | 'row-reverse';
    alignItems?: 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'baseline' | 'normal';
    gap?: string;
    flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
    flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
    children: React.ReactNode;
    style?: React.CSSProperties; 
    className?: string;
    onClick?: React.MouseEventHandler<HTMLDivElement>; 
    title?: string;
    onBlur?: React.FocusEventHandler<HTMLDivElement>;
    onFocus?: React.FocusEventHandler<HTMLDivElement>;
}

const FlexComponent = React.forwardRef<HTMLDivElement, FlexProps>(({
  justifyContent = 'center',
  alignItems = 'center',
  gap,
  flexWrap = 'wrap',
  flexDirection = 'row', 
  children,
  style: customStyle,
  className,
  onClick, 
  title,
  onBlur,
  onFocus,
}, ref) => {
  const combinedStyles = {
    display: 'flex', 
    justifyContent,
    alignItems,
    gap,
    flexWrap,
    flexDirection,
    ...customStyle, 
  };

  return (
    <div 
      className={className} 
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

export default FlexComponent;
