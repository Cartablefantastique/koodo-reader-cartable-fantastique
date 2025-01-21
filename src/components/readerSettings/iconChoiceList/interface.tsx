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


export interface IconChoiceListProps {
  t: (title: string) => string;
  renderBookFunc: () => void;
  renderBookWithLineColorsFunc: () => void;
  handleChangeReadingRate: (readingRate: number) => void;
  handleChangeLanguage: (langSpeaking: string) => void;
  readingRate: number,
  langSpeaking: string
}
export interface IconChoiceListState {
  currentValueFontSize: number;
  currentValueWordSpacing: number;
  currentValueFontFamily: string,
  currentValueLineHeight: number;
  currentValueTextAlign: string;
  currentValueLetterSpace: number;
  currentValueMarge: number,

}


export const iconChoiceList = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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
    id: 7,
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
    id: 8,
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