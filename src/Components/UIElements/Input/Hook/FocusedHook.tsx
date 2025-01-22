import { useState, useCallback, useRef, useEffect } from 'react';

function useFocus() {
    const [isFocused, setIsFocused] = useState(false);
    const ref = useRef(null);

    const handleFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    const handleBlur = useCallback(() => {
        setIsFocused(false);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (ref.current && !ref.current.contains(event.target as Node)) {
            setIsFocused(false);
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [ref]);


    return { ref, isFocused, handleFocus, handleBlur,setIsFocused };
}

export default useFocus;
