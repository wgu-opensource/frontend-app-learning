declare class PageLoading extends React.Component<any, any, any> {
    constructor(props: any);
    constructor(props: any, context: any);
    renderSrMessage(): import("react/jsx-runtime").JSX.Element | null;
    render(): import("react/jsx-runtime").JSX.Element;
}
declare namespace PageLoading {
    namespace propTypes {
        const srMessage: PropTypes.Validator<NonNullable<PropTypes.ReactNodeLike>>;
    }
}
export default PageLoading;
import React from "react";
import PropTypes from "prop-types";
