function implementsClass(obj: any, cls: any): boolean {
  if (!obj) {
    return false;
  }
  return Object.getOwnPropertyNames(cls).every(x => { obj.keys().includes(x) })
}
