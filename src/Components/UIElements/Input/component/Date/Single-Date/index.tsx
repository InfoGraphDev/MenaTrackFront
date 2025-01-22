import React from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Arabic } from 'flatpickr/dist/l10n/ar.js';
import styles from "./style.module.scss";
import ErrorCheckFromHook from '../../Utils/Error-Check/Error-Check';
import ApprovalCheckFormHook from '../../Utils/Approval-Check/Approval-Check';
import useIsArabicLanguage from '@/Hooks/IsArabicLanguage';

const SingleDateFormHook = ({ Datause, formOptions, disable }) => {
  const { placeholder, icon, check, name, label } = Datause;
  const { errors, touchedFields } = formOptions.formState;
  const { setValue, watch } = formOptions;
  const IsArabicLanguage = useIsArabicLanguage();

  const handleChange = (selectedDates: Date[]) => {
    if (selectedDates && selectedDates.length > 0) {
      const date = selectedDates[0];
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`; // Format as "YYYY-MM-DD"
      setValue(name, formattedDate, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  };

  return (
    <div className={styles.container}>
      {label && <div>{label}</div>}
      <div className={styles.containerDate}>
        <Flatpickr
          placeholder={placeholder || "Select Date"}
          options={{
            dateFormat: 'Y-m-d',
            locale: IsArabicLanguage ? Arabic : 'default',
            enableTime: false,
            noCalendar: false,
            onChange: handleChange
          }} 
          disabled={disable}
          onChange={handleChange}
          className={`${styles.flatPicker} ${errors[name] && touchedFields[name] ? styles.error : ''}`}
          value={watch(name)}
        />
        {icon}
      </div>
      {(errors[name] && touchedFields[name]) &&
        <ErrorCheckFromHook text={errors[name]?.message} />}
      {(!errors[name] && touchedFields[name] && check) &&
        <ApprovalCheckFormHook />}
    </div>
  );
};

export default SingleDateFormHook;
