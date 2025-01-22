import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';
import useFocus from '../../../Hook/FocusedHook';
import { useTranslation } from 'react-i18next';
import useFilteredPlaceData from '../../../../../../Hooks/PlaceSearch';
import getEsriData from '@/Services/Esriservice/GetEsriData/getEsriData';
import { CreateQueryDependLanguage } from '@/Utils/identifyLanguage';
import SelectOptionsListSelectSearch from './Options-select';
import { useUserContext } from '@/Context/ContextApi/UserContext';
import SearchSvg from '@/Assets/Icons/SearchSvg';
import LabelFeildReactHookForm from '../../Utils/Label';
import ApprovalAndErrorReactHookForm from '../../Utils/ApprovalAndError';

const SearchSelectFormHook = ({ formOptions, Datause, disable, moreOptions }) => {
  const { name, placeholder, icon, type, required, label, SearchOption,height,check } = Datause;
  const { register } = formOptions;
  const { ref, isFocused, handleFocus, handleBlur, setIsFocused } = useFocus();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [totalCount, settotalCount] = useState(0);
  const [pageNumber, setpageNumber] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const {PlaceSelectMainInfo}= useFilteredPlaceData({DataPasingFromModal:false})
  const [typingTimeout, setTypingTimeout] = useState<number | null>(null);
  const {esriToken}=useUserContext();
  
  const handleSearch = async (valueSearch:any) => {
    setLoadingMore(false)
    let aggregatedOptions:any = [];
    let totalItemsCount = 0;
    setLoading(true);

    for (const TableData of SearchOption) {
      const url = TableData.url;
      if (url && valueSearch) {
        try {
          const geometrySearchValue = PlaceSelectMainInfo?.geometry || null;
          const data = await getEsriData(`${url}`, {
            queryFeaturesOptions: {
              num: 10 * pageNumber,
              start: 0,
              needCount: true,
            },
            query: CreateQueryDependLanguage(valueSearch,TableData.arabic,TableData.english),
            needCount: true,
            geometry:geometrySearchValue,
            token:esriToken
          });
          aggregatedOptions = aggregatedOptions.concat(data?.res);
          totalItemsCount = data?.featureItemsCount ? data?.featureItemsCount : 0;
        } catch (error) {
        }
      }
    }

    setOptions(aggregatedOptions);
    settotalCount(totalItemsCount);
    setLoading(false);
  };

  const handleChange = (event:any) => {
    setLoading(true);
    const valueSearch = event?.target.value;
    if (valueSearch === "" || !valueSearch) {
      setOptions([]);
      settotalCount(0);
      setLoading(false);
    } else {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }

      setTypingTimeout(setTimeout(() => {
        handleSearch(valueSearch);
      }, 1000));
    }
  };

  useEffect(() => {
    if (loadingMore) {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
      setTypingTimeout(setTimeout(() => {
        handleSearch(formOptions?.watch(Datause?.name));
      }, 1000));
    }
  }, [loadingMore]);

  return (
    <div className={styles.containerAll} ref={ref} style={{ position: "relative" }}>
      <LabelFeildReactHookForm label={label}/>
      <div
        style={{height:height}}
        title={disable ? t("error.Thisfieldisdisabled") : ""}
        className={`${isFocused && styles.focused} ${styles.containerField} ${disable && styles.disable}`}
      >
        <li className={styles.icon}>{icon && <div className={styles.icons}><SearchSvg/></div>}</li>
        <input
            disabled={disable}
            required={required}
            type={type}
            onFocus={handleFocus}
            onBlur={handleBlur}
            name={name}
            onKeyUp={handleChange}
            {...register(name)}
            placeholder={t(placeholder)}
            className={styles.inputFeild} />

        {isFocused &&
          <SelectOptionsListSelectSearch SearchOption={SearchOption} DataUse={{
            loading, options, totalCount, setpageNumber,
            handelSelect:moreOptions?.handelSelect, Datause, formOptions ,
            setIsFocused,settotalCount,
            loadingMore, setLoadingMore,setOptions}} />}
        <ApprovalAndErrorReactHookForm
           check={check}
           formOptions={formOptions}
           name={name}/>
      </div>
    </div>
  );
};

export default SearchSelectFormHook;
