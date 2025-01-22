import React, { useContext } from 'react'
import styles from "./style.module.scss";
import { MapContext } from '@/Features/Maps/Maps';
import useIsArabicLanguage from '@/Hooks/IsArabicLanguage';
import LeftArrowSvg from '@/Assets/Icons/leftArrow';
import RightArrowSvg from '@/Assets/Icons/rightArrow';
import { useModalContext } from '@/Components/UIElements/Feedback/Modal/hook';

function HandelBackButton() {
    const {ModalStatus,setModalStatus}=useModalContext();
    const isArabicLanguage=useIsArabicLanguage();

    const handelBack=()=>{
        let AllModal=[...ModalStatus];
        AllModal.pop();
        setModalStatus(AllModal);  
      }
    
  return (
        <div className={styles.container}>
            {ModalStatus?.length>1&&
            <div onClick={handelBack}>
                {!isArabicLanguage?<LeftArrowSvg/>:<RightArrowSvg/>}
            </div>}
        </div>
  )
}

export default HandelBackButton
