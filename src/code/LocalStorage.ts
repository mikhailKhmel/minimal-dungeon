class LocalStorage {
    private _killedMobs: number | null =  null;
    set killedMobs(value: number) {
        this._killedMobs = value;
        localStorage.setItem('killedMobs', value.toString());
    }
    get killedMobs(): number {
        return this._killedMobs ?? 0;
    }

    
}
const ls = new LocalStorage();

export default ls;