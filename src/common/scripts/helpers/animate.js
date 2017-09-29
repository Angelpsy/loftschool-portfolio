// https://learn.javascript.ru/js-animation
/**
 * @param {{duration: Number, timing: Function, draw: Function}} options
 * @param {Number} options.duration Duration of animation (ms)
 * @param {Function} options.timing Timing function
 * @param {Function} options.draw Drawing function
 * @return {Promise} Promise
 */
export const animate = (options) => {
    return new Promise((resolve, reject) => {
        const start = performance.now();

        requestAnimationFrame(function animate(time) {
            let timeFraction = (time - start) / options.duration;
            if (timeFraction > 1) {
                timeFraction = 1;
            }

            const progress = options.timing(timeFraction);

            options.draw(progress);

            if (timeFraction < 1) {
                requestAnimationFrame(animate);
            } else {
                resolve();
            }
        });
    });
};
