export function getStatusWork(number,t) {
    switch (number) {
        case "1":
            return t("MedicalEquipmentDetailData.DevicesWorking");
        case "2":
            return t("MedicalEquipmentDetailData.DevicesUnderMaintenance");
        case "3":
            return t("MedicalEquipmentDetailData.ScrapDevices");
        case "4":
            return t("MedicalEquipmentDetailData.DevicesNotWorking");
        default:
            return "حالة غير معروفة";
    }
}