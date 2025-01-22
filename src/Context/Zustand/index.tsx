import create, { StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import produce from 'immer';

interface AppState {
  longitudeAndLatitude: {longitude:number,latitude:number};
  setlongitudeAndLatitude: (longitudeAndLatitude: {longitude:number,latitude:number}) => void;
  
  OpenSearchFeild:boolean;
  setOpenSearchFeild: (OpenSearchFeild:boolean) => void;

  DataCleanObject: any;
  setDataCleanObject: (DataCleanObject: []) => void;
}

const initialState: Omit<AppState, 'setlongitudeAndLatitude'|'setOpenSearchFeild'|'setDataCleanObject'|'setEsriToken'> = {
    longitudeAndLatitude: {longitude:0,latitude:0},
    
    OpenSearchFeild:false,
    
    DataCleanObject:[],
};

const createAppState: StateCreator<AppState> = (set) => ({
  ...initialState,
  setlongitudeAndLatitude: (longitudeAndLatitude: {longitude:number,latitude:number}) =>
    set(
      produce((state: AppState) => {
        state.longitudeAndLatitude = longitudeAndLatitude;
      })
    ),

  setOpenSearchFeild: (OpenSearchFeild:boolean) =>
    set(
        produce((state: AppState) => {
          state.OpenSearchFeild = OpenSearchFeild;
        })
      ),

  setDataCleanObject: (DataCleanObject:any) =>
      set(
          produce((state: AppState) => {
            state.DataCleanObject = DataCleanObject;
          })
        ),
  
});

const useStore = create<AppState>(
  devtools(
    persist(createAppState, {
      name: 'app-storage-TRC',
      partialize: (state) => ({
        OpenSearchFeild: state.OpenSearchFeild,
      })
    })
  )
);
// Latitude And longitude State Manegmant
export const useLongitudeAndLatitude = (): {longitude:number,latitude:number} => useStore((state) => state.longitudeAndLatitude);
export const useSetlongitudeAndLatitude = (): ((longitudeAndLatitude: {longitude:number,latitude:number}) => void) => useStore((state) => state.setlongitudeAndLatitude);

export const useOpenSearchFeild = (): boolean => useStore((state) => state.OpenSearchFeild);
export const useSetOpenSearchFeild = (): ((OpenSearchFeild: boolean) => void) => useStore((state) => state.setOpenSearchFeild);

export const useDataCleanObject = (): any => useStore((state) => state.DataCleanObject);
export const useSetDataCleanObject = (): ((DataCleanObject: any) => void) => useStore((state) => state.setDataCleanObject);

export default useStore;
