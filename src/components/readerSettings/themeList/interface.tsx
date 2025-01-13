export interface ThemeListProps {
  t: (title: string) => string;
  renderBookFunc: () => void;
  renderBookWithLineColors: () => void
  stopBookReading: (isBookReading: boolean) => void
  startBookReading: (isBookReading: boolean) => void
  isBookReading: boolean,
}

export interface ThemeListState {
  currentBackgroundIndex: number;
  currentTextIndex: number;
  isShowTextPicker: boolean;
  isShowBgPicker: boolean;
  isButtonClicked: boolean;
}
