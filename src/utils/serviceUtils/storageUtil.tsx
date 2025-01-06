class StorageUtil {
  static getReaderConfig(key: string) {
    let readerConfig = JSON.parse(localStorage.getItem("readerConfig")!) || {};
    return readerConfig[key];
  }

  static setReaderConfig(key: string, value: string) {
    let readerConfig = JSON.parse(localStorage.getItem("readerConfig")!) || {};
    readerConfig[key] = value;
    localStorage.setItem("readerConfig", JSON.stringify(readerConfig));
  }

  static setReaderConfigNumber(key: string, value: number) {
    let readerConfig = JSON.parse(localStorage.getItem("readerConfig")!) || {};
    readerConfig[key] = value;
    localStorage.setItem("readerConfig", JSON.stringify(readerConfig));
  }
  
  static resetReaderConfig(key: string) {
    let readerConfig = JSON.parse(localStorage.getItem("readerConfig")!) || {};
    readerConfig[key] = null;
    localStorage.setItem("readerConfig", JSON.stringify(readerConfig));
  }

  static defaultReaderConfig() {
    // TODO ADIB : Comment reset les couleurs ?
    // this.setReaderConfig("highlightLines", "resetStyles")
    // this.setReaderConfig("highlightLines", "resetStyles")
    
    this.setReaderConfig("readerMode", "single");
    this.setReaderConfigNumber("fontSize", 15)
    this.setReaderConfig("fontFamily", "Arial")
    this.setReaderConfigNumber("lineHeight", 1.5)
    this.setReaderConfig("textAlign", "Left")
    this.setReaderConfigNumber("wordSpacing", 0)
    this.setReaderConfigNumber("letterSpacing", 0)
    this.setReaderConfigNumber("margin", 0)
    this.setReaderConfigNumber("scale", 1.5)
  }

}

export default StorageUtil;
