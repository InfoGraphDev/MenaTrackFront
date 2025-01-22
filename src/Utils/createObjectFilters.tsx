import React from 'react'

interface ObjectCreate{
    value:string,
    operator?:"Equals",
    propertyName:string
}
export function CreateObjectFilters({value,operator="Equals",propertyName}:ObjectCreate) {
    return {
        "propertyName": propertyName,
        "operator": operator,
        "value": value
    }
}

