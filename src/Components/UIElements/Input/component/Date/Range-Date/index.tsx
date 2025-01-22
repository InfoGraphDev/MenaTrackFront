import React, { useEffect, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import styles from "./style.module.scss";
import useFocus from '../../../Hook/FocusedHook';
import FlexComponent from '@/Components/UIElements/Layout/Flex';
import useIsArabicLanguage from '@/Hooks/IsArabicLanguage';
import { Arabic } from 'flatpickr/dist/l10n/ar.js';
import ApprovalAndErrorReactHookForm from '../../Utils/ApprovalAndError';
import LabelFeildReactHookForm from '../../Utils/Label';

const RangeDateFormHook = ({ Datause, formOptions, disable }) => {
  const { placeholder, icon, check, name, label, nameToDate, required } = Datause;
  const { setValue, watch } = formOptions;
  const { ref, isFocused, handleFocus, handleBlur } = useFocus();
  const IsArabicLanguage = useIsArabicLanguage();
  const [valueDate, setValueDate] = useState<Date[] | null>(null);

  const handleChange = (selectedDates: Date[]) => {
    setValueDate(selectedDates);
    if (selectedDates.length === 2) {
      function FormatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }
      setValue(name, FormatDate(selectedDates[0]), { shouldValidate: true });
      setValue(nameToDate, FormatDate(selectedDates[1]), { shouldValidate: true });
    }
  };

  useEffect(() => {
    const watchedStartDate = watch(name);
    const watchedEndDate = watch(nameToDate);

    if ((!watchedStartDate || watchedStartDate === "") && 
        (!watchedEndDate || watchedEndDate === "")) {
      setValueDate(null);
    } else if (watchedStartDate && watchedEndDate) {
      setValueDate([new Date(watchedStartDate), new Date(watchedEndDate)]);
    }
  }, [watch(name), watch(nameToDate)]);

  return (
    <div className={styles.container}>
      <LabelFeildReactHookForm required={required} label={label} />
      <FlexComponent
        ref={ref}
        gap=".25rem"
        className={`${styles.containerDate} ${isFocused ? styles.focusElement : ''}`}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <div style={{ margin: "0 .5rem" }}>
          {icon}
        </div>
        <Flatpickr
          options={{
            enableTime: false,
            dateFormat: 'Y-m-d', 
            mode: 'range',
            minDate: '1995-01-01', 
            locale: IsArabicLanguage ? Arabic : 'default',
          }}
          disabled={disable}
          onChange={handleChange}
          className={styles.flatPicker}
          value={valueDate}
          placeholder={placeholder}
        />
      </FlexComponent>
      <ApprovalAndErrorReactHookForm
        check={check}
        formOptions={formOptions}
        name={name}
      />
    </div>
  );
};

export default RangeDateFormHook;
