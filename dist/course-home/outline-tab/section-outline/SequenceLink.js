import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import classNames from 'classnames';
import SequenceDueDate from './SequenceDueDate';
import HiddenSequenceLink from './HiddenSequenceLink';
import SequenceTitle from './SequenceTitle';
const SequenceLink = ({ id, first, sequence, }) => {
    const { complete, description, due, showLink, title, hideFromTOC, } = sequence;
    return (_jsx("li", { children: _jsxs("div", Object.assign({ className: classNames('', { 'mt-2 pt-2 border-top border-light': !first }) }, { children: [_jsx(SequenceTitle, Object.assign({}, {
                    complete,
                    showLink,
                    title,
                    sequence,
                    id,
                })), hideFromTOC && (_jsx(HiddenSequenceLink, {})), _jsx(SequenceDueDate, Object.assign({}, { due, id, description }))] })) }));
};
export default SequenceLink;
//# sourceMappingURL=SequenceLink.js.map