class LocalStorage {
  private _killedMobs: number | null = null;

  get killedMobs(): number {
    return this._killedMobs ?? 0;
  }

  set killedMobs(value: number) {
    this._killedMobs = value;
    localStorage.setItem('killedMobs', value.toString());
  }

  private _allVisible = false;

  get allVisible(): boolean {
    return this._allVisible;
  }

  set allVisible(value: boolean) {
    this._allVisible = value;
  }
}

const ls = new LocalStorage();

export default ls;
