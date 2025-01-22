import React, { useContext } from 'react'
import styles from "./style.module.scss";
import { MapContext } from '@/Features/Maps/Maps';
import CloseCirculeSvg from '@/Assets/Icons/CloseCircule';
import { useModalContext } from '@/Components/UIElements/Feedback/Modal/hook';

function HandelCloseButton({SpecialClose}) {
    const {setModalStatus}=useModalContext();
    const handelClose=()=>{
        setModalStatus([])
      };

  return (
    <div onClick={SpecialClose?SpecialClose:handelClose}  className={styles.container}>
      <CloseCirculeSvg className={styles.icon}/>
    </div>
  )
}

export default HandelCloseButton
