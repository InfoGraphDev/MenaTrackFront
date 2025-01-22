import { TableEnum } from "@/Core/Enums/EnumTable"
export class FilterTableDataUse{
    static DataUse=(t,options)=>{
        return (
            [
                { name: TableEnum[5], placeholder: t("common.SelectColumn"),label:"",options:options,height:"2.2rem",required:true ,keyName:"label",valueName:"value"},
                { name: TableEnum[4], placeholder: t("common.Search"),label:"",height:"2.5rem",required:false},
            ]
        )

    }
}