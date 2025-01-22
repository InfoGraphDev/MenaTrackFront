import React, { useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import FlexComponent from '@/Components/UIElements/Layout/Flex';
import useIsArabicLanguage from '@/Hooks/IsArabicLanguage';
import { useOutsideClick } from '@/Hooks/ClickOutsideHook';
import { useForm } from 'react-hook-form';
import ReusableInput from '../../..';
import { useTranslation } from 'react-i18next';
import { FeildTypeFormHook } from '@/Core/Enums/Feild-Type-Form';
import ButtonComponent from '@/Components/UIElements/General/Button';
import UppArrowSvg from '@/Assets/Icons/uppArrow';
import DownArrowSvg from '@/Assets/Icons/downarrow';
import LeftArrowSvg from '@/Assets/Icons/leftArrow';
import RightArrowSvg from '@/Assets/Icons/rightArrow';
import { DateMonth } from '@/Core/Constant/DateMonth';
import DateSvg from '@/Assets/Icons/Date';

const YearMonthPickerFormHook = ({ disable, formOptions, Datause }) => {
  const [month, setMonth] = useState(null);
  const language:boolean=useIsArabicLanguage();
  const { name } = Datause;
  const { setValue } = formOptions;
  const OpenDateSelectRef=useRef<any>(null);
  const [IsOpen,setIsOpen]=useState(false);
  const formOptionsHandelYear = useForm<FormData>({mode: 'onChange',defaultValues:{year:new Date().getFullYear()}});

  const decreaseYear = () => !disable &&
  formOptionsHandelYear?.setValue("year", formOptionsHandelYear?.watch("year")-1, {
    shouldValidate: true,
    shouldDirty: true,
    shouldTouch: true,
    exact: false
  });

  const increaseYear = () => !disable &&
  formOptionsHandelYear?.setValue("year", formOptionsHandelYear?.watch("year")+1, {
    shouldValidate: true,
    shouldDirty: true,
    shouldTouch: true,
    exact: false
  });
;

  const {t}=useTranslation();

  useOutsideClick(OpenDateSelectRef, () => setIsOpen(false));

  const handleMonthClick = (monthIndex) => {
    if (!disable) {
      setMonth(monthIndex);
    }
  };
  useEffect(() => {
    if(formOptionsHandelYear?.watch("year")>1950&&formOptionsHandelYear?.watch("year")<new Date().getFullYear()){
      setValue(name, { year:formOptionsHandelYear?.watch("year"), month }, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
        exact: false
      });  
    }
  }, [formOptionsHandelYear?.watch("year"), month, setValue, name]);

  const handelClick=()=>{
    setIsOpen(true)
  }

  const UseAllMonth=()=>{
    setMonth(null)
  }

  return (
    <div className={styles.containerAll}>
    <div onClick={handelClick} className={`${styles.containerInput} ${IsOpen&&styles.active}`}>
      <DateSvg/>
      <FlexComponent gap='.5rem'>
        <span>{month?language?DateMonth[month-1]?.arabic:DateMonth[month-1]?.english:t("common.allMonth")}</span>
        <span>/</span>
        <span>{formOptionsHandelYear?.watch("year")}</span>
      </FlexComponent>
      <div style={{fontSize:"1.3rem"}}>{IsOpen?<DownArrowSvg/>:<UppArrowSvg/>}</div>
    </div>
    {IsOpen&&
        <div className={`${styles.yearMonthPicker} ${disable ? styles.disabled : ''}`} ref={OpenDateSelectRef}>
          <FlexComponent justifyContent='space-between' className={styles.header}>
            <button onClick={decreaseYear} className={styles.icon} disabled={disable}>{language ?<RightArrowSvg/> :<LeftArrowSvg/>}</button>
            <div style={{width:"80%"}}>
              <ReusableInput  
              moreOptions={{DontShowTooltip:true}}
                  textAlignCenter={true} Datause={{
                  name: "year", placeholder: t(""),
                  label:t(""), type: FeildTypeFormHook[2],negative:false,decimal:false
              }} formOptions={formOptionsHandelYear}/>
            </div>
            <button onClick={increaseYear} className={styles.icon} disabled={disable}>{language ?<LeftArrowSvg/> :<RightArrowSvg/>}</button>
          </FlexComponent>
          <div className={styles.monthList}>
            {DateMonth.map(({ arabic, english, value }, index) => (
              <button
                key={index}
                className={`${styles.monthItem} ${((month === value)&&!disable) ? styles.activeMonth : ''}`}
                onClick={() => handleMonthClick(value)}
                disabled={disable}>
                {language ? arabic : english}
              </button>
            ))}
          </div>
          <ButtonComponent text={t("common.allMonth")} size='small' style={{marginTop:"1rem"}} PassingData={UseAllMonth}/>
        </div>}
    </div>
  );
};

export default YearMonthPickerFormHook;
