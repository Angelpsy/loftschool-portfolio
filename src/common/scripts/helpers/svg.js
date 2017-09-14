/**
 * @param {string} id
 * @param {BrowserSpriteSymbol} symbol
 */
export const replacementViewbox = (id, symbol) => {
    if (!id || !symbol) {
        return;
    }

    const elsSvg = document.querySelectorAll(`svg[data-file=${id}]`);

    if (!elsSvg.length) {
        return;
    }

    if (elsSvg.length > 1) {
        // eslint-disable-next-line no-console
        console.warn(`svg[data-file=${id}] in ${elsSvg.length} elements`);
    }

    const viewBox = symbol.viewBox;
    const width = ~~viewBox.split(' ')[2];
    const height = ~~viewBox.split(' ')[3];

    elsSvg.forEach((svg) => {
        svg.setAttribute('width', width);
        svg.setAttribute('height', height);
    });
};
