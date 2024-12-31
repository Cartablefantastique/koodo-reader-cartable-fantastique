import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import ThemeList from "./component";
import { stateType } from "../../../store";
import { handleReadingStatus } from "../../../store/actions";
const mapStateToProps = (state: stateType) => {
  return {
    renderBookFunc: state.book.renderBookFunc,
    renderBookWithLineColors: state.book.renderBookWithLineColorsFunc,
    status: state.book.status,

  };
};
const actionCreator = { handleReadingStatus };
export default connect(
  mapStateToProps,
  actionCreator
)(withTranslation()(ThemeList as any) as any);
