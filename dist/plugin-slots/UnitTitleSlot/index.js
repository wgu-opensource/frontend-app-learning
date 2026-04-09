import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import PropTypes from 'prop-types';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import { useIntl } from '@edx/frontend-platform/i18n';
import { BookmarkButton } from '@src/courseware/course/bookmark';
import messages from '@src/courseware/course/sequence/messages';
const UnitTitleSlot = ({ unitId, unit, renderUnitNavigation, }) => {
    const { formatMessage } = useIntl();
    const isProcessing = unit.bookmarkedUpdateState === 'loading';
    return (_jsxs(PluginSlot, Object.assign({ id: "org.openedx.frontend.learning.unit_title.v1", idAliases: ['unit_title_slot'], pluginProps: {
            unitId,
            unit,
            isEnabledOutlineSidebar: true,
            renderUnitNavigation,
        } }, { children: [_jsxs("div", Object.assign({ className: "d-flex justify-content-between" }, { children: [_jsx("div", Object.assign({ className: "mb-0" }, { children: _jsx("h3", Object.assign({ className: "h3" }, { children: unit.title })) })), renderUnitNavigation(true)] })), _jsx("p", Object.assign({ className: "sr-only" }, { children: formatMessage(messages.headerPlaceholder) })), _jsx(BookmarkButton, { unitId: unit.id, isBookmarked: unit.bookmarked, isProcessing: isProcessing })] })));
};
UnitTitleSlot.propTypes = {
    unitId: PropTypes.string.isRequired,
    unit: PropTypes.shape({
        id: PropTypes.string.isRequired,
        bookmarked: PropTypes.bool.isRequired,
        title: PropTypes.string.isRequired,
        bookmarkedUpdateState: PropTypes.string.isRequired,
    }).isRequired,
    renderUnitNavigation: PropTypes.func.isRequired,
};
export default UnitTitleSlot;
//# sourceMappingURL=index.js.map