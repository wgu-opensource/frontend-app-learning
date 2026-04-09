import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { FormattedDate, FormattedMessage, useIntl } from '@edx/frontend-platform/i18n';
import { Button, Card } from '@openedx/paragon';
import { getConfig } from '@edx/frontend-platform';
import { useContextId } from '../../../data/hooks';
import { useModel } from '../../../generic/model-store';
import { COURSE_EXIT_MODES, getCourseExitMode } from '../../../courseware/course/course-exit/utils';
import { DashboardLink, IdVerificationSupportLink, ProfileLink } from '../../../shared/links';
import { requestCert } from '../../data/thunks';
import messages from './messages';
import ProgressCertificateStatusSlot from '../../../plugin-slots/ProgressCertificateStatusSlot';
const CertificateStatus = () => {
    var _a;
    const intl = useIntl();
    const courseId = useContextId();
    const { entranceExamData, } = useModel('coursewareMeta', courseId);
    const { isEnrolled, org, canViewCertificate, userTimezone, } = useModel('courseHomeMeta', courseId);
    const { certificateData, end, enrollmentMode, gradingPolicy: { gradeRange, }, hasScheduledContent, userHasPassingGrade, verificationData, verifiedMode, } = useModel('progress', courseId);
    const { certificateAvailableDate, } = certificateData || {};
    const entranceExamPassed = (_a = entranceExamData === null || entranceExamData === void 0 ? void 0 : entranceExamData.entranceExamPassed) !== null && _a !== void 0 ? _a : null;
    const mode = getCourseExitMode(certificateData, hasScheduledContent, isEnrolled, userHasPassingGrade, null, // CourseExitPageIsActive
    canViewCertificate, entranceExamPassed);
    const eventProperties = {
        org_key: org,
        courserun_key: courseId,
    };
    const dispatch = useDispatch();
    const { administrator } = getAuthenticatedUser();
    let certStatus;
    let certWebViewUrl;
    const timezoneFormatArgs = userTimezone ? { timeZone: userTimezone } : {};
    if (certificateData) {
        certStatus = certificateData.certStatus;
        certWebViewUrl = certificateData.certWebViewUrl;
    }
    let certCase;
    let certEventName = certStatus;
    let body;
    let buttonAction;
    let buttonLocation;
    let buttonText;
    let endDate;
    let certAvailabilityDate;
    let gradeEventName = 'not_passing';
    if (userHasPassingGrade) {
        gradeEventName = Object.entries(gradeRange).length > 1 ? 'passing_grades' : 'passing';
    }
    const dashboardLink = _jsx(DashboardLink, {});
    const idVerificationSupportLink = _jsx(IdVerificationSupportLink, {});
    const profileLink = _jsx(ProfileLink, {});
    // Some learners have a valid ("downloadable") certificate without being in a passing
    // state (e.g. learners who have been added to a course's allowlist), so we need to
    // skip grade validation for these learners
    const certIsDownloadable = certStatus === 'downloadable';
    if (mode === COURSE_EXIT_MODES.disabled) {
        certEventName = 'certificate_status_disabled';
    }
    else if (mode === COURSE_EXIT_MODES.nonPassing && !certIsDownloadable) {
        certCase = 'notPassing';
        certEventName = 'not_passing';
        body = intl.formatMessage(messages[`${certCase}Body`]);
    }
    else if (mode === COURSE_EXIT_MODES.inProgress && !certIsDownloadable) {
        certCase = 'inProgress';
        certEventName = 'has_scheduled_content';
        body = intl.formatMessage(messages[`${certCase}Body`]);
    }
    else if (mode === COURSE_EXIT_MODES.celebration || certIsDownloadable) {
        switch (certStatus) {
            case 'requesting':
                certCase = 'requestable';
                buttonAction = () => { dispatch(requestCert(courseId)); };
                body = intl.formatMessage(messages[`${certCase}Body`]);
                buttonText = intl.formatMessage(messages[`${certCase}Button`]);
                break;
            case 'unverified':
                certCase = 'unverified';
                if (verificationData.status === 'pending') {
                    body = (_jsx("p", { children: intl.formatMessage(messages.unverifiedPendingBody) }));
                }
                else {
                    body = (_jsx(FormattedMessage, { id: "progress.certificateStatus.unverifiedBody", defaultMessage: "In order to generate a certificate, you must complete ID verification. {idVerificationSupportLink}.", description: "Its shown when learner are not verified thus it recommends going over the verification process", values: { idVerificationSupportLink } }));
                    buttonLocation = verificationData.link;
                    buttonText = intl.formatMessage(messages[`${certCase}Button`]);
                }
                break;
            case 'downloadable':
                // Certificate available, download/viewable
                certCase = 'downloadable';
                body = (_jsx(FormattedMessage, { id: "progress.certificateStatus.downloadableBody", defaultMessage: "\n              Showcase your accomplishment on LinkedIn or your resum\u00E9 today.\n              You can download your certificate now and access it any time from your\n              {dashboardLink} and {profileLink}.", description: "Recommending an action for learner when course certificate is available", values: { dashboardLink, profileLink } }));
                if (certWebViewUrl) {
                    certEventName = 'earned_viewable';
                    buttonLocation = `${getConfig().LMS_BASE_URL}${certWebViewUrl}`;
                    buttonText = intl.formatMessage(messages.viewableButton);
                }
                break;
            case 'earned_but_not_available':
                certCase = 'notAvailable';
                endDate = _jsx(FormattedDate, { value: end, day: "numeric", month: "long", year: "numeric" });
                certAvailabilityDate = _jsx(FormattedDate, { value: certificateAvailableDate, day: "numeric", month: "long", year: "numeric" });
                body = (_jsx(FormattedMessage, { id: "progress.certificateStatus.notAvailable.endDate", defaultMessage: "This course ends on {endDate}. Final grades and any earned certificates are\n            scheduled to be available after {certAvailabilityDate}.", description: "This shown for leaner when they are eligible for certifcate but it't not available yet, it could because leaners just finished the course quickly!", values: { endDate, certAvailabilityDate } }));
                break;
            case 'audit_passing':
            case 'honor_passing':
                if (verifiedMode) {
                    certCase = 'upgrade';
                    body = intl.formatMessage(messages[`${certCase}Body`]);
                    buttonLocation = verifiedMode.upgradeUrl;
                    buttonText = intl.formatMessage(messages[`${certCase}Button`]);
                }
                else {
                    certCase = null; // Do not render the certificate component if the upgrade deadline has passed
                    certEventName = 'audit_passing_missed_upgrade_deadline';
                }
                break;
            default:
                // if user completes a course before certificates are available, treat it as notAvailable
                // regardless of passing or nonpassing status
                if (!canViewCertificate) {
                    certCase = 'notAvailable';
                    // use the certificate_available_date if it is available, otherwise use the end date of the course
                    endDate = intl.formatDate((certificateAvailableDate || end), Object.assign({ year: 'numeric', month: 'long', day: 'numeric' }, timezoneFormatArgs));
                    body = intl.formatMessage(messages.notAvailableEndDateBody, { endDate });
                }
                else {
                    certCase = null;
                    certEventName = 'no_certificate_status';
                }
                break;
        }
    }
    // Log visit to progress tab
    useEffect(() => {
        sendTrackEvent('edx.ui.lms.course_progress.visited', {
            org_key: org,
            courserun_key: courseId,
            is_staff: administrator,
            track_variant: enrollmentMode,
            grade_variant: gradeEventName,
            certificate_status_variant: certEventName,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if (!certCase) {
        return null;
    }
    const header = intl.formatMessage(messages[`${certCase}Header`]);
    const logCertificateStatusButtonClicked = () => {
        sendTrackEvent('edx.ui.lms.course_progress.certificate_status.clicked', {
            org_key: org,
            courserun_key: courseId,
            is_staff: administrator,
            certificate_status_variant: certEventName,
        });
        if (certCase === 'upgrade') {
            sendTrackEvent('edx.bi.ecommerce.upsell_links_clicked', Object.assign(Object.assign({}, eventProperties), { linkCategory: '(none)', linkName: 'progress_certificate', linkType: 'button', pageName: 'progress' }));
        }
    };
    return (_jsx("section", Object.assign({ "data-testid": "certificate-status-component", className: "text-dark-700 mb-4" }, { children: _jsx(Card, Object.assign({ className: "bg-light-200 raised-card" }, { children: _jsx(ProgressCertificateStatusSlot, Object.assign({ courseId: courseId }, { children: _jsxs("div", Object.assign({ id: `${certCase}_certificate_status` }, { children: [_jsx(Card.Header, { title: header }), _jsx(Card.Section, Object.assign({ className: "small text-gray-700" }, { children: body })), _jsx(Card.Footer, { children: buttonText && (buttonLocation || buttonAction) && (_jsx(Button, Object.assign({ variant: "outline-brand", onClick: () => {
                                    logCertificateStatusButtonClicked(certStatus);
                                    if (buttonAction) {
                                        buttonAction();
                                    }
                                }, href: buttonLocation, block: true }, { children: buttonText }))) })] })) })) })) })));
};
export default CertificateStatus;
//# sourceMappingURL=CertificateStatus.js.map