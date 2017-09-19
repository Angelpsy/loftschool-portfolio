const events = {
    openLoginForm: {
        id: 'openLoginForm',
        event: new CustomEvent('openLoginForm', {'bubbles': true, 'cancelable': true}),
    },
    closeLoginForm: {
        id: 'closeLoginForm',
        event: new CustomEvent('closeLoginForm', {'bubbles': true, 'cancelable': true}),
    },
};

export {events};
