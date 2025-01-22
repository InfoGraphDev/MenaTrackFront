import React from 'react';

interface SimplifiedGridProps {
    columnWidth?: string; 
    rowHeight?: string;
    gap?: string; 
    columnGap?: string; 
    rowGap?: string; 
    children: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    title?: string;
    onBlur?: React.FocusEventHandler<HTMLDivElement>;
    onFocus?: React.FocusEventHandler<HTMLDivElement>;
}

const GridComponent = React.forwardRef<HTMLDivElement, SimplifiedGridProps>(({
    columnWidth = '23rem', 
    gap = '1rem',
    columnGap,
    rowGap,
    children,
    style: customStyle,
    className,
    onClick,
    title,
    onBlur,
    onFocus,
    rowHeight
}, ref) => {
    const gridTemplateColumns = `repeat(auto-fit, minmax(${columnWidth}, 1fr))`;
    const gridTemplateRows = rowHeight ? `repeat(auto-fill, minmax(${rowHeight}, 1fr))` : undefined;

    const combinedStyles = {
        display: 'grid',
        gridTemplateColumns,
        gridTemplateRows,
        gap,
        columnGap,
        rowGap,
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

export default GridComponent;
