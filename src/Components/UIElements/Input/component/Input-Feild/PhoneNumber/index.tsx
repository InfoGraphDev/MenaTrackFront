import React, { useState } from 'react';
import styles from './style.module.scss';
import ErrorCheckFromHook from '../../Utils/Error-Check/Error-Check';
import ApprovalCheckFormHook from '../../Utils/Approval-Check/Approval-Check';
import useFocus from '../../../Hook/FocusedHook';
import { useTranslation } from 'react-i18next';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import FlexComponent from '@/Components/UIElements/Layout/Flex';
import LabelFeildReactHookForm from '../../Utils/Label';

const PhoneNumberInputFeildFormHook = ({ formOptions, Datause, disable }) => {
  const { name, placeholder, icon, type, required, check, label, height } = Datause;
  const { errors, touchedFields } = formOptions?.formState;
  const { register } = formOptions;
  const { ref, isFocused, handleFocus, handleBlur } = useFocus();
  const { t } = useTranslation();
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputPhone = e.target.value;
    
    if (!/^\d*$/.test(inputPhone) || inputPhone.length > 10) {
      return;
    }
    setPhoneNumber(inputPhone);
    const pn = parsePhoneNumberFromString(inputPhone, 'JO');
    if(pn.isValid()){
        formOptions?.setValue(name, inputPhone, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
          });    
    }else{
        formOptions?.setValue(name, "", {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
          });    
    }
};

  return (
    <div className={styles.containerAll} ref={ref}>
      <LabelFeildReactHookForm label={label}/>
      <div
        className={`
          ${isFocused && styles.focused}
          ${styles.containerField}`} style={height ? { height: height } : { height: "2.5rem" }}>

        {icon && 
            <FlexComponent gap='.5rem' className={styles.icons}>
                <span>{icon}</span>
                <span>+962</span>
            </FlexComponent>}
        <div className={styles.containerInputField}>
          <input
            required={required}
            onFocus={handleFocus}
            onBlur={handleBlur}
            type={type}
            name={name}
            disabled={disable}
            {...register(name)}
            placeholder={t(placeholder)}
            value={phoneNumber}
            onChange={handlePhoneChange}
          />
        </div>
      </div>
      <div className={styles.errors}>
        {(errors[name] && touchedFields[name]) &&
            <ErrorCheckFromHook text={errors[name]?.message} />}

        {(!errors[name] && touchedFields[name] && check) &&
            <ApprovalCheckFormHook />}
      </div>
    </div>
  );
}

export default PhoneNumberInputFeildFormHook;
