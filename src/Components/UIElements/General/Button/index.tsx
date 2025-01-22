import React from 'react';
import stylesModule from "./style.module.scss";
import { ScaleLoader } from 'react-spinners';
import { useTranslation } from 'react-i18next';
import { useNotification } from '@/Components/ComplexComponents/Notifications';

interface ButtonProps {
  className?: string; 
  text?: string;
  type?: 'button' | 'submit' | 'reset';
  size?: 'small' | 'medium' | 'large';
  style?: React.CSSProperties; 
  formOptions?:{isValid:boolean,isSubmitting:boolean},
  PassingData?:any,
  DataButton?:any,
  icon?:any,
  loading?:boolean,
  DesignButton?:number,
  passId?:string,
  errorText?:string
}

const ButtonComponent: React.FC<ButtonProps> = ({
  text='button',
  type = 'button',
  size = 'medium',
  style = {},
  formOptions={isSubmitting:false,isValid:true},
  PassingData,
  DataButton,
  icon,
  loading,
  DesignButton=1,
  passId,
  errorText="common.errorButton",
  className
}) => {
  const sizeStyles = {
    small: {
      padding: '1rem 1rem 1rem 1.5rem',
      fontSize: "1rem",
      lineHeight: "1.5rem",
      height: "2.5rem"
    },
    medium: {
      fontSize: '1rem',
      padding: '1rem 2rem',
      lineHeight: '1.5rem',
    },
    large: {
      fontSize: '1.1rem',
      padding: '2vh 2.5vw',
      lineHeight: '3vh',
    },
    
  };

  const styles:any = {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    textAlign: 'center',
    fontStyle: 'normal',
    borderRadius:".5rem",
    fontWeight: 400,
    gap:".5rem",
    transition:"all .5s",
    margin: 0,
    ...sizeStyles[size],
    ...style, 
  };
  const {isValid,isSubmitting }=formOptions;
  const { t } = useTranslation();
  const addNotification=useNotification()
  const handelClick=()=>{
    addNotification({message:errorText,type:"fail"})
  }

  if(loading){
    return(
      <button id={passId?passId:""} type='button'className={`${stylesModule.loading} ${className}`}  style={{...styles,cursor:"default"}} >
        <ScaleLoader
          color="#A58B48"
          height={11}
        />
      </button>
    )
  }
  else if(isSubmitting||!isValid){
    return(
      <div onClick={handelClick} style={{width:"100%"}}>
        <button   id={passId?passId:""} disabled={true} className={`${DesignButton===1?stylesModule.typeOne:stylesModule.typeTwo} ${stylesModule.disable} ${className}`}  type='button' style={{...styles}} >
            <span>{t(text)}</span>{icon&&<span>{icon}</span>}
        </button>
      </div>
    )
  }
  else if(!isSubmitting&&isValid){
    return(
      <button id={passId?passId:""} className={`${DesignButton===1?stylesModule.typeOne:stylesModule.typeTwo} ${className}`} type={type} style={styles} onClick={()=>(PassingData? PassingData(DataButton):"")}>
          <span>{t(text)}</span>
          {icon&&<span>{icon}</span>}
      </button>
    )
  }

};

export default ButtonComponent;
