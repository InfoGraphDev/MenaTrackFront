import React, { useEffect, useRef } from 'react';
import styles from "./style.module.scss";
import { useModalContext } from './hook';
import ListDetailComplain from './component/ListDetailComplain';

interface ModalInterface{
  children?:React.ReactNode,
}

const ModalComponent = ({ children }:ModalInterface) => {  
  const modalRef = useRef<HTMLDivElement>(null);
  const {ModalStatus,setModalStatus}=useModalContext();

    useEffect(() => {
      const handleClickOutside = (event: any) => {
        let ValueShow=true
            if (event.target.closest('svg')) {
              ValueShow=false
            }
          if (
          modalRef.current &&
          !modalRef.current.contains(event.target as Node)
          &&ModalStatus
          &&ValueShow
        ) {
          setModalStatus([])
        }
      };

      if (ModalStatus) {
        document.addEventListener('mousedown', handleClickOutside);
      } else {
        document.removeEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ModalStatus, setModalStatus]);  

    if(ModalStatus?.length>0){
      let ValueCheck=ModalStatus[ModalStatus?.length-1];

      return(
          <div className={styles.modal}>
              <div ref={modalRef}>
                  {(ValueCheck?.type=="ListDetailComplain")&&<ListDetailComplain DataUse={ValueCheck?.value}/>}
              </div>
          </div>
      )
    }

  };

export default ModalComponent