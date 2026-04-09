import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { FormattedMessage, useIntl } from '@edx/frontend-platform/i18n';
import { Hyperlink } from '@openedx/paragon';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useModel } from '../../../generic/model-store';
import messages from './messages';
import { logClick } from './utils';
const CatalogSuggestion = ({ variant }) => {
    const intl = useIntl();
    const { courseId } = useSelector(state => state.courseware);
    const { org } = useModel('courseHomeMeta', courseId);
    const { administrator } = getAuthenticatedUser();
    const searchOurCatalogLink = (_jsx(Hyperlink, Object.assign({ style: { textDecoration: 'underline' }, destination: getConfig().SEARCH_CATALOG_URL, className: "text-reset", onClick: () => logClick(org, courseId, administrator, 'catalog_search', { variant }) }, { children: intl.formatMessage(messages.searchOurCatalogLink) })));
    return (_jsx("div", Object.assign({ className: "row w-100 mx-0 my-2 justify-content-center", "data-testid": "catalog-suggestion" }, { children: _jsxs("div", Object.assign({ className: "col col-md-8 p-4 bg-info-100 text-center" }, { children: [_jsx(FontAwesomeIcon, { icon: faSearch, style: { width: '20px' } }), "\u00A0", _jsx(FormattedMessage, { id: "courseExit.catalogSearchSuggestion", defaultMessage: "Looking to learn more? {searchOurCatalogLink} to find more courses and programs to explore.", values: { searchOurCatalogLink }, description: "Suggesting to learner to explore other course. Shown when they finish the course" })] })) })));
};
CatalogSuggestion.propTypes = {
    variant: PropTypes.string.isRequired,
};
export default CatalogSuggestion;
//# sourceMappingURL=CatalogSuggestion.js.map