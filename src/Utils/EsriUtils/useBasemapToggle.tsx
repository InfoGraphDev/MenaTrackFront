import { useContext, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { BaseMapSelectReducer } from '@/Context/Redux/Reducer/MainReducer';
import { LocalStorageEnum } from '@/Core/Enums/LocalStorage';
import { MapContext } from '@/Features/Maps/Maps';
import useLocalStorageOptions from '@/Hooks/useLocalStorageOptions';

export function useBasemapToggle() {
    const dispatch = useDispatch();
    const { view } = useContext(MapContext);
    const { setValueLocalStorage } = useLocalStorageOptions();

    const localStorageKey = useMemo(() => LocalStorageEnum[3], []);

    const debouncedSetValueLocalStorage = useCallback((value) => {
        let timeout;
        clearTimeout(timeout);
        timeout = setTimeout(() => setValueLocalStorage(value), 300);
    }, [setValueLocalStorage]);

    const handleChangeType = useCallback((type: string) => {
        if (view && view.map && view.map.basemap !== type) {
            dispatch(BaseMapSelectReducer(type));
            debouncedSetValueLocalStorage({ key: localStorageKey, value: type });
            view.map.basemap = type;
        }
    }, [dispatch, debouncedSetValueLocalStorage, localStorageKey, view]);

    return handleChangeType;
}
