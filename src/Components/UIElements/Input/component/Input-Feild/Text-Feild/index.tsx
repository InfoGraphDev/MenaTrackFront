import React, { useState } from 'react';
import styles from './style.module.scss';
import useFocus from '../../../Hook/FocusedHook';
import { useTranslation } from 'react-i18next';
import useIsArabicLanguage from '@/Hooks/IsArabicLanguage';
import HideSvg from '@/Assets/Icons/hideSvg';
import ShowSvg from '@/Assets/Icons/show';
import LabelFeildReactHookForm from '../../Utils/Label';
import ApprovalAndErrorReactHookForm from '../../Utils/ApprovalAndError';
import IconReactHookForm from '../../Utils/Icon';

const InputFieldTextFormHook = ({ formOptions, Datause, disable,type }) => {
  const { name, placeholder, icon, required, check,label,height } = Datause;
  const { register } = formOptions;
  const [showPassword, setShowPassword] = useState(type !== 'password');
  const { ref, isFocused, handleFocus, handleBlur } = useFocus();
  const { t } = useTranslation();
  const isArabicLanguage=useIsArabicLanguage();

  return (
    <div className={styles.containerAll} ref={ref}>
      <LabelFeildReactHookForm required={required} label={label}/>
      <div
        className={`
          ${isFocused && styles.focused}
          ${styles.containerField}`} style={height?{height:height}:{height:"2.5rem"}}>
        <IconReactHookForm icon={icon} isFocused={isFocused}/>
        <div className={styles.containerInputField}>
          {type === 'password' && (
            <p className={styles.PasswordIcon} style={!isArabicLanguage?{right:"0"}:{left:"0"}} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <HideSvg/>
              ) : (
                <ShowSvg/>
              )}
            </p>
          )}
          <input
            disabled={disable}
            required={required}
            onFocus={handleFocus}
            onBlur={handleBlur}
            type={showPassword ? 'text' : type}
            name={name}
            {...register(name)}
            placeholder={t(placeholder)}
          />
        </div>
      </div>
      <ApprovalAndErrorReactHookForm
        check={check}
        formOptions={formOptions}
        name={name}/>
    </div>
  );
}

export default InputFieldTextFormHook;
