import { DataUsePlaceSearch, InterfacePlaceSelect } from '@/Core/Constant/DataUse-PlaceSearch';
import { ArchgisConstant } from '@/Core/Constant/Esri-Constant';
import { LocalStorageEnum } from '@/Core/Enums/LocalStorage';
import { createSlice } from '@reduxjs/toolkit'

export interface MainReducerStateInterface {
  sideBarSelectInfo: boolean;
  BaseMapSelect:string|null;
  PlaceSelect:InterfacePlaceSelect,
  IntersectionLegendView:boolean|any,
  BuffurLegendView:boolean|any
}

let haveData = localStorage.getItem(LocalStorageEnum[100]);
let SaveValueBaseMab=ArchgisConstant.MapConstant.basemap;

if(haveData){
  let item=JSON.parse(haveData)
  if(item && LocalStorageEnum[3] in item){
    SaveValueBaseMab=item[LocalStorageEnum[3]]
  }
}

const initialState:MainReducerStateInterface = {
  sideBarSelectInfo:false,
  BaseMapSelect:SaveValueBaseMab,
  PlaceSelect:DataUsePlaceSearch.initialvalue,
  IntersectionLegendView:false,
  BuffurLegendView:false
}

export const MainReducerApp = createSlice({
  name: 'MainReducer',
  initialState,
  reducers: {
    SideBarSelectInfoReducer: (state, action) => {
      state.sideBarSelectInfo = action.payload
    },
    PlaceSelectReducer:(state,action)=>{
      state.PlaceSelect = action.payload
    },
    BaseMapSelectReducer:(state,action)=>{
      state.BaseMapSelect = action.payload
    },
    IntersectionLegendViewReducer:(state,action)=>{
      state.IntersectionLegendView = action.payload
    },
    BuffurLegendViewReducer:(state,action)=>{
      state.BuffurLegendView = action.payload
    },
  },
})

export const {
        SideBarSelectInfoReducer,
        PlaceSelectReducer,
        BaseMapSelectReducer,
        IntersectionLegendViewReducer,
        BuffurLegendViewReducer
      } = MainReducerApp.actions

export default MainReducerApp.reducer

