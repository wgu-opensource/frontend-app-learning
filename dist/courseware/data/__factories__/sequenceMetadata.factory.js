"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildSimpleCourseAndSequenceMetadata;
var _rosie = require("rosie");
require("../../../shared/data/__factories__/block.factory");
var _courseBlocks = require("../../../shared/data/__factories__/courseBlocks.factory");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // eslint-disable-line import/no-extraneous-dependencies
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
function buildSimpleCourseAndSequenceMetadata() {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
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