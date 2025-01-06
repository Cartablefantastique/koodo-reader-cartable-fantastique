export interface IconChoiceListProps {
  t: (title: string) => string;
  renderBookFunc: () => void;
  renderBookWithLineColorsFunc: () => void;
  handleChangeReadingRate: (readingRate: number) => void;
  readingRate: number,
}
export interface IconChoiceListState {
  // currentFontFamilyIndex: number;
  // currentLineHeightIndex: number;
  // currentTextAlignIndex: number;
  // chineseConversionIndex: number;
}
