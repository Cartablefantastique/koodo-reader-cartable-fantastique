import React from "react";
import "./iconChoiceList.css";
import { Trans } from "react-i18next";
import { IconChoiceListProps, IconChoiceListState } from "./interface";
import StorageUtil from "../../../utils/serviceUtils/storageUtil";
import BookUtil from "../../../utils/fileUtils/bookUtil";
import iconArial from '../../../assets/icons/arial.png';
import iconVerdana from '../../../assets/icons/verdana.png';
import iconLeftAlign from '../../../assets/icons/aligne_gauche.png';
import iconRightAlign from '../../../assets/icons/aligne_droite.png';
import iconAddInterval from '../../../assets/icons/interligne_augmenter.png';
import iconReduceInterval from '../../../assets/icons/interligne_reduire.png';
import iconAddFontSize from '../../../assets/icons/agrandir_police.png';
import iconReduceFontSize from '../../../assets/icons/reduire_police.png';
import iconAdd from '../../../assets/icons/augmenter.png';
import iconReduce from '../../../assets/icons/reduire.png';
import iconDefault from '../../../assets/icons/style_CF.jpg';

class IconChoiceList extends React.Component<IconChoiceListProps, IconChoiceListState> {
  iconChoiceList = [
    {
      id: 1,
      title: "Reset Default",
      value: "resetDefault",
      icons: [
        {
          value: "resetDefault",
          src: iconDefault,
          alt: "Paramètres par défaut"
        }
      ]
    },
    {
      id: 2,
      title: "Font size",
      value: "fontSize",
      icons: [
        {
          value: "Add",
          src: iconAddFontSize,
          alt: "Augmenter la police"
        },
        {
          value: "Reduce",
          src: iconReduceFontSize,
          alt: "Réduire la police"
        }
      ]
    },
    {
      id: 3,
      title: "Font family",
      value: "fontFamily",
      icons: [
        {
          value: "Arial",
          src: iconArial,
          alt: "Police Arial"
        },
        {
          value: "Verdana",
          src: iconVerdana,
          alt: "Police Verdana"
        }
      ]
    },
    {
      id: 4,
      title: "Line height",
      value: "lineHeight",
      icons: [
        {
          value: "Add",
          src: iconAddInterval,
          alt: "Augmenter l'interligne de 0.5"
        },
        {
          value: "Reduce",
          src: iconReduceInterval,
          alt: "Réduire l'interligne de 0.5"
        }
      ]
    },
    {
      id: 5,
      title: "Text alignment",
      value: "textAlign",
      icons: [
        {
          value: "Left",
          src: iconLeftAlign,
          alt: "Aligner à gauche"
        },
        {
          value: "Right",
          src: iconRightAlign,
          alt: "Aligner à droite"
        }
      ]
    },
    {
      id: 6,
      title: "Word spacing",
      value: "wordSpacing",
      icons: [
        {
          value: "Add",
          src: iconAdd,
          alt: "Augmenter l'espacement des mots"
        },
        {
          value: "Reduce",
          src: iconReduce,
          alt: "Réduire l'espacement des mots"
        }
      ]
    },
    {
      id: 7,
      title: "Letter spacing",
      value: "letterSpacing",
      icons: [
        {
          value: "Add",
          src: iconAdd,
          alt: "Augmenter l'espacement des lettres"
        },
        {
          value: "Reduce",
          src: iconReduce,
          alt: "Réduire l'espacement des lettres"
        }
      ]
    },
    {
      id: 8,
      title: "Margin",
      value: "margin",
      icons: [
        {
          value: "Add",
          src: iconAdd,
          alt: "Augmenter la marge"
        },
        {
          value: "Reduce",
          src: iconReduce,
          alt: "Réduire la marge"
        }
      ]
    },
    {
      id: 9,
      title: "Page width",
      value: "scale",
      icons: [
        {
          value: "Add",
          src: iconAdd,
          alt: "Augmenter la largeur de page"
        },
        {
          value: "Reduce",
          src: iconReduce,
          alt: "Réduire la largeur de page"
        }
      ]
    },

    {
      id: 9,
      title: "Vitesse de Lecture",
      value: "readingRate",
      icons: [
        {
          value: "Add",
          src: iconAdd,
          alt: "Augmenter la vitesse de Lecture"
        },
        {
          value: "Reduce",
          src: iconReduce,
          alt: "Réduire la vitesse de Lecture"
        }
      ]
    },
  ]

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

        }
        if (newFontSize === "Add" || newFontSize === "Reduce") {
          StorageUtil.resetReaderConfig(option)
        }

        console.log(`${option} : ${newFontSize >= 10 && newFontSize <= 40 ? "On change la taille et " : "On ne change pas la taille "} Nouvelle taille : ${newFontSize} et Ancienne taille : ${currentFontSize}`)
        break;
      case "wordSpacing":
        let currentWordSpacing = StorageUtil.getReaderConfig(option)
        let newWordSpacing = currentWordSpacing
        if ((value === "Add" && currentWordSpacing < 20) || (value === "Reduce" && currentWordSpacing > 0)) {
          newWordSpacing = value === "Add" ? newWordSpacing + 5 : newWordSpacing - 5
          StorageUtil.setReaderConfig(option, newWordSpacing);
        }
        StorageUtil.resetReaderConfig(option)
        console.log(`${option} : ${newWordSpacing >= 0 && newWordSpacing <= 20 ? "On change la taille et " : "On ne change pas la taille "} Nouvelle taille : ${newWordSpacing} et Ancienne taille : ${currentWordSpacing}`)
        break;
      case "fontFamily":
        StorageUtil.setReaderConfig(option, value);
        document.body.style.fontFamily = value;
        console.log(`La police appliquée est : ${value}`)
        break;
      case "lineHeight":
        let currentLineHeight = StorageUtil.getReaderConfig(option)
        let newLineHeight = currentLineHeight
        if ((value === "Add" && currentLineHeight < 3) || (value === "Reduce" && currentLineHeight > 1)) {
          newLineHeight = value === "Add" ? newLineHeight += 0.5 : newLineHeight -= 0.5
          StorageUtil.setReaderConfig(option, newLineHeight);
        }
        if (newLineHeight === "Add" || newLineHeight === "Reduce") {
          StorageUtil.resetReaderConfig(option)
        }

        console.log(`${option} : ${newLineHeight >= 0 && newLineHeight <= 20 ? "On change la taille et " : "On ne change pas la taille "} Nouvelle taille : ${newLineHeight} et Ancienne taille : ${currentLineHeight}`)
        break;
      case "textAlign":
        StorageUtil.setReaderConfig(option, value);
        console.log(`L'alignement appliqué est : ${value}`)
        break;
      case "letterSpacing":
        let currentLetterSpacing = StorageUtil.getReaderConfig(option)
        let newLetterSpacing = currentLetterSpacing
        if ((value === "Add" && currentLetterSpacing < 20) || (value === "Reduce" && currentLetterSpacing > 0)) {
          newLetterSpacing = value === "Add" ? newLetterSpacing + 2 : newLetterSpacing - 2
          StorageUtil.setReaderConfig(option, newLetterSpacing);
        }
        if (newLetterSpacing === "Add" || newLetterSpacing === "Reduce") {
          StorageUtil.resetReaderConfig(option)
        }
        console.log(`${option} : ${newLetterSpacing >= 0 && newLetterSpacing <= 20 ? "On change la taille et " : "On ne change pas la taille "} Nouvelle taille : ${newLetterSpacing} et Ancienne taille : ${currentLetterSpacing}`)
        break;

      case "margin":
        let currentMargin = StorageUtil.getReaderConfig(option)
        let newMargin = currentMargin
        if ((value === "Add" && currentMargin < 80) || (value === "Reduce" && currentMargin > 0)) {
          newMargin = value === "Add" ? newMargin + 10 : newMargin - 10
          StorageUtil.setReaderConfig(option, newMargin);
        }
        if (newMargin === "Add" || newMargin === "Reduce") {
          StorageUtil.resetReaderConfig(option)
        }

        console.log(`${option} : ${newMargin >= 0 && newMargin <= 80 ? "On change la taille et " : "On ne change pas la taille "} Nouvelle taille : ${newMargin} et Ancienne taille : ${currentMargin}`)
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

        console.log(
          `${option} : ${newCurrentRate >= 0 && newCurrentRate <= 5 ? "On change la vitesse et " : "On ne change pas la vitesse "} Nouvelle vitesse : ${newCurrentRate} et Ancienne vitesse : ${currentRate}`
        );
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
    const renderParagraphCharacter = () => {
      return this.iconChoiceList.map((item) => (
        <li className="paragraph-character-container" key={item.id}>
          <p className="general-setting-title">
            <Trans>{item.title}</Trans>
          </p>

          {item.icons.map((imgProps: any, index: number) => (
            <img
              key={index}
              src={imgProps.src}
              alt={imgProps.alt}
              onClick={(event) => {
                this.handleView(event, item.value, imgProps.value);

              }}
              className={`cursor-pointer icons-option`}
            />
          ))}
        </li>
      ));

    };

    return (
      <ul className="paragraph-character-setting">
        {renderParagraphCharacter()}
      </ul>
    );
  }
}

export default IconChoiceList;
