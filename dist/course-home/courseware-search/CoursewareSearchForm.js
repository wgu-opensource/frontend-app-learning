import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import PropTypes from 'prop-types';
import { SearchField } from '@openedx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import messages from './messages';
const CoursewareSearchForm = ({ searchTerm, onSubmit, onChange, placeholder, }) => {
    const { formatMessage } = useIntl();
    return (_jsxs(SearchField.Advanced, Object.assign({ value: searchTerm, onSubmit: onSubmit, onChange: onChange, submitButtonLocation: "external", className: "courseware-search-form", screenReaderText: {
            label: formatMessage(messages.searchSubmitLabel),
            clearButton: formatMessage(messages.searchClearAction),
            submitButton: null, // Remove the sr-only label in the button.
        } }, { children: [_jsxs("div", Object.assign({ className: "pgn__searchfield_wrapper", "data-testid": "courseware-search-form" }, { children: [_jsx(SearchField.Label, {}), _jsx(SearchField.Input, { placeholder: placeholder, autoFocus: true }), _jsx(SearchField.ClearButton, {})] })), _jsx(SearchField.SubmitButton, { buttonText: formatMessage(messages.searchSubmitLabel), submitButtonLocation: "external", "data-testid": "courseware-search-form-submit" })] })));
};
CoursewareSearchForm.propTypes = {
    searchTerm: PropTypes.string,
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
};
CoursewareSearchForm.defaultProps = {
    searchTerm: undefined,
    onSubmit: undefined,
    onChange: undefined,
    placeholder: undefined,
};
export default CoursewareSearchForm;
//# sourceMappingURL=CoursewareSearchForm.js.map