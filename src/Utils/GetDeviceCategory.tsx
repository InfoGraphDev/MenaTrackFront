export function GetDeviceCategory(number,t) {
    switch (number) {
        case "G1":
            return t("MedicalEquipmentDetailData.RadiologyGroup");
        case "G2":
            return t("MedicalEquipmentDetailData.LaboratoryGroup");
        case "G3":
            return t("MedicalEquipmentDetailData.AnesthesiaAndRespiratoryGroup");
        case "G4":
            return t("MedicalEquipmentDetailData.SterilizationGroup");
        case "G5":
            return t("MedicalEquipmentDetailData.OperatingRoomDevicesGroup");
        case "G7":
            return t("MedicalEquipmentDetailData.EndoscopyAndAudiologyGroup");
        case "G8":
            return t("MedicalEquipmentDetailData.MonitoringGroup");
        case "G9":
            return t("MedicalEquipmentDetailData.DentistryGroup");
        case "GH":
            return t("MedicalEquipmentDetailData.RadiologyGroup"); 
    }
}
