import BookModel from "../../models/Book";
export function handleEditDialog(mode: boolean) {
  return { type: "HANDLE_EDIT_DIALOG", payload: mode };
}
export function handleDeleteDialog(mode: boolean) {
  return { type: "HANDLE_DELETE_DIALOG", payload: mode };
}
export function handleAddDialog(mode: boolean) {
  return { type: "HANDLE_ADD_DIALOG", payload: mode };
}
export function handleRenderBookFunc(renderBookFunc: () => void) {
  return { type: "HANDLE_RENDER_BOOK_FUNC", payload: renderBookFunc };
}
export function handleRenderBookWithLinesColoredFunc(renderBookWithLineColorsFunc: () => void) {
  return { type: "HANDLE_RENDER_BOOK_WITH_LINES_COLORED", payload: renderBookWithLineColorsFunc };
}

export function handleRenderNoteFunc(renderNoteFunc: () => void) {
  return { type: "HANDLE_RENDER_NOTE_FUNC", payload: renderNoteFunc };
}
export function handleActionDialog(mode: boolean) {
  return { type: "HANDLE_ACTION_DIALOG", payload: mode };
}
export function handleReadingState(state: boolean) {
  return { type: "HANDLE_READING_STATE", payload: state };
}

export function handleReadingStatus(status: boolean) {
  return { type: "HANDLE_READING_STATUS", payload: status };
}

export function handleReadingBook(book: BookModel) {
  return { type: "HANDLE_READING_BOOK", payload: book };
}
export function handleDragItem(key: string) {
  return { type: "HANDLE_DRAG_ITEM", payload: key };
}
