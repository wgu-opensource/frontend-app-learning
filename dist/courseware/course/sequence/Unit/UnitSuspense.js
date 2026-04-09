import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';
import { useModel } from '@src/generic/model-store';
import PageLoading from '@src/generic/PageLoading';
import { GatedUnitContentMessageSlot } from '../../../../plugin-slots/GatedUnitContentMessageSlot';
import messages from '../messages';
import HonorCode from '../honor-code';
import * as hooks from './hooks';
import { modelKeys } from './constants';
const UnitSuspense = ({ courseId, id, }) => {
    const { formatMessage } = useIntl();
    const shouldDisplayHonorCode = hooks.useShouldDisplayHonorCode({ courseId, id });
    const unit = useModel(modelKeys.units, id);
    const meta = useModel(modelKeys.coursewareMeta, courseId);
    const shouldDisplayContentGating = (meta.contentTypeGatingEnabled && unit.containsContentTypeGatedContent);
    return (_jsxs(_Fragment, { children: [shouldDisplayContentGating && (_jsx(Suspense, Object.assign({ fallback: _jsx(PageLoading, { srMessage: formatMessage(messages.loadingLockedContent) }) }, { children: _jsx(GatedUnitContentMessageSlot, { courseId: courseId }) }))), shouldDisplayHonorCode && (_jsx(Suspense, Object.assign({ fallback: _jsx(PageLoading, { srMessage: formatMessage(messages.loadingHonorCode) }) }, { children: _jsx(HonorCode, { courseId: courseId }) })))] }));
};
UnitSuspense.propTypes = {
    courseId: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};
export default UnitSuspense;
//# sourceMappingURL=UnitSuspense.js.map