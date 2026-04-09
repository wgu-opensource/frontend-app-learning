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
import { createBookmark, deleteBookmark, } from './api';
import { updateModel } from '../../../../generic/model-store';
export function addBookmark(unitId) {
    return (dispatch) => __awaiter(this, void 0, void 0, function* () {
        // Optimistically update the bookmarked flag.
        dispatch(updateModel({
            modelType: 'units',
            model: {
                id: unitId,
                bookmarked: true,
                bookmarkedUpdateState: 'loading',
            },
        }));
        try {
            yield createBookmark(unitId);
            dispatch(updateModel({
                modelType: 'units',
                model: {
                    id: unitId,
                    bookmarked: true,
                    bookmarkedUpdateState: 'loaded',
                },
            }));
        }
        catch (error) {
            logError(error);
            dispatch(updateModel({
                modelType: 'units',
                model: {
                    id: unitId,
                    bookmarked: false,
                    bookmarkedUpdateState: 'failed',
                },
            }));
        }
    });
}
export function removeBookmark(unitId) {
    return (dispatch) => __awaiter(this, void 0, void 0, function* () {
        // Optimistically update the bookmarked flag.
        dispatch(updateModel({
            modelType: 'units',
            model: {
                id: unitId,
                bookmarked: false,
                bookmarkedUpdateState: 'loading',
            },
        }));
        try {
            yield deleteBookmark(unitId);
            dispatch(updateModel({
                modelType: 'units',
                model: {
                    id: unitId,
                    bookmarked: false,
                    bookmarkedUpdateState: 'loaded',
                },
            }));
        }
        catch (error) {
            logError(error);
            dispatch(updateModel({
                modelType: 'units',
                model: {
                    id: unitId,
                    bookmarked: true,
                    bookmarkedUpdateState: 'failed',
                },
            }));
        }
    });
}
//# sourceMappingURL=thunks.js.map