const initState = {
  isOpenEditDialog: false,
  isOpenDeleteDialog: false,
  isOpenAddDialog: false,
  isOpenActionDialog: false,
  isReading: false,
  isBookReading: false,
  readingRate: 0,
  langSpeaking: "",
  dragItem: "",
  currentBook: {},
  renderBookFunc: () => { },
  renderNoteFunc: () => { },
  renderBookWithLineColorsFunc: () => { }


};
export function book(
  state = initState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case "HANDLE_EDIT_DIALOG":
      return {
        ...state,
        isOpenEditDialog: action.payload,
      };
    case "HANDLE_DELETE_DIALOG":
      return {
        ...state,
        isOpenDeleteDialog: action.payload,
      };
    case "HANDLE_RENDER_BOOK_FUNC":
      return {
        ...state,
        renderBookFunc: action.payload,
      };
    case "HANDLE_RENDER_BOOK_WITH_LINES_COLORED":
      return {
        ...state,
        renderBookWithLineColorsFunc: action.payload
      }

    case "HANDLE_RENDER_NOTE_FUNC":
      return {
        ...state,
        renderNoteFunc: action.payload,
      };
    case "HANDLE_ADD_DIALOG":
      return {
        ...state,
        isOpenAddDialog: action.payload,
      };
    case "HANDLE_ACTION_DIALOG":
      return {
        ...state,
        isOpenActionDialog: action.payload,
      };
    case "HANDLE_READING_STATE":
      return {
        ...state,
        isReading: action.payload,
      };
    case "STOP_BOOK_READING":
      return {
        ...state,
        isBookReading: action.payload
      }
    case "START_BOOK_READING":
      return {
        ...state,
        isBookReading: action.payload
      }
    case "HANDLE_CHANGE_READING_RATE":
      return {
        ...state,
        readingRate: action.payload
      }
    case "HANDLE_CHANGE_LANGUAGE_SPEAKING":
      return {
        ...state,
        langSpeaking: action.payload
      }
    case "HANDLE_READING_BOOK":
      return {
        ...state,
        currentBook: action.payload,
      };
    case "HANDLE_DRAG_ITEM":
      return {
        ...state,
        dragItem: action.payload,
      };
    case "HANDLE_REDIRECT":
      return {
        ...state,
        isRedirect: true,
      };
    default:
      return state;
  }
}
