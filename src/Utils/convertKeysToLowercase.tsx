export function convertKeysToLowercase(obj) {
    const newObj = {};
    Object.keys(obj).forEach(key => {
        const newKey = key.charAt(0).toLowerCase() + key.slice(1);
        newObj[newKey] = obj[key];
    });
    return newObj;
}
