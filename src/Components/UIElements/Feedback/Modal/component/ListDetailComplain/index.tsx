import React from 'react'
import styles from "./style.module.scss";
import ReactTable from '@/Components/ComplexComponents/Table';
import { useListDetailComplain } from './DataUse';
import TitleComponent from '@/Components/UIElements/Layout/Title';
import { useModalContext } from '../../hook';

function ListDetailComplain({DataUse}) {
  const {headers}=useListDetailComplain();
  const {setModalStatus}=useModalContext();
    
  const handelClose=()=>{
    setModalStatus([])
  };  
  
  return (
    <div className={styles.container}>
      <TitleComponent title='تفاصيل قائمة المشاكل' SpecialClose={handelClose}/>
      <ReactTable 
        loading={false} 
        emptyMessage='No Data Avaliblae'   
        Data={DataUse} 
        Type='client-side' 
        columns={headers} height='auto'/>
    </div>
  )
}

export default ListDetailComplain
