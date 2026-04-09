import { jsx as _jsx } from "react/jsx-runtime";
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import { ErrorPage } from '@edx/frontend-platform/react';
export const ContentIFrameErrorSlot = ({ courseId }) => (_jsx(PluginSlot, Object.assign({ id: "org.openedx.frontend.learning.content_iframe_error.v1", pluginProps: { courseId } }, { children: _jsx(ErrorPage, {}) })));
//# sourceMappingURL=index.js.map