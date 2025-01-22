import React from 'react';
import Styles from './style.module.scss';
import { identifyLanguage } from '@/Utils/identifyLanguage';
import InfinitProgressBar from '../../../../InfinitProgressBar/index.tsx';
import { useTranslation } from 'react-i18next';
import { EmptyComponent } from '@/Components/UIElements/DataDisplay/Empty/index.tsx';
import SkeletonComponent from '@/Components/UIElements/Feedback/Skeleton/index.tsx';
import FlexComponent from '@/Components/UIElements/Layout/Flex/index.tsx';
import UppArrowSvg from '@/Assets/Icons/uppArrow.tsx';

function SelectOptionsListSelectSearch({ DataUse,SearchOption}) {
    const { loading, options, totalCount, setpageNumber,
            handelSelect, Datause, formOptions ,
            setIsFocused,settotalCount,
            loadingMore, setLoadingMore,setOptions} = DataUse;
    let SearchValue = formOptions?.watch(Datause?.name) ? formOptions?.watch(Datause?.name) : "";

    let arabic=SearchOption[0]?.arabic;
    let english=SearchOption[0]?.english;
    const {t}=useTranslation();
    const handleLoadMoreClick = () => {
        setLoadingMore(true);
        setpageNumber(prevPageNumber => prevPageNumber + 1);
    };

    const handelSelectOption=(data:any)=>{
        let ValueUse=identifyLanguage(SearchValue) === "en" ? data?.[english] : data?.[arabic]
        formOptions?.setValue(Datause?.name, ValueUse, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
            exact: false
          });
          setIsFocused(false)
          handelSelect(data);
          setOptions([]);
          setLoadingMore(false);
          settotalCount(0)
    }

    return (
        <div className={Styles.DropDown} style={{top:`${Datause?.DropDown?Datause?.DropDown:"5rem"}`}} >
            {(loadingMore||(loading&&options?.length!==0)) &&<InfinitProgressBar/>}
            {(loading&&options?.length==0)&&<div className={Styles.ContainerLoading}><SkeletonComponent number={3} style={{height:"2.3rem"}}/></div>}
            <div className={Styles.inner}>
                {!loading && options.length === 0 &&SearchValue!=="" &&<EmptyComponent text="common.Nooptions"/>}
                {!loading && SearchValue === "" && <FlexComponent className={Styles.SearchPlease}>{t("common.SearchPlease")}</FlexComponent>}
                {options.map((data, i) => {
                    return(
                        <div className={Styles.options} key={i} 
                            onClick={()=>{handelSelectOption(data)}}>
                            {identifyLanguage(SearchValue) === "en" ? data?.[english] : data?.[arabic]}
                        </div>
                    )
                })}
                {(options.length < totalCount) &&(!loadingMore)&&(!loading) && (
                    <FlexComponent className={Styles.loadMore} onClick={handleLoadMoreClick}>
                        <span style={{fontSize:"1.4rem"}}><UppArrowSvg/></span>
                        <span>{t("common.ShowMore")}</span>
                    </FlexComponent>
                )}
                {loadingMore && <div className={Styles.loadMore}>{t("common.laoding")}</div>}
            </div>
        </div>
    );
}

export default SelectOptionsListSelectSearch;
