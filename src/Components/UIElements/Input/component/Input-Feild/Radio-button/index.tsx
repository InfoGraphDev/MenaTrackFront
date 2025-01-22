import React from 'react';
import styles from './style.module.scss';
import useFocus from '../../../Hook/FocusedHook';
import { useTranslation } from 'react-i18next';
import ApprovalAndErrorReactHookForm from '../../Utils/ApprovalAndError';
import LabelFeildReactHookForm from '../../Utils/Label';

const InputFieldRadioFormHook = ({ formOptions, Datause, disable }) => {
  const { name, options, required, check, label } = Datause;
  const { register } = formOptions;
  const { ref, isFocused } = useFocus();
  const { t } = useTranslation();

  return (
    <div className={styles.containerAll} ref={ref}>
      <LabelFeildReactHookForm label={label}/>
      <div
        className={`
          ${isFocused && styles.focused}
          ${styles.containerField}`}>

        {options.map((option, index) => (
          <div key={index} className={styles.radioOption}>
            <input
              type="radio"
              id={`${name}_${option.value}`}
              name={name}
              value={option.value}
              disabled={disable}
              required={required}
              {...register(name)}
            />
            <label htmlFor={`${name}_${option.value}`}>{t(option.label)}</label>
          </div>
        ))}
      </div>
      <ApprovalAndErrorReactHookForm
        check={check}
        formOptions={formOptions}
        name={name}
      />
    </div>
  );
}

export default InputFieldRadioFormHook;
