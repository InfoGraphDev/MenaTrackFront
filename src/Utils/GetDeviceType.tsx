export function GetDeviceType(number,t) {
    switch (number) {
        case "1":
            return t("MedicalEquipmentDetailData.ElectricalMedicalDevices");
        case "2":
            return t("MedicalEquipmentDetailData.NonElectricalMedicalDevices");
        default:
            return "حالة غير معروفة";
    }
}
