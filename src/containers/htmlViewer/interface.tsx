import Book from "../../models/Book";
import HtmlBook from "../../models/HtmlBook";
import Note from "../../models/Note";

export interface ViewerProps {
  book: Book;
  rendition: any;
  currentBook: Book;
  books: Book[];
  menuMode: string;
  notes: Note[];
  isReading: boolean;
  isBookReading: boolean,
  readingRate: number,
  langSpeaking: string,
  mode: string;
  htmlBook: HtmlBook;
  isShow: boolean;
  isOpenMenu: boolean;
  handleRenderBookFunc: (renderBookFunc: () => void) => void;
  handleRenderBookWithLinesColoredFunc: (renderBookWithLineColorsFunc: () => void) => void;
  renderNoteFunc: () => void;
  t: (title: string) => string;
  handleReadingState: (isReading: boolean) => void;
  stopBookReading: (isBookReading: boolean) => void;
  startBookReading: (isBookReading: boolean) => void;
  handleChangeLanguage: (langSpeaking: string) => void;
  handleReadingBook: (book: Book) => void;
  handleHtmlBook: (htmlBook: HtmlBook | null) => void;
  handleLeaveReader: (position: string) => void;
  handleEnterReader: (position: string) => void;
  handleFetchBooks: () => void;
  handleFetchNotes: () => void;
  handleFetchBookmarks: () => void;
  handleNoteKey: (key: string) => void;
  handleOpenMenu: (isOpenMenu: boolean) => void;
  handleMenuMode: (menu: string) => void;
  handleCurrentChapter: (currentChapter: string) => void;
  handleCurrentChapterIndex: (currentChapterIndex: number) => void;
  handlePercentage: (percentage: number) => void;
  handleFetchPercentage: (book: Book) => void;
}
export interface ViewerState {
  key: string;
  scale: string;
  isFirst: boolean;
  isTouch: boolean;
  chapterTitle: string;
  isDisablePopup: boolean;
  margin: number;
  readerMode: string;
  chapter: string;
  pageOffset: string;
  pageWidth: string;
  chapterDocIndex: number;
  cfiRange: any;
  contents: any;
  rect: any;
  rendition: any;
  isColorChanged: boolean;
  words: string[],
  currentWordIndex: number,
  rateStored: number,
  paragraphesWords: ParagraphesWords[],
  highlightText: number,

}

export interface LineEnding {
  start: number;
  end: number;
  text: string;
}

export interface ParagraphesWords {
  paragraph: Element,
  wordParagraph: string,
  indexWord: number,
}
