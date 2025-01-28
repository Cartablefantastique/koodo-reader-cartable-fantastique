import React from "react";
import AddFavorite from "../../utils/readUtils/addFavorite";
import BookModel from "../../models/Book";
import "./selectBook.css";
import { Trans } from "react-i18next";
import { BookListProps, BookListState } from "./interface";
import { withRouter } from "react-router-dom";
import toast from "react-hot-toast";
import ShelfUtil from "../../utils/readUtils/shelfUtil";
import StorageUtil from "../../utils/serviceUtils/storageUtil";
class SelectBook extends React.Component<BookListProps, BookListState> {
  constructor(props: BookListProps) {
    super(props);
    this.state = {
      isOpenDelete: false,
      isShowExport: false,
      favoriteBooks: Object.keys(AddFavorite.getAllFavorite()).length,
    };
  }
  handleFilterShelfBook = (items: BookModel[]) => {
    if (this.props.shelfIndex > 0) {
      if (this.props.shelfIndex < 1) return items;
      let shelfTitle = Object.keys(ShelfUtil.getShelf());
      let currentShelfTitle = shelfTitle[this.props.shelfIndex];
      if (!currentShelfTitle) return items;
      let currentShelfList = ShelfUtil.getShelf()[currentShelfTitle];
      let shelfItems = items.filter((item: BookModel) => {
        return currentShelfList.indexOf(item.key) > -1;
      });
      return shelfItems;
    } else {
      if (StorageUtil.getReaderConfig("isHideShelfBook") === "yes") {
        return items.filter((item) => {
          return ShelfUtil.getBookPosition(item.key).length === 0;
        });
      }
      return items;
    }
  };
  handleShelf(items: any, index: number) {
    if (index < 1) return items;
    let shelfTitle = Object.keys(ShelfUtil.getShelf());
    let currentShelfTitle = shelfTitle[index];
    if (!currentShelfTitle) return items;
    let currentShelfList = ShelfUtil.getShelf()[currentShelfTitle];
    let shelfItems = items.filter((item: { key: number }) => {
      return currentShelfList.indexOf(item.key) > -1;
    });
    return shelfItems;
  }
  render() {
    return (
      <div
        className="booklist-manage-container"
        style={this.props.isCollapsed ? { left: "75px" } : {}}
      >
        {this.props.isSelectBook && (
          <>
            <span
              onClick={() => {
                this.props.handleSelectBook(!this.props.isSelectBook);
                if (this.props.isSelectBook) {
                  this.props.handleSelectedBooks([]);
                }
              }}
              className="book-manage-title"
              style={{ color: "rgb(231, 69, 69)" }}
            >
              <Trans>Cancel</Trans>
            </span>
            <span
              className="book-manage-title"
              onClick={() => {
                if (
                  this.props.books.filter(
                    (item: BookModel) =>
                      this.props.selectedBooks.indexOf(item.key) > -1
                  ).length > 0
                ) {
                  AddFavorite.setFavorites(
                    this.props.books.filter(
                      (item: BookModel) =>
                        this.props.selectedBooks.indexOf(item.key) > -1
                    )
                  );
                  this.props.handleSelectBook(!this.props.isSelectBook);
                  if (this.props.isSelectBook) {
                    this.props.handleSelectedBooks([]);
                  }
                  toast.success(this.props.t("Add successful"));
                } else {
                  toast(this.props.t("Nothing to add"));
                }
              }}
            >
              <Trans>Add to favorite</Trans>
            </span>
            <span
              className="book-manage-title"
              onClick={() => {
                this.props.handleDeleteDialog(true);
              }}
            >
              <Trans>Delete</Trans>
            </span>

            <span
              className="book-manage-title select-book-action"
              onClick={() => {
                if (
                  this.props.selectedBooks.length ===
                  this.handleFilterShelfBook(this.props.books).length
                ) {
                  this.props.handleSelectedBooks([]);
                } else {
                  this.props.handleSelectedBooks(
                    this.handleFilterShelfBook(this.props.books).map(
                      (item) => item.key
                    )
                  );
                }
              }}
            >
              {this.props.selectedBooks.length ===
              this.handleFilterShelfBook(this.props.books).length ? (
                <Trans>Deselect all</Trans>
              ) : (
                <Trans>Select all</Trans>
              )}
            </span>
          </>
        )}
      </div>
    );
  }
}

export default withRouter(SelectBook as any);
