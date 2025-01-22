import { useTranslation } from "react-i18next";

export function useHeaderDataComplain() {
    const {t}=useTranslation();  
    const headers =[
      {
        accessorKey: "Subsecriber_Name",
        header: t("اسم المشترك"),
        sort: true,
        active:true
      },
      {
        accessorKey: "Subsecriber_National_No",
        header: t("رقم وطني للمشترك"),
        sort: true,
        active:true
      }

    ]

  return {headers};
}


