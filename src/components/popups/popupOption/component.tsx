import React from "react";
import "./popupOption.css";

import Note from "../../../models/Note";
import { PopupOptionProps } from "./interface";
import ColorOption from "../../colorOption";
import RecordLocation from "../../../utils/readUtils/recordLocation";

import { popupList } from "../../../constants/popupList";
import StorageUtil from "../../../utils/serviceUtils/storageUtil";
import toast from "react-hot-toast";
import { getSelection } from "../../../utils/serviceUtils/mouseEvent";
import copy from "copy-text-to-clipboard";
import { getHightlightCoords } from "../../../utils/fileUtils/pdfUtil";
import { getIframeDoc } from "../../../utils/serviceUtils/docUtil";
import { openExternalUrl } from "../../../utils/serviceUtils/urlUtil";
import { isElectron } from "react-device-detect";
import { createOneNote } from "../../../utils/serviceUtils/noteUtil";
import { stopSpeak, underlinesWords } from "../../../utils/readUtils/handleSpeak";

declare var window: any;
let originalReadingELement: HTMLElement | null = null; // Élément actuellement en lecture
let originalReadingHTML: string | null = null; // HTML original de l'élément actuellement lu
// let cancelReading = false; // Indique si une lecture doit être annulé
class PopupOption extends React.Component<PopupOptionProps> {


  handleNote = () => {
    // this.props.handleChangeDirection(false);
    this.props.handleMenuMode("note");
  };
  handleCopy = () => {
    let text = getSelection();
    if (!text) return;
    copy(text);
    this.props.handleOpenMenu(false);
    let doc = getIframeDoc();
    if (!doc) return;
    doc.getSelection()?.empty();
    toast.success(this.props.t("Copying successful"));
  };
  handleTrans = () => {
    if (!isElectron) {
      toast(
        this.props.t(
          "Cartable Fantastique Reader's web version are limited by the browser, for more powerful features, please download the desktop version."
        )
      );
      return;
    }
    this.props.handleMenuMode("trans");
    this.props.handleOriginalText(getSelection() || "");
  };
  handleDict = () => {
    if (!isElectron) {
      toast(
        this.props.t(
          "Cartable Fantastique Reader's web version are limited by the browser, for more powerful features, please download the desktop version."
        )
      );
      return;
    }
    this.props.handleMenuMode("dict");
    this.props.handleOriginalText(getSelection() || "");
  };
  handleDigest = () => {
    let bookKey = this.props.currentBook.key;
    let cfi = "";
    if (this.props.currentBook.format === "PDF") {
      cfi = JSON.stringify(
        RecordLocation.getPDFLocation(this.props.currentBook.md5.split("-")[0])
      );
    } else {
      cfi = JSON.stringify(
        RecordLocation.getHtmlLocation(this.props.currentBook.key)
      );
    }
    let percentage = RecordLocation.getHtmlLocation(this.props.currentBook.key)
      .percentage
      ? RecordLocation.getHtmlLocation(this.props.currentBook.key).percentage
      : 0;
    let color = this.props.color;
    let notes = "";
    let pageArea = document.getElementById("page-area");
    if (!pageArea) return;
    let iframe = pageArea.getElementsByTagName("iframe")[0];
    if (!iframe) return;
    let doc = getIframeDoc();
    if (!doc) return;
    let charRange;
    if (this.props.currentBook.format !== "PDF") {
      charRange = window.rangy
        .getSelection(iframe)
        .saveCharacterRanges(doc.body)[0];
    }
    let range =
      this.props.currentBook.format === "PDF"
        ? JSON.stringify(getHightlightCoords())
        : JSON.stringify(charRange);
    let text = doc.getSelection()?.toString();
    if (!text) return;
    text = text.replace(/\s\s/g, "");
    text = text.replace(/\r/g, "");
    text = text.replace(/\n/g, "");
    text = text.replace(/\t/g, "");
    text = text.replace(/\f/g, "");
    let digest = new Note(
      bookKey,
      this.props.chapter,
      this.props.chapterDocIndex,
      text,
      cfi,
      range,
      notes,
      percentage,
      color,
      []
    );
    let noteArr = this.props.notes;
    noteArr.push(digest);
    window.localforage.setItem("notes", noteArr).then(() => {
      this.props.handleOpenMenu(false);
      toast.success(this.props.t("Addition successful"));
      this.props.handleFetchNotes();
      this.props.handleMenuMode("");
      createOneNote(
        digest,
        this.props.currentBook.format,
        this.handleNoteClick
      );
    });
  };

  handleNoteClick = (event: Event) => {
    this.props.handleNoteKey((event.target as any).dataset.key);
    this.props.handleMenuMode("note");
    this.props.handleOpenMenu(true);
  };
  handleJump = (url: string) => {
    openExternalUrl(url);
  };
  handleSearchInternet = () => {
    switch (StorageUtil.getReaderConfig("searchEngine")) {
      case "google":
        this.handleJump("https://www.google.com/search?q=" + getSelection());
        break;
      case "baidu":
        this.handleJump("https://www.baidu.com/s?wd=" + getSelection());
        break;
      case "bing":
        this.handleJump("https://www.bing.com/search?q=" + getSelection());
        break;
      case "duckduckgo":
        this.handleJump("https://duckduckgo.com/?q=" + getSelection());
        break;
      case "yandex":
        this.handleJump("https://yandex.com/search/?text=" + getSelection());
        break;
      case "yahoo":
        this.handleJump("https://search.yahoo.com/search?p=" + getSelection());
        break;
      case "naver":
        this.handleJump(
          "https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=" +
          getSelection()
        );
        break;
      case "baike":
        this.handleJump("https://baike.baidu.com/item/" + getSelection());
        break;
      case "wiki":
        this.handleJump("https://en.wikipedia.org/wiki/" + getSelection());
        break;
      default:
        this.handleJump(
          navigator.language === "zh-CN"
            ? "https://www.baidu.com/s?wd=" + getSelection()
            : "https://www.google.com/search?q=" + getSelection()
        );
        break;
    }
  };
  handleSearchBook = () => {
    let leftPanel = document.querySelector(".left-panel");
    const clickEvent = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    if (!leftPanel) return;
    leftPanel.dispatchEvent(clickEvent);
    const focusEvent = new MouseEvent("focus", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    let searchBox: any = document.querySelector(".header-search-box");
    searchBox.dispatchEvent(focusEvent);
    let searchIcon = document.querySelector(".header-search-icon");
    searchIcon?.dispatchEvent(clickEvent);
    searchBox.value = getSelection() || "";
    const keyEvent: any = new KeyboardEvent("keydown", {
      bubbles: true,
      cancelable: true,
      keyCode: 13,
    } as any);
    searchBox.dispatchEvent(keyEvent);
    this.props.handleOpenMenu(false);
  };


  handleSpeak1 = () => {
    var msg = new SpeechSynthesisUtterance();
    msg.lang = 'fr-FR';
    msg.text = getSelection() || "";
    console.log(getSelection())
    if (window.speechSynthesis && window.speechSynthesis.getVoices) {
      msg.voice = window.speechSynthesis.getVoices()[6];
      msg.rate = 1;
      window.speechSynthesis.speak(msg);
    }
  };
  handleSpeak = async (continueSpeaking = true, color = "yellow") => {
    if (!continueSpeaking) {
      stopSpeak();
      return;
    }


    const doc = getIframeDoc(); // Récupère le document de l'iframe
    if (!doc) {
      alert("Document de l'iframe introuvable.");
      return;
    }
    if (!doc.defaultView) {
      console.error("Le contexte de l'iframe (defaultView) est introuvable.");
      return;
    }


    const selection = doc.getSelection();
    if (!selection || selection.rangeCount === 0) {
      alert("Veuillez sélectionner un texte à lire.");
      return;
    }


    const range = selection.getRangeAt(0); // Récupère la plage de la sélection
    const container = range.commonAncestorContainer; // Conteneur de la sélection


    console.log("container : ", container);


    const element = container.nodeType === Node.ELEMENT_NODE
      ? container
      : container.parentNode;


    if (!element || !(element instanceof doc.defaultView.HTMLElement)) {
      console.log("Impossible d'accéder à l'élément contenant le texte sélectionné.");
      return;
    }


    // Si une lecture est déjà en cours, annulez-la
    if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
      const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
      console.log("Annulation de la lecture en cours...");
      // cancelReading = true; // Indique que la lecture en cours doit être annulée
      window.speechSynthesis.cancel(); // Arrête la synthèse vocale


      // Restaure l'état précédent si nécessaire
      if (originalReadingELement && originalReadingHTML) {
        originalReadingELement.innerHTML = originalReadingHTML;
      }
      await delay(500);
    }


    // Réinitialise le drapeau d'annulation
    // cancelReading = false;

    const text = selection.toString(); // Texte sélectionné
    if (element) {
      underlinesWords(text, element, "yellow");
    }
  };


  handleMultiBlockSpeak = (elements: HTMLElement[]) => {
    elements.forEach((element) => {
      const text = element.textContent || "";
      const words = text.split(" ");
      const chunkSize = 20;
      const chunks: string[] = [];
      const punctuationRegex = /[.,;:!?]/;

      let currentChunk: string[] = [];
      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        currentChunk.push(word);
        if (
          currentChunk.length >= chunkSize ||
          (punctuationRegex.test(word) && currentChunk.length > 1)
        ) {
          chunks.push(currentChunk.join(" "));
          currentChunk = [];
        }
      }
      if (currentChunk.length > 0) {
        chunks.push(currentChunk.join(" "));
      }

      let currentChunkNumber = 0;
      let wordIndex = 0;
      let lastChunkSize = 0;

      const readChunks = () => {
        if (currentChunkNumber < chunks.length) {
          const chunk = chunks[currentChunkNumber].split(" ");
          const msg = new SpeechSynthesisUtterance(chunks[currentChunkNumber]);
          msg.lang = "fr-FR";
          msg.rate = 1;

          const readWordsInChunk = () => {
            if (wordIndex < chunk.length) {
              const highlightedText = text
                .split(" ")
                .map((word, index) =>
                  index === wordIndex + lastChunkSize
                    ? `<strong style="text-decoration: underline;">${word}</strong>`
                    : word
                )
                .join(" ");
              element.innerHTML = highlightedText;
              wordIndex++;
              setTimeout(readWordsInChunk, 250);
            } else {
              lastChunkSize += chunk.length;
              wordIndex = 0;
            }
          };

          msg.onend = () => {
            currentChunkNumber++;
            setTimeout(readChunks, 250);
          };

          window.speechSynthesis.speak(msg);
          readWordsInChunk();
        } else {
          element.innerHTML = element.textContent || ""; // Restaurer le texte original
        }
      };

      readChunks();
    });
  };




  render() {
    const PopupProps = {
      handleDigest: this.handleDigest,
    };
    const renderMenuList = () => {
      return (
        <>
          <div className="menu-list">
            {popupList.map((item, index) => {
              return (
                <div
                  key={item.name}
                  className={item.name + "-option"}
                  onClick={() => {
                    switch (index) {
                      case 0:
                        this.handleNote();
                        break;
                      case 1:
                        this.handleDigest();
                        break;
                      case 2:
                        this.handleTrans();
                        break;
                      case 3:
                        this.handleCopy();
                        break;
                      case 4:
                        this.handleSearchBook();
                        break;
                      case 5:
                        this.handleDict();
                        break;
                      // case 6:
                      //   this.handleSearchInternet();
                      //   break;
                      case 6:
                        this.handleSpeak();
                        break;
                      case 7:
                        this.handleSpeak(true, "lightgrey");
                        break;
                      case 8:
                        this.handleSpeak(false);
                        break;
                      default:
                        break;
                    }
                  }}
                >
                  <span
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={this.props.t(item.title)}
                  >
                    <span
                      className={`icon-${item.icon} ${item.name}-icon`}
                    ></span>
                  </span>
                </div>
              );
            })}
          </div>
          <ColorOption {...PopupProps} />
        </>
      );
    };
    return renderMenuList();
  }
}

export default PopupOption;
