import { jsx as _jsx } from "react/jsx-runtime";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spinner } from '@openedx/paragon';
export default class PageLoading extends Component {
    renderSrMessage() {
        if (!this.props.srMessage) {
            return null;
        }
        return (_jsx("span", Object.assign({ className: "sr-only" }, { children: this.props.srMessage })));
    }
    render() {
        return (_jsx("div", { children: _jsx("div", Object.assign({ className: "d-flex justify-content-center align-items-center flex-column", style: {
                    height: '50vh',
                } }, { children: _jsx(Spinner, { animation: "border", variant: "primary", screenReaderText: this.renderSrMessage() }) })) }));
    }
}
PageLoading.propTypes = {
    srMessage: PropTypes.node.isRequired,
};
//# sourceMappingURL=PageLoading.js.map