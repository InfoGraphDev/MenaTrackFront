import { RefObject, useEffect } from 'react';

export function useOutsideClick(ref: RefObject<HTMLElement>, callback: () => void) {
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {

      let ValueShow=true
      if (event?.target?.closest('svg')) {
        ValueShow=false
      }
      
      if (ref.current && !ref.current.contains(event.target as Node)&&ValueShow) {
        callback();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
}
