import { jsxs as _jsxs, Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect } from 'react';
import { getConfig } from '@edx/frontend-platform';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { FormattedMessage, useIntl, defineMessages, } from '@edx/frontend-platform/i18n';
import { useSelector, useDispatch } from 'react-redux';
import { Hyperlink, DataTable, CardView, Card, } from '@openedx/paragon';
import PropTypes from 'prop-types';
import truncate from 'truncate-html';
import { FAILED, LOADED, LOADING } from '@src/constants';
import { useModel } from '../../../generic/model-store';
import fetchCourseRecommendations from './data/thunks';
import CatalogSuggestion from './CatalogSuggestion';
import PageLoading from '../../../generic/PageLoading';
import { logClick } from './utils';
const messages = defineMessages({
    recommendationsHeading: {
        id: 'courseCelebration.recommendations.heading',
        description: 'Header for recommendations section of course celebration',
        defaultMessage: 'Keep building your skills with these courses!',
    },
    recommendationsCourseFooter: {
        id: 'courseCelebration.recommendations.label',
        description: 'Label on a discovery-card that lets a user know that it is a course card',
        defaultMessage: 'Course',
    },
    listJoin: {
        id: 'courseCelebration.recommendations.formatting.list_join',
        description: 'Joining mark or word for a list of items, use the {sp} placeholder to include space before the joining word',
        // eslint-disable-next-line prefer-template
        defaultMessage: ('{style, select, '
            + 'punctuation {, } ' // HACK: select keys must match ListStyles, above, but must be statically coded for extract
            + 'conjunction { {sp}and } ' // HACK: interpolating a space character to get a leading-space here
            + 'other { }}'),
    },
    browseCatalog: {
        id: 'courseCelebration.recommendations.browse_catalog',
        description: 'Link to course catalog in course celebration',
        defaultMessage: 'Explore more courses',
    },
    loadingRecommendations: {
        id: 'courseCelebration.recommendations.loading_recommendations',
        description: 'Screen-reader text for the loading screen for recommendations',
        defaultMessage: 'Loading recommendations',
    },
});
const ListStyles = {
    punctuation: 'punctuation',
    conjunction: 'conjunction',
};
const CourseCard = ({ original: { title, image, owners, marketingUrl, onClick, }, }) => {
    const intl = useIntl();
    const formatList = (items, style) => (items.join(intl.formatMessage(messages.listJoin, { style, sp: ' ' })));
    const formattedOwners = formatList(owners.map(owner => owner.key), ListStyles.punctuation, intl);
    const subtitle = (_jsx(FormattedMessage, Object.assign({ id: "courseCelebration.recommendations.card.schools.label", description: "Screenreader label for the Schools and Partners running the course.", defaultMessage: "Schools and Partners" }, { children: text => (_jsxs(_Fragment, { children: [_jsxs("span", Object.assign({ className: "sr-only" }, { children: [text, ": "] })), truncate(formattedOwners, 40, { reserveLastWord: -1 })] })) })));
    return (_jsx("div", Object.assign({ role: "group", "aria-label": title }, { children: _jsx(Hyperlink, Object.assign({ destination: marketingUrl, className: "text-decoration-none", onClick: onClick }, { children: _jsxs(Card, Object.assign({ isClickable: true, style: { width: '21rem', height: '100%' } }, { children: [_jsx(Card.ImageCap, { src: image.src }), _jsx(Card.Header, { title: truncate(title, 70, { reserveLastWord: -1 }), subtitle: subtitle, size: "sm" }), _jsxs(Card.Section, { children: [" ", _jsx(_Fragment, {}), " "] }), _jsx(Card.Footer, Object.assign({ textElement: intl.formatMessage(messages.recommendationsCourseFooter) }, { children: _jsx(_Fragment, {}) }))] })) })) })));
};
CourseCard.propTypes = {
    original: PropTypes.shape({
        marketingUrl: PropTypes.string,
        title: PropTypes.string,
        image: PropTypes.shape({
            src: PropTypes.string,
        }),
        owners: PropTypes.arrayOf(PropTypes.shape({
            key: PropTypes.string,
        })),
        onClick: PropTypes.func,
    }).isRequired,
};
const IntlCard = CourseCard;
const CourseRecommendations = ({ variant }) => {
    const intl = useIntl();
    const { courseId, recommendationsStatus } = useSelector(state => (Object.assign(Object.assign({}, state.recommendations), state.courseware)));
    const { recommendations } = useModel('coursewareMeta', courseId);
    const { org, number } = useModel('courseHomeMeta', courseId);
    const dispatch = useDispatch();
    const courseKey = `${org}+${number}`;
    const { administrator } = getAuthenticatedUser();
    useEffect(() => {
        dispatch(fetchCourseRecommendations(courseKey, courseId));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);
    const recommendationsLength = recommendations ? recommendations.length : 0;
    if (recommendationsStatus && recommendationsStatus !== LOADING) {
        sendTrackEvent('edx.ui.lms.course_exit.recommendations.viewed', {
            course_key: courseKey,
            recommendations_status: recommendationsStatus,
            recommendations_length: recommendationsLength,
        });
    }
    if (recommendationsStatus === FAILED || (recommendationsStatus === LOADED && recommendationsLength < 2)) {
        return (_jsx(CatalogSuggestion, { variant: variant }));
    }
    if (recommendationsStatus === LOADING) {
        return _jsx(PageLoading, { srMessage: intl.formatMessage(messages.loadingRecommendations) });
    }
    const onCardClick = (url) => (e) => {
        e.preventDefault();
        logClick(org, courseId, administrator, 'recommendation_discovery_card');
        setTimeout(() => {
            window.location.href = url;
        }, (200));
    };
    const recommendationData = recommendations.map((recommendation) => (Object.assign(Object.assign({}, recommendation), { onClick: onCardClick(recommendation.marketingUrl) })));
    return (_jsxs("div", Object.assign({ className: "course-recommendations d-flex flex-column align-items-center", "data-testid": "course-recommendations" }, { children: [_jsx("h2", Object.assign({ className: "text-center mb-3" }, { children: intl.formatMessage(messages.recommendationsHeading) })), _jsx("div", Object.assign({ className: "mb-2 mt-3" }, { children: _jsx(DataTable, Object.assign({ isPaginated: true, itemCount: recommendationsLength, data: recommendationData, columns: [{ Header: 'Title', accessor: 'title' }], initialState: {
                        pageSize: 3,
                        pageIndex: 0,
                    } }, { children: _jsx(CardView, { CardComponent: IntlCard }) })) })), _jsx(Hyperlink, Object.assign({ style: { textDecoration: 'underline' }, destination: getConfig().SEARCH_CATALOG_URL, className: "text-center" }, { children: intl.formatMessage(messages.browseCatalog) }))] })));
};
CourseRecommendations.propTypes = {
    variant: PropTypes.string.isRequired,
};
export default CourseRecommendations;
//# sourceMappingURL=CourseRecommendations.js.map