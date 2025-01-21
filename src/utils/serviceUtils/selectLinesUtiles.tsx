/**
  * On sélectionne les lignes de l'élément p
  *
  * @param p : élément à traiter
  */
export const selectLines = (p) => {
    const lines: string[] = [];
    let range = new Range();
    const textnodes = extractTextNode(p);
    range.setStart(textnodes[0], 0); // démarre au début de p
    do {
        range = nextLineRange(range, textnodes); // sélectionne une ligne après l'autre
        if (range.toString().length > 0) {
            lines.push(range.toString());
        }
    } while (range.toString().length > 0); // jusqu'à ce qu'il n'y ait plus rien
    return lines;
}

/**
 * On part de la sélection précédente pour sélectionner la prochaine ligne de texte
 * 
 * @param range : sélection précédente
 * @return nouvelle sélection ou null si on est arrivé en bout de paragraphe
 */
const nextLineRange = (range, textnodes) => {
    const newRange = document.createRange();
    //Le début de ce nouveau Range est défini à la fin du Range existant passé en paramètre
    newRange.setStart(range.endContainer, range.endOffset);

    while (!hasNewLine(newRange.getClientRects())) {
        //Si la fin du Range atteint la fin du contenu du nœud actuel 
        if (newRange.endOffset >= newRange.endContainer.textContent!.length) {
            // on passe a la noeud suivant 
            const index = textnodes.indexOf(newRange.endContainer);
            if (index + 1 < textnodes.length) {
                newRange.setEnd(textnodes[index + 1], 0); // next child node
            } else {
                //Si c’est le dernier nœud, on définit la fin du Range à la fin du contenu du nœud actuel et on retourne le Range
                newRange.setEnd(newRange.endContainer, newRange.endContainer.textContent!.length); // end of paragraph
                return newRange;
            }
        } else {
            newRange.setEnd(newRange.endContainer, newRange.endOffset + 1); // next character
        }
    }

    //reculant d’un caractère pour rester sur la même ligne.
    if (newRange.endOffset > 0) {
        newRange.setEnd(newRange.endContainer, newRange.endOffset - 1); // move back to the line
    }

    return newRange;
}
export const removeTagsFromParagraph = (paragraph) => {
    // Remplace le contenu HTML du paragraphe par son équivalent texte brut
    paragraph.innerHTML = paragraph.innerText || paragraph.textContent || "";
}

/**
 * On extrait les noeuds de type TEXT_NODE
 *
 * @param p : élément à partir duquel on souhaite extraire les noeuds
 */
const extractTextNode = (p) => {
    removeTagsFromParagraph(p)
    const nodes: Node[] = [];
    const walker = document.createTreeWalker(p, NodeFilter.SHOW_TEXT);

    let currentNode = walker.nextNode();
    while (currentNode) {
        nodes.push(currentNode); // Ajoute chaque nœud texte à la liste
        currentNode = walker.nextNode();
    }

    return nodes;
}

/**
* On a plusieurs lignes lorsqu'on a un rectangle dont le y est différent des autres rectangles
*
* @param rects : les rectangles issues de la sélection (range)
*/
const hasNewLine = (rects) => {
    for (let i = 0; i < rects.length; i++) {
        if (rects[i].y !== rects[0].y) {
            return true;
        }
    }
    return false;
}
