import { CreateObjectFilters } from '@/Utils/createObjectFilters';
import { TableName } from '../Enums/Esri-Enum/Table-Enum';
import { FeildTypeFormHook } from '../Enums/Feild-Type-Form';
import { Reference_Jordan_Qada } from '../Reference/Jordan_Qada';

export class DataUsePlaceSearch {
    static Governorates_Liwa_Qada=[
        { name: TableName[79], placeholder: "SearchforHospitals.Governorate",label:"SearchforHospitals.Governorate", type: FeildTypeFormHook[12], required: true,options:[] },
        { name: TableName[73], placeholder: "SearchforHospitals.Liwa",label:"SearchforHospitals.Liwa", type: FeildTypeFormHook[12], required: true,options:[] },
        { name: TableName[74], placeholder: "SearchforHospitals.Qada",label:"SearchforHospitals.Qada", type: FeildTypeFormHook[12], required: true,options:[] },
    ];

    static street_landmark=(t:any)=>{
        return(
            [
                {name: "street", placeholder: t(""),
                    label:t("SearchLandmaeks.SearchThrough"),
                    type: FeildTypeFormHook[13],tableName:[TableName[70]]},
                {name: "mainRoad", placeholder: t(""),
                    label:t("SearchLandmaeks.mainRoad"),
                    type: FeildTypeFormHook[13],tableName:[TableName[69]]},
                {name: "landmark", placeholder: t(""),
                    label:t("SearchLandmaeks.SearchLandmark"), 
                    type: FeildTypeFormHook[13],tableName:[TableName[72]]},
                {name: "Pharmacies", placeholder: t(""),
                    label:t("SearchLandmaeks.Findapharmacy"), 
                    type: FeildTypeFormHook[13],tableName:[TableName[71]],
                    arabic:"Landmark_Name_A",english:"Landmark_Name_E"}
            ]
        )
    }

    static GetSelectPlaceData({PlaceSelect}) {
        if(PlaceSelect?.[TableName[74]]?.value){
            return PlaceSelect?.[TableName[74]]?.value
        }else if(PlaceSelect?.[TableName[73]]?.value){
            return PlaceSelect?.[TableName[73]]?.value
        }else if(PlaceSelect?.[TableName[79]]?.value){
            return PlaceSelect?.[TableName[79]]?.value
        }else {
            return false
        }
    }

    static GetFiltersData({ModalView,placeData}){

        if(ModalView&&ModalView?.WPLACE){
            return{
                "filters": [
                    CreateObjectFilters({propertyName:"wplace",value:`${ModalView?.WPLACE}`})
                ]
              }
        }
        else if(placeData?.[Reference_Jordan_Qada[4]]){
            return{
                "filters": [
                    CreateObjectFilters({propertyName:"code",value:`${placeData?.[Reference_Jordan_Qada[4]]}`})
                ]
              }

        }
        else if(placeData?.[Reference_Jordan_Qada[10]]){
            return{
                "filters": [
                    CreateObjectFilters({propertyName:"code",value:`${placeData?.[Reference_Jordan_Qada[10]]}`})
                ]
              }
        }else if(placeData?.[Reference_Jordan_Qada[7]]){
            return{
                "filters": [
                    CreateObjectFilters({propertyName:"code",value:`${placeData?.[Reference_Jordan_Qada[7]]}`})
                ]
              }
        }else {
            return{
                "filters": []
              }
        }

    }

    static GetObjectPlaceSend({ModalView,PlaceSelect,i18n}){
        const language=i18n.language=="ar";        
        if(ModalView&&ModalView?.WPLACE){
            return{
                wplace:`${ModalView?.WPLACE}`,
                districtCode:null,
                subDistrictCode:null,
                govCode:null,
                name:language?ModalView?.CENTER_ANAME:ModalView?.CENTER_ENAME
            }
        }
        else if(PlaceSelect?.[Reference_Jordan_Qada[4]]){
            return {
                wplace:null,
                districtCode:null,
                subDistrictCode:`${PlaceSelect?.[Reference_Jordan_Qada[4]]}`,
                govCode:null,
                name:language?PlaceSelect?.QADA_ANAME:PlaceSelect?.QADA_ENAME
            }
        }
        else if(PlaceSelect?.[Reference_Jordan_Qada[10]]){
            return {
                wplace:null,
                districtCode:`${PlaceSelect?.[Reference_Jordan_Qada[10]]}`,
                subDistrictCode:null,
                govCode:null,
                name:language?PlaceSelect?.LIWA_ANAME:PlaceSelect?.LIWA_ENAME

            }
        }else if(PlaceSelect?.[Reference_Jordan_Qada[7]]){
            return {
                wplace:null,
                districtCode:null,
                subDistrictCode:null,
                govCode:`${PlaceSelect?.[Reference_Jordan_Qada[7]]}`,
                name:language?PlaceSelect?.ARABIC_NAME:PlaceSelect?.ENGLISH_NAME
            }
        }else {
            return {
                wplace:null,
                districtCode:null,
                subDistrictCode:null,
                govCode:null,
                name:null
            }
        }
    }

    // From TableName
    static initialvalue={
        Jordan_Governorates:"",
        District:"",
        SubDistrict:"",
        street:"",
        landmark:""
      }
}
  
export interface InterfacePlaceSelect  {
    Jordan_Governorates:string;
    District:string,
    SubDistrict:string,
    street:string,
    landmark:string
  }


  