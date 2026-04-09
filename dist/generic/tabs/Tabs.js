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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from '@openedx/paragon';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import classNames from 'classnames';
import useIndexOfLastVisibleChild from './useIndexOfLastVisibleChild';
const Tabs = (_a) => {
    var { children, className } = _a, attrs = __rest(_a, ["children", "className"]);
    const [indexOfLastVisibleChild, containerElementRef, invisibleStyle, overflowElementRef,] = useIndexOfLastVisibleChild();
    const tabChildren = useMemo(() => {
        const childrenArray = React.Children.toArray(children);
        const indexOfOverflowStart = indexOfLastVisibleChild + 1;
        // All tabs will be rendered. Those that would overflow are set to invisible.
        const wrappedChildren = childrenArray.map((child, index) => React.cloneElement(child, {
            style: index > indexOfLastVisibleChild ? invisibleStyle : null,
        }));
        // Build the list of items to put in the overflow menu
        const overflowChildren = childrenArray.slice(indexOfOverflowStart)
            .map(overflowChild => React.cloneElement(overflowChild, { className: 'dropdown-item' }));
        // Insert the overflow menu at the cut off index (even if it will be hidden
        // it so it can be part of measurements)
        wrappedChildren.splice(indexOfOverflowStart, 0, (_jsx("div", Object.assign({ className: "nav-item flex-shrink-0", style: indexOfOverflowStart >= React.Children.count(children) ? invisibleStyle : null, ref: overflowElementRef }, { children: _jsxs(Dropdown, Object.assign({ className: "h-100" }, { children: [_jsx(Dropdown.Toggle, Object.assign({ variant: "link", className: "nav-link h-100", id: "learn.course.tabs.navigation.overflow.menu" }, { children: _jsx(FormattedMessage, { id: "learn.course.tabs.navigation.overflow.menu", description: "The title of the overflow menu for course tabs", defaultMessage: "More..." }) })), _jsx(Dropdown.Menu, Object.assign({ className: "dropdown-menu-right" }, { children: overflowChildren }))] })) }), "overflow")));
        return wrappedChildren;
    }, [children, indexOfLastVisibleChild, invisibleStyle, overflowElementRef]);
    return (_jsx("nav", Object.assign({}, attrs, { className: classNames('nav flex-nowrap', className), ref: containerElementRef }, { children: tabChildren })));
};
Tabs.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};
Tabs.defaultProps = {
    children: null,
    className: undefined,
};
export default Tabs;
//# sourceMappingURL=Tabs.js.map