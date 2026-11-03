"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildTopicsFromUnits = buildTopicsFromUnits;
var _rosie = require("rosie");
/* eslint-disable import/prefer-default-export */
// eslint-disable-line import/no-extraneous-dependencies

_rosie.Factory.define('verifiedMode').attr('currency', 'USD').attr('currencySymbol', '$').attr('price', '$149').attr('sku', '8CF08E5').attr('upgradeUrl', 'http://localhost:18130/basket/add/?sku=8CF08E5');
_rosie.Factory.define('discussionTopic').option('topicPrefix', null, '').option('courseId', null, 'course-v1:edX+DemoX+Demo_Course').sequence('id', ['topicPrefix'], (idx, topicPrefix) => `${topicPrefix}topic-${idx}`).sequence('name', ['topicPrefix'], (idx, topicPrefix) => `${topicPrefix}topic ${idx}`).sequence('usage_key', ['id', 'courseId'], (idx, id, courseId) => `block-v1:${courseId.replace('course-v1:', '')}+type@vertical+block@${id}`).attr('enabled_in_context', ['enabled_in_context'], enabledInContext => Boolean(enabledInContext)).attr('thread_counts', [], {
  discussion: 0,
  question: 0
});

// Given a pre-build units state, build topics from it.
function buildTopicsFromUnits(units) {
  let enabledInContext = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return Object.values(units).map(unit => _rosie.Factory.build('discussionTopic', {
    usage_key: unit.id,
    enabled_in_context: enabledInContext
  }));
}
//# sourceMappingURL=discussionTopics.factory.js.map