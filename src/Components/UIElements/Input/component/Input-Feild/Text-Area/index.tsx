import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';
import useFocus from '../../../Hook/FocusedHook';
import { useTranslation } from 'react-i18next';
import LabelFeildReactHookForm from '../../Utils/Label';
import ApprovalAndErrorReactHookForm from '../../Utils/ApprovalAndError';

const InputFeildTextArea = ({ formOptions, Datause, disable }) => {
  const { name, placeholder, icon, required, check, label, height, numberOfWord = 300 } = Datause;
  const { register } = formOptions;
  const { ref, isFocused, handleFocus, handleBlur } = useFocus();
  const { t } = useTranslation();
  const [wordCount, setWordCount] = useState(0);
  const remainingWords = numberOfWord - wordCount;

  useEffect(()=>{
    setWordCount(formOptions?.watch(name)?.length||0)
  },[formOptions?.watch(name)])

  return (
    <div className={styles.containerAll} ref={ref}>
      <LabelFeildReactHookForm label={label} />
      <div
        className={`
          ${isFocused && styles.focused}
          ${styles.containerField}`}>
        {icon && <div className={styles.icons}>{icon}</div>}
        <div className={styles.containerInputField}>
          <textarea
            disabled={disable}
            required={required}
            onFocus={handleFocus}
            onBlur={handleBlur}
            name={name}
            {...register(name)}
            placeholder={t(placeholder)}
            style={{ height }}
          />
        </div>
      </div>
      <div className={styles.wordCount}>
        {t('الاحرف المكتوبة')}: {wordCount} / {t('الاحرف المتبقية')}: {remainingWords}
      </div>
      <ApprovalAndErrorReactHookForm
        check={check}
        formOptions={formOptions}
        name={name}
      />
    </div>
  );
}

export default InputFeildTextArea;
