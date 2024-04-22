"use strict";

var _rosie = require("rosie");
// eslint-disable-line import/no-extraneous-dependencies

// Sample data helpful when developing & testing, to see a variety of configurations.
// This set of data is not realistic (mix of having access and not), but it
// is intended to demonstrate many UI results.
_rosie.Factory.define('datesTabData').attrs({
  dates_banner_info: {
    content_type_gating_enabled: false,
    missed_gated_content: false,
    missed_deadlines: false,
    verified_upgrade_link: 'http://localhost:18130/basket/add/?sku=8CF08E5'
  },
  course_date_blocks: [{
    date: '2020-05-01T17:59:41Z',
    date_type: 'course-start-date',
    description: '',
    learner_has_access: true,
    link: '',
    title: 'Course Starts',
    extra_info: null
  }, {
    assignment_type: 'Homework',
    complete: true,
    date: '2020-05-04T02:59:40.942669Z',
    date_type: 'assignment-due-date',
    description: '',
    learner_has_access: true,
    title: 'Multi Badges Completed',
    extra_info: null
  }, {
    assignment_type: 'Homework',
    date: '2020-05-05T02:59:40.942669Z',
    date_type: 'assignment-due-date',
    description: '',
    learner_has_access: true,
    title: 'Multi Badges Past Due',
    extra_info: null
  }, {
    assignment_type: 'Homework',
    date: '2020-05-27T02:59:40.942669Z',
    date_type: 'assignment-due-date',
    description: '',
    learner_has_access: true,
    link: 'https://example.com/',
    title: 'Both Past Due 1',
    extra_info: null
  }, {
    assignment_type: 'Homework',
    date: '2020-05-27T02:59:40.942669Z',
    date_type: 'assignment-due-date',
    description: '',
    learner_has_access: true,
    link: 'https://example.com/',
    title: 'Both Past Due 2',
    extra_info: null
  }, {
    assignment_type: 'Homework',
    complete: true,
    date: '2020-05-28T08:59:40.942669Z',
    date_type: 'assignment-due-date',
    description: '',
    learner_has_access: true,
    link: 'https://example.com/',
    title: 'One Completed/Due 1',
    extra_info: null
  }, {
    assignment_type: 'Homework',
    date: '2020-05-28T08:59:40.942669Z',
    date_type: 'assignment-due-date',
    description: '',
    learner_has_access: true,
    link: 'https://example.com/',
    title: 'One Completed/Due 2',
    extra_info: null
  }, {
    assignment_type: 'Homework',
    complete: true,
    date: '2020-05-29T08:59:40.942669Z',
    date_type: 'assignment-due-date',
    description: '',
    learner_has_access: true,
    link: 'https://example.com/',
    title: 'Both Completed 1',
    extra_info: null
  }, {
    assignment_type: 'Homework',
    complete: true,
    date: '2020-05-29T08:59:40.942669Z',
    date_type: 'assignment-due-date',
    description: '',
    learner_has_access: true,
    link: 'https://example.com/',
    title: 'Both Completed 2',
    extra_info: null
  }, {
    date: '2020-06-16T17:59:40.942669Z',
    date_type: 'verified-upgrade-deadline',
    description: "Don't miss the opportunity to highlight your new knowledge and skills by earning a verified certificate.",
    learner_has_access: true,
    link: 'https://example.com/',
    title: 'Upgrade to Verified Certificate',
    extra_info: null
  }, {
    assignment_type: 'Homework',
    date: '2030-08-17T05:59:40.942669Z',
    date_type: 'assignment-due-date',
    description: '',
    learner_has_access: false,
    link: 'https://example.com/',
    title: 'One Verified 1',
    extra_info: null
  }, {
    assignment_type: 'Homework',
    date: '2030-08-17T05:59:40.942669Z',
    date_type: 'assignment-due-date',
    description: '',
    learner_has_access: true,
    link: 'https://example.com/',
    title: 'One Verified 2',
    extra_info: null
  }, {
    assignment_type: 'Homework',
    date: '2030-08-17T05:59:40.942669Z',
    date_type: 'assignment-due-date',
    description: '',
    learner_has_access: true,
    link: 'https://example.com/',
    title: 'ORA Verified 2',
    extra_info: "ORA Dates are set by the instructor, and can't be changed"
  }, {
    assignment_type: 'Homework',
    date: '2030-08-18T05:59:40.942669Z',
    date_type: 'assignment-due-date',
    description: '',
    learner_has_access: false,
    link: 'https://example.com/',
    title: 'Both Verified 1',
    extra_info: null
  }, {
    assignment_type: 'Homework',
    date: '2030-08-18T05:59:40.942669Z',
    date_type: 'assignment-due-date',
    description: '',
    learner_has_access: false,
    link: 'https://example.com/',
    title: 'Both Verified 2',
    extra_info: null
  }, {
    assignment_type: 'Homework',
    date: '2030-08-19T05:59:40.942669Z',
    date_type: 'assignment-due-date',
    description: '',
    learner_has_access: true,
    title: 'One Unreleased 1'
  }, {
    assignment_type: 'Homework',
    date: '2030-08-19T05:59:40.942669Z',
    date_type: 'assignment-due-date',
    description: '',
    learner_has_access: true,
    link: 'https://example.com/',
    title: 'One Unreleased 2',
    extra_info: null
  }, {
    assignment_type: 'Homework',
    date: '2030-08-20T05:59:40.942669Z',
    date_type: 'assignment-due-date',
    description: '',
    learner_has_access: true,
    title: 'Both Unreleased 1',
    extra_info: null
  }, {
    assignment_type: 'Homework',
    date: '2030-08-20T05:59:40.942669Z',
    date_type: 'assignment-due-date',
    description: '',
    learner_has_access: true,
    title: 'Both Unreleased 2',
    extra_info: null
  }, {
    date: '2030-08-23T00:00:00Z',
    date_type: 'course-end-date',
    description: '',
    learner_has_access: true,
    link: '',
    title: 'Course Ends',
    extra_info: null
  }, {
    date: '2030-09-01T00:00:00Z',
    date_type: 'verification-deadline-date',
    description: 'You must successfully complete verification before this date to qualify for a Verified Certificate.',
    learner_has_access: false,
    link: 'https://example.com/',
    title: 'Verification Deadline',
    extra_info: null
  }],
  has_ended: false,
  learner_is_full_access: true
});
//# sourceMappingURL=datesTabData.factory.js.map