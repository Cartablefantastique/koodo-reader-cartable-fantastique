import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import ThemeList from "./component";
import { stateType } from "../../../store";
import { startBookReading, stopBookReading } from "../../../store/actions";
const mapStateToProps = (state: stateType) => {
  return {
    renderBookFunc: state.book.renderBookFunc,
    renderBookWithLineColors: state.book.renderBookWithLineColorsFunc,
    isBookReading: state.book.isBookReading,

  };
};
const actionCreator = { stopBookReading, startBookReading };
export default connect(
  mapStateToProps,
  actionCreator
)(withTranslation()(ThemeList as any) as any);
