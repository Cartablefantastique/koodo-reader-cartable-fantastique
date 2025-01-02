export interface ThemeListProps {
  t: (title: string) => string;
  renderBookFunc: () => void;
  renderBookWithLineColors: () => void
  handleBookPlayingVoice: (myPauseProperty: boolean) => void
  myPauseProperty: boolean,
}

export interface ThemeListState {
  currentBackgroundIndex: number;
  currentTextIndex: number;
  isShowTextPicker: boolean;
  isShowBgPicker: boolean;
  isButtonClicked: boolean;
}
