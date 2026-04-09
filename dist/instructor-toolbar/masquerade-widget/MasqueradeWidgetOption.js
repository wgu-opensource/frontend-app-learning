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
import { Dropdown } from '@openedx/paragon';
export const MasqueradeWidgetOption = (_a) => {
    var { groupId = null, groupName, role = null, selected = null, userName = null, userPartitionId = null } = _a, props = __rest(_a, ["groupId", "groupName", "role", "selected", "userName", "userPartitionId"]);
    const handleClick = React.useCallback(() => {
        var _a;
        if (userName || userName === '') {
            (_a = props.userNameInputToggle) === null || _a === void 0 ? void 0 : _a.call(props, true, groupId, groupName, role, userName, userPartitionId);
            return false;
        }
        const payload = {};
        if (role) {
            payload.role = role;
        }
        if (groupId) {
            payload.group_id = groupId;
            payload.user_partition_id = userPartitionId;
        }
        props.onSubmit(payload).then(() => {
            global.location.reload();
        });
        return true;
    }, []);
    const isSelected = (groupId === (selected === null || selected === void 0 ? void 0 : selected.groupId)
        && role === (selected === null || selected === void 0 ? void 0 : selected.role)
        && userName === (selected === null || selected === void 0 ? void 0 : selected.userName)
        && userPartitionId === (selected === null || selected === void 0 ? void 0 : selected.userPartitionId));
    if (!groupName) {
        return null;
    }
    const className = isSelected ? 'active' : '';
    return (_jsx(Dropdown.Item, Object.assign({ className: className, href: "#", onClick: handleClick }, { children: groupName })));
};
//# sourceMappingURL=MasqueradeWidgetOption.js.map