import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';
import ReusableInput from '@/Components/UIElements/Input';
import ButtonComponent from '@/Components/UIElements/General/Button';
import SpaceComponent from '@/Components/UIElements/Layout/Space';
import FlexComponent from '@/Components/UIElements/Layout/Flex';
import api from '@/Services/Api';
import { Referance_Constant_Key } from '@/Core/Reference/Refrance_Constant';

function FilterComponentTRC({ formOptions,DataWillUseAfterFilter }) {
  const [isVisible, setIsVisible] = useState(false);
  const [Projects,setProjects]=useState([]);
  const [services,setServices]=useState([]);
  const [Categories,setCategories]=useState([]);
  const [subCategories,setSubCategories]=useState([]);
  const [Status,setStatus]=useState([]);
      
  const toggleVisibility = () => { setIsVisible(!isVisible);};
  const HandelClickFilter=()=>{ formOptions?.reset() };

  useEffect(()=>{
   async function FetchProjectLookup(){
      let DataUse= await api.get("/Integration/Generic_GetProjects?BranchID=1&LanguageID=1");
      let DataUseStatus= await api.get("/Integration/Generic_GetStatuses?BranchID=1&LanguageID=1");
      setStatus(DataUseStatus?.data?.data?.list)
      setProjects(DataUse?.data?.data?.list);
    };
    FetchProjectLookup();
  },[]);

  const HandelSelectProject=async(projectId)=>{
      if(projectId){
        let DataUse= await  api.post(`/Integration/Generic_GetServices?BranchID=1&LanguageID=1&ProjectID=${projectId}`);
        setServices(DataUse?.data?.data?.list); 
      }
     formOptions?.setValue(Referance_Constant_Key.Category.name,"");
     formOptions?.setValue(Referance_Constant_Key.Sub_Category.name,"")
     formOptions?.setValue(Referance_Constant_Key.Classification.name,"")
  };

  const HnadelSelectServices=async(serviceId)=>{
    if(serviceId){
      let DataUse= await  api.post(`/Integration/Generic_GetCategories?BranchID=1&LanguageID=1&ServiceID=${serviceId}`)
      setCategories(DataUse?.data?.data?.list)
    }
    formOptions?.setValue(Referance_Constant_Key.Sub_Category.name,"")
    formOptions?.setValue(Referance_Constant_Key.Classification.name,"")
  };

  const HandelSelectCategory=async(categoryId)=>{
    if(categoryId){
      let DataUse= await  api.post(`/Integration/Generic_GetSubCategories?BranchID=1&LanguageID=1&CategoryID=${categoryId}`);
      setSubCategories(DataUse?.data?.data?.list)
    }
    formOptions?.setValue(Referance_Constant_Key.Classification.name,"")
  };

  return (
    <div className={styles.filterContainer}>
      <button className={styles.toggleButton} onClick={toggleVisibility}>
        {isVisible ? 'إخفاء' : 'عرض الفلاتر'}
      </button>
      <div className={`${styles.filterContent} ${isVisible ? styles.show : ''}`}>
      <ReusableInput 
          Datause={{
            label: Referance_Constant_Key.Status.label,
            name: Referance_Constant_Key.Status.name,
            options: [],
            placeholder: Referance_Constant_Key.Status.placeholder,
            required: true,
            keyName: Referance_Constant_Key.Status.keyName,
            valueName: Referance_Constant_Key.Status.valueName
          }} 
          moreOptions={{passingOptions:Status}}
          handelChangeValue={HandelSelectProject}
          formOptions={formOptions}  
          type='react-select' 
        />
        <ReusableInput 
          Datause={{
            label: Referance_Constant_Key.Service_Provider.label,
            name: Referance_Constant_Key.Service_Provider.name,
            options: [],
            placeholder: Referance_Constant_Key.Service_Provider.placeholder,
            required: true,
            keyName: Referance_Constant_Key.Service_Provider.keyName,
            valueName: Referance_Constant_Key.Service_Provider.valueName
          }} 
          moreOptions={{passingOptions:Projects}}
          handelChangeValue={HandelSelectProject}
          formOptions={formOptions}  
          type='react-select' 
        />
        <ReusableInput 
          Datause={{
            label: Referance_Constant_Key.Category.label,
            name: Referance_Constant_Key.Category.name,
            options: [],
            placeholder: Referance_Constant_Key.Category.placeholder,
            required: true,
            keyName: Referance_Constant_Key.Category.keyName,
            valueName: Referance_Constant_Key.Category.valueName
          }} 
          disable={!formOptions?.watch(Referance_Constant_Key.Service_Provider.name)}
          moreOptions={{passingOptions:services}}
          handelChangeValue={HnadelSelectServices}
          formOptions={formOptions}  
          type='react-select' 
        />
      <ReusableInput 
          Datause={{
            label: Referance_Constant_Key.Sub_Category.label,
            name: Referance_Constant_Key.Sub_Category.name,
            options: [],
            placeholder: Referance_Constant_Key.Sub_Category.placeholder,
            required: true,
            keyName: Referance_Constant_Key.Sub_Category.keyName,
            valueName: Referance_Constant_Key.Sub_Category.valueName
          }} 
          disable={!formOptions?.watch(Referance_Constant_Key.Category.name||!formOptions?.watch(Referance_Constant_Key.Service_Provider.name))}
          moreOptions={{passingOptions:Categories}}
          formOptions={formOptions}  
          type='react-select' 
        />
        <ReusableInput 
          Datause={{
            label: Referance_Constant_Key.Classification.label,
            name: Referance_Constant_Key.Classification.name,
            options: [],
            placeholder: Referance_Constant_Key.Classification.placeholder,
            required: true,
            keyName: Referance_Constant_Key.Classification.keyName,
            valueName: Referance_Constant_Key.Classification.valueName
          }} 
          disable={!formOptions?.watch(Referance_Constant_Key.Sub_Category.name)||!formOptions?.watch(Referance_Constant_Key.Category.name||formOptions?.watch(Referance_Constant_Key.Service_Provider.name))}
          moreOptions={{passingOptions:subCategories}}
          handelChangeValue={HandelSelectCategory}
          formOptions={formOptions}  
          type='react-select' 
        />
        <SpaceComponent top='6rem'/>
        <FlexComponent justifyContent='space-between' >
          <ButtonComponent 
            style={{width:"48%"}} text={`عدد النتائج  (${DataWillUseAfterFilter?.length})`} 
            size='small' />
          <ButtonComponent  
            DesignButton={2} style={{width:"48%"}} 
            text='تفريغ الحقول' size='small' PassingData={HandelClickFilter}/>
        </FlexComponent>
      </div>
    </div>
  );
}

export default FilterComponentTRC;
