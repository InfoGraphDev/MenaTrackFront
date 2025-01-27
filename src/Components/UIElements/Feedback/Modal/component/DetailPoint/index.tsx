import React from "react";
import styles from "./style.module.scss";
import DividerComponent from "@/Components/UIElements/Layout/Divider";
import FlexComponent from "@/Components/UIElements/Layout/Flex";
import TitleComponent from "@/Components/UIElements/Layout/Title";
import { useModalContext } from "../../hook";

function DetailPointModal({ DataUse }) {
  const { setModalStatus } = useModalContext();

  const handleClose = () => {
    setModalStatus([]);
  };

  return (
    <div className={styles.containerAll}>
      <TitleComponent title="تفاصيل النقطة" SpecialClose={handleClose} />
      <DividerComponent text="معلومات اساسية" />
      <div className={styles.details}>
        <FlexComponent justifyContent="space-around" className={styles.flexContainer}>
          <div className={styles.detailItem}><strong>الاسم :</strong> <span>{DataUse?.Caller_Name}</span></div>
          <div className={styles.detailItem}><strong>الرقم :</strong> <span>{DataUse?.Caller_Number}</span></div>
          <div className={styles.detailItem}><strong>الحالة :</strong> <span>{DataUse?.Status}</span></div>
          <div className={styles.detailItem}><strong>الموقع :</strong> <span>{DataUse?.Address}</span></div>
        </FlexComponent>
        <DividerComponent text="معلومات الموقع" />
        <FlexComponent justifyContent="space-around" className={styles.flexContainer}>
          <div className={styles.detailItem}><strong>خط العرض :</strong> <span>{DataUse?.Latitude}</span></div>
          <div className={styles.detailItem}><strong>خط الطول :</strong> <span>{DataUse?.Longitude}</span></div>
          <div className={styles.detailItem}><strong>المنطقة :</strong> <span>{DataUse?.Region}</span></div>
          <div className={styles.detailItem}><strong>المحافظة :</strong> <span>{DataUse?.Governorate}</span></div>
        </FlexComponent>
        <DividerComponent text="تفاصيل الخدمة" />
        <FlexComponent justifyContent="space-around" className={styles.flexContainer}>
          <div className={styles.detailItem}><strong>مزود الخدمة :</strong> <span>{DataUse?.Service_Provider}</span></div>
          <div className={styles.detailItem}><strong>التصنيف :</strong> <span className={styles.category}>{DataUse?.Category}</span></div>
          <div className={styles.detailItem}><strong>الملاحظات :</strong> <span>{DataUse?.QOS_Notes}</span></div>
          <div className={styles.detailItem}><strong>المهندس :</strong> <span>{DataUse?.Field_Engineer}</span></div>
        </FlexComponent>
      </div>
    </div>
  );
}

export default DetailPointModal;
