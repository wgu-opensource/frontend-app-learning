import { jsx as _jsx } from "react/jsx-runtime";
import PropTypes from 'prop-types';
import { PluginSlot } from '@openedx/frontend-plugin-framework';
const SequenceContainerSlot = ({ courseId, unitId }) => (_jsx(PluginSlot, { id: "org.openedx.frontend.learning.sequence_container.v1", idAliases: ['sequence_container_slot'], pluginProps: {
        courseId,
        unitId,
    } }));
SequenceContainerSlot.propTypes = {
    courseId: PropTypes.string.isRequired,
    unitId: PropTypes.string,
};
SequenceContainerSlot.defaultProps = {
    unitId: null,
};
export default SequenceContainerSlot;
//# sourceMappingURL=index.js.map