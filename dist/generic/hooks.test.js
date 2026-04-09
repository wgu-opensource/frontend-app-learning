var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { render, screen, waitFor } from '@testing-library/react';
import { useEventListener, useIFrameHeight } from './hooks';
describe('Hooks', () => {
    test('useEventListener', () => __awaiter(void 0, void 0, void 0, function* () {
        const handler = jest.fn();
        const TestComponent = () => {
            useEventListener('message', handler);
            return (_jsx("div", { "data-testid": "testid" }));
        };
        render(_jsx(TestComponent, {}));
        yield screen.findByTestId('testid');
        window.postMessage({ test: 'test' }, '*');
        yield waitFor(() => expect(handler).toHaveBeenCalled());
    }));
    test('useIFrameHeight', () => __awaiter(void 0, void 0, void 0, function* () {
        const onLoaded = jest.fn();
        const TestComponent = () => {
            const [hasLoaded, height] = useIFrameHeight(onLoaded);
            return (_jsxs("div", Object.assign({ "data-testid": "testid" }, { children: [_jsx("span", Object.assign({ "data-testid": "loaded" }, { children: String(hasLoaded) })), _jsx("span", Object.assign({ "data-testid": "height" }, { children: String(height) }))] })));
        };
        render(_jsx(TestComponent, {}));
        yield screen.findByTestId('testid');
        expect(screen.getByTestId('loaded')).toHaveTextContent('false');
        expect(screen.getByTestId('height')).toHaveTextContent('null');
        window.postMessage({
            type: 'plugin.resize',
            payload: { height: 1234 },
        }, '*');
        yield waitFor(() => expect(onLoaded).toHaveBeenCalled());
        yield waitFor(() => expect(screen.getByTestId('loaded')).toHaveTextContent('true'));
        expect(screen.getByTestId('height')).toHaveTextContent('1234');
    }));
});
//# sourceMappingURL=hooks.test.js.map