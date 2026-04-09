import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Footnote = ({ icon, text }) => (_jsx("div", Object.assign({ id: "celebration-footnote-wrapper", className: "row w-100 mx-0 my-4 justify-content-center" }, { children: _jsxs("p", Object.assign({ className: "text-gray-700" }, { children: [_jsx(FontAwesomeIcon, { icon: icon, style: { width: '20px' } }), "\u00A0", text] })) })));
Footnote.propTypes = {
    icon: PropTypes.shape({}).isRequired,
    text: PropTypes.node.isRequired,
};
export default Footnote;
//# sourceMappingURL=Footnote.js.map