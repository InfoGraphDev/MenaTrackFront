export function identifyFacilityType(jsonData) {
    if ("NO_OF_BEDS" in jsonData) {
      return 0;
    }  
    if("YEAR_2012" in jsonData){
      return 0;
    }
    if(jsonData?.hospital){
      return 0
    }
    return 1;
  }

export enum FacilityTypeEnum {
    "hospital"=0,
    "healthCenter"=1
}
  