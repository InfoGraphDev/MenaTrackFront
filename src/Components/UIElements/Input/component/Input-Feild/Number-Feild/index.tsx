import React, { useState } from 'react';
import styles from "./style.module.scss";
import useFocus from '../../../Hook/FocusedHook';
import TooltipComponent from '@/Components/UIElements/DataDisplay/Tooltip';
import useIsArabicLanguage from '@/Hooks/IsArabicLanguage';
import LabelFeildReactHookForm from '../../Utils/Label';
import ApprovalAndErrorReactHookForm from '../../Utils/ApprovalAndError';

function NumberFormHook({ disable, formOptions, Datause,textAlignCenter,moreOptions }) {
  const { placeholder, name, label, decimal, required, negative = true,height,check } = Datause;
  const { setValue } = formOptions;
  const { ref, isFocused, handleFocus, handleBlur } = useFocus();
  const IsArabicLanguage=useIsArabicLanguage();
  const [ValueUse,setValueUse]=useState("");
  
  const isAllowedCharacter = (char:any, currentInput:any) => {
      if (char === 'Backspace') return true; 
      if(negative){
        if (char === '-' && currentInput.length === 0) return true;
      }
      if(decimal){
        if (char === '.' && !currentInput.includes('.')) return true; 
      }
      return !isNaN(Number(char)); 
  };

  const handleKeyDown = (event:any) => {
      if (!isAllowedCharacter(event.key, event.target.value)) {
          event.preventDefault();
      }
  };

  const handleChange = (event:any) => {
      const value = event.target.value;
      const parsedValue =value?parseFloat(value):"";
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
    const value = Number(formOptions?.watch()[name]);
    
    return (
    <TooltipComponent 
        style={{margin:"0rem .5rem",display:moreOptions?.DontShowTooltip&&"none"}} 
        position={IsArabicLanguage?"left":"right"} 
        text={isNaN(value) ? '0' : value.toLocaleString()}>
      <div>
      <LabelFeildReactHookForm label={label}/>
        <div
          className={[
            styles.containerField,
            isFocused && styles.focused,
          ].join(' ')}
          ref={ref}
          onBlur={handleBlur}
          onFocus={handleFocus}
          style={{height:height?height:"2.5rem"}}
        >
          <input
            style={textAlignCenter&&{textAlign:"center"}}
            disabled={disable}
            value={(!formOptions?.watch()[name]||formOptions?.watch()[name]==""?"":formOptions?.watch()[name])}
            required={required}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
          />
         <ApprovalAndErrorReactHookForm
           check={check}
           formOptions={formOptions}
           name={name}/>
        </div>
      </div>
    </TooltipComponent>
  );
}

export default NumberFormHook;
