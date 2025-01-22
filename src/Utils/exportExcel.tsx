import * as XLSX from 'xlsx';

interface ExportExcel {
    data: object[],
    keysToRemove?: any;
    nameExcel:string
}

export function ExportExcel({ data, keysToRemove,nameExcel }: ExportExcel) {
    let DataWillUse = keysToRemove ? removeKeysFromObjects(data, keysToRemove) : data;

    const ws = XLSX.utils.json_to_sheet(DataWillUse);

    const header = Object.keys(DataWillUse[0]);
    XLSX.utils.sheet_add_aoa(ws, [header], { origin: "A1" });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const wsCols = header.map(h => ({ wpx: 100 })); // 100 pixels width for each column
    ws['!cols'] = wsCols;
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    const blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${nameExcel}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function removeKeysFromObjects<T extends Record<string, any>>(
    dataArray: T[],
    keysToRemove: (keyof T)[]
): Omit<T, typeof keysToRemove[number]>[] {
    return dataArray.map(item => {
        return Object.keys(item).reduce((newItem, key) => {
            if (!keysToRemove.includes(key as keyof T)) {
                newItem[key] = item[key];
            }
            return newItem;
        }, {} as Omit<T, typeof keysToRemove[number]>);
    });
}

function s2ab(s: string): ArrayBuffer {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}
