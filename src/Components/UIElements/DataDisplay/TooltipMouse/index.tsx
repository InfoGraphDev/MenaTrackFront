import React, { useContext, useEffect, useState, useCallback } from 'react';
import styles from "./style.module.scss";
import { useTranslation } from 'react-i18next';
import { MapContext } from '@/Features/Maps/Maps';
import { debounce, throttle } from 'lodash'; 

function TooltipMouse({ TooltipShowMouse }) {
    if (!TooltipShowMouse) return null;
    const { view } = useContext(MapContext);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const { t } = useTranslation();
    const [coordinate, setCoordinate] = useState([]);

    const updatePosition = useCallback(debounce((event) => {
        const { clientX, clientY } = event;
        setPosition({ x: clientX, y: clientY });
    }, 0), []); 

    const pointerMoveHandler = useCallback(throttle((event) => {
        const Location = view?.toMap({ x: event.x, y: event.y });
        if (Location) {
            const latitude = +Location.latitude.toFixed(4);
            const longitude = +Location.longitude.toFixed(4);
            setCoordinate([latitude, longitude]);
        }
    }, 5), [view]); 

    useEffect(() => {
        window.addEventListener('mousemove', updatePosition);
        return () => window.removeEventListener('mousemove', updatePosition);
    }, [updatePosition]);

    useEffect(() => {
        if (view && TooltipShowMouse) {
            view.on('pointer-move', pointerMoveHandler);
        }
    }, [view, TooltipShowMouse, pointerMoveHandler]);

    return (
        <div className={styles.tooltip} style={{ left: position.x, top: position.y }}>
            <ul>
                <li>{t("common.themission")} :</li>
                <li>{t(TooltipShowMouse)}</li>
            </ul>
            <ul>
                <li>{t("common.latitude")} :</li>
                <li>{coordinate[0] ? coordinate[0] : 0}</li>
            </ul>
            <ul>
                <li>{t("common.longitude")} :</li>
                <li>{coordinate[1] ? coordinate[1] : 0}</li>
            </ul>
        </div>
    );
}

export default (TooltipMouse);
