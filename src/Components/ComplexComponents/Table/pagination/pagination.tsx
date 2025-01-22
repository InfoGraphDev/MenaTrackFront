import React from 'react';
import  styles from './style.module.scss';
import { TableEnum } from '@/Core/Enums/EnumTable';
import useIsArabicLanguage from '@/Hooks/IsArabicLanguage';
import { useTranslation } from 'react-i18next';
import RightArrowSvg from '@/Assets/Icons/rightArrow';
import LeftArrowSvg from '@/Assets/Icons/leftArrow';
import FlexComponent from '@/Components/UIElements/Layout/Flex';

interface PaginationProps {
  totalItems: number;
  formOptions:any;
  CountInCleinSide?:any,
  DataMain?:any,
  Type?:any
}

function PaginationReactTable({totalItems,formOptions,DataMain,Type}:PaginationProps){
  let itemsPerPage=formOptions?.watch(TableEnum[0]);
  let currentPage=formOptions?.watch(TableEnum[1]);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const isArabicLanguage=useIsArabicLanguage();
  const {t}=useTranslation();
  const createRange = (start:any, end:any) => {
    let range:any = [];
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  };

  const getPageNumbers = () => {

    if(totalPages===1){
      return [1]
    }else{
      let range = createRange(1, totalPages);

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
  
      range = createRange(start, end);
  
      if (currentPage > 2) {
        range.unshift('...');
      }
      if (currentPage < totalPages - 1) {
        range.push('...');
      }
      range.unshift(1);
      range.push(totalPages);
  
      return range;  
    }
  };

  const onPageChange=(PageNumber:number)=>{
    formOptions?.setValue(TableEnum[1], Number(PageNumber), {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
      exact: false
    });
  }

  const HandelItemPerPageChange=(event: React.ChangeEvent<HTMLSelectElement>)=>{
    const pageSize = event.currentTarget.value;
    formOptions?.setValue(TableEnum[0], Number(pageSize), {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
      exact: false
    });
    formOptions?.setValue(TableEnum[1], Number(1), {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
      exact: false
    });
  }

  if(Type=="client-side"&&DataMain?.length<10) return
  return (
        <FlexComponent justifyContent='space-between' style={totalPages===1?{paddingBottom:"1rem"}:{paddingBottom:".4rem"}}>
          <div className={`${styles.container} ${isArabicLanguage&&styles.arabic}`}>
              <select name="" id="" onChange={HandelItemPerPageChange}>
                  <option value="10">10 / {t("common.Rows")}</option>
                  <option value="20">20 / {t("common.Rows")}</option>
                  <option value="30">30 / {t("common.Rows")}</option>
                  <option value="50">50 / {t("common.Rows")}</option>
                  <option value="100">100 / {t("common.Rows")}</option>
                  <option value="150">150 / {t("common.Rows")}</option>
                  <option value="200">200 / {t("common.Rows")}</option>
                  <option value="1000000000000">{t("جميع النتائج")}</option>
              </select>
              <div className={styles.pagination}>
                <button
                  type='button'
                  className={`${styles.previosButton} ${currentPage===1&&styles.disable}` }
                  disabled={currentPage === 1}
                  onClick={() => onPageChange(currentPage - 1)}
                >
                  {isArabicLanguage?<RightArrowSvg/>:<LeftArrowSvg/>}
                </button>

                {getPageNumbers().map((page:any, index:number) => {
                  if (page === '...') {
                    return <span key={index}>...</span>;
                  }
                  return (
                    <button
                      type='button'
                      key={index}
                      className={ currentPage === page ? `${styles.active}` : `${styles.notActive}`}
                      onClick={() => onPageChange(page)}
                    >
                      {page}
                    </button>)})}

                <button
                  type='button'
                  className={`${styles.nextButton} ${currentPage === totalPages&&styles.disable}` }
                  disabled={currentPage === totalPages}
                  onClick={() => onPageChange(currentPage + 1)}
                >
                  {isArabicLanguage?<LeftArrowSvg/> :<RightArrowSvg/>}
                </button>
              </div>
          </div>
          <FlexComponent style={{fontWeight:"bold",margin:"0 .5rem"}} gap='.5rem'>
            <span style={{fontWeight:"normal"}}>مجموع العناصر الكلي</span>
            <span> : {totalItems}</span>
          </FlexComponent>
        </FlexComponent>
  );
}

export default PaginationReactTable;
