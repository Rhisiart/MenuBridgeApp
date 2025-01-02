export const convertParamsToNumber = (obj: Object, key: string) => {
    const entry = Object.entries(obj).find(k => k[0] === key);

    if(entry && typeof entry[1] === "string" && !isNaN(Number(entry[1]))) {
        return Number(entry[1]);
    }

    return undefined;
}

export const isRecordEmpty = (record: Record<any, any>) => {
    return Object.keys(record).length === 0;
}