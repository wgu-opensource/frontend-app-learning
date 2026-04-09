import { jsx as _jsx } from "react/jsx-runtime";
import { PluginSlot } from '@openedx/frontend-plugin-framework';
import NextButton from '../../courseware/course/sequence/sequence-navigation/generic/NextButton';
export const NextUnitTopNavTriggerSlot = ({ disabled, buttonText, nextLink, sequenceId, onClickHandler, variant, buttonStyle, isAtTop, }) => (_jsx(PluginSlot, Object.assign({ id: "org.openedx.frontend.learning.next_unit_top_nav_trigger.v1", idAliases: ['next_unit_top_nav_trigger_slot'], pluginProps: {
        disabled,
        buttonText,
        nextLink,
        sequenceId,
        onClickHandler,
        variant,
        buttonStyle,
        isAtTop,
    } }, { children: _jsx(NextButton, Object.assign({}, {
        variant,
        buttonStyle,
        onClickHandler,
        nextLink,
        disabled,
        buttonText,
        isAtTop,
    })) })));
//# sourceMappingURL=index.js.map