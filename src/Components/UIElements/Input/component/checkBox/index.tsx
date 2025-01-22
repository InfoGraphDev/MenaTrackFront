import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';
import { useTranslation } from 'react-i18next';

interface OptionType {
  value: string;
  label: string;
}

interface CheckBoxTextFormHookProps {
  Datause: {
    name: string;
    placeholder: string;
    required: boolean;
    check?: boolean;
    label?: string;
    options?: OptionType[];
    nameList:string,
    value:string
  };
  disable?: boolean;
  formOptions:any;
  ResetValue?:boolean
}

const CheckBoxFormHook: React.FC<CheckBoxTextFormHookProps> = ({ Datause, disable,formOptions,ResetValue }) => {
  const { name, label, required,nameList,value } = Datause;
  const [checked, setChecked] = useState(false);
  const { setValue } = formOptions;
  const { t } = useTranslation();

  useEffect(()=>{
    if(ResetValue){
      setChecked(false)
    }
  },[ResetValue])

  const handleChange = (isChecked: boolean) => {
    setChecked(isChecked);
    if(isChecked){
      let DataSet=[...formOptions?.getValues()[nameList],value]
      setValue(nameList, DataSet, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
  
    }else{
      let DataSet=formOptions?.getValues()[nameList].filter((data:any)=>(data?.label!==value?.label));
      setValue(nameList, DataSet, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
  
    }
  };

  return (
    <div className={styles.containerAll} onClick={() => handleChange(!checked)}>
      <div className={`${styles.checkBox} ${checked && styles.active}`} style={checked?{backgroundColor:value?.color}:{backgroundColor:"white"}}></div>
      {label && <div>{t(label)}</div>}
    </div>
  );
}

export default CheckBoxFormHook;
