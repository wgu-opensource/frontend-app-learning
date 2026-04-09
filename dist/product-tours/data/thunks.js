var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { logError } from '@edx/frontend-platform/logging';
import { getTourData, patchTourData } from './api';
import { disableCourseHomeTour, disableCoursewareTour, disableNewUserCourseHomeModal, setTourData, } from './slice';
export function closeNewUserCourseHomeModal() {
    return (dispatch) => __awaiter(this, void 0, void 0, function* () { return dispatch(disableNewUserCourseHomeModal()); });
}
export function endCourseHomeTour(username) {
    return (dispatch) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield patchTourData(username, {
                course_home_tour_status: 'no-tour',
            });
            dispatch(disableCourseHomeTour());
        }
        catch (error) {
            logError(error);
        }
    });
}
export function endCoursewareTour(username) {
    return (dispatch) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield patchTourData(username, {
                show_courseware_tour: false,
            });
            dispatch(disableCoursewareTour());
        }
        catch (error) {
            logError(error);
        }
    });
}
export function fetchTourData(username) {
    return (dispatch) => __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield getTourData(username);
            dispatch(setTourData(data));
        }
        catch (error) {
            logError(error);
        }
    });
}
//# sourceMappingURL=thunks.js.map