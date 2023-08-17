"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _i18n = require("@edx/frontend-platform/i18n");

var _effortEstimate = _interopRequireDefault(require("../../../../shared/effort-estimate"));

var _data = require("../../../data");

var _modelStore = require("../../../../generic/model-store");

var _messages = _interopRequireDefault(require("./messages"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This component exists to peek ahead at the next sequence and grab its estimated effort.
// If we should be showing the next sequence's effort, we display the title and effort instead of "Next".

/**
 * Note: this component is basically ignored and just acts as a pass-through to children components right now because
 * effort estimation is no longer attached to the sequence model. It used to be attached, via the LMS blocks API and
 * its block transformers. But as part of the effort to remove reliance on modulestore blocks on the LMS side, we
 * stopped calling that API and we lost effort estimation in the deal.
 *
 * See https://openedx.atlassian.net/browse/AA-930 for the initiative to refactor Effort Estimation to avoid the
 * modulestore, which would allow us to revive the usefulness of this component again.
 */
function UnitNavigationEffortEstimate(_ref) {
  let {
    children,
    intl,
    sequenceId,
    unitId
  } = _ref;
  const sequenceIds = (0, _reactRedux.useSelector)(_data.sequenceIdsSelector);
  const sequenceIndex = sequenceIds.indexOf(sequenceId);
  const nextSequenceId = sequenceIndex < sequenceIds.length - 1 ? sequenceIds[sequenceIndex + 1] : null;
  const sequence = (0, _modelStore.useModel)('sequences', sequenceId);
  const nextSequence = (0, _modelStore.useModel)('sequences', nextSequenceId);

  if (!sequence || Object.keys(sequence).length === 0 || !nextSequence || Object.keys(nextSequence).length === 0) {
    return children;
  }

  const isLastUnitInSequence = sequence.unitIds.indexOf(unitId) === sequence.unitIds.length - 1;

  if (!isLastUnitInSequence) {
    return children;
  } // If we don't have info to show for the next sequence, just bail


  if (!nextSequence.effortActivities && !nextSequence.effortTime) {
    return children;
  } // Note: we don't use `children` here - we replace it with the next sequence's title.


  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "d-inline-block text-wrap",
    children: [intl.formatMessage(_messages.default.nextUpButton, {
      title: nextSequence.title
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_effortEstimate.default, {
      className: "d-block mt-1",
      block: nextSequence
    })]
  });
}

UnitNavigationEffortEstimate.propTypes = {
  children: _propTypes.default.node,
  intl: _i18n.intlShape.isRequired,
  sequenceId: _propTypes.default.string.isRequired,
  unitId: _propTypes.default.string
};
UnitNavigationEffortEstimate.defaultProps = {
  children: null,
  unitId: null
};

var _default = (0, _i18n.injectIntl)(UnitNavigationEffortEstimate);

exports.default = _default;
//# sourceMappingURL=UnitNavigationEffortEstimate.js.map