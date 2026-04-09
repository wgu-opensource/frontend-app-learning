var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx } from "react/jsx-runtime";
import { MemoryRouter } from 'react-router';
import { Factory } from 'rosie';
import { initializeMockApp, initializeTestStore, render, screen, } from '../../../../setupTest';
import { getIFrameUrl } from './urls';
import { views } from './constants';
import Unit from '.';
const defaultProps = {
    courseId: 'test-course-id',
    format: 'test-format',
    onLoaded: jest.fn().mockName('props.onLoaded'),
    id: 'unit-id',
    isOriginalUserStaff: false,
    renderUnitNavigation: jest.fn(enabled => enabled && 'UnitNaviagtion'),
};
const unit = {
    id: 'unit-id',
    title: 'unit-title',
    bookmarked: false,
    bookmarkedUpdateState: 'pending',
};
let store;
const renderComponent = (props) => {
    render(_jsx(MemoryRouter, Object.assign({ initialEntries: [{ pathname: `/course/${props.courseID}` }] }, { children: _jsx(Unit, Object.assign({}, props)) })), { store, wrapWithRouter: false });
};
initializeMockApp();
function setupStoreState() {
    return __awaiter(this, void 0, void 0, function* () {
        const courseMetadata = Factory.build('courseMetadata');
        const unitBlocks = [Factory.build('block', Object.assign({ type: 'vertical' }, unit), { courseId: courseMetadata.id })];
        store = yield initializeTestStore({ courseMetadata, unitBlocks });
    });
}
describe('<Unit />', () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield setupStoreState();
    }));
    describe('unit title', () => {
        it('has two children', () => {
            renderComponent(defaultProps);
            const unitTitleWrapper = screen.getByTestId('org.openedx.frontend.learning.unit_title.v1').children[0];
            expect(unitTitleWrapper.children).toHaveLength(3);
        });
        it('renders bookmark button', () => {
            renderComponent(defaultProps);
            expect(screen.getByText('Bookmark this page')).toBeInTheDocument();
        });
        it('renders unit navigation buttons', () => {
            const props = Object.assign({}, defaultProps);
            renderComponent(props);
            const nextButton = screen.getByText('UnitNaviagtion');
            expect(nextButton).toBeVisible();
        });
    });
    describe('UnitSuspense', () => {
        it('renders loading message', () => {
            renderComponent(defaultProps);
            expect(screen.getByText('Loading', { exact: false })).toBeInTheDocument();
        });
    });
    describe('ContentIFrame', () => {
        let iframe;
        beforeEach(() => {
            renderComponent(defaultProps);
            iframe = screen.getByTestId('content-iframe-test-id');
        });
        it('renders content iframe', () => {
            expect(iframe).toBeVisible();
        });
        it('generates correct iframeUrl', () => {
            expect(iframe.getAttribute('src')).toEqual(getIFrameUrl({
                id: defaultProps.id,
                view: views.student,
                format: defaultProps.format,
                examAccess: {
                    accessToken: '',
                    blockAccess: false,
                },
                jumpToId: null,
                preview: 0,
            }));
        });
    });
});
//# sourceMappingURL=index.test.js.map