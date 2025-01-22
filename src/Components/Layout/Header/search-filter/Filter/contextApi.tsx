import React, { useState } from "react";

type SelectOption = {
    label: string;
    value: string;
  };
  
interface NodeContext{
  children:React.ReactNode
}
interface Context {
    LiwaOptions: SelectOption[],
    setLiwaOptions: React.Dispatch<React.SetStateAction<SelectOption[]>>,
    QadaOptions: SelectOption[],
    setQadaOptions: React.Dispatch<React.SetStateAction<SelectOption[]>>,
    GovernoratesOptions: SelectOption[],
    setGovernoratesOptions: React.Dispatch<React.SetStateAction<SelectOption[]>>,
  }

export const Governorates_Liwa_Qada_ContextApi=React.createContext<Context>({
  LiwaOptions:[],
  setLiwaOptions:() => {},
  QadaOptions:[],
  setQadaOptions: () => {},
  GovernoratesOptions:[],
  setGovernoratesOptions:() => {},
});

export function Governorates_Liwa_Qada_Provider({children}:NodeContext) {
  const [LiwaOptions, setLiwaOptions] = useState<SelectOption[]|any[]>([]);
  const [QadaOptions, setQadaOptions] = useState<SelectOption[]|any[]>([]);
  const [GovernoratesOptions, setGovernoratesOptions] = useState<SelectOption[]|any[]>([]);
  
  return (
    <Governorates_Liwa_Qada_ContextApi.Provider value={{
        LiwaOptions,setLiwaOptions,
        QadaOptions,setQadaOptions,
        GovernoratesOptions,setGovernoratesOptions}}>
        {children}
    </Governorates_Liwa_Qada_ContextApi.Provider>
  ) 
}

