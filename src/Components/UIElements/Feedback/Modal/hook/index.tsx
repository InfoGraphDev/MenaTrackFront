import React, { createContext, useContext, useState, ReactNode } from "react";

export interface TypeModal {
  type: "ListDetailComplain";
  value: any;
}

export interface ModalContextType {
  ModalStatus: TypeModal[];
  setModalStatus: React.Dispatch<React.SetStateAction<TypeModal[]>>;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [ModalStatus, setModalStatus] = useState<TypeModal[]>([]);

  return (
    <ModalContext.Provider value={{ ModalStatus, setModalStatus }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
};
