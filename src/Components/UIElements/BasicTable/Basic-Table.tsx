import React from 'react';
import styles from './style.module.scss';
import { useTranslation } from 'react-i18next';

const BasicTable = ({ headers, data }) => {
    const {t}=useTranslation();

    let Keys=data?Object.keys(data[0]):[];
    return (
        <table className={styles.dataTable}>
            <thead>
                <tr>
                    {headers?.map((header, index) => (
                        <th key={index}>{t(header)}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data?.map((row, index) => (
                    <tr key={index}>
                        {Keys.map((header, i) => (
                            <td key={i}>
                                <span>{Number(row[header])?Number(row[header]).toLocaleString():row[header]}</span>
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default BasicTable;
