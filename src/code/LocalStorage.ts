class LocalStorage {
  private _killedMobs: number | null = null;

  get killedMobs(): number {
    return this._killedMobs ?? 0;
  }

  set killedMobs(value: number) {
    this._killedMobs = value;
    localStorage.setItem('killedMobs', value.toString());
  }

  private _allVisible = true;

  get allVisible(): boolean {
    return this._allVisible;
  }

  set allVisible(value: boolean) {
    this._allVisible = value;
  }

  private _level = 1;
  get level(): number {
    return this._level;
  }
  set level(value: number) {
    this._level = value;
  }
}

const ls = new LocalStorage();

export default ls;
