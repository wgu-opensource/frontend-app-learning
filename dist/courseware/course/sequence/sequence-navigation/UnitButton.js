import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import classNames from 'classnames';
import { Button, Icon } from '@openedx/paragon';
import { Bookmark } from '@openedx/paragon/icons';
import UnitIcon from './UnitIcon';
import CompleteIcon from './CompleteIcon';
const UnitButton = ({ onClick, title, contentType, isActive, bookmarked, complete, showCompletion, unitId, className, showTitle, }) => {
    const { courseId, sequenceId } = useSelector(state => state.courseware);
    const { pathname } = useLocation();
    const basePath = `/course/${courseId}/${sequenceId}/${unitId}`;
    const unitPath = pathname.startsWith('/preview') ? `/preview${basePath}` : basePath;
    const handleClick = useCallback(() => {
        onClick(unitId);
    }, [onClick, unitId]);
    return (_jsxs(Button, Object.assign({ className: classNames({
            active: isActive,
            complete: showCompletion && complete,
        }, className), variant: "link", onClick: handleClick, title: title, as: Link, to: unitPath }, { children: [_jsx(UnitIcon, { type: contentType }), showTitle && _jsx("span", Object.assign({ className: "unit-title" }, { children: title })), showCompletion && complete ? _jsx(CompleteIcon, { size: "sm", className: "text-success ml-2" }) : null, bookmarked ? (_jsx(Icon, { "data-testid": "bookmark-icon", src: Bookmark, className: "text-primary small position-absolute", style: { top: '-3px', right: '5px' } })) : null] })));
};
UnitButton.propTypes = {
    bookmarked: PropTypes.bool,
    className: PropTypes.string,
    complete: PropTypes.bool,
    contentType: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    showCompletion: PropTypes.bool,
    showTitle: PropTypes.bool,
    title: PropTypes.string.isRequired,
    unitId: PropTypes.string.isRequired,
};
UnitButton.defaultProps = {
    className: undefined,
    isActive: false,
    bookmarked: false,
    complete: false,
    showTitle: false,
    showCompletion: true,
};
const mapStateToProps = (state, props) => {
    if (props.unitId) {
        return Object.assign({}, state.models.units[props.unitId]);
    }
    return {};
};
export default connect(mapStateToProps)(UnitButton);
//# sourceMappingURL=UnitButton.js.map