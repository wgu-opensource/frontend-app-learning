import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useIntl } from '@edx/frontend-platform/i18n';
import { Icon } from '@openedx/paragon';
import { Block } from '@openedx/paragon/icons';
import messages from '../messages';
const HiddenSequenceLink = () => {
    const intl = useIntl();
    return (_jsx("div", Object.assign({ className: "row w-100 my-2 mx-4 pl-3" }, { children: _jsxs("span", Object.assign({ className: "small d-flex" }, { children: [_jsx(Icon, { className: "mr-2", src: Block, "data-testid": "hide-from-toc-sequence-link-icon" }), _jsx("span", Object.assign({ "data-testid": "hide-from-toc-sequence-link-text" }, { children: intl.formatMessage(messages.hiddenSequenceLink) }))] })) })));
};
export default HiddenSequenceLink;
//# sourceMappingURL=HiddenSequenceLink.js.map