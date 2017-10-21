import '../../title/index';
import '../../ui/tooltip/index';

import './index.scss';

import {throttle} from '../../../common/scripts/helpers/throttle';
import {isValidEmail} from '../../../common/scripts/helpers/validator';
import serialize from 'form-serialize';


const CLASSES = {
    blurEl: 'b-works-form__blur',
    field: 'b-works-form__field',
    fieldError: 'b-works-form__field--error',
    fieldSucces: 'b-works-form__field--success',
    formErrorContainer: 'b-works-form__error-container',
    formErrorContent: 'b-works-form__error-content',
    formSuccessContainer: 'b-works-form__success-container',
    formSuccessContent: 'b-works-form__success-content',
};

const container = document.querySelector('.b-works-form');
const form = container;

const sectionEl = document.querySelector('.b-works-what');

const blurEl = document.createElement('div');

blurEl.classList.add(CLASSES.blurEl);

/**
 *
 */
let drawBlur = function() {
    const w = sectionEl.offsetWidth;
    const h = sectionEl.offsetHeight;
    const l = container.offsetLeft;
    const b = h - (container.offsetTop + container.offsetHeight);

    blurEl.style.width = w + 'px';
    blurEl.style.height = h + 'px';
    blurEl.style.left = `-${l}px`;
    blurEl.style.bottom = `-${b}px`;
};

drawBlur = throttle(drawBlur, 300);

/**
 * @type {boolean}
 */
let isSend = false;

/**
 * @param {Element} formEl
 * @param {Boolean=} _isSend
 */
function toggleIsSend(formEl, _isSend = false) {
    formEl.querySelector('[type="submit"]').disabled = _isSend;
    isSend = _isSend;
}

/**
 * @param {String=} textError
 */
function showError(textError = 'Что-то пошло не так') {
    const contentEl = form.querySelector('.' + CLASSES.formErrorContent); // TODO: заменить на el
    contentEl.innerText = textError;
    const containerEl = form.querySelector('.' + CLASSES.formErrorContainer);
    containerEl.style.height = contentEl.offsetHeight + 'px';
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
            id: 'name',
            selector: `[name="${formName}-name"]`,
            value: dataForm[`${formName}-name`],
            isValid: !!(dataForm[`${formName}-name`]),
        },
        {
            id: 'email',
            selector: `[name="${formName}-email"]`,
            value: dataForm[`${formName}-email`],
            isValid: !dataForm[`${formName}-email`] || isValidEmail(dataForm[`${formName}-email`]),
        },
        {
            id: 'message',
            selector: `[name="${formName}-message"]`,
            value: dataForm[`${formName}-message`],
            isValid: !!(dataForm[`${formName}-message`]),
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


    const url = 'api/feedback?'
        + '&name=' + (dataForm[`${formName}-name`] || '')
        + '&email=' + (dataForm[`${formName}-email`] || '');

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'message=' + (dataForm[`${formName}-message`] || ''),
    })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            if (response.success) {
                const contentEl = form.querySelector('.' + CLASSES.formSuccessContent); // TODO: заменить на el
                contentEl.innerText = response.message
                    || 'Ваше сообщение отправлено';
                const containerEl = form.querySelector('.' + CLASSES.formSuccessContainer);
                containerEl.style.height = contentEl.offsetHeight + 'px';
            } else {
                showError(response && response.messageError);
            }
            toggleIsSend(form, false);
        })
        .catch((response) => {
            showError(response && response.messageError);
            toggleIsSend(form, false);
        });
}

/**
 *
 */
function init() {
    container.appendChild(blurEl);
    drawBlur();

    window.addEventListener('resize', drawBlur);
    form.addEventListener('submit', handlerSubmit);
}

window.addEventListener('load', init);
