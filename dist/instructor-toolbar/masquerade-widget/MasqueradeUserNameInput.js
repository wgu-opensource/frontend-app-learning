var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Form } from '@openedx/paragon';
import messages from './messages';
export const MasqueradeUserNameInput = (_a) => {
    var { onSubmit, onError } = _a, otherProps = __rest(_a, ["onSubmit", "onError"]);
    const intl = useIntl();
    const handleSubmit = React.useCallback((userIdentifier) => {
        const payload = {
            role: 'student',
            user_name: userIdentifier, // user name or email
        };
        onSubmit(payload).then((data) => {
            if (data && data.success) {
                global.location.reload();
            }
            else {
                const error = (data && data.error) || '';
                onError(error);
            }
        }).catch(() => {
            const message = intl.formatMessage(messages.genericError);
            onError(message);
        });
        return true;
    }, [onError]);
    const handleKeyPress = React.useCallback((event) => {
        if (event.key === 'Enter') {
            return handleSubmit(event.currentTarget.value);
        }
        return true;
    }, [handleSubmit]);
    return (_jsx(Form.Control, Object.assign({ "aria-labelledby": "masquerade-search-label", label: intl.formatMessage(messages.userNameLabel), onKeyPress: handleKeyPress }, otherProps)));
};
//# sourceMappingURL=MasqueradeUserNameInput.js.map