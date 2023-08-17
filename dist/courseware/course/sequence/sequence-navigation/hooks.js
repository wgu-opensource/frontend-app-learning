"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSequenceNavigationMetadata = useSequenceNavigationMetadata;

var _reactRedux = require("react-redux");

var _modelStore = require("../../../../generic/model-store");

var _data = require("../../../data");

/* eslint-disable import/prefer-default-export */
function useSequenceNavigationMetadata(currentSequenceId, currentUnitId) {
  const sequenceIds = (0, _reactRedux.useSelector)(_data.sequenceIdsSelector);
  const sequence = (0, _modelStore.useModel)('sequences', currentSequenceId);
  const courseStatus = (0, _reactRedux.useSelector)(state => state.courseware.courseStatus);
  const sequenceStatus = (0, _reactRedux.useSelector)(state => state.courseware.sequenceStatus); // If we don't know the sequence and unit yet, then assume no.

  if (courseStatus !== 'loaded' || sequenceStatus !== 'loaded' || !currentSequenceId || !currentUnitId) {
    return {
      isFirstUnit: false,
      isLastUnit: false
    };
  }

  const isFirstSequence = sequenceIds.indexOf(currentSequenceId) === 0;
  const isFirstUnitInSequence = sequence.unitIds.indexOf(currentUnitId) === 0;
  const isFirstUnit = isFirstSequence && isFirstUnitInSequence;
  const isLastSequence = sequenceIds.indexOf(currentSequenceId) === sequenceIds.length - 1;
  const isLastUnitInSequence = sequence.unitIds.indexOf(currentUnitId) === sequence.unitIds.length - 1;
  const isLastUnit = isLastSequence && isLastUnitInSequence;
  return {
    isFirstUnit,
    isLastUnit
  };
}
//# sourceMappingURL=hooks.js.map