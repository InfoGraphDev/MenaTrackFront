import React, { useContext, useRef, useState } from 'react';
import styles from './style.module.scss';
import { useOutsideClick } from '@/Hooks/ClickOutsideHook';
import FlexComponent from '@/Components/UIElements/Layout/Flex';
import { MainTableContext, MainTableContextInterface } from '../..';
import CheckBoxSvg from '@/Assets/Icons/Check';
import NotCheckSvg from '@/Assets/Icons/notCheck';
import { useTranslation } from 'react-i18next';

const SelectColumnFilterComponent = ({setSelectColumnFilter}) => {
  const SelectColumnRef=useRef(null);
  useOutsideClick(SelectColumnRef, () => setSelectColumnFilter(false));
  const [filterText, setFilterText] = useState('');
  const {CoulumnsValue,setCoulumnsValue}=useContext<MainTableContextInterface>(MainTableContext);
  const {t}=useTranslation();
  const handleSearch = (e) => {
    setFilterText(e.target.value);
  };

  const filteredColumns = CoulumnsValue?.filter(column =>
    column?.header?.toLowerCase()?.includes(filterText?.toLowerCase())
  );

  const toggleActive = (column) => {
    let NewValue=CoulumnsValue?.map((data)=>{
      if(data?.accessorKey==column?.accessorKey){
        return {...data,active:!data?.active}
      }else{
        return data
      }
    })
    setCoulumnsValue(NewValue);
  };

  return (
    <div className={styles.tableContainer} ref={SelectColumnRef}>
      <input
        type="text"
        placeholder={t("common.Search")}
        className={styles.searchInput}
        value={filterText}
        onChange={handleSearch}
      />
      <div className={styles.containerlist}>
        {filteredColumns.map((column, index) => (
          <FlexComponent
            gap='.5rem'
            justifyContent='flex-start'
            key={index}
            className={`${styles.item} ${column.active ? styles.active : ''}`}
            onClick={() => toggleActive(column)}>
            <span>
              {column.active ? <CheckBoxSvg className={styles.check}/> : <NotCheckSvg className={styles.check} />}
            </span>
            <span>{column.header}</span>
          </FlexComponent>
        ))}
      </div>
    </div>
  );
};

export default SelectColumnFilterComponent;
