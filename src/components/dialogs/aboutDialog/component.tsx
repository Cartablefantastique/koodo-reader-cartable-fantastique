import React from "react";
import { Trans } from "react-i18next";
import { AboutDialogProps, AboutDialogState } from "./interface";
import { openExternalUrl } from "../../../utils/serviceUtils/urlUtil";
import "./aboutDialog.css";

class AboutDialog extends React.Component<AboutDialogProps, AboutDialogState> {
  constructor(props: AboutDialogProps) {
    super(props);
    this.state = {
      isShowExportAll: false,
    };
  }
  handleJump = (url: string) => {
    openExternalUrl(url);
    this.props.handleAbout(false);
  };

  render() {
    return (
      <>
        <div
          className="sort-dialog-container"
          onMouseLeave={() => {
            this.props.handleAbout(false);
          }}
          onMouseEnter={() => {
            this.props.handleAbout(true);
          }}
        >
          <ul className="sort-by-category">
            <li
              className="sort-by-category-list"
              onClick={() => {
                this.props.handleSetting(true);
                this.props.handleAbout(false);
              }}
            >
              <Trans>Setting</Trans>
            </li>
          </ul>
        </div>
      </>
    );
  }
}

export default AboutDialog;
