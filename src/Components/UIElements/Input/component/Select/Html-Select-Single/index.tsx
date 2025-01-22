import React from 'react';
import styles from './style.module.scss';
import useFocus from '../../../Hook/FocusedHook';
import { useTranslation } from 'react-i18next';
import ApprovalAndErrorReactHookForm from '../../Utils/ApprovalAndError';
import LabelFeildReactHookForm from '../../Utils/Label';

const HtmlSelectFormHook = ({ formOptions, Datause, disable }) => {
  const { name, placeholder, icon, required, check, label, height, options } = Datause; 
  const { register } = formOptions;
  const { ref, isFocused, handleFocus, handleBlur } = useFocus();
  const { t } = useTranslation();

  return (
    <div className={styles.containerAll} ref={ref}>
      <LabelFeildReactHookForm label={label}/>
      <div
        className={`
          ${isFocused && styles.focused}
          ${styles.containerField}`} style={height ? { height: height } : { height: "2.5rem" }}>

        {icon && <div className={styles.icons}>{icon}</div>}
        <select
            disabled={disable}
            required={required}
            onFocus={handleFocus}
            className={styles.inputFeild}
            onBlur={handleBlur}
            name={name}
            {...register(name)}
          >
            {options?.map(option => (
              <option key={option.value} value={option.value}>
                {t(option.label)}
              </option>
            ))}
          </select>
          <ApprovalAndErrorReactHookForm
            check={check}
            formOptions={formOptions}
            name={name}/>
      </div>
    </div>
  );
}

export default HtmlSelectFormHook;
