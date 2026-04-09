import { jsx as _jsx } from "react/jsx-runtime";
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';
import { IconButton } from '@openedx/paragon';
import { MenuOpen as MenuOpenIcon } from '@openedx/paragon/icons';
import { useCourseOutlineSidebar } from './hooks';
import { ID } from './constants';
import messages from './messages';
const CourseOutlineTrigger = ({ isMobileView }) => {
    const intl = useIntl();
    const { currentSidebar, shouldDisplayFullScreen, handleToggleCollapse, isActiveEntranceExam, } = useCourseOutlineSidebar();
    const isDisplayForDesktopView = !isMobileView && !shouldDisplayFullScreen && currentSidebar !== ID;
    const isDisplayForMobileView = isMobileView && shouldDisplayFullScreen;
    if ((!isDisplayForDesktopView && !isDisplayForMobileView) || isActiveEntranceExam) {
        return null;
    }
    return (_jsx("div", Object.assign({ className: classNames('outline-sidebar-heading-wrapper bg-light-200 collapsed align-self-start', {
            'flex-shrink-0 mr-4 p-2.5': isDisplayForDesktopView,
            'p-0': isDisplayForMobileView,
        }) }, { children: _jsx(IconButton, { alt: intl.formatMessage(messages.toggleCourseOutlineTrigger), className: "outline-sidebar-toggle-btn flex-shrink-0 text-dark bg-light-200 rounded-0", iconAs: MenuOpenIcon, onClick: handleToggleCollapse }) })));
};
CourseOutlineTrigger.defaultProps = {
    isMobileView: false,
};
CourseOutlineTrigger.propTypes = {
    isMobileView: PropTypes.bool,
};
export default CourseOutlineTrigger;
//# sourceMappingURL=CourseOutlineTrigger.js.map