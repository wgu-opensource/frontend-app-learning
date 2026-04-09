var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { FormattedMessage, useIntl } from '@edx/frontend-platform/i18n';
import { Dropdown } from '@openedx/paragon';
import { MasqueradeUserNameInput } from './MasqueradeUserNameInput';
import { MasqueradeWidgetOption } from './MasqueradeWidgetOption';
import { getMasqueradeOptions, postMasqueradeOptions, } from './data/api';
import messages from './messages';
export const MasqueradeWidget = ({ courseId, onError }) => {
    var _a, _b, _c;
    const intl = useIntl();
    const [autoFocus, setAutoFocus] = React.useState(false);
    const [active, setActive] = React.useState({
        courseKey: '',
        role: 'staff',
        groupId: null,
        groupName: null,
        userName: null,
        userPartitionId: null,
    });
    const [available, setAvailable] = React.useState([]);
    const [shouldShowUserNameInput, setShouldShowUserNameInput] = React.useState(false);
    React.useEffect(() => {
        if (active.courseKey === courseId) {
            return; // Already fetched.
        }
        getMasqueradeOptions(courseId).then((data) => {
            if (data.success) {
                const newActive = data.active || {};
                const newAvailable = data.available || [];
                if (newActive.userName) {
                    setAutoFocus(false);
                    setShouldShowUserNameInput(true);
                }
                setActive(newActive);
                setAvailable(newAvailable);
            }
            else {
                // This was explicitly denied by the backend;
                // assume it's disabled/unavailable.
                onError('Unable to get masquerade options');
            }
        }).catch((response) => {
            // There's not much we can do to recover;
            // if we can't fetch masquerade options,
            // assume it's disabled/unavailable.
            // eslint-disable-next-line no-console
            console.error('Unable to get masquerade options', response);
        });
    }, [courseId, onError]);
    const handleSubmit = React.useCallback((payload) => __awaiter(void 0, void 0, void 0, function* () {
        onError(''); // Clear any error
        return postMasqueradeOptions(courseId, payload);
    }), [courseId]);
    const toggle = React.useCallback((show, groupId, groupName, role, userName, userPartitionId) => {
        setAutoFocus(true);
        // set masquerade: groupName
        setShouldShowUserNameInput((prev) => (show === undefined ? !prev : show));
        setActive(prev => (Object.assign(Object.assign({}, prev), { groupId,
            groupName,
            role,
            userName,
            userPartitionId })));
    }, []);
    const specificLearnerInputText = intl.formatMessage(messages.placeholder);
    return (_jsxs("div", Object.assign({ className: "flex-grow-1" }, { children: [_jsxs("div", Object.assign({ className: "row" }, { children: [_jsx("span", Object.assign({ className: "col-auto col-form-label pl-3" }, { children: _jsx(FormattedMessage, Object.assign({}, messages.titleViewAs)) })), _jsxs(Dropdown, Object.assign({ className: "flex-shrink-1 mx-1" }, { children: [_jsx(Dropdown.Toggle, Object.assign({ id: "masquerade-widget-toggle", variant: "inverse-outline-primary" }, { children: (_b = (_a = active.groupName) !== null && _a !== void 0 ? _a : active.userName) !== null && _b !== void 0 ? _b : intl.formatMessage(messages.titleStaff) })), _jsx(Dropdown.Menu, { children: available.map(group => (_jsx(MasqueradeWidgetOption, { groupId: group.groupId, groupName: group.name, role: group.role, selected: active, userName: group.userName, userPartitionId: group.userPartitionId, userNameInputToggle: toggle, onSubmit: handleSubmit }, group.name))) })] }))] })), shouldShowUserNameInput && (_jsxs("div", Object.assign({ className: "row mt-2" }, { children: [_jsx("span", Object.assign({ className: "col-auto col-form-label pl-3", id: "masquerade-search-label" }, { children: `${specificLearnerInputText}:` })), _jsx(MasqueradeUserNameInput, { id: "masquerade-search", className: "col-4", autoFocus: autoFocus, defaultValue: (_c = active.userName) !== null && _c !== void 0 ? _c : '', onError: onError, onSubmit: handleSubmit })] })))] })));
};
//# sourceMappingURL=MasqueradeWidget.js.map