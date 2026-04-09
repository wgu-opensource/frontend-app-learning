import { jsx as _jsx } from "react/jsx-runtime";
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import LockPaywall from '../../courseware/course/sequence/lock-paywall';
export const GatedUnitContentMessageSlot = ({ courseId, }) => (_jsx(PluginSlot, Object.assign({ id: "org.openedx.frontend.learning.gated_unit_content_message.v1", idAliases: ['gated_unit_content_message_slot'], pluginProps: {
        courseId,
    } }, { children: _jsx(LockPaywall, { courseId: courseId }) })));
//# sourceMappingURL=index.js.map