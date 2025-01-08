import { connect } from "react-redux";
import {
  handleActionDialog,
  handleReadingState,
  handleBookPlayingVoice,
  handleChangeReadingRate,
  handleReadingBook,
  handleHtmlBook,
  handleRenderBookFunc,
  handleRenderBookWithLinesColoredFunc,
  handleFetchBooks,
  handleMenuMode,
  handleNoteKey,
  handleOpenMenu,
  handleCurrentChapter,
  handleCurrentChapterIndex,
  handleFetchNotes,
  handleFetchBookmarks,
  handlePercentage,
  handleFetchPercentage,
  handleChangeLanguage,

} from "../../store/actions";
import Viewer from "./component";
import { stateType } from "../../store";
import { withTranslation } from "react-i18next";

const mapStateToProps = (state: stateType) => {
  return {
    isOpenActionDialog: state.book.isOpenActionDialog,
    currentBook: state.book.currentBook,
    isReading: state.book.isReading,
    myPauseProperty: state.book.myPauseProperty,
    readingRate: state.book.readingRate,
    langSpeaking: state.book.langSpeaking,
    renderNoteFunc: state.book.renderNoteFunc,
    htmlBook: state.reader.htmlBook,
    isOpenMenu: state.viewArea.isOpenMenu,
    books: state.manager.books,
    notes: state.reader.notes,
    menuMode: state.viewArea.menuMode,
  };
};
const actionCreator = {
  handleReadingState,
  handleBookPlayingVoice,
  handleChangeReadingRate,
  handleChangeLanguage,
  handleReadingBook,
  handleActionDialog,
  handleHtmlBook,
  handleRenderBookFunc,
  handleRenderBookWithLinesColoredFunc,
  handleFetchBooks,
  handleOpenMenu,
  handleCurrentChapter,
  handleNoteKey,
  handleCurrentChapterIndex,
  handleFetchNotes,
  handleFetchBookmarks,
  handleFetchPercentage,
  handlePercentage,
  handleMenuMode,
};
export default connect(
  mapStateToProps,
  actionCreator
)(withTranslation()(Viewer as any) as any);
