/**
 * @type {Boolean}
 */
export const isLocalStorageSupported = (() => {
    if (typeof localStorage === 'object') {
        try {
            localStorage.setItem('localStorage', 1);
            localStorage.removeItem('localStorage');
            return true;
        } catch (e) {
            return false;
        }
    }
})();
