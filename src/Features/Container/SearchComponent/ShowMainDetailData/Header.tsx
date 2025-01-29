import ShowSvg from "@/Assets/Icons/show";
import { useModalContext } from "@/Components/UIElements/Feedback/Modal/hook";
import ZoomInSvg from "@/Components/UIElements/General/SVG/Icons/zoomIn";
import FlexComponent from "@/Components/UIElements/Layout/Flex";
import { MapContext } from "@/Features/Maps/Maps";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

export function useHeaderDataComplain() {
    const {t}=useTranslation();  
    const {setModalStatus}=useModalContext();
    const {view}=useContext(MapContext);

    const headers =[
      {
        accessorKey: "Subsecriber_Name",
        header: t("اسم المشترك"),
        sort: true,
        active:true
      },
      {
        accessorKey: "Reference_No",
        header: t("الرقم المرجعي"),
        sort: true,
        active:true
      },
      {
        accessorKey: "",
        header: t("الاحداث"),
        sort: true,
        active: true,
        filter: false,
        width:"25%",
        cell: (param) => {
          return (
            <FlexComponent
              style={{
                justifyContent: "space-around",
                margin: "0 auto",
              }}
            >
              <span
                onClick={() => {
                  view.goTo({
                    target: param?.row?.original?.geometry,
                    zoom: 22,
                  });
                }}
                style={{ cursor: "pointer" }}
              >
                <ZoomInSvg />
              </span>
              <span
                onClick={() => {
                  setModalStatus([{type:"DetailPointModal",value:param?.row?.original,}])
                }}
                style={{ cursor: "pointer" }}
              >
                <ShowSvg />
              </span>
            </FlexComponent>
          );
        },
      },

    ]

  return {headers};
}


