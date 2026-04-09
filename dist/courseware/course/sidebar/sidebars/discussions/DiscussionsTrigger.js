import { jsx as _jsx } from "react/jsx-runtime";
import { ensureConfig, getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Icon } from '@openedx/paragon';
import { QuestionAnswer } from '@openedx/paragon/icons';
import PropTypes from 'prop-types';
import { useContext, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useModel } from '@src/generic/model-store';
import { WIDGETS } from '@src/constants';
import { getCourseDiscussionTopics } from '../../../../data/thunks';
import SidebarTriggerBase from '../../common/TriggerBase';
import SidebarContext from '../../SidebarContext';
import messages from './messages';
ensureConfig(['DISCUSSIONS_MFE_BASE_URL']);
export const ID = WIDGETS.DISCUSSIONS;
const DiscussionsTrigger = ({ onClick, }) => {
    const intl = useIntl();
    const { unitId, courseId, } = useContext(SidebarContext);
    const dispatch = useDispatch();
    const { tabs } = useModel('courseHomeMeta', courseId);
    const topic = useModel('discussionTopics', unitId);
    const baseUrl = getConfig().DISCUSSIONS_MFE_BASE_URL;
    const edxProvider = useMemo(() => tabs === null || tabs === void 0 ? void 0 : tabs.find(tab => tab.slug === 'discussion'), [tabs]);
    useEffect(() => {
        if (baseUrl && edxProvider) {
            dispatch(getCourseDiscussionTopics(courseId));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [courseId, baseUrl]);
    if (!(topic === null || topic === void 0 ? void 0 : topic.id) || !(topic === null || topic === void 0 ? void 0 : topic.enabledInContext)) {
        return null;
    }
    return (_jsx(SidebarTriggerBase, Object.assign({ onClick: onClick, ariaLabel: intl.formatMessage(messages.openDiscussionsTrigger) }, { children: _jsx(Icon, { src: QuestionAnswer, className: "m-0 m-auto" }) })));
};
DiscussionsTrigger.propTypes = {
    onClick: PropTypes.func.isRequired,
};
export default DiscussionsTrigger;
//# sourceMappingURL=DiscussionsTrigger.js.map