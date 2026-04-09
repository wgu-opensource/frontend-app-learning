var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { getConfig } from '@edx/frontend-platform';
const LmsHtmlFragment = (_a) => {
    var _b;
    var { className, html, title } = _a, rest = __rest(_a, ["className", "html", "title"]);
    const direction = ((_b = document.documentElement) === null || _b === void 0 ? void 0 : _b.getAttribute('dir')) || 'ltr';
    const wholePage = `
    <html dir="${direction}">
      <head>
        <base href="${getConfig().LMS_BASE_URL}" target="_parent">
        <link rel="stylesheet" href="/static/${getConfig().LEGACY_THEME_NAME ? `${getConfig().LEGACY_THEME_NAME}/` : ''}css/bootstrap/lms-main.css">
        <link rel="stylesheet" type="text/css" href="${getConfig().BASE_URL}/static/LmsHtmlFragment.css">
      </head>
      <body class="${className}">${html}</body>
      <script>
        const resizer = new ResizeObserver(() => {
          window.parent.postMessage({type: 'lmshtmlfragment.resize'}, '*');
        });
        resizer.observe(document.body);
      </script>
    </html>
  `;
    const iframe = useRef(null);
    function resetIframeHeight() {
        var _a, _b, _c;
        if ((_c = (_b = (_a = iframe === null || iframe === void 0 ? void 0 : iframe.current) === null || _a === void 0 ? void 0 : _a.contentWindow) === null || _b === void 0 ? void 0 : _b.document) === null || _c === void 0 ? void 0 : _c.body) {
            iframe.current.height = iframe.current.contentWindow.document.body.parentNode.scrollHeight;
        }
    }
    useEffect(() => {
        function receiveMessage(event) {
            const { type } = event.data;
            if (type === 'lmshtmlfragment.resize') {
                resetIframeHeight();
            }
        }
        global.addEventListener('message', receiveMessage);
    }, []);
    return (_jsx("iframe", Object.assign({ className: "w-100 border-0", onLoad: resetIframeHeight, ref: iframe, referrerPolicy: "origin", scrolling: "no", srcDoc: wholePage, title: title }, rest)));
};
LmsHtmlFragment.defaultProps = {
    className: '',
};
LmsHtmlFragment.propTypes = {
    className: PropTypes.string,
    html: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};
export default LmsHtmlFragment;
//# sourceMappingURL=LmsHtmlFragment.js.map