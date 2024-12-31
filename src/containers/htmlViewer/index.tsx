import { connect } from "react-redux";
import {
  handleActionDialog,
  handleReadingState,
  handleReadingStatus,
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

} from "../../store/actions";
import Viewer from "./component";
import { stateType } from "../../store";
import { withTranslation } from "react-i18next";

const mapStateToProps = (state: stateType) => {
  return {
    isOpenActionDialog: state.book.isOpenActionDialog,
    currentBook: state.book.currentBook,
    isReading: state.book.isReading,
    status: state.book.status,
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
  handleReadingStatus,
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
