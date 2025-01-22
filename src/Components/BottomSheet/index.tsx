import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';

const BottomSheetComponent = ({IsOpen,handelClose,children}) => {
  const [position, setPosition] = useState('middle');

  useEffect(()=>{
    if(IsOpen){
      setPosition("middle")
    }else{
      setPosition("bottom")    
    }
  },[IsOpen])

  const handleDrag = (event) => {
    const screenHeight = window.innerHeight;
    const currentTouchY = event.touches[0].clientY;
    if (currentTouchY < screenHeight / 3) {
      setPosition('top');
    } else if (currentTouchY > screenHeight * 2 / 3) {
      setPosition('bottom');
      handelClose()
    } else {
      setPosition('middle');
    }
  };

  const bottomSheetHeight = position === 'top' ? '85vh' : position === 'middle' ? '50vh' : '0vh'; 

  return (
    <div>
      {IsOpen && (
        <div className={styles.backdrop}>
          <div className={styles.bottomSheet} style={{height:bottomSheetHeight}} >
            <div className={styles.dragHandle} onTouchMove={handleDrag}>
              <div className={styles.button}></div>
            </div>
            <div className={styles.content}>
              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BottomSheetComponent;
