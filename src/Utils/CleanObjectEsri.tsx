export function cleanObject(data) {
    if(data?.features?.length>0){
        return data?.features?.map(item => {
            const { attributes, geometry } = item;
            return { ...attributes, geometry };
        });
    }else{
        return []
    }
  
}
