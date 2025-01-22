import React, { useEffect, useState } from 'react';
import "./style.scss";
import Select from 'react-select';
import { Controller } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import useIsArabicLanguage from '@/Hooks/IsArabicLanguage';
import LabelFeildReactHookForm from '../../Utils/Label';
import ApprovalAndErrorReactHookForm from '../../Utils/ApprovalAndError';

const MultipleSelectFormHook = ({ Datause, formOptions, disable, passingOptions, handelChangeValue, isClearable = true }) => {
    const { name, placeholder, options: valueOptions, label, valueName = 'value', keyName = 'label', check, required } = Datause;
    const { t } = useTranslation();
    const [options, setOptions] = useState([]);
    const isArabicLanguage = useIsArabicLanguage();
    
    const selectAllOption = { [keyName]: t("common.SelectAll"), [valueName]: "*" };

    useEffect(() => {
        const newOptions = passingOptions || valueOptions || [];
        setOptions([selectAllOption, ...newOptions]);
    }, [passingOptions]);

    const handleSelectAll = (selected) => {
        if (selected.some(option => option[valueName] === "*")) {
            return options.filter(option => option[valueName] !== "*");
        }
        return selected;
    };

    return (
        <div className={`container-multi-select-react-component ${isArabicLanguage && "arabic"}`} style={{position:"relative"}}>
            <LabelFeildReactHookForm required={required} label={label} />
            <Controller
                control={formOptions?.control}
                defaultValue={[]}
                name={name}
                render={({ field: { onChange, name, ref, value } }) => {
                    const selectedValues = handleSelectAll(options.filter(option => (value || []).includes(option[valueName])));
                    return (
                        <Select
                            getOptionLabel={(option) => option[keyName]}
                            getOptionValue={(option) => option[valueName]}
                            inputRef={ref}
                            isDisabled={disable}
                            name={name}
                            value={selectedValues}
                            options={options}
                            placeholder={placeholder ? t(placeholder) : ""}
                            isClearable={isClearable}
                            classNamePrefix="react-select-multi-select"
                            menuPlacement="auto"
                            isMulti
                            onChange={(selectedOptions) => {
                                const selectedValues = selectedOptions ? selectedOptions.map(option => option[valueName]) : [];
                                if (selectedValues.includes("*")) {
                                    const allValues = options.map(option => option[valueName]);
                                    onChange(allValues);
                                    handelChangeValue && handelChangeValue(allValues);
                                } else {
                                    onChange(selectedValues);
                                    handelChangeValue && handelChangeValue(selectedValues);
                                }
                            }}
                        />
                    );
                }}
            />
            <ApprovalAndErrorReactHookForm
                check={check}
                formOptions={formOptions}
                name={name}
            />
        </div>
    );
};

export default MultipleSelectFormHook;
