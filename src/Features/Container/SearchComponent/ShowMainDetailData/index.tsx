import React, { useState } from 'react';
import TitleComponent from '@/Components/UIElements/Layout/Title';
import { SideBarSelectInfoReducer } from '@/Context/Redux/Reducer/MainReducer';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from "./style.module.scss";
import ReactTable from '@/Components/ComplexComponents/Table';
import { useHeaderDataComplain } from './Header';
import ButtonComponent from '@/Components/UIElements/General/Button';
import { Collapse } from 'react-collapse';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import SpaceComponent from '@/Components/UIElements/Layout/Space';
import { useModalContext } from '@/Components/UIElements/Feedback/Modal/hook';

function ShowMainDetailData({ DataUse }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const {setModalStatus}=useModalContext();
    
    const handleClose = () => {
        dispatch(SideBarSelectInfoReducer(false));
    };

    const [isExpanded, setIsExpanded] = useState(false);
    
    const toggleAccordion = () => {
        setIsExpanded(!isExpanded);
    };

    let data = DataUse?.itemSelect[0];
    const { headers } = useHeaderDataComplain();

    return (
        <div className={styles.container}>
            <TitleComponent title={t('تفاصيل الشكوى')} SpecialClose={handleClose} withoutClose={true} />
            <div className={styles.field}><strong>إسم المتصل:</strong> {data?.Caller_Name}</div>
            <div className={styles.field}><strong>رقم المتصل:</strong> {data?.Caller_Number}</div>
            <div className={styles.field}><strong>الرقم المرجعي:</strong> {data?.Reference_No}</div>
            <div className={styles.field}><strong>الحالة:</strong> {data?.Status}</div>
            <div className={styles.field}><strong>موجهة لـ:</strong> {data?.Directed_To}</div>
            <div className={styles.accordion}>
                <div className={styles.accordionHeader} onClick={toggleAccordion}>
                    <h3>المزيد من المعلومات</h3>
                    {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                
                <Collapse isOpened={isExpanded}>
                    <div className={styles.card}>
                        <div className={styles.section}>
                            <h4 className={styles.subtitle}>معلومات العنوان</h4>
                            <div className={styles.field}><strong>العنوان:</strong> {data?.Address}</div>
                            <div className={styles.field}><strong>الاقليم:</strong> {data?.Region}</div>
                            <div className={styles.field}><strong>المحافظة:</strong> {data?.Governorate}</div>
                            <div className={styles.field}><strong>خط العرض:</strong> {data?.Latitude}</div>
                            <div className={styles.field}><strong>خط الطول:</strong> {data?.Longitude}</div>
                        </div>

                        <div className={styles.section}>
                            <h4 className={styles.subtitle}>تفاصيل الخدمة</h4>
                            <div className={styles.field}><strong>الشركة:</strong> {data?.Service_Provider}</div>
                            <div className={styles.field}><strong>الفئة:</strong> {data?.Category}</div>
                        </div>

                        <div className={styles.section}>
                            <h4 className={styles.subtitle}>التفاصيل التقنية</h4>
                            <div className={styles.field}><strong>نسبة MOS:</strong> {data?.MOS_Percent_}%</div>
                            <div className={styles.field}><strong>نسبة RX:</strong> {data?.RX_Percentage}%</div>
                            <div className={styles.field}><strong>المهندس:</strong> {data?.Field_Engineer}</div>
                        </div>
                    </div>
                </Collapse>
            </div>
            <SpaceComponent bottom='1.5rem'/>
            <ReactTable 
                loading={false}
                emptyMessage='No User Available'
                Data={DataUse?.data}
                Type='client-side'
                columns={headers}
                height='auto'
                withoutTitleFilter
            />
            <SpaceComponent bottom='1.5rem'/>
            <ButtonComponent PassingData={() => {
                setModalStatus([{type:"ListDetailComplain",value:DataUse?.data}])
            }} text='عرض جدول تفصيلي' size='medium' />
        </div>
    );
}

export default ShowMainDetailData;
