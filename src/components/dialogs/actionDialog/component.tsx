import React from "react";
import "./actionDialog.css";
import { Trans } from "react-i18next";
import { ActionDialogProps, ActionDialogState } from "./interface";
import AddTrash from "../../../utils/readUtils/addTrash";

import toast from "react-hot-toast";
import AddFavorite from "../../../utils/readUtils/addFavorite";
import MoreAction from "../moreAction";
class ActionDialog extends React.Component<
  ActionDialogProps,
  ActionDialogState
> {
  constructor(props: ActionDialogProps) {
    super(props);
    this.state = {
      isShowExport: false,
      isShowDetail: false,
      isExceed: false,
    };
  }
  handleDeleteBook = () => {
    this.props.handleReadingBook(this.props.currentBook);
    this.props.handleDeleteDialog(true);
    this.props.handleActionDialog(false);
  };
  handleEditBook = () => {
    this.props.handleEditDialog(true);
    this.props.handleReadingBook(this.props.currentBook);
    this.props.handleActionDialog(false);
  };
  handleDetailBook = () => {
    this.props.handleDetailDialog(true);
    this.props.handleReadingBook(this.props.currentBook);
    this.props.handleActionDialog(false);
  };
  handleAddShelf = () => {
    this.props.handleAddDialog(true);
    this.props.handleReadingBook(this.props.currentBook);
    this.props.handleActionDialog(false);
  };
  handleRestoreBook = () => {
    AddTrash.clear(this.props.currentBook.key);
    this.props.handleActionDialog(false);
    toast.success(this.props.t("Restore successful"));
    this.props.handleFetchBooks();
  };
  handleLoveBook = () => {
    AddFavorite.setFavorite(this.props.currentBook.key);
    toast.success(this.props.t("Addition successful"));
    this.props.handleActionDialog(false);
  };
  handleMultiSelect = () => {
    this.props.handleSelectBook(true);
    this.props.handleSelectedBooks([this.props.currentBook.key]);
    this.props.handleActionDialog(false);
  };
  handleCancelLoveBook = () => {
    AddFavorite.clear(this.props.currentBook.key);
    if (
      Object.keys(AddFavorite.getAllFavorite()).length === 0 &&
      this.props.mode === "favorite"
    ) {
      this.props.history.push("/manager/empty");
    }
    toast.success(this.props.t("Cancellation successful"));
    this.props.handleActionDialog(false);
    this.props.handleFetchBooks();
  };
  handleMoreAction = (isShow: boolean) => {
    this.setState({ isShowExport: isShow });
  };
  render() {
    const moreActionProps = {
      left: this.props.left,
      top: this.props.top,
      isShowExport: this.state.isShowExport,
      isExceed: this.state.isExceed,
      handleMoreAction: this.handleMoreAction,
    };
    if (this.props.mode === "trash") {
      return (
        <div
          className="action-dialog-container"
          onMouseLeave={() => {
            this.props.handleActionDialog(false);
          }}
          onMouseEnter={() => {
            this.props.handleActionDialog(true);
          }}
          style={{
            left: this.props.left,
            top: this.props.top,
          }}
        >
          <div className="action-dialog-actions-container">
            <div
              className="action-dialog-add"
              onClick={() => {
                this.handleRestoreBook();
              }}
            >
              <span className="icon-clockwise view-icon"></span>
              <span className="action-name">
                <Trans>Restore</Trans>
              </span>
            </div>
          </div>
        </div>
      );
    }
    return (
      <>
        <div
          className="action-dialog-container"
          onMouseLeave={() => {
            this.props.handleActionDialog(false);
          }}
          onMouseEnter={() => {
            this.props.handleActionDialog(true);
          }}
          style={{ left: this.props.left, top: this.props.top }}
        >
          <div className="action-dialog-actions-container">
            <div
              className="action-dialog-add"
              onClick={() => {
                if (
                  AddFavorite.getAllFavorite().indexOf(
                    this.props.currentBook.key
                  ) > -1
                ) {
                  this.handleCancelLoveBook();
                } else {
                  this.handleLoveBook();
                }
              }}
            >
              <span className="icon-heart view-icon"></span>
              <p className="action-name">
                {AddFavorite.getAllFavorite().indexOf(
                  this.props.currentBook.key
                ) > -1 ? (
                  <Trans>Remove from favorite</Trans>
                ) : (
                  <Trans>Add to favorite</Trans>
                )}
              </p>
            </div>
            <div
              className="action-dialog-add"
              onClick={() => {
                this.handleMultiSelect();
              }}
            >
              <span className="icon-select view-icon"></span>
              <p className="action-name">
                <Trans>Multiple selection</Trans>
              </p>
            </div>
            <div
              className="action-dialog-delete"
              onClick={() => {
                this.handleDeleteBook();
              }}
            >
              <span className="icon-trash-line view-icon"></span>
              <p className="action-name">
                <Trans>Delete</Trans>
              </p>
            </div>
            <div
              className="action-dialog-edit"
              onClick={() => {
                this.handleDetailBook();
              }}
            >
              <span
                className="icon-idea-line view-icon"
                style={{ fontSize: "17px" }}
              ></span>
              <p className="action-name" style={{ marginLeft: "12px" }}>
                <Trans>Details</Trans>
              </p>
            </div>

          </div>
        </div>
        <MoreAction {...moreActionProps} />
      </>
    );
  }
}

export default ActionDialog;
