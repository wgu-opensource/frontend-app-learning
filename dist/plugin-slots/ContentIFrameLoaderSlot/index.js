import { jsx as _jsx } from "react/jsx-runtime";
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import PageLoading from '../../generic/PageLoading';
export const ContentIFrameLoaderSlot = ({ courseId, loadingMessage, }) => (_jsx(PluginSlot, Object.assign({ id: "org.openedx.frontend.learning.content_iframe_loader.v1", idAliases: ['content_iframe_loader_slot'], pluginProps: {
        defaultLoaderComponent: _jsx(PageLoading, { srMessage: loadingMessage }),
        courseId,
    } }, { children: _jsx(PageLoading, { srMessage: loadingMessage }) })));
//# sourceMappingURL=index.js.map