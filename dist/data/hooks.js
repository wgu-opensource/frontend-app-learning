import { useSelector } from 'react-redux';
// eslint-disable-next-line import/prefer-default-export
export const useContextId = () => useSelector(state => { var _a; return (_a = state.courseware.courseId) !== null && _a !== void 0 ? _a : state.courseHome.courseId; });
//# sourceMappingURL=hooks.js.map