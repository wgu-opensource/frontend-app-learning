import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import PropTypes from 'prop-types';
import React from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { AppContext } from '@edx/frontend-platform/react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { useModel } from '@src/generic/model-store';
import { usePluginsCallback } from '@src/generic/plugin-store';
import messages from '../messages';
import ContentIFrame from './ContentIFrame';
import UnitSuspense from './UnitSuspense';
import { modelKeys, views } from './constants';
import { useExamAccess, useShouldDisplayHonorCode } from './hooks';
import { getIFrameUrl } from './urls';
import UnitTitleSlot from '../../../../plugin-slots/UnitTitleSlot';
const Unit = ({ courseId, format, onLoaded, id, isOriginalUserStaff, renderUnitNavigation, }) => {
    const { formatMessage } = useIntl();
    const [searchParams] = useSearchParams();
    const { pathname } = useLocation();
    const { authenticatedUser } = React.useContext(AppContext);
    const examAccess = useExamAccess({ id });
    const shouldDisplayHonorCode = useShouldDisplayHonorCode({ courseId, id });
    const unit = useModel(modelKeys.units, id);
    const view = authenticatedUser ? views.student : views.public;
    const shouldDisplayUnitPreview = pathname.startsWith('/preview') && isOriginalUserStaff;
    const getUrl = usePluginsCallback('getIFrameUrl', () => getIFrameUrl({
        id,
        view,
        format,
        examAccess,
        jumpToId: searchParams.get('jumpToId'),
        preview: shouldDisplayUnitPreview ? '1' : '0',
    }));
    const iframeUrl = getUrl();
    return (_jsxs("div", Object.assign({ className: "unit" }, { children: [_jsx(UnitTitleSlot, Object.assign({ unitId: id }, { unit, renderUnitNavigation })), _jsx(UnitSuspense, Object.assign({}, { courseId, id })), _jsx(ContentIFrame, { elementId: "unit-iframe", id: id, iframeUrl: iframeUrl, loadingMessage: formatMessage(messages.loadingSequence), onLoaded: onLoaded, shouldShowContent: !shouldDisplayHonorCode && !examAccess.blockAccess, title: unit.title, courseId: courseId })] })));
};
Unit.propTypes = {
    courseId: PropTypes.string.isRequired,
    format: PropTypes.string,
    id: PropTypes.string.isRequired,
    onLoaded: PropTypes.func,
    isOriginalUserStaff: PropTypes.bool.isRequired,
    renderUnitNavigation: PropTypes.func.isRequired,
};
Unit.defaultProps = {
    format: null,
    onLoaded: undefined,
};
export default Unit;
//# sourceMappingURL=index.js.map