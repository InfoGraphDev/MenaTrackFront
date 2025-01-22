import React from 'react';
import styles from "./style.module.scss";
import useFocus from '../../../Hook/FocusedHook';
import FlexComponent from '@/Components/UIElements/Layout/Flex';

function NumberFeildWithEnter({ disable, formOptions, Datause, textAlignCenter, moreOptions,handelPassingEnterValue }) {
  const { placeholder, name, decimal, required, negative = true, height } = Datause;
  const { setValue } = formOptions;
  const { ref, isFocused, handleFocus, handleBlur } = useFocus();

  const isAllowedCharacter = (char, currentInput) => {
    if (char === 'Backspace' || char === 'Enter') return true;
    if (negative && char === '-' && currentInput.length === 0) return true;
    if (decimal && char === '.' && !currentInput.includes('.')) return true;
    return !isNaN(Number(char));
  };

  const handleKeyDown = (event) => {
    if (!isAllowedCharacter(event.key, event.target.value)) {
      event.preventDefault();
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      handelPassingEnterValue(event.target.value)
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    const parsedValue = value ? parseFloat(value) : "";
    if (!decimal) {
      setValue(name, parsedValue, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
        exact: false
      });
    } else {
      setValue(name, value, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
        exact: false
      });
    }
  };

  return (
      <FlexComponent
        justifyContent='space-between'
        className={[
          styles.containerField,
          isFocused && styles.focused,
        ].join(' ')}
        ref={ref}
        onBlur={handleBlur}
        onFocus={handleFocus}
        style={{ height: height ? height : "2.5rem" }}>
        <div className={styles.Search} onClick={()=>{handelPassingEnterValue(`${formOptions?.watch(name)}`)}}>
          بحث
        </div>
        <input
          style={textAlignCenter && { textAlign: "center" }}
          disabled={disable}
          value={formOptions?.watch()[name]}
          required={required}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
        />
      </FlexComponent>
  );
}

export default NumberFeildWithEnter;
