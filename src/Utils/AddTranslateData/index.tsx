import React, { useEffect, useRef } from 'react';
import DataJson from "./json.json";
import api from '@/Services/Api';
import { OtherServices } from '@/Services/ApiService/URL/Other.service';

function AddTranslateData() {
    const postExecutedRef = useRef(false);

    useEffect(() => {
        function transformJSON(jsonData) {
            const resultArray = [];
            for (const key in jsonData) {
                if (jsonData.hasOwnProperty(key)) {
                    const entry = {
                        key: key,
                        arabic: jsonData[key].arabic,
                        english: jsonData[key].english,
                        description: "",
                        state: 0
                    };
                    resultArray.push(entry);
                }
            }
            return resultArray;
        }

        if (!postExecutedRef.current) {

            transformJSON(DataJson).forEach((data) => {
                // api.post(OtherServices.AddFieldTitleTranslation,data).then((Data)=>{
                // }).catch((err)=>{
                // })
            });
            postExecutedRef.current = true;
        }
    }, []); 

    return (
        <div>

        </div>
    );
}

export default AddTranslateData;
