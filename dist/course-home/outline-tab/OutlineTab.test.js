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
/**
 * @jest-environment jsdom
 */
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Factory } from 'rosie';
import { getConfig } from '@edx/frontend-platform';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import MockAdapter from 'axios-mock-adapter';
import Cookies from 'js-cookie';
import userEvent from '@testing-library/user-event';
import messages from './messages';
import { buildMinimalCourseBlocks } from '../../shared/data/__factories__/courseBlocks.factory';
import { fireEvent, initializeMockApp, logUnhandledRequests, render, screen, waitFor, act, } from '../../setupTest';
import { appendBrowserTimezoneToUrl, executeThunk } from '../../utils';
import * as thunks from '../data/thunks';
import initializeStore from '../../store';
import { CERT_STATUS_TYPE } from './alerts/certificate-status-alert/CertificateStatusAlert';
import OutlineTab from './OutlineTab';
import LoadedTabPage from '../../tab-page/LoadedTabPage';
const mockCoursewareSearchParams = jest.fn();
initializeMockApp();
jest.mock('@edx/frontend-platform/analytics');
jest.mock('../courseware-search/hooks', () => (Object.assign(Object.assign({}, jest.requireActual('../courseware-search/hooks')), { useCoursewareSearchParams: () => mockCoursewareSearchParams })));
const coursewareSearch = {
    query: '',
    filter: '',
    setQuery: jest.fn(),
    setFilter: jest.fn(),
    clearSearchParams: jest.fn(),
};
const mockSearchParams = ((props = coursewareSearch) => {
    mockCoursewareSearchParams.mockReturnValue(props);
});
describe('Outline Tab', () => {
    let axiosMock;
    const courseId = 'course-v1:edX+DemoX+Demo_Course';
    let courseMetadataUrl = `${getConfig().LMS_BASE_URL}/api/course_home/course_metadata/${courseId}`;
    courseMetadataUrl = appendBrowserTimezoneToUrl(courseMetadataUrl);
    const enrollmentUrl = `${getConfig().LMS_BASE_URL}/api/enrollment/v1/enrollment`;
    const goalUrl = `${getConfig().LMS_BASE_URL}/api/course_home/save_course_goal`;
    const masqueradeUrl = `${getConfig().LMS_BASE_URL}/courses/${courseId}/masquerade`;
    const outlineUrl = `${getConfig().LMS_BASE_URL}/api/course_home/outline/${courseId}`;
    const proctoringInfoUrl = `${getConfig().EXAMS_BASE_URL}/api/v1/student/course_id/${encodeURIComponent(courseId)}/onboarding?username=MockUser`;
    const store = initializeStore();
    const defaultMetadata = Factory.build('courseHomeMetadata');
    const defaultTabData = Factory.build('outlineTabData');
    function setMetadata(attributes, options) {
        const courseMetadata = Factory.build('courseHomeMetadata', attributes, options);
        axiosMock.onGet(courseMetadataUrl).reply(200, courseMetadata);
    }
    function setTabData(attributes, options) {
        const outlineTabData = Factory.build('outlineTabData', attributes, options);
        axiosMock.onGet(outlineUrl).reply(200, outlineTabData);
    }
    function fetchAndRender(path = '') {
        return __awaiter(this, void 0, void 0, function* () {
            yield executeThunk(thunks.fetchOutlineTab(courseId), store.dispatch);
            yield act(() => __awaiter(this, void 0, void 0, function* () {
                return render(_jsx(MemoryRouter, Object.assign({ initialEntries: [path] }, { children: _jsx(OutlineTab, {}) })), { store });
            }));
        });
    }
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        axiosMock = new MockAdapter(getAuthenticatedHttpClient());
        // Set defaults for network requests
        axiosMock.onGet(courseMetadataUrl).reply(200, defaultMetadata);
        axiosMock.onPost(enrollmentUrl).reply(200, {});
        axiosMock.onPost(goalUrl).reply(200, { header: 'Success' });
        axiosMock.onGet(masqueradeUrl).reply(200, { success: true });
        axiosMock.onGet(outlineUrl).reply(200, defaultTabData);
        axiosMock.onGet(proctoringInfoUrl).reply(200, {
            onboarding_status: 'created',
            onboarding_link: 'test',
            expiration_date: null,
        });
        // Mock courseware search params
        mockSearchParams();
        logUnhandledRequests(axiosMock);
    }));
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('Course Outline', () => {
        it('displays link to start course', () => __awaiter(void 0, void 0, void 0, function* () {
            yield fetchAndRender();
            expect(screen.getByRole('link', { name: messages.start.defaultMessage })).toBeInTheDocument();
        }));
        it('displays link to resume course', () => __awaiter(void 0, void 0, void 0, function* () {
            setTabData({
                resume_course: {
                    has_visited_course: true,
                    url: `${getConfig().LMS_BASE_URL}/courses/${courseId}/jump_to/block-v1:edX+Test+Block@12345abcde`,
                },
            });
            yield fetchAndRender();
            expect(screen.getByRole('link', { name: 'Resume course' })).toBeInTheDocument();
        }));
        it('expands section that contains resume block', () => __awaiter(void 0, void 0, void 0, function* () {
            const { courseBlocks } = yield buildMinimalCourseBlocks(courseId, 'Title', { resumeBlock: true });
            setTabData({
                course_blocks: { blocks: courseBlocks.blocks },
            });
            yield fetchAndRender();
            const expandedSectionNode = screen.getByRole('button', { name: /Title of Section/ });
            expect(expandedSectionNode).toHaveAttribute('aria-expanded', 'true');
        }));
        it('includes outline_tab_notifications_slot', () => __awaiter(void 0, void 0, void 0, function* () {
            const { courseBlocks } = yield buildMinimalCourseBlocks(courseId, 'Title', { resumeBlock: true });
            setTabData({
                course_blocks: { blocks: courseBlocks.blocks },
            });
            yield fetchAndRender();
            expect(screen.getByTestId('org.openedx.frontend.learning.course_outline_tab_notifications.v1')).toBeInTheDocument();
        }));
        it('handles expand/collapse all button click', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = userEvent.setup();
            yield fetchAndRender();
            // Button renders as "Expand All"
            const expandButton = screen.getByRole('button', { name: 'Expand all' });
            expect(expandButton).toBeInTheDocument();
            // Section initially renders collapsed
            const collapsedSectionNode = screen.getByRole('button', { name: /section/ });
            expect(collapsedSectionNode).toHaveAttribute('aria-expanded', 'false');
            // Click to expand section
            yield user.click(expandButton);
            yield waitFor(() => expect(collapsedSectionNode).toHaveAttribute('aria-expanded', 'true'));
            // Click to collapse section
            yield user.click(expandButton);
            yield waitFor(() => expect(collapsedSectionNode).toHaveAttribute('aria-expanded', 'false'));
        }));
        it('displays correct icon for complete assignment', () => __awaiter(void 0, void 0, void 0, function* () {
            const { courseBlocks } = yield buildMinimalCourseBlocks(courseId, 'Title', { complete: true });
            setTabData({
                course_blocks: { blocks: courseBlocks.blocks },
            });
            yield fetchAndRender();
            expect(screen.getByLabelText('Completed section')).toBeInTheDocument();
        }));
        it('displays correct icon for incomplete assignment', () => __awaiter(void 0, void 0, void 0, function* () {
            const { courseBlocks } = yield buildMinimalCourseBlocks(courseId, 'Title', { complete: false });
            setTabData({
                course_blocks: { blocks: courseBlocks.blocks },
            });
            yield fetchAndRender();
            expect(screen.getByLabelText('Incomplete section')).toBeInTheDocument();
        }));
        it('SequenceLink displays link', () => __awaiter(void 0, void 0, void 0, function* () {
            const { courseBlocks } = yield buildMinimalCourseBlocks(courseId, 'Title', { resumeBlock: true });
            setTabData({
                course_blocks: { blocks: courseBlocks.blocks },
            });
            yield fetchAndRender();
            const sequenceLink = screen.getByText('Title of Sequence');
            expect(sequenceLink.getAttribute('href')).toContain(`/course/${courseId}`);
        }));
    });
    describe('Suggested schedule alerts', () => {
        beforeEach(() => {
            setMetadata({ is_enrolled: true, is_self_paced: true });
            setTabData({
                dates_banner_info: {
                    content_type_gating_enabled: true,
                    missed_deadlines: true,
                    missed_gated_content: true,
                    verified_upgrade_link: 'http://localhost:18130/basket/add/?sku=8CF08E5',
                },
            }, {
                date_blocks: [
                    {
                        assignment_type: 'Homework',
                        date: '2010-08-20T05:59:40.942669Z',
                        date_type: 'assignment-due-date',
                        description: '',
                        learner_has_access: true,
                        title: 'Missed assignment',
                        extra_info: null,
                    },
                ],
            });
        });
        it('renders UpgradeToShiftDatesAlert', () => __awaiter(void 0, void 0, void 0, function* () {
            yield fetchAndRender();
            expect(screen.getByText('It looks like you missed some important deadlines based on our suggested schedule.')).toBeInTheDocument();
            expect(screen.getByText('To keep yourself on track, you can update this schedule and shift the past due assignments into the future. Don’t worry—you won’t lose any of the progress you’ve made when you shift your due dates.')).toBeInTheDocument();
            expect(screen.getByRole('button', { name: 'Upgrade to shift due dates' })).toBeInTheDocument();
        }));
        it('sends analytics event onClick of upgrade button in UpgradeToShiftDatesAlert', () => __awaiter(void 0, void 0, void 0, function* () {
            yield fetchAndRender();
            sendTrackEvent.mockClear();
            const upgradeButton = screen.getByRole('button', { name: 'Upgrade to shift due dates' });
            fireEvent.click(upgradeButton);
            expect(sendTrackEvent).toHaveBeenCalledTimes(1);
            expect(sendTrackEvent).toHaveBeenCalledWith('edx.bi.ecommerce.upsell_links_clicked', {
                org_key: 'edX',
                courserun_key: courseId,
                linkCategory: 'personalized_learner_schedules',
                linkName: 'course_home_upgrade_shift_dates',
                linkType: 'button',
                pageName: 'course_home',
            });
        }));
    });
    describe('Welcome Message', () => {
        beforeEach(() => {
            setMetadata({ is_enrolled: true });
        });
        it('does not render show more/less button under 100 words', () => __awaiter(void 0, void 0, void 0, function* () {
            yield fetchAndRender();
            expect(screen.getByTestId('alert-container-welcome')).toBeInTheDocument();
            expect(screen.queryByRole('button', { name: 'Show more' })).not.toBeInTheDocument();
        }));
        describe('over 100 words', () => {
            beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
                setTabData({
                    welcome_message_html: '<p>'
                        + 'This is a test welcome message that happens to be longer than one hundred words. We hope it will be shortened.'
                        + 'This is a test welcome message that happens to be longer than one hundred words. We hope it will be shortened.'
                        + 'This is a test welcome message that happens to be longer than one hundred words. We hope it will be shortened.'
                        + 'This is a test welcome message that happens to be longer than one hundred words. We hope it will be shortened.'
                        + 'This is a test welcome message that happens to be longer than one hundred words. We hope it will be shortened.'
                        + '</p>',
                });
                yield fetchAndRender();
            }));
            it('shortens message', () => __awaiter(void 0, void 0, void 0, function* () {
                expect(screen.getByTestId('short-welcome-message-iframe')).toBeInTheDocument();
                const showMoreButton = screen.queryByRole('button', { name: 'Show More' });
                expect(showMoreButton).toBeInTheDocument();
            }));
            it('renders show more/less button and handles click', () => __awaiter(void 0, void 0, void 0, function* () {
                const user = userEvent.setup();
                expect(screen.getByTestId('alert-container-welcome')).toBeInTheDocument();
                let showMoreButton = screen.getByRole('button', { name: 'Show More' });
                expect(showMoreButton).toBeInTheDocument();
                yield user.click(showMoreButton);
                let showLessButton = screen.getByRole('button', { name: 'Show Less' });
                expect(showLessButton).toBeInTheDocument();
                expect(screen.getByTestId('long-welcome-message-iframe')).toBeInTheDocument();
                yield user.click(showLessButton);
                showLessButton = screen.queryByRole('button', { name: 'Show Less' });
                expect(showLessButton).not.toBeInTheDocument();
                showMoreButton = screen.getByRole('button', { name: 'Show More' });
                expect(showMoreButton).toBeInTheDocument();
            }));
            it('dismisses message', () => __awaiter(void 0, void 0, void 0, function* () {
                expect(screen.getByTestId('alert-container-welcome')).toBeInTheDocument();
                const dismissButton = screen.queryByRole('button', { name: 'Dismiss' });
                const expandButton = screen.queryByRole('button', { name: 'Expand all' });
                fireEvent.click(dismissButton);
                expect(expandButton).toHaveFocus();
                expect(screen.queryByText('Welcome Message')).toBeNull();
            }));
        });
        it('ignores comments and misformatted HTML', () => __awaiter(void 0, void 0, void 0, function* () {
            setTabData({
                welcome_message_html: '<p class="additional-spaces-in-tag"   >'
                    + '<!-- Even if the welcome_message_html length is above the limit because of comments, we hope it will not be shortened. -->'
                    + '<!-- Even if the welcome_message_html length is above the limit because of comments, we hope it will not be shortened. -->'
                    + 'Test welcome message that happens to be longer than one hundred words because of comments but displayed content is less.'
                    + 'It should not be shortened.'
                    + '<!-- Even if the welcome_message_html length is above the limit because of comments, we hope it will not be shortened. -->'
                    + '<!-- Even if the welcome_message_html length is above the limit because of comments, we hope it will not be shortened. -->'
                    + '</p>',
            });
            yield fetchAndRender();
            const showMoreButton = screen.queryByRole('button', { name: 'Show More' });
            expect(showMoreButton).not.toBeInTheDocument();
        }));
        it('does not display if no update available', () => __awaiter(void 0, void 0, void 0, function* () {
            setTabData({ welcome_message_html: null });
            yield fetchAndRender();
            expect(screen.queryByTestId('alert-container-welcome')).not.toBeInTheDocument();
        }));
    });
    describe('Course Dates', () => {
        it('renders when course date blocks are populated', () => __awaiter(void 0, void 0, void 0, function* () {
            const startDate = new Date();
            startDate.setHours(startDate.getHours() + 1);
            setMetadata({ is_enrolled: true });
            setTabData({}, {
                date_blocks: [
                    {
                        date_type: 'course-start-date',
                        date: startDate.toISOString(),
                        title: 'Start',
                    },
                ],
            });
            yield fetchAndRender();
            expect(screen.getByRole('heading', { name: 'Important dates' })).toBeInTheDocument();
        }));
        it('does not render when course date blocks are not populated', () => __awaiter(void 0, void 0, void 0, function* () {
            setMetadata({ is_enrolled: true });
            yield fetchAndRender();
            expect(screen.queryByRole('heading', { name: 'Important dates' })).not.toBeInTheDocument();
        }));
        it('sends analytics event onClick of upgrade link', () => __awaiter(void 0, void 0, void 0, function* () {
            const now = new Date();
            const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
            setMetadata({ is_enrolled: true });
            setTabData({}, {
                date_blocks: [
                    {
                        date_type: 'verified-upgrade-deadline',
                        date: tomorrow.toISOString(),
                        link: 'https://example.com/upgrade',
                        link_text: 'Upgrade to Verified Certificate',
                        title: 'Verification Upgrade Deadline',
                    },
                ],
            });
            yield fetchAndRender();
            sendTrackEvent.mockClear();
            const upgradeLink = screen.getByRole('link', { name: 'Upgrade to Verified Certificate' });
            fireEvent.click(upgradeLink);
            expect(sendTrackEvent).toHaveBeenCalledTimes(1);
            expect(sendTrackEvent).toHaveBeenCalledWith('edx.bi.ecommerce.upsell_links_clicked', {
                org_key: 'edX',
                courserun_key: courseId,
                linkCategory: '(none)',
                linkName: 'course_home_dates',
                linkType: 'link',
                pageName: 'course_home',
            });
        }));
    });
    describe('Start or Resume Course Card', () => {
        it('renders startOrResumeCourseCard', () => __awaiter(void 0, void 0, void 0, function* () {
            yield fetchAndRender();
            expect(screen.queryByTestId('start-resume-card')).toBeInTheDocument();
        }));
    });
    describe('Weekly Learning Goal', () => {
        it('does not post goals while masquerading', () => __awaiter(void 0, void 0, void 0, function* () {
            setMetadata({ is_enrolled: true, original_user_is_staff: true });
            setTabData({
                course_goals: {
                    weekly_learning_goal_enabled: true,
                },
            });
            const spy = jest.spyOn(thunks, 'saveWeeklyLearningGoal');
            yield fetchAndRender();
            const button = yield screen.getByTestId('weekly-learning-goal-input-Regular');
            fireEvent.click(button);
            expect(spy).toHaveBeenCalledTimes(0);
        }));
        it('post goal via query param', () => __awaiter(void 0, void 0, void 0, function* () {
            setTabData({
                course_goals: {
                    weekly_learning_goal_enabled: true,
                },
            });
            const spy = jest.spyOn(thunks, 'saveWeeklyLearningGoal');
            sendTrackEvent.mockClear();
            yield fetchAndRender('http://localhost/?weekly_goal=3');
            expect(spy).toHaveBeenCalledTimes(1);
            expect(sendTrackEvent).toHaveBeenCalledWith('enrollment.email.clicked.setgoal', {});
        }));
        it('emit start course event via query param', () => __awaiter(void 0, void 0, void 0, function* () {
            sendTrackEvent.mockClear();
            yield fetchAndRender('http://localhost/?start_course=1');
            expect(sendTrackEvent).toHaveBeenCalledWith('enrollment.email.clicked.startcourse', {});
        }));
        describe('weekly learning goal is not set', () => {
            beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
                setTabData({
                    course_goals: {
                        weekly_learning_goal_enabled: true,
                    },
                });
                yield fetchAndRender();
            }));
            it('renders weekly learning goal card', () => __awaiter(void 0, void 0, void 0, function* () {
                expect(screen.queryByTestId('weekly-learning-goal-card')).toBeInTheDocument();
            }));
            it('disables the subscribe button if no goal is set', () => __awaiter(void 0, void 0, void 0, function* () {
                expect(screen.getByLabelText(messages.setGoalReminder.defaultMessage)).toBeDisabled();
            }));
            it.each([
                { level: 'Casual', days: 1 },
                { level: 'Regular', days: 3 },
                { level: 'Intense', days: 5 },
            ])('calls the API with a goal of $days when $level goal is clicked', ({ level, days }) => __awaiter(void 0, void 0, void 0, function* () {
                // click on Casual goal
                const button = yield screen.queryByTestId(`weekly-learning-goal-input-${level}`);
                fireEvent.click(button);
                // Verify the request was made
                yield waitFor(() => {
                    expect(axiosMock.history.post[0].url).toMatch(goalUrl);
                    // subscribe is turned on automatically
                    expect(axiosMock.history.post[0].data).toMatch(`{"course_id":"${courseId}","days_per_week":${days},"subscribed_to_reminders":true}`);
                    // verify that the additional info about subscriptions shows up
                    expect(screen.queryByText(messages.goalReminderDetail.defaultMessage)).toBeInTheDocument();
                });
                expect(screen.getByLabelText(messages.setGoalReminder.defaultMessage)).toBeEnabled();
            }));
            it('shows and hides subscribe to reminders additional text', () => __awaiter(void 0, void 0, void 0, function* () {
                const button = yield screen.getByTestId('weekly-learning-goal-input-Regular');
                fireEvent.click(button);
                // Verify the request was made
                yield waitFor(() => {
                    expect(axiosMock.history.post[0].url).toMatch(goalUrl);
                    // subscribe is turned on automatically
                    expect(axiosMock.history.post[0].data).toMatch(`{"course_id":"${courseId}","days_per_week":3,"subscribed_to_reminders":true}`);
                    // verify that the additional info about subscriptions shows up
                    expect(screen.queryByText(messages.goalReminderDetail.defaultMessage)).toBeInTheDocument();
                });
                expect(screen.getByLabelText(messages.setGoalReminder.defaultMessage)).toBeEnabled();
                // Click on subscribe to reminders toggle
                const subscriptionSwitch = yield screen.getByRole('switch', { name: messages.setGoalReminder.defaultMessage });
                expect(subscriptionSwitch).toBeInTheDocument();
                fireEvent.click(subscriptionSwitch);
                yield waitFor(() => {
                    expect(axiosMock.history.post[1].url).toMatch(goalUrl);
                    expect(axiosMock.history.post[1].data)
                        .toMatch(`{"course_id":"${courseId}","days_per_week":3,"subscribed_to_reminders":false}`);
                });
                // verify that the additional info about subscriptions gets hidden
                expect(screen.queryByText(messages.goalReminderDetail.defaultMessage)).not.toBeInTheDocument();
            }));
        });
        it('has button for weekly learning goal selected', () => __awaiter(void 0, void 0, void 0, function* () {
            setTabData({
                course_goals: {
                    weekly_learning_goal_enabled: true,
                    selected_goal: {
                        subscribed_to_reminders: true,
                        days_per_week: 3,
                    },
                },
            });
            yield fetchAndRender();
            const button = yield screen.queryByTestId('weekly-learning-goal-input-Regular');
            expect(button).toBeInTheDocument();
            expect(button).toHaveClass('flag-button-selected');
        }));
        it('renders weekly learning goal card if ProctoringInfoPanel is not shown', () => __awaiter(void 0, void 0, void 0, function* () {
            setTabData({
                course_goals: {
                    weekly_learning_goal_enabled: true,
                },
            });
            axiosMock.onGet(proctoringInfoUrl).reply(404);
            yield fetchAndRender();
            expect(screen.queryByTestId('weekly-learning-goal-card')).toBeInTheDocument();
        }));
        it('renders weekly learning goal card if ProctoringInfoPanel is not enabled', () => __awaiter(void 0, void 0, void 0, function* () {
            setTabData({
                course_goals: {
                    weekly_learning_goal_enabled: true,
                    enableProctoredExams: false,
                },
            });
            yield fetchAndRender();
            expect(screen.queryByTestId('weekly-learning-goal-card')).toBeInTheDocument();
        }));
        it('renders weekly learning goal card if ProctoringInfoPanel is enabled', () => __awaiter(void 0, void 0, void 0, function* () {
            setTabData({
                course_goals: {
                    weekly_learning_goal_enabled: true,
                    enableProctoredExams: true,
                },
            });
            yield fetchAndRender();
            expect(screen.queryByTestId('weekly-learning-goal-card')).toBeInTheDocument();
        }));
    });
    describe('Course Handouts', () => {
        it('renders title when handouts are available', () => __awaiter(void 0, void 0, void 0, function* () {
            yield fetchAndRender();
            expect(screen.queryByRole('heading', { name: 'Course Handouts' })).toBeInTheDocument();
        }));
        it('does not display title if no handouts available', () => __awaiter(void 0, void 0, void 0, function* () {
            setTabData({ handouts_html: null });
            yield fetchAndRender();
            expect(screen.queryByRole('heading', { name: 'Course Handouts' })).not.toBeInTheDocument();
        }));
    });
    describe('Course Tools', () => {
        it('renders title when tools are available', () => __awaiter(void 0, void 0, void 0, function* () {
            yield fetchAndRender();
            expect(screen.getByRole('heading', { name: 'Course Tools' })).toBeInTheDocument();
            expect(screen.getByRole('link', { name: 'Bookmarks' })).toBeInTheDocument();
        }));
        it('does not render title when tools are not available', () => __awaiter(void 0, void 0, void 0, function* () {
            setTabData({
                course_tools: [],
            });
            yield fetchAndRender();
            expect(screen.queryByRole('heading', { name: 'Course Tools' })).not.toBeInTheDocument();
        }));
    });
    describe('Alert List', () => {
        describe('Private Course Alert', () => {
            it('does not display alert for enrolled user', () => __awaiter(void 0, void 0, void 0, function* () {
                setMetadata({ is_enrolled: true });
                yield fetchAndRender();
                expect(screen.queryByRole('button', { name: 'Enroll now' })).not.toBeInTheDocument();
                expect(screen.queryByText('to access the full course')).not.toBeInTheDocument();
            }));
            it('does not display enrollment button if enrollment is not available', () => __awaiter(void 0, void 0, void 0, function* () {
                setTabData({
                    enroll_alert: {
                        can_enroll: false,
                    },
                });
                yield fetchAndRender();
                const alert = yield screen.findByTestId('private-course-alert');
                expect(alert).toHaveAttribute('role', 'alert');
                expect(screen.queryByRole('button', { name: 'Enroll now' })).not.toBeInTheDocument();
                expect(screen.getByText('You must be enrolled in the course to see course content.')).toBeInTheDocument();
            }));
            it('displays alert for unenrolled user', () => __awaiter(void 0, void 0, void 0, function* () {
                yield fetchAndRender();
                const alert = yield screen.findByTestId('private-course-alert');
                expect(alert).toHaveAttribute('role', 'alert');
                expect(screen.getByRole('button', { name: 'Enroll now' })).toBeInTheDocument();
            }));
            it('handles button click', () => __awaiter(void 0, void 0, void 0, function* () {
                const { location } = window;
                delete window.location;
                window.location = {
                    reload: jest.fn(),
                };
                yield fetchAndRender();
                const button = yield screen.findByRole('button', { name: 'Enroll now' });
                fireEvent.click(button);
                yield waitFor(() => expect(axiosMock.history.post).toHaveLength(1));
                expect(axiosMock.history.post[0].data)
                    .toEqual(JSON.stringify({ course_details: { course_id: courseId } }));
                expect(window.location.reload).toHaveBeenCalledTimes(1);
                window.location = location;
            }));
        });
        describe('Access Expiration Alert', () => {
            it('renders page banner on masquerade', () => __awaiter(void 0, void 0, void 0, function* () {
                setMetadata({ is_enrolled: true, original_user_is_staff: true });
                setTabData({
                    access_expiration: {
                        expiration_date: '2020-01-01T12:00:00Z',
                        masquerading_expired_course: true,
                    },
                });
                yield executeThunk(thunks.fetchOutlineTab(courseId), store.dispatch);
                yield act(() => __awaiter(void 0, void 0, void 0, function* () { return render(_jsx(LoadedTabPage, Object.assign({ courseId: courseId, activeTabSlug: "outline" }, { children: "..." })), { store }); }));
                const instructorToolbar = yield screen.getByTestId('instructor-toolbar');
                expect(instructorToolbar).toBeInTheDocument();
                expect(screen.getByText('This learner no longer has access to this course. Their access expired on', { exact: false })).toBeInTheDocument();
                expect(screen.getByText('1/1/2020', { exact: false })).toBeInTheDocument();
            }));
            it('does not render banner when not masquerading', () => __awaiter(void 0, void 0, void 0, function* () {
                setMetadata({ is_enrolled: true, original_user_is_staff: true });
                setTabData({
                    access_expiration: {
                        expiration_date: '2020-01-01T12:00:00Z',
                        masquerading_expired_course: false,
                    },
                });
                yield executeThunk(thunks.fetchOutlineTab(courseId), store.dispatch);
                yield act(() => __awaiter(void 0, void 0, void 0, function* () { return render(_jsx(LoadedTabPage, Object.assign({ courseId: courseId, activeTabSlug: "outline" }, { children: "..." })), { store }); }));
                const instructorToolbar = yield screen.getByTestId('instructor-toolbar');
                expect(instructorToolbar).toBeInTheDocument();
                expect(screen.queryByText('This learner no longer has access to this course. Their access expired on', { exact: false })).not.toBeInTheDocument();
            }));
        });
        describe('Course Start Alert', () => {
            // Only appears if enrolled and before start of course
            it('appears several days out', () => __awaiter(void 0, void 0, void 0, function* () {
                const startDate = new Date();
                startDate.setDate(startDate.getDate() + 100);
                setMetadata({ is_enrolled: true, start: '2999-01-01T00:00:00Z' });
                yield fetchAndRender();
                const node = yield screen.findByText('Course starts', { exact: false });
                expect(node.textContent).toMatch(/.* on .*/); // several days away uses "on" before date
            }));
            it('appears today', () => __awaiter(void 0, void 0, void 0, function* () {
                const startDate = new Date();
                startDate.setHours(startDate.getHours() + 1);
                setMetadata({ is_enrolled: true, start: startDate });
                yield fetchAndRender();
                const node = yield screen.findByText('Course starts', { exact: false });
                expect(node.textContent).toMatch(/.* at .*/); // same day uses "at" before date
            }));
        });
        describe('Course End Alert', () => {
            // Only appears if enrolled and within 14 days before the end of course
            it('appears several days out', () => __awaiter(void 0, void 0, void 0, function* () {
                const endDate = new Date();
                endDate.setDate(endDate.getDate() + 13);
                setMetadata({ is_enrolled: true });
                setTabData({}, {
                    date_blocks: [
                        {
                            date_type: 'course-end-date',
                            date: endDate.toISOString(),
                            title: 'End',
                        },
                    ],
                });
                yield fetchAndRender();
                const node = yield screen.findByText('This course is ending', { exact: false });
                expect(node.textContent).toMatch(/.* on .*/); // several days away uses "on" before date
            }));
            it('appears today', () => __awaiter(void 0, void 0, void 0, function* () {
                const endDate = new Date();
                endDate.setHours(endDate.getHours() + 1);
                setMetadata({ is_enrolled: true });
                setTabData({}, {
                    date_blocks: [
                        {
                            date_type: 'course-end-date',
                            date: endDate.toISOString(),
                            title: 'End',
                        },
                    ],
                });
                yield fetchAndRender();
                const node = yield screen.findByText('This course is ending', { exact: false });
                expect(node.textContent).toMatch(/.* at .*/); // same day uses "at" before date
            }));
        });
        describe('Certificate Available Alert', () => {
            // Must satisfy two conditions for alert to appear: enrolled and between course end and cert availability
            it('appears', () => __awaiter(void 0, void 0, void 0, function* () {
                const now = new Date();
                const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
                const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
                setMetadata({ is_enrolled: true });
                setTabData({
                    cert_data: {
                        cert_status: CERT_STATUS_TYPE.EARNED_NOT_AVAILABLE,
                        cert_web_view_url: null,
                        certificate_available_date: tomorrow.toISOString(),
                    },
                }, {
                    date_blocks: [
                        {
                            date_type: 'course-end-date',
                            date: yesterday.toISOString(),
                            title: 'End',
                        },
                        {
                            date_type: 'certificate-available-date',
                            date: tomorrow.toISOString(),
                            title: 'Cert Available',
                        },
                    ],
                });
                yield fetchAndRender();
                expect(screen.queryByText('Your grade and certificate status will be available soon.')).toBeInTheDocument();
            }));
            it('renders verification alert', () => __awaiter(void 0, void 0, void 0, function* () {
                const now = new Date();
                const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
                const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
                setMetadata({ is_enrolled: true });
                setTabData({
                    cert_data: {
                        cert_status: CERT_STATUS_TYPE.UNVERIFIED,
                        cert_web_view_url: null,
                    },
                }, {
                    date_blocks: [
                        {
                            date_type: 'course-end-date',
                            date: yesterday.toISOString(),
                            title: 'End',
                        },
                        {
                            date_type: 'certificate-available-date',
                            date: tomorrow.toISOString(),
                            title: 'Cert Available',
                        },
                        {
                            date_type: 'verification-deadline-date',
                            date: tomorrow.toISOString(),
                            link_text: 'Verify',
                            title: 'Verification Upgrade Deadline',
                        },
                    ],
                });
                yield fetchAndRender();
                expect(screen.queryByText('Verify your identity to qualify for a certificate.')).toBeInTheDocument();
            }));
            it('renders non passing grade', () => __awaiter(void 0, void 0, void 0, function* () {
                const now = new Date();
                const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
                const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
                setMetadata({ is_enrolled: true });
                setTabData({
                    cert_data: {},
                    user_has_passing_grade: false,
                    has_ended: true,
                    enrollment_mode: 'verified',
                }, {
                    date_blocks: [
                        {
                            date_type: 'course-end-date',
                            date: yesterday.toISOString(),
                            title: 'End',
                        },
                        {
                            date_type: 'certificate-available-date',
                            date: tomorrow.toISOString(),
                            title: 'Cert Available',
                        },
                        {
                            date_type: 'verification-deadline-date',
                            date: tomorrow.toISOString(),
                            link_text: 'Verify',
                            title: 'Verification Upgrade Deadline',
                        },
                    ],
                });
                yield fetchAndRender();
                screen.getAllByText('You are not yet eligible for a certificate');
                expect(screen.queryByText('You are not yet eligible for a certificate')).toBeInTheDocument();
            }));
            it('tracks request cert button', () => __awaiter(void 0, void 0, void 0, function* () {
                sendTrackEvent.mockClear();
                const now = new Date();
                const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
                const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
                setMetadata({ is_enrolled: true });
                setTabData({
                    cert_data: {
                        cert_status: CERT_STATUS_TYPE.REQUESTING,
                        cert_web_view_url: null,
                    },
                }, {
                    date_blocks: [
                        {
                            date_type: 'course-end-date',
                            date: yesterday.toISOString(),
                            title: 'End',
                        },
                        {
                            date_type: 'certificate-available-date',
                            date: tomorrow.toISOString(),
                            title: 'Cert Available',
                        },
                        {
                            date_type: 'verification-deadline-date',
                            date: tomorrow.toISOString(),
                            link_text: 'Verify',
                            title: 'Verification Upgrade Deadline',
                        },
                    ],
                });
                yield fetchAndRender();
                sendTrackEvent.mockClear();
                const requestingButton = screen.getByRole('button', { name: 'Request certificate' });
                fireEvent.click(requestingButton);
                expect(sendTrackEvent).toHaveBeenCalledTimes(1);
                expect(sendTrackEvent).toHaveBeenCalledWith('edx.ui.lms.course_outline.certificate_alert_request_cert_button.clicked', {
                    courserun_key: courseId,
                    is_staff: false,
                    org_key: 'edX',
                });
            }));
            it('tracks unverified cert button', () => __awaiter(void 0, void 0, void 0, function* () {
                sendTrackEvent.mockClear();
                const now = new Date();
                const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
                const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
                setMetadata({ is_enrolled: true });
                setTabData({
                    cert_data: {
                        cert_status: CERT_STATUS_TYPE.UNVERIFIED,
                        cert_web_view_url: null,
                    },
                }, {
                    date_blocks: [
                        {
                            date_type: 'course-end-date',
                            date: yesterday.toISOString(),
                            title: 'End',
                        },
                        {
                            date_type: 'certificate-available-date',
                            date: tomorrow.toISOString(),
                            title: 'Cert Available',
                        },
                        {
                            date_type: 'verification-deadline-date',
                            date: tomorrow.toISOString(),
                            link_text: 'Verify',
                            title: 'Verification Upgrade Deadline',
                        },
                    ],
                });
                yield fetchAndRender();
                sendTrackEvent.mockClear();
                const requestingButton = screen.getByRole('link', { name: 'Verify my ID' });
                fireEvent.click(requestingButton);
                expect(sendTrackEvent).toHaveBeenCalledTimes(1);
                expect(sendTrackEvent).toHaveBeenCalledWith('edx.ui.lms.course_outline.certificate_alert_unverified_button.clicked', {
                    courserun_key: courseId,
                    is_staff: false,
                    org_key: 'edX',
                });
            }));
        });
        describe('Scheduled Content Alert', () => {
            it('appears correctly', () => __awaiter(void 0, void 0, void 0, function* () {
                const now = new Date();
                const { courseBlocks } = yield buildMinimalCourseBlocks(courseId, 'Title', { hasScheduledContent: true });
                const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
                setMetadata({ is_enrolled: true });
                setTabData({
                    course_blocks: { blocks: courseBlocks.blocks },
                    date_blocks: [
                        {
                            date_type: 'course-end-date',
                            date: tomorrow.toISOString(),
                            title: 'End',
                        },
                    ],
                });
                yield fetchAndRender();
                expect(screen.queryByText('More content is coming soon!')).toBeInTheDocument();
            }));
        });
        describe('Scheduled Content Alert not present without courseBlocks', () => {
            it('appears correctly', () => __awaiter(void 0, void 0, void 0, function* () {
                const now = new Date();
                const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
                setMetadata({ is_enrolled: true });
                setTabData({
                    course_blocks: null,
                    date_blocks: [
                        {
                            date_type: 'course-end-date',
                            date: tomorrow.toISOString(),
                            title: 'End',
                        },
                    ],
                });
                yield fetchAndRender();
                expect(screen.getByRole('link', { name: messages.start.defaultMessage })).toBeInTheDocument();
                expect(screen.queryByText('More content is coming soon!')).not.toBeInTheDocument();
            }));
        });
    });
    describe('Certificate (web) Complete Alert', () => {
        it('appears', () => __awaiter(void 0, void 0, void 0, function* () {
            const now = new Date();
            const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
            setMetadata({ is_enrolled: true });
            setTabData({
                cert_data: {
                    cert_status: CERT_STATUS_TYPE.DOWNLOADABLE,
                    cert_web_view_url: 'certificate/testuuid',
                    certificate_available_date: null,
                },
            }, {
                date_blocks: [
                    {
                        date_type: 'course-end-date',
                        date: yesterday.toISOString(),
                        title: 'End',
                    },
                ],
            });
            yield fetchAndRender();
            expect(screen.queryByText('Congratulations! Your certificate is ready.')).toBeInTheDocument();
        }));
    });
    describe('Requesting Certificate Alert', () => {
        it('appears', () => __awaiter(void 0, void 0, void 0, function* () {
            const now = new Date();
            const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
            setMetadata({ is_enrolled: true });
            setTabData({
                cert_data: {
                    cert_status: CERT_STATUS_TYPE.REQUESTING,
                    cert_web_view_url: null,
                    certificate_available_date: null,
                },
            }, {
                date_blocks: [
                    {
                        date_type: 'course-end-date',
                        date: yesterday.toISOString(),
                        title: 'End',
                    },
                ],
            });
            yield fetchAndRender();
            expect(screen.queryByText('Congratulations! Your certificate is ready.')).toBeInTheDocument();
            expect(screen.queryByText('Request certificate')).toBeInTheDocument();
        }));
    });
    describe('Proctoring Info Panel', () => {
        const onboardingReleaseDate = new Date();
        onboardingReleaseDate.setDate(new Date().getDate() - 7);
        it('appears', () => __awaiter(void 0, void 0, void 0, function* () {
            yield fetchAndRender();
            yield screen.findByText('This course contains proctored exams');
            expect(screen.queryByRole('link', { name: 'Review instructions and system requirements' })).toBeInTheDocument();
        }));
        it('appears for verified', () => __awaiter(void 0, void 0, void 0, function* () {
            axiosMock.onGet(proctoringInfoUrl).reply(200, {
                onboarding_status: 'verified',
                onboarding_link: 'test',
                expiration_date: null,
                onboarding_release_date: onboardingReleaseDate.toISOString(),
            });
            yield fetchAndRender();
            yield screen.findByText('This course contains proctored exams');
            expect(screen.queryByRole('link', { name: 'Complete Onboarding' })).not.toBeInTheDocument();
            expect(screen.queryByRole('link', { name: 'Review instructions and system requirements' })).toBeInTheDocument();
            expect(screen.queryByText('You must complete the onboarding process prior to taking any proctored exam.')).not.toBeInTheDocument();
            expect(screen.queryByText('Onboarding profile review can take 2+ business days.')).not.toBeInTheDocument();
        }));
        it('appears for rejected', () => __awaiter(void 0, void 0, void 0, function* () {
            axiosMock.onGet(proctoringInfoUrl).reply(200, {
                onboarding_status: 'rejected',
                onboarding_link: 'test',
                expiration_date: null,
                onboarding_release_date: onboardingReleaseDate.toISOString(),
            });
            yield fetchAndRender();
            yield screen.findByText('This course contains proctored exams');
            expect(screen.queryByRole('link', { name: 'Complete Onboarding' })).toBeInTheDocument();
            expect(screen.queryByRole('link', { name: 'Review instructions and system requirements' })).toBeInTheDocument();
            expect(screen.queryByText('You must complete the onboarding process prior to taking any proctored exam.')).toBeInTheDocument();
            expect(screen.queryByText('Onboarding profile review can take 2+ business days.')).toBeInTheDocument();
        }));
        it('appears for submitted', () => __awaiter(void 0, void 0, void 0, function* () {
            axiosMock.onGet(proctoringInfoUrl).reply(200, {
                onboarding_status: 'submitted',
                onboarding_link: 'test',
                expiration_date: null,
                onboarding_release_date: onboardingReleaseDate.toISOString(),
            });
            yield fetchAndRender();
            yield screen.findByText('This course contains proctored exams');
            expect(screen.queryByText('Your submitted profile is in review.')).toBeInTheDocument();
            expect(screen.queryByText('Onboarding profile review can take 2+ business days.')).toBeInTheDocument();
        }));
        it('appears for second_review_required', () => __awaiter(void 0, void 0, void 0, function* () {
            axiosMock.onGet(proctoringInfoUrl).reply(200, {
                onboarding_status: 'second_review_required',
                onboarding_link: 'test',
                expiration_date: null,
                onboarding_release_date: onboardingReleaseDate.toISOString(),
            });
            yield fetchAndRender();
            yield screen.findByText('This course contains proctored exams');
            expect(screen.queryByText('Your submitted profile is in review.')).toBeInTheDocument();
            expect(screen.queryByText('Onboarding profile review can take 2+ business days.')).toBeInTheDocument();
        }));
        it('appears for other_course_approved if not expiring soon', () => __awaiter(void 0, void 0, void 0, function* () {
            const expirationDate = new Date();
            // Set the expiration date 40 days in the future, so as not to trigger the 28 day expiration warning
            expirationDate.setTime(expirationDate.getTime() + 3456900000);
            axiosMock.onGet(proctoringInfoUrl).reply(200, {
                onboarding_status: 'other_course_approved',
                onboarding_link: 'test',
                expiration_date: expirationDate.toString(),
                onboarding_release_date: onboardingReleaseDate.toISOString(),
            });
            yield fetchAndRender();
            yield screen.findByText('This course contains proctored exams');
            expect(screen.queryByText('Your onboarding exam has been approved in another course.')).toBeInTheDocument();
            expect(screen.queryByText('Onboarding profile review can take 2+ business days.')).not.toBeInTheDocument();
        }));
        it('displays expiration warning', () => __awaiter(void 0, void 0, void 0, function* () {
            const expirationDate = new Date();
            // This message will render if the expiration date is within 28 days; set the date 10 days in future
            expirationDate.setTime(expirationDate.getTime() + 864800000);
            axiosMock.onGet(proctoringInfoUrl).reply(200, {
                onboarding_status: 'verified',
                onboarding_link: 'test',
                expiration_date: expirationDate.toString(),
                onboarding_release_date: onboardingReleaseDate.toISOString(),
            });
            yield fetchAndRender();
            yield screen.findByText('This course contains proctored exams');
            expect(screen.queryByText('Your onboarding profile has been approved. However, your onboarding status is expiring soon. Please complete onboarding again to ensure that you will be able to continue taking proctored exams.')).toBeInTheDocument();
            expect(screen.queryByText('Onboarding profile review can take 2+ business days.')).toBeInTheDocument();
        }));
        it('displays expiration warning for other course', () => __awaiter(void 0, void 0, void 0, function* () {
            const expirationDate = new Date();
            // This message will render if the expiration date is within 28 days; set the date 10 days in future
            expirationDate.setTime(expirationDate.getTime() + 864800000);
            axiosMock.onGet(proctoringInfoUrl).reply(200, {
                onboarding_status: 'other_course_approved',
                onboarding_link: 'test',
                expiration_date: expirationDate.toString(),
                onboarding_release_date: onboardingReleaseDate.toISOString(),
            });
            yield fetchAndRender();
            yield screen.findByText('This course contains proctored exams');
            expect(screen.queryByText('Your onboarding profile has been approved. However, your onboarding status is expiring soon. Please complete onboarding again to ensure that you will be able to continue taking proctored exams.')).toBeInTheDocument();
            expect(screen.queryByText('Onboarding profile review can take 2+ business days.')).toBeInTheDocument();
        }));
        it('displays expired', () => __awaiter(void 0, void 0, void 0, function* () {
            const expirationDate = new Date();
            // This message appears after expiration, set the date 10 days in the past
            expirationDate.setTime(expirationDate.getTime() - 864800000);
            axiosMock.onGet(proctoringInfoUrl).reply(200, {
                onboarding_status: 'verified',
                onboarding_link: 'test',
                expiration_date: expirationDate.toString(),
                onboarding_release_date: onboardingReleaseDate.toISOString(),
            });
            yield fetchAndRender();
            yield screen.findByText('This course contains proctored exams');
            expect(screen.queryByText('Your onboarding status has expired. Please complete onboarding again to continue taking proctored exams.')).toBeInTheDocument();
            expect(screen.queryByText('Onboarding profile review can take 2+ business days.')).toBeInTheDocument();
        }));
        it('appears for no status', () => __awaiter(void 0, void 0, void 0, function* () {
            axiosMock.onGet(proctoringInfoUrl).reply(200, {
                onboarding_status: '',
                onboarding_link: 'test',
                expiration_date: null,
                onboarding_release_date: onboardingReleaseDate.toISOString(),
            });
            yield fetchAndRender();
            yield screen.findByText('This course contains proctored exams');
            expect(screen.queryByRole('link', { name: 'Complete Onboarding' })).toBeInTheDocument();
            expect(screen.queryByRole('link', { name: 'Review instructions and system requirements' })).toBeInTheDocument();
            expect(screen.queryByText('You must complete the onboarding process prior to taking any proctored exam.')).toBeInTheDocument();
            expect(screen.queryByText('Onboarding profile review can take 2+ business days.')).toBeInTheDocument();
        }));
        it('does not appear for 404', () => __awaiter(void 0, void 0, void 0, function* () {
            axiosMock.onGet(proctoringInfoUrl).reply(404);
            yield fetchAndRender();
            expect(screen.queryByRole('link', { name: 'Review instructions and system requirements' })).not.toBeInTheDocument();
        }));
        it('appears with a disabled link if onboarding not yet released', () => __awaiter(void 0, void 0, void 0, function* () {
            const futureReleaseDate = new Date();
            futureReleaseDate.setDate(new Date().getDate() + 7);
            const expectedDateStr = new Intl.DateTimeFormat('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            }).format(futureReleaseDate);
            axiosMock.onGet(proctoringInfoUrl).reply(200, {
                onboarding_status: '',
                onboarding_link: 'test',
                expiration_date: null,
                onboarding_release_date: futureReleaseDate.toISOString(),
            });
            yield fetchAndRender();
            yield screen.findByText('This course contains proctored exams');
            expect(screen.queryByText(`Onboarding Opens: ${expectedDateStr}`)).toBeInTheDocument();
        }));
        it('appears and ignores a missing release date', () => __awaiter(void 0, void 0, void 0, function* () {
            axiosMock.onGet(proctoringInfoUrl).reply(200, {
                onboarding_status: 'verified',
                onboarding_link: 'test',
                expiration_date: null,
                onboarding_release_date: onboardingReleaseDate.toISOString(),
            });
            yield fetchAndRender();
            yield screen.findByText('This course contains proctored exams');
            expect(screen.queryByRole('link', { name: 'Complete Onboarding' })).not.toBeInTheDocument();
            expect(screen.queryByRole('link', { name: 'Review instructions and system requirements' })).toBeInTheDocument();
            expect(screen.queryByText('You must complete the onboarding process prior to taking any proctored exam.')).not.toBeInTheDocument();
            expect(screen.queryByText('Onboarding profile review can take 2+ business days.')).not.toBeInTheDocument();
        }));
    });
    describe('Account Activation Alert', () => {
        beforeEach(() => {
            const intersectionObserverMock = () => ({
                observe: () => null,
                disconnect: () => null,
            });
            window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);
        });
        it('displays account activation alert if cookie is set true', () => __awaiter(void 0, void 0, void 0, function* () {
            Cookies.set = jest.fn();
            Cookies.get = jest.fn().mockImplementation(() => 'true');
            Cookies.remove = jest.fn().mockImplementation(() => { Cookies.get = jest.fn(); });
            yield fetchAndRender();
            expect(screen.queryByText('Activate your account so you can log back in')).toBeInTheDocument();
            expect(screen.queryByRole('button', { name: 'resend the email' })).toBeInTheDocument();
        }));
        it('do not displays account activation alert if cookie is not set true', () => __awaiter(void 0, void 0, void 0, function* () {
            Cookies.set = jest.fn();
            Cookies.get = jest.fn();
            Cookies.remove = jest.fn().mockImplementation(() => { Cookies.get = jest.fn(); });
            yield fetchAndRender();
            expect(screen.queryByText('Activate your account so you can log back in')).not.toBeInTheDocument();
            expect(screen.queryByRole('button', { name: 'resend the email' })).not.toBeInTheDocument();
        }));
        it('sends account activation email on clicking the re-send email in account activation alert', () => __awaiter(void 0, void 0, void 0, function* () {
            Cookies.set = jest.fn();
            Cookies.get = jest.fn().mockImplementation(() => 'true');
            Cookies.remove = jest.fn().mockImplementation(() => { Cookies.get = jest.fn(); });
            yield fetchAndRender();
            axiosMock = new MockAdapter(getAuthenticatedHttpClient());
            const resendEmailUrl = `${getConfig().LMS_BASE_URL}/api/send_account_activation_email`;
            axiosMock.onPost(resendEmailUrl).reply(200, {});
            const resendLink = screen.getByRole('button', { name: 'resend the email' });
            fireEvent.click(resendLink);
            yield waitFor(() => expect(axiosMock.history.post).toHaveLength(1));
            expect(axiosMock.history.post[0].url).toEqual(resendEmailUrl);
        }));
        it('section should show hidden from toc message when hide_from_toc is true', () => __awaiter(void 0, void 0, void 0, function* () {
            const { courseBlocks } = yield buildMinimalCourseBlocks(courseId, 'Title', { resumeBlock: true });
            const courseBlocksIds = Object.keys(courseBlocks.blocks);
            const newCourseBlocks = courseBlocksIds.reduce((blocks, blockId) => (Object.assign(Object.assign({}, blocks), { [blockId]: Object.assign(Object.assign({}, courseBlocks.blocks[blockId]), { hide_from_toc: true }) })), {});
            setTabData({
                course_blocks: { blocks: newCourseBlocks },
            });
            yield fetchAndRender();
            const iconHiddenFromTocSectionNode = screen.getByTestId('hide-from-toc-section-icon');
            const textHiddenFromTocSectionNode = screen.getByTestId('hide-from-toc-section-text');
            expect(iconHiddenFromTocSectionNode).toBeInTheDocument();
            expect(textHiddenFromTocSectionNode).toBeInTheDocument();
            expect(textHiddenFromTocSectionNode.textContent).toBe('Hidden in Course Outline, accessible via link');
        }));
        it('section should not show hidden from toc message when hide_from_toc is false', () => __awaiter(void 0, void 0, void 0, function* () {
            const { courseBlocks } = yield buildMinimalCourseBlocks(courseId, 'Title', { resumeBlock: true });
            const courseBlocksIds = Object.keys(courseBlocks.blocks);
            const newCourseBlocks = courseBlocksIds.reduce((blocks, blockId) => (Object.assign(Object.assign({}, blocks), { [blockId]: Object.assign(Object.assign({}, courseBlocks.blocks[blockId]), { hide_from_toc: false }) })), {});
            setTabData({
                course_blocks: { blocks: newCourseBlocks },
            });
            yield fetchAndRender();
            const iconHiddenFromTocSectionNode = screen.queryByTestId('hide-from-toc-section-icon');
            const textHiddenFromTocSectionNode = screen.queryByTestId('hide-from-toc-section-text');
            expect(iconHiddenFromTocSectionNode).not.toBeInTheDocument();
            expect(textHiddenFromTocSectionNode).not.toBeInTheDocument();
        }));
        it('sequence link should show hidden from toc message when hide_from_toc is true', () => __awaiter(void 0, void 0, void 0, function* () {
            const { courseBlocks } = yield buildMinimalCourseBlocks(courseId, 'Title', { resumeBlock: true });
            const courseBlocksIds = Object.keys(courseBlocks.blocks);
            const newCourseBlocks = courseBlocksIds.reduce((blocks, blockId) => (Object.assign(Object.assign({}, blocks), { [blockId]: Object.assign(Object.assign({}, courseBlocks.blocks[blockId]), { hide_from_toc: true }) })), {});
            setTabData({
                course_blocks: { blocks: newCourseBlocks },
            });
            yield fetchAndRender();
            const iconHiddenFromTocSequenceLinkNode = screen.getByTestId('hide-from-toc-sequence-link-icon');
            const textHiddenFromTocSequenceLink = screen.getByTestId('hide-from-toc-sequence-link-text');
            expect(iconHiddenFromTocSequenceLinkNode).toBeInTheDocument();
            expect(textHiddenFromTocSequenceLink).toBeInTheDocument();
            expect(textHiddenFromTocSequenceLink.textContent).toBe('Subsections are not navigable between each other, they can only be accessed through their link.');
        }));
        it('sequence link not show hidden from toc message when hide_from_toc is false', () => __awaiter(void 0, void 0, void 0, function* () {
            const { courseBlocks } = yield buildMinimalCourseBlocks(courseId, 'Title', { resumeBlock: true });
            const courseBlocksIds = Object.keys(courseBlocks.blocks);
            const newCourseBlocks = courseBlocksIds.reduce((blocks, blockId) => (Object.assign(Object.assign({}, blocks), { [blockId]: Object.assign(Object.assign({}, courseBlocks.blocks[blockId]), { hide_from_toc: false }) })), {});
            setTabData({
                course_blocks: { blocks: newCourseBlocks },
            });
            yield fetchAndRender();
            const iconHiddenFromTocSequenceLink = screen.queryByTestId('hide-from-toc-sequence-link-icon');
            const textHiddenFromTocSequenceLink = screen.queryByTestId('hide-from-toc-sequence-link-text');
            expect(iconHiddenFromTocSequenceLink).not.toBeInTheDocument();
            expect(textHiddenFromTocSequenceLink).not.toBeInTheDocument();
        }));
    });
});
//# sourceMappingURL=OutlineTab.test.js.map