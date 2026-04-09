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
import MockAdapter from 'axios-mock-adapter';
import { Factory } from 'rosie';
import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { waitFor } from '@testing-library/react';
import { fetchCourse } from '../../data';
import { buildSimpleCourseBlocks } from '../../../shared/data/__factories__/courseBlocks.factory';
import { buildOutlineFromBlocks } from '../../data/__factories__/learningSequencesOutline.factory';
import { initializeMockApp, logUnhandledRequests, render, screen, } from '../../../setupTest';
import initializeStore from '../../../store';
import { appendBrowserTimezoneToUrl, executeThunk } from '../../../utils';
import CourseCelebration from './CourseCelebration';
import CourseExit from './CourseExit';
import CourseInProgress from './CourseInProgress';
import CourseNonPassing from './CourseNonPassing';
initializeMockApp();
jest.mock('@edx/frontend-platform/analytics');
describe('Course Exit Pages', () => {
    let axiosMock;
    let store;
    const coursewareMetadata = Factory.build('courseMetadata', {
        user_has_passing_grade: true,
        end: '2014-02-05T05:00:00Z',
    });
    const courseId = coursewareMetadata.id;
    const courseHomeMetadata = Factory.build('courseHomeMetadata');
    const { courseBlocks: defaultCourseBlocks } = buildSimpleCourseBlocks(courseId, courseHomeMetadata.title);
    let coursewareMetadataUrl = `${getConfig().LMS_BASE_URL}/api/courseware/course/${courseId}`;
    coursewareMetadataUrl = appendBrowserTimezoneToUrl(coursewareMetadataUrl);
    const courseHomeMetadataUrl = appendBrowserTimezoneToUrl(`${getConfig().LMS_BASE_URL}/api/course_home/course_metadata/${courseId}`);
    const discoveryRecommendationsUrl = new RegExp(`${getConfig().DISCOVERY_API_BASE_URL}/api/v1/course_recommendations/*`);
    const enrollmentsUrl = new RegExp(`${getConfig().LMS_BASE_URL}/api/enrollment/v1/enrollment*`);
    const learningSequencesUrlRegExp = new RegExp(`${getConfig().LMS_BASE_URL}/api/learning_sequences/v1/course_outline/*`);
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const overmorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2);
    function setMetadata(coursewareAttributes, courseHomeAttributes = {}) {
        const extendedCourseMetadata = Object.assign(Object.assign({}, coursewareMetadata), coursewareAttributes);
        axiosMock.onGet(coursewareMetadataUrl).reply(200, extendedCourseMetadata);
        const extendedCourseHomeMetadata = Object.assign(Object.assign({}, courseHomeMetadata), courseHomeAttributes);
        axiosMock.onGet(courseHomeMetadataUrl).reply(200, extendedCourseHomeMetadata);
    }
    function fetchAndRender(component) {
        return __awaiter(this, void 0, void 0, function* () {
            yield executeThunk(fetchCourse(courseId), store.dispatch);
            render(component, { store, wrapWithRouter: true });
        });
    }
    beforeEach(() => {
        store = initializeStore();
        axiosMock = new MockAdapter(getAuthenticatedHttpClient());
        axiosMock.onGet(coursewareMetadataUrl).reply(200, coursewareMetadata);
        axiosMock.onGet(courseHomeMetadataUrl).reply(200, courseHomeMetadata);
        axiosMock.onGet(discoveryRecommendationsUrl).reply(200, Factory.build('courseRecommendations', {}, { numRecs: 2 }));
        axiosMock.onGet(enrollmentsUrl).reply(200, []);
        axiosMock.onGet(learningSequencesUrlRegExp).reply(200, buildOutlineFromBlocks(defaultCourseBlocks));
        logUnhandledRequests(axiosMock);
    });
    describe('Course Exit routing', () => {
        it('Routes to celebration for a celebration status', () => __awaiter(void 0, void 0, void 0, function* () {
            setMetadata({
                certificate_data: {
                    cert_status: 'downloadable',
                    cert_web_view_url: '/certificates/cooluuidgoeshere',
                },
                enrollment: {
                    is_active: true,
                },
            });
            yield fetchAndRender(_jsx(CourseExit, {}));
            expect(screen.getByText('Congratulations!')).toBeInTheDocument();
        }));
        it('Routes to Non-passing experience for a learner with non-passing grade', () => __awaiter(void 0, void 0, void 0, function* () {
            setMetadata({
                certificate_data: {
                    cert_status: 'unverified',
                },
                enrollment: {
                    is_active: true,
                },
                user_has_passing_grade: false,
            });
            yield fetchAndRender(_jsx(CourseExit, {}));
            expect(screen.getByText('You’ve reached the end of the course!')).toBeInTheDocument();
        }));
        it('Redirects if it does not match any statuses', () => __awaiter(void 0, void 0, void 0, function* () {
            setMetadata({
                certificate_data: {
                    cert_status: 'bogus_status',
                },
            });
            yield fetchAndRender(_jsx(CourseExit, {}));
            expect(global.location.href).toEqual(`http://localhost/course/${courseId}`);
        }));
    });
    describe('Course Celebration Experience', () => {
        it('Displays webview link', () => __awaiter(void 0, void 0, void 0, function* () {
            setMetadata({
                certificate_data: {
                    cert_status: 'downloadable',
                    cert_web_view_url: '/certificates/cooluuidgoeshere',
                },
            });
            yield fetchAndRender(_jsx(CourseCelebration, {}));
            expect(screen.getByRole('link', { name: 'View my certificate' })).toBeInTheDocument();
            expect(screen.getByRole('img', { name: 'Sample certificate' })).toBeInTheDocument();
        }));
        it('Displays certificate is earned but unavailable message', () => __awaiter(void 0, void 0, void 0, function* () {
            setMetadata({
                certificate_data: {
                    cert_status: 'earned_but_not_available',
                    certificate_available_date: '2021-05-21T12:00:00Z',
                },
            });
            yield fetchAndRender(_jsx(CourseCelebration, {}));
            expect(screen.getByText('Your grade and certificate status will be available soon.')).toBeInTheDocument();
        }));
        it('Displays request certificate link', () => __awaiter(void 0, void 0, void 0, function* () {
            setMetadata({ certificate_data: { cert_status: 'requesting' } });
            yield fetchAndRender(_jsx(CourseCelebration, {}));
            expect(screen.getByRole('button', { name: 'Request certificate' })).toBeInTheDocument();
        }));
        it('Displays social share icons', () => __awaiter(void 0, void 0, void 0, function* () {
            setMetadata({ certificate_data: { cert_status: 'unverified' }, marketing_url: 'https://edx.org' });
            yield fetchAndRender(_jsx(CourseCelebration, {}));
            expect(screen.getByRole('button', { name: 'linkedin' })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: 'facebook' })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: 'twitter' })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: 'email' })).toBeInTheDocument();
        }));
        it('Does not display social share icons if no marketing URL', () => __awaiter(void 0, void 0, void 0, function* () {
            setMetadata({ certificate_data: { cert_status: 'unverified' } });
            yield fetchAndRender(_jsx(CourseCelebration, {}));
            expect(screen.queryByRole('button', { name: 'linkedin' })).not.toBeInTheDocument();
            expect(screen.queryByRole('button', { name: 'facebook' })).not.toBeInTheDocument();
            expect(screen.queryByRole('button', { name: 'twitter' })).not.toBeInTheDocument();
            expect(screen.queryByRole('button', { name: 'email' })).not.toBeInTheDocument();
        }));
        it('Displays verify identity link', () => __awaiter(void 0, void 0, void 0, function* () {
            setMetadata({
                certificate_data: { cert_status: 'unverified' },
                verify_identity_url: `${getConfig().LMS_BASE_URL}/verify_student/verify-now/${courseId}/`,
            });
            yield fetchAndRender(_jsx(CourseCelebration, {}));
            expect(screen.getByRole('link', { name: 'Verify ID now' })).toBeInTheDocument();
            expect(screen.queryByRole('img', { name: 'Sample certificate' })).not.toBeInTheDocument();
        }));
        it('Displays verification pending message', () => __awaiter(void 0, void 0, void 0, function* () {
            setMetadata({
                certificate_data: { cert_status: 'unverified' },
                verification_status: 'pending',
                verify_identity_url: `${getConfig().LMS_BASE_URL}/verify_student/verify-now/${courseId}/`,
            });
            yield fetchAndRender(_jsx(CourseCelebration, {}));
            expect(screen.getByText('Your ID verification is pending and your certificate will be available once approved.')).toBeInTheDocument();
            expect(screen.queryByRole('link', { name: 'Verify ID now' })).not.toBeInTheDocument();
            expect(screen.queryByRole('img', { name: 'Sample certificate' })).not.toBeInTheDocument();
        }));
        it('Displays upgrade link when available', () => __awaiter(void 0, void 0, void 0, function* () {
            setMetadata({
                certificate_data: { cert_status: 'audit_passing' },
            }, {
                verified_mode: {
                    access_expiration_date: '9999-08-06T12:00:00Z',
                    upgrade_url: 'http://localhost:18130/basket/add/?sku=8CF08E5',
                    price: 600,
                    currency_symbol: '€',
                },
            });
            yield fetchAndRender(_jsx(CourseCelebration, {}));
            // Keep these text checks in sync with "audit only" test below, so it doesn't end up checking for text that is
            // never actually there, when/if the text changes.
            expect(screen.getByText('Upgrade to pursue a verified certificate')).toBeInTheDocument();
            expect(screen.getByText('For €600 you will unlock access', { exact: false })).toBeInTheDocument();
            expect(screen.getByRole('link', { name: 'Upgrade now' })).toBeInTheDocument();
            const node = screen.getByText('Access to this course and its materials', { exact: false });
            expect(node.textContent).toMatch(/until August 6, 9999\./);
        }));
        it('Displays nothing if audit only', () => __awaiter(void 0, void 0, void 0, function* () {
            setMetadata({
                certificate_data: { cert_status: 'audit_passing' },
            }, {
                verified_mode: null,
            });
            yield fetchAndRender(_jsx(CourseCelebration, {}));
            // Keep these queries in sync with "upgrade link" test above, so we don't end up checking for text that is
            // never actually there, when/if the text changes.
            expect(screen.queryByText('Upgrade to pursue a verified certificate')).not.toBeInTheDocument();
            expect(screen.queryByRole('button', { name: 'Upgrade now' })).not.toBeInTheDocument();
        }));
        it('Displays LinkedIn Add to Profile button', () => __awaiter(void 0, void 0, void 0, function* () {
            setMetadata({
                certificate_data: {
                    cert_status: 'downloadable',
                    cert_web_view_url: '/certificates/cooluuidgoeshere',
                },
                linkedin_add_to_profile_url: 'https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&params',
            });
            yield fetchAndRender(_jsx(CourseCelebration, {}));
            expect(screen.getByRole('link', { name: 'View my certificate' })).toBeInTheDocument();
            expect(screen.getByRole('link', { name: 'Add to LinkedIn profile' })).toBeInTheDocument();
        }));
        describe('Program Completion experience', () => {
            beforeEach(() => {
                setMetadata({
                    certificate_data: {
                        cert_status: 'downloadable',
                        cert_web_view_url: '/certificates/cooluuidgoeshere',
                    },
                });
            });
            it('Does not render ProgramCompletion no related programs', () => __awaiter(void 0, void 0, void 0, function* () {
                yield fetchAndRender(_jsx(CourseCelebration, {}));
                expect(screen.queryByTestId('program-completion')).not.toBeInTheDocument();
            }));
            it('Does not render ProgramCompletion if program is incomplete', () => __awaiter(void 0, void 0, void 0, function* () {
                setMetadata({
                    related_programs: [{
                            progress: {
                                completed: 1,
                                in_progress: 1,
                                not_started: 1,
                            },
                            slug: 'micromasters',
                            title: 'Example MicroMasters Program',
                            uuid: '123456',
                            url: 'http://localhost:18000/dashboard/programs/123456',
                        }],
                });
                yield fetchAndRender(_jsx(CourseCelebration, {}));
                expect(screen.queryByTestId('program-completion')).not.toBeInTheDocument();
            }));
            it('Renders ProgramCompletion if program is complete', () => __awaiter(void 0, void 0, void 0, function* () {
                setMetadata({
                    related_programs: [{
                            progress: {
                                completed: 3,
                                in_progress: 0,
                                not_started: 0,
                            },
                            slug: 'micromasters',
                            title: 'Example MicroMasters Program',
                            uuid: '123456',
                            url: 'http://localhost:18000/dashboard/programs/123456',
                        }],
                });
                yield fetchAndRender(_jsx(CourseCelebration, {}));
                expect(screen.queryByTestId('program-completion')).toBeInTheDocument();
                expect(screen.queryByTestId('micromasters')).toBeInTheDocument();
            }));
            it('Does not render ProgramCompletion if program is an excluded type', () => __awaiter(void 0, void 0, void 0, function* () {
                setMetadata({
                    related_programs: [{
                            progress: {
                                completed: 3,
                                in_progress: 0,
                                not_started: 0,
                            },
                            slug: 'excluded-program-type',
                            title: 'Example Excluded Program',
                            uuid: '123456',
                            url: 'http://localhost:18000/dashboard/programs/123456',
                        }],
                });
                yield fetchAndRender(_jsx(CourseCelebration, {}));
                expect(screen.queryByTestId('program-completion')).not.toBeInTheDocument();
                expect(screen.queryByTestId('excluded-program-type')).not.toBeInTheDocument();
            }));
        });
        describe('Course recommendations', () => {
            it('Displays recommendations if at least two are available', () => __awaiter(void 0, void 0, void 0, function* () {
                yield fetchAndRender(_jsx(CourseCelebration, {}));
                const recommendationsTable = yield screen.findByTestId('course-recommendations');
                expect(recommendationsTable).toBeInTheDocument();
                expect(screen.queryByTestId('catalog-suggestion')).not.toBeInTheDocument();
            }));
            it('Displays the generic catalog suggestion if fewer than two recommendations are available', () => __awaiter(void 0, void 0, void 0, function* () {
                axiosMock.onGet(discoveryRecommendationsUrl).reply(200, Factory.build('courseRecommendations', {}, { numRecs: 1 }));
                yield fetchAndRender(_jsx(CourseCelebration, {}));
                const catalogSuggestion = yield screen.findByTestId('catalog-suggestion');
                expect(catalogSuggestion).toBeInTheDocument();
                expect(screen.queryByTestId('course-recommendations')).not.toBeInTheDocument();
            }));
            it('Will not recommend a course in which the user is already enrolled', () => __awaiter(void 0, void 0, void 0, function* () {
                const initialRecommendations = Factory.build('courseRecommendations', {}, { numRecs: 2 });
                initialRecommendations.recommendations.push(Factory.build('courseRecommendation', { key: 'edX+EnrolledX', title: 'Already Enrolled' }));
                initialRecommendations.recommendations.push(Factory.build('courseRecommendation', { key: 'edX+NotEnrolledX', title: 'Not Already Enrolled' }));
                axiosMock.onGet(discoveryRecommendationsUrl).reply(200, initialRecommendations);
                axiosMock.onGet(enrollmentsUrl).reply(200, [
                    Factory.build('userEnrollment', '', {
                        runKey: 'edX+EnrolledX+1T2021',
                    }),
                ]);
                yield fetchAndRender(_jsx(CourseCelebration, {}));
                const recommendationsTable = yield screen.findByTestId('course-recommendations');
                expect(recommendationsTable).toBeInTheDocument();
                expect(screen.queryByText('Already Enrolled')).not.toBeInTheDocument();
                expect(screen.queryByText('Not Already Enrolled')).toBeInTheDocument();
            }));
            it('Will not recommend the same course that the user just finished', () => __awaiter(void 0, void 0, void 0, function* () {
                // the uuid returned from the call to discovery is the uuid of the current course
                const initialRecommendations = Factory.build('courseRecommendations', { uuid: 'my_uuid' }, { numRecs: 2 });
                initialRecommendations.recommendations.push(Factory.build('courseRecommendation', { uuid: 'my_uuid', title: 'Same Course' }));
                axiosMock.onGet(discoveryRecommendationsUrl).reply(200, initialRecommendations);
                yield fetchAndRender(_jsx(CourseCelebration, {}));
                const recommendationsTable = yield screen.findByTestId('course-recommendations');
                expect(recommendationsTable).toBeInTheDocument();
                expect(screen.queryByText('Same Course')).not.toBeInTheDocument();
            }));
        });
        it('Shows not available messaging before certificates are available to nonpassing learners when theres no certificate data', () => __awaiter(void 0, void 0, void 0, function* () {
            setMetadata({
                is_enrolled: true,
                end: tomorrow.toISOString(),
                user_has_passing_grade: false,
                certificate_data: undefined,
            }, {
                can_view_certificate: false,
            });
            yield fetchAndRender(_jsx(CourseCelebration, {}));
            expect(screen.getByText(`Final grades and any earned certificates are scheduled to be available after ${tomorrow.toLocaleDateString('en-us', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            })}.`)).toBeInTheDocument();
        }));
        it('Shows not available messaging before certificates are available to passing learners when theres no certificate data', () => __awaiter(void 0, void 0, void 0, function* () {
            setMetadata({
                is_enrolled: true,
                end: tomorrow.toISOString(),
                user_has_passing_grade: true,
                certificate_data: undefined,
            }, {
                can_view_certificate: false,
            });
            yield fetchAndRender(_jsx(CourseCelebration, {}));
            expect(screen.getByText(`Final grades and any earned certificates are scheduled to be available after ${tomorrow.toLocaleDateString('en-us', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            })}.`)).toBeInTheDocument();
        }));
        it('Shows certificate_available_date if learner is passing', () => __awaiter(void 0, void 0, void 0, function* () {
            setMetadata({
                is_enrolled: true,
                end: tomorrow.toISOString(),
                user_has_passing_grade: true,
                certificate_data: {
                    cert_status: 'earned_but_not_available',
                    certificate_available_date: overmorrow.toISOString(),
                },
            }, {
                can_view_certificate: false,
            });
            yield fetchAndRender(_jsx(CourseCelebration, {}));
            expect(screen.getByText('Your grade and certificate status will be available soon.'));
            expect(screen.getByText(overmorrow.toLocaleDateString('en-us', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }), { exact: false })).toBeInTheDocument();
        }));
    });
    describe('Course Non-passing Experience', () => {
        it('Displays link to progress tab', () => __awaiter(void 0, void 0, void 0, function* () {
            setMetadata({ user_has_passing_grade: false });
            yield fetchAndRender(_jsx(CourseNonPassing, {}));
            expect(screen.getByText('You’ve reached the end of the course!')).toBeInTheDocument();
            expect(screen.getByRole('link', { name: 'View grades' })).toBeInTheDocument();
        }));
    });
    describe('Course in progress experience', () => {
        it('Displays link to dates tab', () => __awaiter(void 0, void 0, void 0, function* () {
            setMetadata({ user_has_passing_grade: false });
            const { courseBlocks } = buildSimpleCourseBlocks(courseId, courseHomeMetadata.title, { hasScheduledContent: true });
            axiosMock.onGet(learningSequencesUrlRegExp).reply(200, buildOutlineFromBlocks(courseBlocks));
            yield fetchAndRender(_jsx(CourseInProgress, {}));
            expect(screen.getByText('More content is coming soon!')).toBeInTheDocument();
            expect(screen.getByRole('link', { name: 'View course schedule' })).toBeInTheDocument();
        }));
    });
    it('unsubscribes the user when loading the course exit page', () => __awaiter(void 0, void 0, void 0, function* () {
        setMetadata({
            enrollment: {
                mode: 'audit',
                courseGoals: {
                    goal_options: [],
                    selected_goal: {
                        days_per_week: 1,
                        subscribed_to_reminders: true,
                    },
                },
            },
        });
        yield fetchAndRender(_jsx(CourseExit, {}));
        const url = `${getConfig().LMS_BASE_URL}/api/course_home/save_course_goal`;
        yield waitFor(() => {
            expect(axiosMock.history.post[0].url).toMatch(url);
            expect(axiosMock.history.post[0].data).toMatch(`{"course_id":"${courseId}","subscribed_to_reminders":false}`);
        });
    }));
});
//# sourceMappingURL=CourseExit.test.js.map