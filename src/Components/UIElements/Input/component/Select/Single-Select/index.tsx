import React, { useEffect, useState } from 'react';
import "./style.scss";
import Select from 'react-select';
import { Controller } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import useIsArabicLanguage from '@/Hooks/IsArabicLanguage';
import LabelFeildReactHookForm from '../../Utils/Label';
import ApprovalAndErrorReactHookForm from '../../Utils/ApprovalAndError';

const SingleSelectFormHook= ({ Datause, formOptions, disable,passingOptions,handelChangeValue,isClearable=true }) => {
    const { name, placeholder, options:valueOptions,label,valueName,keyName,check,required, } = Datause;
    const { t } = useTranslation();
    const [options,setOptions]=useState(valueOptions?valueOptions:[]);
    const isArabicLanguage=useIsArabicLanguage();

    useEffect(()=>{
        if(passingOptions){
            setOptions(passingOptions)
        }
    },[passingOptions]);

    return (
        <div className={`react-select-container ${isArabicLanguage&&"arabic"}`}>
            <LabelFeildReactHookForm required={required} label={label}/>
            <Controller
                control={formOptions?.control}
                        defaultValue=""
                        name={name}
                        render={({ field: { onChange, name, ref, value } }) => {
                            return (
                            <Select
                                getOptionLabel={(option) => option[keyName || 'label']}
                                getOptionValue={(option) => option[valueName || 'value']}
                                inputRef={ref}
                                isDisabled={disable}
                                name={name}
                                value={options?.find((item) => item?.[valueName] === value) || ""}
                                options={options || []}
                                placeholder={placeholder?t(placeholder):""}
                                isClearable={isClearable}
                                classNamePrefix="react-select"
                                menuPlacement="auto"
                                onChange={(val) => {
                                    onChange(val?.[valueName]);
                                    handelChangeValue?handelChangeValue(val?.[valueName]):"";
                                  }}
                            />
                            );
                        }}
                        />
                <ApprovalAndErrorReactHookForm
                  check={check}
                  formOptions={formOptions}
                  name={name}/>
        </div>
    );
};

export default SingleSelectFormHook;

