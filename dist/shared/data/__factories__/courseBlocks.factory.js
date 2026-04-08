"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildBinaryCourseBlocks = buildBinaryCourseBlocks;
exports.buildMinimalCourseBlocks = buildMinimalCourseBlocks;
exports.buildSimpleCourseBlocks = buildSimpleCourseBlocks;
var _rosie = require("rosie");
require("./block.factory");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // eslint-disable-line import/no-extraneous-dependencies
// Most of this file can be removed at some point, now that we rarely use course blocks
// in favor of learning sequences. But for now, these are mostly used to then feed into
// buildOutlineFromBlocks, which is an awkward flow if we don't really care about the
// course blocks themselves. A future cleanup to do.

// Generates an Array of block IDs, either from a single block or an array of blocks.
const getIds = attr => {
  const blocks = Array.isArray(attr) ? attr : [attr];
  return blocks.map(block => block.id);
};

// Generates an Object in { [block.id]: block } format, either from a single block or an array of blocks.
const getBlocks = attr => {
  const blocks = Array.isArray(attr) ? attr : [attr];
  // eslint-disable-next-line no-return-assign,no-sequences
  return blocks.reduce((acc, block) => (acc[block.id] = block, acc), {});
};
_rosie.Factory.define('courseBlocks').option('courseId', 'course-v1:edX+DemoX+Demo_Course').option('units', ['courseId'], courseId => [_rosie.Factory.build('block', {
  type: 'vertical'
}, {
  courseId
})]).option('sequences', ['courseId', 'units'], (courseId, units) => [_rosie.Factory.build('block', {
  type: 'sequential',
  children: getIds(units)
}, {
  courseId
})]).option('sections', ['courseId', 'sequences'], (courseId, sequences) => [_rosie.Factory.build('block', {
  type: 'chapter',
  children: getIds(sequences)
}, {
  courseId
})]).option('course', ['courseId', 'sections'], (courseId, sections) => _rosie.Factory.build('block', {
  type: 'course',
  children: getIds(sections)
}, {
  courseId
})).attr('blocks', ['course', 'sections', 'sequences', 'units'], (course, sections, sequences, units) => _objectSpread(_objectSpread(_objectSpread({
  [course.id]: course
}, getBlocks(sections)), getBlocks(sequences)), getBlocks(units))).attr('root', ['course'], course => course.id);

/**
 * Builds a course with a single chapter, sequence, and unit.
 */
function buildSimpleCourseBlocks(courseId, title, options = {}) {
  const unitBlocks = options.unitBlocks || [_rosie.Factory.build('block', {
    type: 'vertical'
  }, {
    courseId
  })];
  const sequenceBlocks = options.sequenceBlocks || [_rosie.Factory.build('block', {
    type: 'sequential',
    children: unitBlocks.map(block => block.id)
  }, {
    courseId
  })];
  const sectionBlocks = options.sectionBlocks || [_rosie.Factory.build('block', {
    type: 'chapter',
    children: sequenceBlocks.map(block => block.id)
  }, {
    courseId
  })];
  const courseBlock = options.courseBlock || _rosie.Factory.build('block', {
    type: 'course',
    display_name: title,
    children: sectionBlocks.map(block => block.id)
  }, {
    courseId
  });
  return {
    courseBlocks: options.courseBlocks || _rosie.Factory.build('courseBlocks', {
      courseId,
      hasScheduledContent: options.hasScheduledContent || false,
      title
    }, {
      units: unitBlocks,
      sequences: sequenceBlocks,
      sections: sectionBlocks,
      course: courseBlock
    }),
    unitBlocks,
    sequenceBlocks,
    sectionBlocks,
    courseBlock
  };
}

/**
 * Builds a course with a single chapter and sequence, but no units.
 */
function buildMinimalCourseBlocks(courseId, title, options = {}) {
  const sequenceBlocks = options.sequenceBlocks || [_rosie.Factory.build('block', {
    display_name: 'Title of Sequence',
    effort_activities: 2,
    effort_time: 15,
    type: 'sequential'
  }, {
    courseId
  })];
  const sectionBlocks = options.sectionBlocks || [_rosie.Factory.build('block', {
    type: 'chapter',
    display_name: 'Title of Section',
    complete: options.complete || false,
    resume_block: options.resumeBlock || false,
    children: sequenceBlocks.map(block => block.id)
  }, {
    courseId
  })];
  const courseBlock = options.courseBlock || _rosie.Factory.build('block', {
    type: 'course',
    display_name: title,
    has_scheduled_content: options.hasScheduledContent || false,
    children: sectionBlocks.map(block => block.id)
  }, {
    courseId
  });
  return {
    courseBlocks: options.courseBlocks || _rosie.Factory.build('courseBlocks', {
      courseId
    }, {
      sequences: sequenceBlocks,
      sections: sectionBlocks,
      course: courseBlock,
      units: []
    }),
    unitBlocks: [],
    sequenceBlocks,
    sectionBlocks,
    courseBlock
  };
}

/**
 * Builds a course with two branches at each node. That is:
 *
 *                  Crs
 *                   |
 *        Sec--------+-------Sec
 *         |                  |
 *   Seq---+---Seq      Seq---+---Seq
 *    |         |        |         |
 * U--+--U   U--+--U  U--+--U   U--+--U
 *                          ^
 *
 * Each left branch is indexed 0, and each right branch is indexed 1.
 * So, the caret in the diagram above is pointing to `unitTree[1][0][1]`,
 * whose parent is `sequenceTree[1][0]`, whose parent is `sectionTree[1]`.
 */
function buildBinaryCourseBlocks(courseId, title) {
  const sectionTree = [];
  const sequenceTree = [[], []];
  const unitTree = [[[], []], [[], []]];
  [0, 1].forEach(sectionIndex => {
    [0, 1].forEach(sequenceIndex => {
      [0, 1].forEach(unitIndex => {
        unitTree[sectionIndex][sequenceIndex][unitIndex] = _rosie.Factory.build('block', {
          type: 'vertical'
        }, {
          courseId
        });
      });
      sequenceTree[sectionIndex][sequenceIndex] = _rosie.Factory.build('block', {
        type: 'sequential',
        children: unitTree[sectionIndex][sequenceIndex].map(block => block.id)
      }, {
        courseId
      });
    });
    sectionTree[sectionIndex] = _rosie.Factory.build('block', {
      type: 'chapter',
      children: sequenceTree[sectionIndex].map(block => block.id)
    }, {
      courseId
    });
  });
  const courseBlock = _rosie.Factory.build('block', {
    type: 'course',
    display_name: title,
    children: sectionTree.map(block => block.id)
  }, {
    courseId
  });
  const sectionBlocks = [sectionTree[0], sectionTree[1]];
  const sequenceBlocks = [sequenceTree[0][0], sequenceTree[0][1], sequenceTree[1][0], sequenceTree[1][1]];
  const unitBlocks = [unitTree[0][0][0], unitTree[0][0][1], unitTree[0][1][0], unitTree[0][1][1], unitTree[1][0][0], unitTree[1][0][1], unitTree[1][1][0], unitTree[1][1][1]];
  return {
    // Expose blocks as a combined list, lists separated by type, and as
    // trees separated by type. The caller can decide which they want to
    // work with.
    courseBlocks: _rosie.Factory.build('courseBlocks', {
      courseId,
      title
    }, {
      units: unitBlocks,
      sequences: sequenceBlocks,
      sections: sectionBlocks,
      course: courseBlock
    }),
    unitBlocks,
    sequenceBlocks,
    sectionBlocks,
    courseBlock,
    unitTree,
    sequenceTree,
    sectionTree
  };
}
//# sourceMappingURL=courseBlocks.factory.js.map