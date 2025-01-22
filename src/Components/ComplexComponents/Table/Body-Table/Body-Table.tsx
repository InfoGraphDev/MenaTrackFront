import React, { useContext } from 'react'
import styles from "../style.module.scss";
import { flexRender } from '@tanstack/react-table';
import { BeatLoader } from 'react-spinners';
import { useTranslation } from 'react-i18next';
import FlexComponent from '@/Components/UIElements/Layout/Flex';
import { EmptyComponent } from '@/Components/UIElements/DataDisplay/Empty';
import SummationFeildReactTable from '../Summation/SummationFeild';
import { MainTableContext, MainTableContextInterface } from '..';

interface BodyReactTableProps {
    table: any; 
    loading: boolean;
    height: string | number;
    addSumationFeild:any,
    DataRow?:any,
    emptyMessage?:string
  }
function BodyReactTable({table,loading,height,addSumationFeild,DataRow,emptyMessage}:BodyReactTableProps) {
    let LengthData=table?.getRowModel()?.rows?.length?table?.getRowModel()?.rows?.length:0;
    const { t } = useTranslation();
    const {ColumnsWillUseForTable}=useContext<MainTableContextInterface>(MainTableContext);

    if (loading) {
        return (
            <FlexComponent className={styles.containerButton}  style={{height:height}}>
                <FlexComponent gap='.5rem' className={styles.item}>
                    <li style={{color:"#6F757E"}}>{t("common.LoadingData")}</li>
                    <li><BeatLoader size={8} color='#6F757E'/></li>
                </FlexComponent>
            </FlexComponent>
        );
      }
    
    if (LengthData === 0 || !LengthData) {
        return (<div >
            <EmptyComponent size='small' text={emptyMessage?emptyMessage:"common.Nodataavailable"}/>
        </div>);
      }
    
  return (
    <div className={styles.body}>
        {table?.getRowModel()?.rows?.map((row:any) => (
        <div key={row.id} className={styles.tr}> 
            {row.getVisibleCells().map((cell:any,i:number) =>{
                return(
                    (
                        <div style={{
                            ...cell?.column?.columnDef?.width&&{maxWidth:cell?.column?.columnDef?.width}
                        }} className={`${styles.td} ${ColumnsWillUseForTable?.length>7&&styles.activWidth}`} key={i}>
                            {flexRender(cell?.column?.columnDef?.cell, cell.getContext())}
                        </div>)
                    )
            })}
        </div>))}
        {addSumationFeild&&<SummationFeildReactTable 
            DataRow={DataRow} 
            addSumationFeild={addSumationFeild}/>}
    </div>
  )
}

export default BodyReactTable
