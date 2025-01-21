import React from "react";
import "./iconChoiceList.css";
import { Trans } from "react-i18next";
import { iconChoiceList, IconChoiceListProps, IconChoiceListState } from "./interface";
import StorageUtil from "../../../utils/serviceUtils/storageUtil";
import BookUtil from "../../../utils/fileUtils/bookUtil";


class IconChoiceList extends React.Component<IconChoiceListProps, IconChoiceListState> {


  constructor(props: IconChoiceListProps) {
    super(props);

    this.state = ({
      currentValueFontSize: StorageUtil.getReaderConfig("fontSize"),
      currentValueWordSpacing: StorageUtil.getReaderConfig("wordSpacing"),
      currentValueFontFamily: StorageUtil.getReaderConfig("fontFamily"),
      currentValueLineHeight: StorageUtil.getReaderConfig("lineHeight"),
      currentValueLetterSpace: StorageUtil.getReaderConfig("letterSpacing"),
      currentValueTextAlign: StorageUtil.getReaderConfig("textAlign"),
      currentValueMarge: StorageUtil.getReaderConfig("margin"),
    })

  }

  componentDidMount() {
    this.loadGoogleFonts(["Arial", "Verdana"]);
  }

  loadGoogleFonts(fonts: string[]) {
    const googleFontLink = document.createElement("link");
    googleFontLink.rel = "stylesheet";
    googleFontLink.href = `https://fonts.googleapis.com/css2?family=${fonts
      .map((font) => font.replace(" ", "+"))
      .join("&family=")}&display=swap`;
    document.head.appendChild(googleFontLink);
  }

  handleView(event: any, option: string, value: string) {

    switch (option) {
      case "fontSize":
        let currentFontSize = StorageUtil.getReaderConfig(option)
        let newFontSize = currentFontSize
        if ((value === "Add" && currentFontSize < 40) || (value === "Reduce" && currentFontSize > 10)) {
          newFontSize = value === "Add" ? newFontSize + 5 : newFontSize - 5
          StorageUtil.setReaderConfig(option, newFontSize);
          this.setState({ currentValueFontSize: newFontSize });
        }
        if (newFontSize === "Add" || newFontSize === "Reduce") {
          StorageUtil.resetReaderConfig(option)
        }
        break;
      case "wordSpacing":
        let currentWordSpacing = StorageUtil.getReaderConfig(option)
        let newWordSpacing = currentWordSpacing
        if ((value === "Add" && currentWordSpacing < 20) || (value === "Reduce" && currentWordSpacing > 0)) {
          newWordSpacing = value === "Add" ? newWordSpacing + 5 : newWordSpacing - 5
          StorageUtil.setReaderConfig(option, newWordSpacing);
          this.setState({ currentValueWordSpacing: newWordSpacing })
        }
        if (newWordSpacing === "Add" || newWordSpacing === "Reduce") {
          StorageUtil.resetReaderConfig(option)
        }

        break;
      case "fontFamily":
        StorageUtil.setReaderConfig(option, value);
        this.setState({ currentValueFontFamily: value })
        document.body.style.fontFamily = value;
        console.log(`La police appliquée est : ${value}`)
        break;
      case "lineHeight":
        let currentLineHeight = StorageUtil.getReaderConfig(option)
        let newLineHeight = currentLineHeight
        if ((value === "Add" && currentLineHeight < 3) || (value === "Reduce" && currentLineHeight > 1)) {
          newLineHeight = value === "Add" ? newLineHeight += 0.5 : newLineHeight -= 0.5
          StorageUtil.setReaderConfig(option, newLineHeight);
          this.setState({ currentValueLineHeight: newLineHeight })
        }
        if (newLineHeight === "Add" || newLineHeight === "Reduce") {
          StorageUtil.resetReaderConfig(option)
        }
        break;
      case "textAlign":
        StorageUtil.setReaderConfig(option, value);
        this.setState({ currentValueTextAlign: value })
        console.log(`L'alignement appliqué est : ${value}`)
        break;
      case "letterSpacing":
        let currentLetterSpacing = StorageUtil.getReaderConfig(option)
        let newLetterSpacing = currentLetterSpacing
        if ((value === "Add" && currentLetterSpacing < 20) || (value === "Reduce" && currentLetterSpacing > 0)) {
          newLetterSpacing = value === "Add" ? newLetterSpacing + 2 : newLetterSpacing - 2
          StorageUtil.setReaderConfig(option, newLetterSpacing);
          this.setState({ currentValueLetterSpace: newLetterSpacing })
        }
        if (newLetterSpacing === "Add" || newLetterSpacing === "Reduce") {
          StorageUtil.resetReaderConfig(option)
        }
        break;
      case "margin":
        let currentMargin = StorageUtil.getReaderConfig(option)
        let newMargin = currentMargin
        if ((value === "Add" && currentMargin < 80) || (value === "Reduce" && currentMargin > 0)) {
          newMargin = value === "Add" ? newMargin + 10 : newMargin - 10
          StorageUtil.setReaderConfig(option, newMargin);
          this.setState({ currentValueMarge: newMargin })
        }
        if (newMargin === "Add" || newMargin === "Reduce") {
          StorageUtil.resetReaderConfig(option)
        }
        BookUtil.reloadBooks();
        return;

      case "readingRate":
        let currentRate = StorageUtil.getReaderConfig(option);
        let newCurrentRate = currentRate;

        if ((value === "Add" && currentRate < 8) || (value === "Reduce" && currentRate > 0)) {
          newCurrentRate = value === "Add" ? currentRate + 0.5 : currentRate - 0.5;
          StorageUtil.setReaderConfig(option, newCurrentRate)
          this.props.handleChangeReadingRate(newCurrentRate);
        }
        if (newCurrentRate === "Add" || newCurrentRate === "Reduce") {
          StorageUtil.resetReaderConfig(option)
        }
        break;

    }
    const changeColorsTriggered = StorageUtil.getReaderConfig("changeColorsTriggered") === "true";
    if (changeColorsTriggered) {
      this.props.renderBookWithLineColorsFunc();
    } else {
      this.props.renderBookFunc();
    }

  }

  render() {

    const renderValue = (title: string, value: string) => {
      const { currentValueFontSize, currentValueWordSpacing, currentValueFontFamily, currentValueLetterSpace, currentValueMarge, currentValueLineHeight, currentValueTextAlign } = this.state;
      if (title === "Font size") {
        return (
          <p className="general-setting-title">
            <Trans>{title}</Trans>  :

            <span className="itemValue">{currentValueFontSize}</span>
          </p>
        );
      } else if (title === "Font family") {
        return (
          <p className="general-setting-title">
            <Trans> {title} </Trans>  :
            <span className="itemValue">{currentValueFontFamily}</span>
          </p>
        )

      } else if (title === "Line height") {
        return (
          <p className="general-setting-title">
            <Trans> {title} </Trans> :
            <span className="itemValue">{currentValueLineHeight}</span>
          </p>
        )

      }
      else if (title === "Text alignment") {
        return (
          <p className="general-setting-title">
            <Trans> {title} </Trans>  :
            <span className="itemValue">{currentValueTextAlign}</span>
          </p>
        )

      }
      else if (title === "Word spacing") {
        return (
          <p className="general-setting-title">
            <Trans>{title}</Trans> :
            <span className="itemValue">{currentValueWordSpacing}</span>
          </p>
        );
      }
      else if (title === "Letter spacing") {
        return (
          <p className="general-setting-title">
            <Trans> {title} </Trans>  :
            <span className="itemValue">{currentValueLetterSpace}</span>
          </p>
        )
      }
      else if (title === "Margin") {
        return (
          <p className="general-setting-title">
            <Trans> {title} </Trans>  :
            <span className="itemValue">{currentValueMarge}</span>
          </p>
        )
      }
      else if (title === "Vitesse de Lecture") {
        return (
          <p className="general-setting-title">
            <Trans> {title} </Trans>  :
            <span className="itemValue">{StorageUtil.getReaderConfig("readingRate")}</span>
          </p>
        )
      }

      return (
        <p className="general-setting-title">
          <Trans> {title} </Trans>  :
          <span className="itemValue">{StorageUtil.getReaderConfig(value)}</span>
        </p>
      );
    };


    const renderParagraphCharacter = () => {
      return iconChoiceList.map((item) => (
        <li className="paragraph-character-container" key={item.id}>

          {renderValue(item.title, item.value)}

          {/* Mapping des icônes */}
          {item.icons.map((imgProps, index) => (
            <img
              key={index}
              src={imgProps.src}
              alt={imgProps.alt}
              onClick={(event) => {
                this.handleView(event, item.value, imgProps.value);
              }}
              className="cursor-pointer icons-option"
            />
          ))}
        </li>
      ))
    };


    return (
      <ul className="paragraph-character-setting">
        {renderParagraphCharacter()}
      </ul>
    );
  }
}

export default IconChoiceList;
