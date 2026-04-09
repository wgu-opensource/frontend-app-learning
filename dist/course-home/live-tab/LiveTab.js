import { jsx as _jsx } from "react/jsx-runtime";
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
const LiveTab = () => {
    var _a;
    const { courseId } = useSelector(state => state.courseHome);
    const liveModel = useSelector(state => state.models.live);
    useEffect(() => {
        const iframe = document.getElementById('lti-tab-embed');
        if (iframe) {
            iframe.className += ' vh-100 w-100 border-0';
        }
    }, []);
    return (_jsx("div", { id: "live_tab", 
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML: { __html: (_a = liveModel[courseId]) === null || _a === void 0 ? void 0 : _a.iframe } }));
};
export default LiveTab;
//# sourceMappingURL=LiveTab.js.map