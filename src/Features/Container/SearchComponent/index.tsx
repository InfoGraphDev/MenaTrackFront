import React from 'react';
import styles from "./style.module.scss";
import { useDispatch, useSelector } from 'react-redux';
import { ReduxInterface } from '@/Core/interface/Redux-interface';
import useIsArabicLanguage from '@/Hooks/IsArabicLanguage';
import FlexComponent from '@/Components/UIElements/Layout/Flex';
import BottomSheetComponent from '@/Components/BottomSheet';
import { SideBarSelectInfoReducer } from '@/Context/Redux/Reducer/MainReducer';
import ShowMainDetailData from './ShowMainDetailData';

function SearchComponent() {
    const { sideBarSelectInfo } = useSelector((state: ReduxInterface) => (state?.MainReducerApp));
    const isArabicLanguage = useIsArabicLanguage();
    const dispatch=useDispatch();
    const handelClose=()=>{
        dispatch(SideBarSelectInfoReducer(false))
    }
    let ComponentToRender = null;
    switch (sideBarSelectInfo?.value) {
        case "0":
            ComponentToRender = <ShowMainDetailData DataUse={sideBarSelectInfo}/>;
            break;
        default:
            ComponentToRender = <FlexComponent>Select a component...</FlexComponent>;
    }

    return (
        <div>
            <div className={`
                    ${isArabicLanguage ? styles.itemSelectAr : styles.itemSelect} 
                    ${(sideBarSelectInfo) && styles.active}`}>
                {ComponentToRender}
            </div>
            <BottomSheetComponent IsOpen={sideBarSelectInfo} handelClose={handelClose}>
                {ComponentToRender}
            </BottomSheetComponent>
        </div>
    );
}

export default SearchComponent;
