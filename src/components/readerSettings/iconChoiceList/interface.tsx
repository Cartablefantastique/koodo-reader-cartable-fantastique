export interface IconChoiceListProps {
  t: (title: string) => string;
  renderBookFunc: () => void;
  renderBookWithLineColorsFunc: () => void;
  handleChangeReadingRate: (readingRate: number) => void;
  handleChangeLanguage: (langSpeaking: string) => void;
  readingRate: number,
  langSpeaking: string
}
export interface IconChoiceListState {
  // currentFontFamilyIndex: number;
  // currentLineHeightIndex: number;
  // currentTextAlignIndex: number;
  // chineseConversionIndex: number;

}
