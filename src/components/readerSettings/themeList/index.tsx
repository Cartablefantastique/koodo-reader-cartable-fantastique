import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import ThemeList from "./component";
import { stateType } from "../../../store";

const mapStateToProps = (state: stateType) => {
  return {
    renderBookFunc: state.book.renderBookFunc,
    renderBookWithLineColors: state.book.renderBookWithLineColorsFunc

  };
};
const actionCreator = {};
export default connect(
  mapStateToProps,
  actionCreator
)(withTranslation()(ThemeList as any) as any);
