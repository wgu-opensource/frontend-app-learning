import { jsx as _jsx } from "react/jsx-runtime";
import React, { useContext, useCallback, Suspense } from 'react';
import PropTypes from 'prop-types';
import UserMessagesContext from './UserMessagesContext';
import Alert from './Alert';
const AlertList = ({ topic, className, customAlerts, customProps, }) => {
    const { remove, messages } = useContext(UserMessagesContext);
    const getAlertComponent = useCallback((code) => (customAlerts[code] !== undefined ? customAlerts[code] : Alert), [customAlerts]);
    const topicMessages = messages.filter(message => !topic || message.topic === topic);
    if (topicMessages.length === 0) {
        return null;
    }
    return (_jsx("div", Object.assign({ className: className }, { children: topicMessages.map(message => {
            const AlertComponent = getAlertComponent(message.code);
            return (_jsx(Suspense, Object.assign({ fallback: null }, { children: _jsx(AlertComponent, Object.assign({ type: message.type, dismissible: message.dismissible, onDismiss: () => remove(message.id), payload: message.payload }, customProps, { children: message.text })) }), message.id));
        }) })));
};
AlertList.propTypes = {
    className: PropTypes.string,
    topic: PropTypes.string,
    customAlerts: PropTypes.objectOf(PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.func,
        PropTypes.node,
    ])),
    // eslint-disable-next-line react/forbid-prop-types
    customProps: PropTypes.object,
};
AlertList.defaultProps = {
    topic: null,
    className: null,
    customAlerts: {},
    customProps: {},
};
export default AlertList;
//# sourceMappingURL=AlertList.js.map