import React, { useState } from 'react';
import styles from './style.module.scss';
import ReusableInput from '@/Components/UIElements/Input';
import { DomainTRCInfo } from '@/Core/Constant/DomainTRC';
import ButtonComponent from '@/Components/UIElements/General/Button';
import SpaceComponent from '@/Components/UIElements/Layout/Space';

function FilterComponentTRC({ formOptions }) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const HandelClickFilter=()=>{
    formOptions?.reset()
  }

  return (
    <div className={styles.filterContainer}>
      <button className={styles.toggleButton} onClick={toggleVisibility}>
        {isVisible ? 'إخفاء' : 'عرض الفلاتر'}
      </button>
      <div className={`${styles.filterContent} ${isVisible ? styles.show : ''}`}>
        <ReusableInput 
          Datause={{
            label: 'الصنف الاساسي',
            name: 'Category',
            options: DomainTRCInfo.Category,
            placeholder: 'الصنف الاساسي',
            required: true,
            keyName: 'label',
            valueName: 'value'
          }} 
          formOptions={formOptions}  
          type='react-select' 
        />

        <ReusableInput 
          Datause={{
            label: 'الصنف الثانوي',
            name: 'SubCategories',
            options: DomainTRCInfo.SubCategories,
            placeholder: 'الصنف الثانوي',
            required: true,
            keyName: 'label',
            valueName: 'value'
          }} 
          formOptions={formOptions}  
          type='react-select' 
        />

        <ReusableInput 
          Datause={{
            label: 'الحالة',
            name: 'Statuses',
            options: DomainTRCInfo.Statuses,
            placeholder: 'الحالة',
            required: true,
            keyName: 'label',
            valueName: 'value'
          }} 
          formOptions={formOptions}  
          type='radio-field' 
        />
        <ReusableInput 
          Datause={{
            label: 'تصنيف',
            name: 'Statuses',
            options: DomainTRCInfo.Classifications,
            placeholder: 'تصنيف',
            required: true,
            keyName: 'label',
            valueName: 'value'
          }} 
          formOptions={formOptions}  
          type='radio-field' 
        />
        <SpaceComponent top='1rem'/>
        <ButtonComponent text='تفريغ الحقول' size='small' PassingData={HandelClickFilter}/>
      </div>
    </div>
  );
}

export default FilterComponentTRC;
