"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildSimpleCourseAndSequenceMetadata;
var _rosie = require("rosie");
require("../../../shared/data/__factories__/block.factory");
var _courseBlocks = require("../../../shared/data/__factories__/courseBlocks.factory");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // eslint-disable-line import/no-extraneous-dependencies
_rosie.Factory.define('sequenceMetadata').option('courseId', courseId => {
  if (courseId) {
    return courseId;
  }
  throw new Error('courseId must be specified for sequenceMetadata factory.');
})
// An array of units
.option('unitBlocks', ['courseId'], courseId => [_rosie.Factory.build('block', {
  type: 'vertical'
}, {
  courseId
})]).option('sequenceBlock', ['courseId', 'unitBlocks'], (courseId, unitBlocks) => _rosie.Factory.build('block', {
  type: 'sequential',
  children: unitBlocks.map(unitBlock => unitBlock.id)
}, {
  courseId
})).attr('element_id', ['sequenceBlock'], sequenceBlock => sequenceBlock.block_id).attr('item_id', ['sequenceBlock'], sequenceBlock => sequenceBlock.id).attr('display_name', ['sequenceBlock'], sequenceBlock => sequenceBlock.display_name).attr('gated_content', ['sequenceBlock'], sequenceBlock => ({
  gated: false,
  prereq_url: null,
  prereq_id: `${sequenceBlock.id}-prereq`,
  prereq_section_name: `${sequenceBlock.display_name}-prereq`,
  gated_section_name: sequenceBlock.display_name
})).attr('items', ['unitBlocks', 'sequenceBlock'], (unitBlocks, sequenceBlock) => unitBlocks.map(unitBlock => ({
  href: '',
  graded: unitBlock.graded,
  id: unitBlock.id,
  bookmarked: unitBlock.bookmarked || false,
  path: `Chapter Display Name > ${sequenceBlock.display_name} > ${unitBlock.display_name}`,
  type: unitBlock.type,
  complete: unitBlock.complete || null,
  content: '',
  page_title: unitBlock.display_name,
  contains_content_type_gated_content: unitBlock.contains_content_type_gated_content
}))).attrs({
  exclude_units: true,
  position: null,
  next_url: null,
  tag: 'sequential',
  save_position: true,
  prev_url: null,
  is_time_limited: false,
  is_hidden_after_due: false,
  show_completion: true,
  banner_text: null,
  format: 'Homework'
});

/**
 * Build a simple course and simple metadata for its sequence.
 */
function buildSimpleCourseAndSequenceMetadata(options = {}) {
  const courseMetadata = options.courseMetadata || _rosie.Factory.build('courseMetadata', {
    course_access: {
      has_access: false
    }
  });
  const courseId = courseMetadata.id;
  const simpleCourseBlocks = (0, _courseBlocks.buildSimpleCourseBlocks)(courseId, courseMetadata.name, options);
  const {
    unitBlocks,
    sequenceBlocks
  } = simpleCourseBlocks;
  const sequenceMetadata = options.sequenceMetadata || sequenceBlocks.map(block => _rosie.Factory.build('sequenceMetadata', {}, {
    courseId,
    unitBlocks,
    sequenceBlock: block
  }));
  const courseHomeMetadata = options.courseHomeMetadata || _rosie.Factory.build('courseHomeMetadata');
  return _objectSpread(_objectSpread({}, simpleCourseBlocks), {}, {
    courseMetadata,
    sequenceMetadata,
    courseHomeMetadata
  });
}
//# sourceMappingURL=sequenceMetadata.factory.js.map