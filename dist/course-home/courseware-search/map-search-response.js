"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mapSearchResponse;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const Joi = require('joi');
const endpointSchema = Joi.object({
  took: Joi.number().required(),
  total: Joi.number().required(),
  maxScore: Joi.number().allow(null),
  results: Joi.array().items(Joi.object({
    id: Joi.string(),
    contentType: Joi.string(),
    location: Joi.array().items(Joi.string()),
    url: Joi.string(),
    content: Joi.object({
      displayName: Joi.string(),
      htmlContent: Joi.string(),
      transcriptEn: Joi.string()
    })
  }).unknown(true)).strict()
}).unknown(true).strict();
const defaultType = 'text';

// Parses the search results in a convenient way.
function mapSearchResponse(response, searchKeywords = '') {
  const {
    error,
    value: data
  } = endpointSchema.validate(response);
  if (error) {
    throw new Error('Error in server response:', error);
  }
  const keywords = searchKeywords ? searchKeywords.toLowerCase().split(' ') : [];
  const {
    took: ms,
    total,
    maxScore,
    results: rawResults
  } = data;
  const results = rawResults.map(result => {
    const {
      score,
      data: {
        id,
        content: {
          displayName,
          htmlContent,
          transcriptEn
        },
        contentType,
        location,
        url
      }
    } = result;
    const type = contentType?.toLowerCase() || defaultType;
    const content = htmlContent || transcriptEn || '';
    const searchContent = content.toLowerCase();
    let contentHits = 0;
    if (keywords.length) {
      keywords.forEach(word => {
        contentHits += searchContent ? searchContent.toLowerCase().split(word).length - 1 : 0;
      });
    }
    const title = displayName || contentType;
    return {
      id,
      title,
      type,
      location,
      url,
      contentHits,
      score
    };
  });
  const filters = rawResults.reduce((list, result) => {
    const label = result?.data?.contentType;
    if (!label) {
      return list;
    }
    const key = label.toLowerCase();
    const index = list.findIndex(i => i.key === key);
    if (index === -1) {
      return [...list, {
        key,
        label,
        count: 1
      }];
    }
    const newItem = _objectSpread({}, list[index]);
    newItem.count++;
    const newList = list.slice(0);
    newList[index] = newItem;
    return newList;
  }, []);
  filters.sort((a, b) => a.key > b.key ? 1 : -1);
  return {
    results,
    filters,
    total,
    maxScore,
    ms
  };
}
//# sourceMappingURL=map-search-response.js.map