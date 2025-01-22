import React, { useContext } from 'react';
import { flexRender,Table  } from '@tanstack/react-table';
import styles from "../style.module.scss";
import { TableEnum } from '@/Core/Enums/EnumTable';
import FlexComponent from '@/Components/UIElements/Layout/Flex';
import SortAscSvg from '@/Assets/Icons/ASC';
import SortDescSvg from '@/Assets/Icons/Desc';
import { MainTableContext, MainTableContextInterface } from '..';

interface HeaderReactTableProps {
    table: Table<any>;
    formOptions: any;
}

function HeaderReactTable({ table, formOptions }:HeaderReactTableProps) {
    const {ColumnsWillUseForTable}=useContext<MainTableContextInterface>(MainTableContext);

    const handleSorting = (header:any) => {
        if(!header.column.columnDef?.sort){
            return;
        }
        const valueHeader = header.column.columnDef?.accessorKey;
        const currentSort = formOptions?.watch(TableEnum[2]);
        if (currentSort === "ASC") {
            formOptions?.setValue(TableEnum[2], 'DESC');
            formOptions?.setValue(TableEnum[3], valueHeader);
        } else {
            formOptions?.setValue(TableEnum[2], currentSort === "DESC" ? '' : 'ASC');
            formOptions?.setValue(TableEnum[3], currentSort === "DESC" ? '' : valueHeader);
        }
    }

    return (
        <div className={`${styles.header} `}>
            {table?.getHeaderGroups()?.map(headerGroup => (
                <div key={headerGroup.id} className={styles.tr}>
                    {headerGroup.headers.map((header:any,i) => {
                        return(
                            <div  
                                style={{
                                    ...(header?.column?.columnDef?.sort ? { cursor: "pointer" } : {}),
                                    ...(header.column.columnDef.width ? { maxWidth: header.column.columnDef.width } : {}),
                                }}
                                className={`${styles.th} ${ColumnsWillUseForTable?.length>7&&styles.activWidth} `}
                                key={i}
                                onClick={() => handleSorting(header)}>
                            <FlexComponent gap='.5rem'>
                                <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
                                {ColumnsWillUseForTable[i]?.sort?
                                    <div style={{cursor:"pointer"}}>
                                        {header.column.columnDef?.accessorKey === formOptions?.watch(TableEnum[3]) && (
                                            <>
                                                {formOptions?.watch(TableEnum[2]) === "ASC" &&<SortAscSvg/> }
                                                {formOptions?.watch(TableEnum[2]) === "DESC" &&<SortDescSvg/> }
                                            </>
                                        )}
                                    </div>:
                                    <></>}
                            </FlexComponent>
                        </div>
                        )
                    })}
                </div>
            ))}
        </div>
    );
}

export default HeaderReactTable;
