"use strict";

var _rosie = require("rosie");
// eslint-disable-line import/no-extraneous-dependencies

_rosie.Factory.define('courseRecommendations').option('host', '').option('numRecs', '', 4).sequence('uuid', i => `a-uuid-${i}`).attr('recommendations', ['numRecs'], numRecs => {
  const recs = [];
  for (let i = 0; i < numRecs; i++) {
    recs.push(_rosie.Factory.build('courseRecommendation'));
  }
  return recs;
});
_rosie.Factory.define('courseRecommendation').sequence('key', i => `edX+DemoX${i}`).sequence('uuid', i => `abcd-${i}`).attrs({
  title: 'DemoX',
  owners: [{
    uuid: '',
    key: 'edX'
  }],
  image: {
    src: ''
  }
}).attr('course_run_keys', ['key'], key => [`${key}+1T2021`]).attr('url_slug', ['key'], key => key).attr('marketing_url', ['url_slug'], urlSlug => `https://www.edx.org/course/${urlSlug}`);
_rosie.Factory.define('userEnrollment').option('runKey').attr('course_details', ['runKey'], runKey => runKey ? {
  course_id: runKey
} : {
  course_id: 'edX+EnrolledX'
});
//# sourceMappingURL=courseRecommendations.factory.js.map