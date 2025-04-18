import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import IconChoiceList from "./component";
import { stateType } from "../../../store";
import { handleChangeLanguage, handleChangeReadingRate } from "../../../store/actions";

const mapStateToProps = (state: stateType) => {
  return {
    renderBookFunc: state.book.renderBookFunc,
    renderBookWithLineColorsFunc: state.book.renderBookWithLineColorsFunc,
    readingRate: state.book.readingRate,
    langSpeaking: state.book.langSpeaking
  };
};
const actionCreator = { handleChangeReadingRate, handleChangeLanguage };
export default connect(
  mapStateToProps,
  actionCreator
)(withTranslation()(IconChoiceList as any) as any);
