/**
 * @type {{isMax: boolean, isMedium: boolean, isIpad: boolean, isPhone: boolean}}
 */
export const client = {
    isMax: window.matchMedia('(min-width: 1800px)').matches,
    isMedium: window.matchMedia('(min-width: 1200px) and (max-width: 1799px)').matches,
    isIpad: window.matchMedia('(min-width: 768px) and (max-width: 1199px)').matches,
    isPhone: window.matchMedia('(max-width: 767px)').matches,
};
