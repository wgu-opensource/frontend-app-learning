var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';
import { Factory } from 'rosie';
import { getConfig, history } from '@edx/frontend-platform';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { AppProvider } from '@edx/frontend-platform/react';
import { waitForElementToBeRemoved } from '@testing-library/dom';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DatesTab from './DatesTab';
import { fetchDatesTab } from '../data';
import { fireEvent, initializeMockApp, waitFor } from '../../setupTest';
import initializeStore from '../../store';
import { TabContainer } from '../../tab-page';
import { appendBrowserTimezoneToUrl } from '../../utils';
import { UserMessagesProvider } from '../../generic/user-messages';
initializeMockApp();
jest.mock('@edx/frontend-platform/analytics');
describe('DatesTab', () => {
    let axiosMock;
    let store;
    let component;
    beforeEach(() => {
        axiosMock = new MockAdapter(getAuthenticatedHttpClient());
        store = initializeStore();
        component = (_jsx(AppProvider, Object.assign({ store: store }, { children: _jsx(UserMessagesProvider, { children: _jsx(Routes, { children: _jsx(Route, { path: "/course/:courseId/dates", element: (_jsx(TabContainer, Object.assign({ tab: "dates", fetch: fetchDatesTab, slice: "courseHome" }, { children: _jsx(DatesTab, {}) }))) }) }) }) })));
    });
    const datesTabData = Factory.build('datesTabData');
    let courseMetadata = Factory.build('courseHomeMetadata', { user_timezone: 'America/New_York' });
    const { id: courseId } = courseMetadata;
    const datesUrl = `${getConfig().LMS_BASE_URL}/api/course_home/dates/${courseId}`;
    let courseMetadataUrl = `${getConfig().LMS_BASE_URL}/api/course_home/course_metadata/${courseId}`;
    courseMetadataUrl = appendBrowserTimezoneToUrl(courseMetadataUrl);
    function setMetadata(attributes, options) {
        courseMetadata = Factory.build('courseHomeMetadata', attributes, options);
        axiosMock.onGet(courseMetadataUrl).reply(200, courseMetadata);
    }
    // The dates tab is largely repetitive non-interactive static data. Thus it's a little tough to follow
    // testing-library's advice around testing the way your user uses the site (i.e. can't find form elements by label or
    // anything). Instead, we find elements by printed date (which is what the user sees) and data-testid. Which is
    // better than assuming anything about how the surrounding elements are organized by div and span or whatever. And
    // better than adding non-style class names.
    // Hence the following getDay query helper.
    function getDay(date) {
        return __awaiter(this, void 0, void 0, function* () {
            const dateNode = yield screen.findByText(date);
            let parent = dateNode.parentElement;
            while (parent) {
                if (parent.dataset && parent.dataset.testid === 'dates-day') {
                    return {
                        day: parent,
                        header: within(parent).getByTestId('dates-header'),
                        items: within(parent).queryAllByTestId('dates-item'),
                    };
                }
                parent = parent.parentElement;
            }
            throw new Error('Did not find day container');
        });
    }
    describe('when receiving a full set of dates data', () => {
        beforeEach(() => {
            axiosMock.onGet(courseMetadataUrl).reply(200, courseMetadata);
            axiosMock.onGet(datesUrl).reply(200, datesTabData);
            history.push(`/course/${courseId}/dates`); // so tab can pull course id from url
            render(component);
        });
        it('handles unreleased & complete', () => __awaiter(void 0, void 0, void 0, function* () {
            const { header } = yield getDay('Sun, May 3, 2020');
            const badges = within(header).getAllByTestId('dates-badge');
            expect(badges).toHaveLength(2);
            expect(badges[0]).toHaveTextContent('Completed');
            expect(badges[1]).toHaveTextContent('Not yet released');
        }));
        it('handles unreleased & past due', () => __awaiter(void 0, void 0, void 0, function* () {
            const { header } = yield getDay('Mon, May 4, 2020');
            const badges = within(header).getAllByTestId('dates-badge');
            expect(badges).toHaveLength(2);
            expect(badges[0]).toHaveTextContent('Past due');
            expect(badges[1]).toHaveTextContent('Not yet released');
        }));
        it('handles verified only', () => __awaiter(void 0, void 0, void 0, function* () {
            const { day } = yield getDay('Sun, Aug 18, 2030');
            const badge = within(day).getByTestId('dates-badge');
            expect(badge).toHaveTextContent('Verified only');
        }));
        it('verified only has no link', () => __awaiter(void 0, void 0, void 0, function* () {
            const { day } = yield getDay('Sun, Aug 18, 2030');
            expect(within(day).queryByRole('link')).toBeNull();
        }));
        it('same status items have header badge', () => __awaiter(void 0, void 0, void 0, function* () {
            const { day, header } = yield getDay('Tue, May 26, 2020');
            const badge = within(header).getByTestId('dates-badge');
            expect(badge).toHaveTextContent('Past due'); // one header badge
            expect(within(day).getAllByTestId('dates-badge')).toHaveLength(1); // no other badges
        }));
        it('different status items have individual badges', () => __awaiter(void 0, void 0, void 0, function* () {
            const { header, items } = yield getDay('Thu, May 28, 2020');
            const headerBadges = within(header).queryAllByTestId('dates-badge');
            expect(headerBadges).toHaveLength(0); // no header badges
            expect(items).toHaveLength(2);
            expect(within(items[0]).getByTestId('dates-badge')).toHaveTextContent('Completed');
            expect(within(items[1]).getByTestId('dates-badge')).toHaveTextContent('Past due');
        }));
        it('shows extra info', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = userEvent.setup();
            const { items } = yield getDay('Sat, Aug 17, 2030');
            expect(items).toHaveLength(3);
            const tipIcon = within(items[2]).getByTestId('dates-extra-info');
            const tipText = "ORA Dates are set by the instructor, and can't be changed";
            expect(screen.queryByText(tipText)).toBeNull(); // tooltip does not start in DOM
            yield user.hover(tipIcon);
            screen.getByText(tipText); // now it's there
            yield user.unhover(tipIcon);
            yield waitFor(() => {
                expect(screen.queryByText(tipText)).toBeNull(); // and it's gone again
            });
        }));
    });
    describe('Suggested schedule messaging', () => {
        beforeEach(() => {
            setMetadata({ is_self_paced: true, is_enrolled: true });
            history.push(`/course/${courseId}/dates`);
        });
        it('renders SuggestedScheduleHeader', () => __awaiter(void 0, void 0, void 0, function* () {
            datesTabData.datesBannerInfo = {
                contentTypeGatingEnabled: false,
                missedDeadlines: false,
                missedGatedContent: false,
            };
            axiosMock.onGet(datesUrl).reply(200, datesTabData);
            render(component);
            yield waitFor(() => expect(screen.getByText('We’ve built a suggested schedule to help you stay on track. But don’t worry—it’s flexible so you can learn at your own pace.')).toBeInTheDocument());
        }));
        it('renders UpgradeToCompleteAlert', () => __awaiter(void 0, void 0, void 0, function* () {
            datesTabData.datesBannerInfo = {
                contentTypeGatingEnabled: true,
                missedDeadlines: false,
                missedGatedContent: false,
                verifiedUpgradeLink: 'http://localhost:18130/basket/add/?sku=8CF08E5',
            };
            axiosMock.onGet(datesUrl).reply(200, datesTabData);
            render(component);
            yield waitFor(() => expect(screen.getByText('You are auditing this course, which means that you are unable to participate in graded assignments. To complete graded assignments as part of this course, you can upgrade today.')).toBeInTheDocument());
            expect(screen.getByRole('button', { name: 'Upgrade now' })).toBeInTheDocument();
        }));
        it('renders UpgradeToShiftDatesAlert', () => __awaiter(void 0, void 0, void 0, function* () {
            datesTabData.datesBannerInfo = {
                contentTypeGatingEnabled: true,
                missedDeadlines: true,
                missedGatedContent: true,
                verifiedUpgradeLink: 'http://localhost:18130/basket/add/?sku=8CF08E5',
            };
            axiosMock.onGet(datesUrl).reply(200, datesTabData);
            render(component);
            yield waitFor(() => expect(screen.getByText('It looks like you missed some important deadlines based on our suggested schedule.')).toBeInTheDocument());
            expect(screen.getByText('To keep yourself on track, you can update this schedule and shift the past due assignments into the future. Don’t worry—you won’t lose any of the progress you’ve made when you shift your due dates.')).toBeInTheDocument();
            expect(screen.getByRole('button', { name: 'Upgrade to shift due dates' })).toBeInTheDocument();
        }));
        it('renders ShiftDatesAlert', () => __awaiter(void 0, void 0, void 0, function* () {
            datesTabData.datesBannerInfo = {
                contentTypeGatingEnabled: true,
                missedDeadlines: true,
                missedGatedContent: false,
                verifiedUpgradeLink: 'http://localhost:18130/basket/add/?sku=8CF08E5',
            };
            axiosMock.onGet(datesUrl).reply(200, datesTabData);
            render(component);
            yield waitFor(() => expect(screen.getByText('It looks like you missed some important deadlines based on our suggested schedule.')).toBeInTheDocument());
            expect(screen.getByText('To keep yourself on track, you can update this schedule and shift the past due assignments into the future. Don’t worry—you won’t lose any of the progress you’ve made when you shift your due dates.')).toBeInTheDocument();
            expect(screen.getByRole('button', { name: 'Shift due dates' })).toBeInTheDocument();
        }));
        it('handles shift due dates click', () => __awaiter(void 0, void 0, void 0, function* () {
            datesTabData.datesBannerInfo = {
                contentTypeGatingEnabled: true,
                missedDeadlines: true,
                missedGatedContent: false,
                verifiedUpgradeLink: 'http://localhost:18130/basket/add/?sku=8CF08E5',
            };
            axiosMock.onGet(datesUrl).reply(200, datesTabData);
            render(component);
            // confirm "Shift due dates" button has rendered
            yield waitFor(() => expect(screen.getByRole('button', { name: 'Shift due dates' })).toBeInTheDocument());
            // update response to reflect shifted dates
            datesTabData.datesBannerInfo = {
                contentTypeGatingEnabled: true,
                missedDeadlines: false,
                missedGatedContent: false,
                verifiedUpgradeLink: 'http://localhost:18130/basket/add/?sku=8CF08E5',
            };
            const resetDeadlinesData = {
                header: "You've successfully shifted your dates!",
            };
            axiosMock.onPost(`${getConfig().LMS_BASE_URL}/api/course_experience/v1/reset_course_deadlines`).reply(200, resetDeadlinesData);
            // click "Shift due dates"
            fireEvent.click(screen.getByRole('button', { name: 'Shift due dates' }));
            // wait for page to reload & Toast to render
            yield waitFor(() => expect(screen.getByText("You've successfully shifted your dates!")).toBeInTheDocument());
            // confirm "Shift due dates" button has not rendered
            expect(screen.queryByRole('button', { name: 'Shift due dates' })).not.toBeInTheDocument();
        }));
        it('sends analytics event onClick of upgrade button in UpgradeToCompleteAlert', () => __awaiter(void 0, void 0, void 0, function* () {
            sendTrackEvent.mockClear();
            datesTabData.datesBannerInfo = {
                contentTypeGatingEnabled: true,
                missedDeadlines: false,
                missedGatedContent: false,
                verifiedUpgradeLink: 'http://localhost:18130/basket/add/?sku=8CF08E5',
            };
            axiosMock.onGet(datesUrl).reply(200, datesTabData);
            render(component);
            const upgradeButton = yield waitFor(() => screen.getByRole('button', { name: 'Upgrade now' }));
            fireEvent.click(upgradeButton);
            expect(sendTrackEvent).toHaveBeenCalledTimes(1);
            expect(sendTrackEvent).toHaveBeenCalledWith('edx.bi.ecommerce.upsell_links_clicked', {
                org_key: 'edX',
                courserun_key: courseId,
                linkCategory: 'personalized_learner_schedules',
                linkName: 'dates_upgrade',
                linkType: 'button',
                pageName: 'dates_tab',
            });
        }));
        it('sends analytics event onClick of upgrade button in UpgradeToShiftDatesAlert', () => __awaiter(void 0, void 0, void 0, function* () {
            sendTrackEvent.mockClear();
            datesTabData.datesBannerInfo = {
                contentTypeGatingEnabled: true,
                missedDeadlines: true,
                missedGatedContent: true,
                verifiedUpgradeLink: 'http://localhost:18130/basket/add/?sku=8CF08E5',
            };
            axiosMock.onGet(datesUrl).reply(200, datesTabData);
            render(component);
            const upgradeButton = yield waitFor(() => screen.getByRole('button', { name: 'Upgrade to shift due dates' }));
            fireEvent.click(upgradeButton);
            expect(sendTrackEvent).toHaveBeenCalledTimes(1);
            expect(sendTrackEvent).toHaveBeenCalledWith('edx.bi.ecommerce.upsell_links_clicked', {
                org_key: 'edX',
                courserun_key: courseId,
                linkCategory: 'personalized_learner_schedules',
                linkName: 'dates_upgrade',
                linkType: 'button',
                pageName: 'dates_tab',
            });
        }));
    });
    describe('when receiving an access denied error', () => {
        // These tests could go into any particular tab, as they all go through the same flow. But dates tab works.
        function renderDenied(errorCode) {
            return __awaiter(this, void 0, void 0, function* () {
                setMetadata({
                    course_access: {
                        has_access: false,
                        error_code: errorCode,
                        additional_context_user_message: 'uhoh oh no', // only used by audit_expired
                    },
                });
                render(component);
                yield waitForElementToBeRemoved(screen.getByRole('status'));
            });
        }
        beforeEach(() => {
            axiosMock.onGet(datesUrl).reply(200, datesTabData);
            history.push(`/course/${courseId}/dates`); // so tab can pull course id from url
        });
        it('redirects to course survey for a survey_required error code', () => __awaiter(void 0, void 0, void 0, function* () {
            yield renderDenied('survey_required');
            expect(global.location.href).toEqual(`http://localhost/redirect/survey/${courseMetadata.id}`);
        }));
        it('redirects to dashboard for an unfulfilled_milestones error code', () => __awaiter(void 0, void 0, void 0, function* () {
            yield renderDenied('unfulfilled_milestones');
            expect(global.location.href).toEqual('http://localhost/redirect/dashboard');
        }));
        it('redirects to the dashboard with an attached access_response_error for an audit_expired error code', () => __awaiter(void 0, void 0, void 0, function* () {
            yield renderDenied('audit_expired');
            expect(global.location.href).toEqual('http://localhost/redirect/dashboard?access_response_error=uhoh%20oh%20no');
        }));
        it('redirects to the dashboard with a notlive start date for a course_not_started error code', () => __awaiter(void 0, void 0, void 0, function* () {
            yield renderDenied('course_not_started');
            expect(global.location.href).toEqual('http://localhost/redirect/dashboard?notlive=2/5/2013'); // date from factory
        }));
        it('redirects to the home page when unauthenticated', () => __awaiter(void 0, void 0, void 0, function* () {
            yield renderDenied('authentication_required');
            expect(global.location.href).toEqual(`http://localhost/course/${courseMetadata.id}/home`);
        }));
        it('redirects to the home page when unenrolled', () => __awaiter(void 0, void 0, void 0, function* () {
            yield renderDenied('enrollment_required');
            expect(global.location.href).toEqual(`http://localhost/course/${courseMetadata.id}/home`);
        }));
    });
});
//# sourceMappingURL=DatesTab.test.js.map