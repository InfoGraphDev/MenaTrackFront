import React, { useContext } from 'react'
import styles from "./style.module.scss";
import { useTranslation } from 'react-i18next';
import useIsArabicLanguage from '@/Hooks/IsArabicLanguage';
import { MainTableContext, MainTableContextInterface } from '..';

function SummationFeildReactTable({DataRow,addSumationFeild}) {
 const {ColumnsWillUseForTable}=useContext<MainTableContextInterface>(MainTableContext);
 const TotalSummationValue = DataRow?.reduce((sum:any, row:any) => sum + Number(row?.[addSumationFeild]), 0);
 const {t}=useTranslation();
 const IsArabicLanguage=useIsArabicLanguage();

  return (
        <tr className={styles.container}>
            {ColumnsWillUseForTable?.map((Data:any,i:number)=>(
                <td key={i} className={`${Data?.accessorKey==addSumationFeild&&styles.Select}`}>
                    {Data?.accessorKey==addSumationFeild?Number(TotalSummationValue)?.toLocaleString():""}
                    {i===0&&<p className={`${styles.Name} ${IsArabicLanguage?styles.arabic:styles.english}`}>{t("common.TotalNumbers")}</p>}
                </td>
                ))}
        </tr>
    )
}

export default SummationFeildReactTable
