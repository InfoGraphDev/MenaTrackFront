import React, { useState } from 'react';
import styles from "./style.module.scss";
import { useTranslation } from 'react-i18next';
import { Controller } from "react-hook-form";
import FlexComponent from '@/Components/UIElements/Layout/Flex';
import LabelFeildReactHookForm from '../Utils/Label';

interface OptionType {
    value: string;
    label: string;
}

const RadioButtonFormHook = ({ Datause, formOptions, disable }) => {
    const { name, options:valueOptions, label } = Datause;
    const { t } = useTranslation();
    const [options, setOptions] = useState<OptionType[]>(valueOptions ? valueOptions : []);

    return (
        <div className={styles.radioContainer}>
            <LabelFeildReactHookForm label={label}/>
            <Controller
                control={formOptions?.control}
                defaultValue={options[0]?.value || ""}
                name={name}
                render={({ field: { onChange, value } }) => (
                    <FlexComponent gap='.5rem' justifyContent='flex-start'>
                        {options.map((option, index) => (
                            <FlexComponent justifyContent='flex-start' gap='.5rem' key={index} className={styles.radioLabel}>
                                <input
                                    type="radio"
                                    value={option.value}
                                    checked={value == option.value}
                                    onChange={onChange}
                                    disabled={disable}
                                    className={styles.radioButton}
                                />
                                {`${t(option.label)}`}
                            </FlexComponent>
                        ))}
                    </FlexComponent>
                )}
            />
        </div>
    );
};

export default RadioButtonFormHook;
