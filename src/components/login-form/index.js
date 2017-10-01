import '../title/index';
import '../icon/index';
import '../ui/checkbox/index';
import '../ui/radio-button/index';
import '../ui/tooltip/index';

import './index.scss';

import {events} from '../../common/scripts/events';
import serialize from 'form-serialize';

const CLASSES = {
    field: 'b-login-form__field',
    fieldError: 'b-login-form__field--error',
    fieldSucces: 'b-login-form__field--success',
    formErrorContainer: 'b-login-form__error-container',
    formErrorContent: 'b-login-form__error-content',
};

// TODO: переписать на ООП
/**
 * @type {Element}
 */
const container = document.querySelector('.b-login-form');
const form = container;
// const form = container;

const btnsGoHome = Array.prototype.slice.call(container.querySelectorAll('.js-go-home'));

/**
 * @type {boolean}
 */
let isSend = false;

/**
 * @param {Event} event
 */
function dispatchCloseLoginForm(event) {
    event.target.dispatchEvent(events.closeLoginForm.event);
}

// TODO: Перенести в Api
/**
 * @param {{url: String}} options
 * @param {Object} data
 * @return {Promise}
 */
function postResource(options, data) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        // xhr.open('POST', options.url);
        xhr.open('GET', options.url); // TODO: после реализации серверной части заменить на POST
        xhr.onload = function() {
            if (this.status >= 200
                && this.status < 300
                && xhr.response
                && JSON.parse(xhr.response).success) {
                resolve({
                    status: this.status,
                    statusText: xhr.statusText,
                    response: xhr.response ? xhr.response : null,
                });
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText,
                    response: xhr.response ? xhr.response : null,
                });
            }
        };
        xhr.onerror = function() {
            reject({
                status: this.status,
                statusText: xhr.statusText,
                response: xhr.response ? xhr.response : null,
            });
        };
        xhr.send(data);
    });
}

/**
 * @param {Element} formEl
 * @param {Boolean=} _isSend
 */
function toggleIsSend(formEl, _isSend = false) {
    formEl.querySelector('[type="submit"]').disabled = _isSend;
    isSend = _isSend;
}

/**
 * @param {Event} event
 */
function handlerSubmit(event) {
    event.preventDefault();

    /**
     * @type {Element}
     */
    const form = event.target;
    const formName = form.name;
    const dataForm = serialize(form, {hash: true});

    /**
     * @type {{id: String, selector: String, value: *, isValid: Boolean}[]}
     */
    const fields = [
        {
            id: 'human',
            selector: `[name="${formName}-human"]`,
            value: dataForm[`${formName}-human`],
            isValid: !!(dataForm[`${formName}-human`]),
        },
        {
            id: 'norobot',
            selector: `[name="${formName}-norobot"]`,
            value: dataForm[`${formName}-norobot`],
            isValid: dataForm[`${formName}-norobot`] === `${formName}-norobot-yes`,
        },
        {
            id: 'login',
            selector: `[name="${formName}-login"]`,
            value: dataForm[`${formName}-login`],
            isValid: !!(dataForm[`${formName}-login`]),
        },
        {
            id: 'password',
            selector: `[name="${formName}-password"]`,
            value: dataForm[`${formName}-password`],
            isValid: !!(dataForm[`${formName}-password`]),
        },
    ];

    fields.forEach((field) => {
        const el = container.querySelector(field.selector);
        const rowEl = el.closest('.' + CLASSES.field);
        if (field.isValid) {
            rowEl.classList.remove(CLASSES.fieldError);
            rowEl.classList.add(CLASSES.fieldSucces);
        } else {
            rowEl.classList.remove(CLASSES.fieldSucces);
            rowEl.classList.add(CLASSES.fieldError);
            el.addEventListener('change', function x() {
                rowEl.classList.remove(CLASSES.fieldError);
                el.removeEventListener('change', x);
            });
        }
    });

    const isFormValid = fields.every((field) => {
        return field.isValid;
    });

    if (!isFormValid || isSend) {
        return;
    }

    toggleIsSend(form, true);

    postResource({url: '/test-server-response-login.json'}, dataForm) // TODO: заменить на корректный адрес
        .then((data) => {
            toggleIsSend(form, false);
        })
        .catch((data) => {
            const contentEl = form.querySelector('.' + CLASSES.formErrorContent); // TODO: заменить на el
            contentEl.innerText = JSON.parse(data.response).messageError
                || 'Что-то пошло не так';
            const containerEl = form.querySelector('.' + CLASSES.formErrorContainer); // TODO: заменить на el
            containerEl.style.height = contentEl.offsetHeight + 'px';
            toggleIsSend(form, false);
        });
}

/**
 *
 */
function init() {
    btnsGoHome.forEach((btn) => {
        btn.addEventListener('click', dispatchCloseLoginForm);
    });

    form.addEventListener('submit', handlerSubmit);
}

init();
