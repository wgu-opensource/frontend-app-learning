import { jsx as _jsx } from "react/jsx-runtime";
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import { breakpoints, useWindowSize } from '@openedx/paragon';
import CertificateStatus from '../../course-home/progress-tab/certificate-status/CertificateStatus';
const ProgressTabCertificateStatusSidePanelSlot = () => {
    const windowWidth = useWindowSize().width;
    const wideScreen = windowWidth >= breakpoints.large.minWidth;
    return (_jsx(PluginSlot, Object.assign({ id: "org.openedx.frontend.learning.progress_tab_certificate_status_side_panel.v1", idAliases: ['progress_tab_certificate_status_side_panel_slot'] }, { children: windowWidth && wideScreen && _jsx(CertificateStatus, {}) })));
};
ProgressTabCertificateStatusSidePanelSlot.propTypes = {};
export default ProgressTabCertificateStatusSidePanelSlot;
//# sourceMappingURL=index.js.map