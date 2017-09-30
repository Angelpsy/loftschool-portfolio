/* eslint-disable no-invalid-this */
// https://learn.javascript.ru/task/throttle
/**
 * @param {Function} func
 * @param {Number} ms
 * @return {Function} wrapper
 */
export const throttle = function(func, ms) {
    let isThrottled = false;
    let savedArgs;
    let savedThis;

    /**
     *
     */
    function wrapper(...args) {
        if (isThrottled) {
            savedArgs = args;
            savedThis = this;
            return;
        }

        func.apply(this, args);

        isThrottled = true;

        setTimeout(function() {
            isThrottled = false;
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                savedArgs = savedThis = null;
            }
        }, ms);
    }

    return wrapper;
};
