export const storageGet = (key: string) => {
    try {
        const data = localStorage.getItem(key);
        if(!data) return;
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
    }

}

export const storageSet = (key: string, data: any) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error(error);
    }
}
