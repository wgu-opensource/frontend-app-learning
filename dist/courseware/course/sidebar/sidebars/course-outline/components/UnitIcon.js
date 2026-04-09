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
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Locked as LockedIcon, Article as ArticleIcon, LmsBook as LmsBookIcon, LmsBookComplete as LmsBookCompleteIcon, LmsEditSquare as LmsEditSquareIcon, LmsEditSquareComplete as LmsEditSquareCompleteIcon, LmsVideocam as LmsVideocamIcon, LmsVideocamComplete as LmsVideocamCompleteIcon, } from '@openedx/paragon/icons';
export const UNIT_ICON_TYPES = {
    video: 'video',
    problem: 'problem',
    vertical: 'vertical',
    lock: 'lock',
    other: 'other',
};
const UnitIcon = (_a) => {
    var _b;
    var { type, isCompleted } = _a, props = __rest(_a, ["type", "isCompleted"]);
    const iconMap = {
        [UNIT_ICON_TYPES.video]: {
            default: LmsVideocamIcon,
            complete: LmsVideocamCompleteIcon,
        },
        [UNIT_ICON_TYPES.problem]: {
            default: LmsEditSquareIcon,
            complete: LmsEditSquareCompleteIcon,
        },
        [UNIT_ICON_TYPES.vertical]: ArticleIcon,
        [UNIT_ICON_TYPES.lock]: LockedIcon,
        [UNIT_ICON_TYPES.other]: {
            default: LmsBookIcon,
            complete: LmsBookCompleteIcon,
        },
    };
    let Icon = iconMap[type || UNIT_ICON_TYPES.other];
    if (typeof Icon === 'object') {
        Icon = (_b = iconMap[type || UNIT_ICON_TYPES.other]) === null || _b === void 0 ? void 0 : _b[isCompleted ? 'complete' : 'default'];
    }
    return (_jsx(Icon, Object.assign({}, props, { className: classNames({ 'text-success': isCompleted, 'text-gray-300': !isCompleted }) })));
};
UnitIcon.propTypes = {
    type: PropTypes.oneOf(Object.keys(UNIT_ICON_TYPES)).isRequired,
    isCompleted: PropTypes.bool.isRequired,
};
export default UnitIcon;
//# sourceMappingURL=UnitIcon.js.map