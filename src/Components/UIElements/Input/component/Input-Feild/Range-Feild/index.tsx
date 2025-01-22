import React from 'react';
import styles from './style.module.scss';
import useFocus from '../../../Hook/FocusedHook';
import DropDownComponent from '@/Components/UIElements/Navigation/DropDawn';
import ApprovalAndErrorReactHookForm from '../../Utils/ApprovalAndError';

const RangeFeildFormHook = ({ formOptions, Datause, disable }) => {
  const { name, placeholder, required, check,label } = Datause;
  const { setValue } = formOptions;
  const { ref, isFocused, handleFocus, handleBlur } = useFocus();


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValue(name, inputValue, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
        exact: false
      });

  };
  return (
    <DropDownComponent >
      <div className={styles.containerRange} ref={ref}>
        <div className={styles.label}>
          <span>{label?label:placeholder}</span>
          <span>{formOptions?.getValues()[name]?formOptions?.getValues()[name]:0 }</span>
        </div>
        <div
          className={`
            ${isFocused && styles.focusElement}
            ${styles.containerField}`}>
          <div className={styles.containerInputField}>
            <input
              disabled={disable}
              required={required}
              onFocus={handleFocus}
              onBlur={handleBlur}
              type='range'
              min={0}
              max={20}
              step="5"    
              name={name}
              onChange={handleChange}
              placeholder={placeholder}
              className={styles.range}
            />
          </div>
          <ApprovalAndErrorReactHookForm
            check={check}
            formOptions={formOptions}
            name={name}/> 
        </div>
      </div>

    </DropDownComponent>    
  );
}

export default RangeFeildFormHook;
