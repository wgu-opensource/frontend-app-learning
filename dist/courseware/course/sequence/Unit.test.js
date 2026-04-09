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
import React from 'react';
import { Factory } from 'rosie';
import { initializeTestStore, loadUnit, messageEvent, render, screen, waitFor, } from '../../../setupTest';
import Unit, { sendUrlHashToFrame } from './Unit';
describe('Unit', () => {
    let mockData;
    const courseMetadata = Factory.build('courseMetadata', { content_type_gating_enabled: true });
    const courseMetadataNeedsSignature = Factory.build('courseMetadata', { user_needs_integrity_signature: true });
    const unitBlocks = [
        Factory.build('block', { type: 'vertical', graded: 'true' }, { courseId: courseMetadata.id }), Factory.build('block', {
            type: 'vertical',
            contains_content_type_gated_content: true,
            bookmarked: true,
            graded: true,
        }, { courseId: courseMetadata.id }),
        Factory.build('block', { type: 'vertical', graded: false }, { courseId: courseMetadata.id }),
    ];
    const [unit, unitThatContainsGatedContent, ungradedUnit] = unitBlocks;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield initializeTestStore({ courseMetadata, unitBlocks });
        mockData = {
            id: unit.id,
            courseId: courseMetadata.id,
            format: 'Homework',
        };
    }));
    it('renders correctly', () => {
        render(_jsx(Unit, Object.assign({}, mockData)));
        expect(screen.getByText('Loading learning sequence...')).toBeInTheDocument();
        const renderedUnit = screen.getByTitle(unit.display_name);
        expect(renderedUnit).toHaveAttribute('height', String(0));
        expect(renderedUnit).toHaveAttribute('src', `http://localhost:18000/xblock/${mockData.id}?show_title=0&show_bookmark_button=0&recheck_access=1&view=student_view&format=${mockData.format}`);
    });
    it('renders proper message for gated content', () => {
        render(_jsx(Unit, Object.assign({}, mockData, { id: unitThatContainsGatedContent.id })));
        expect(screen.getByText('Loading learning sequence...')).toBeInTheDocument();
        expect(screen.getByText('Loading locked content messaging...')).toBeInTheDocument();
    });
    it('does not display HonorCode for ungraded units', () => __awaiter(void 0, void 0, void 0, function* () {
        const signatureStore = yield initializeTestStore({ courseMetadata: courseMetadataNeedsSignature, unitBlocks }, false);
        const signatureData = {
            id: ungradedUnit.id,
            courseId: courseMetadataNeedsSignature.id,
            format: 'Homework',
        };
        render(_jsx(Unit, Object.assign({}, signatureData)), { store: signatureStore });
        expect(screen.getByText('Loading learning sequence...')).toBeInTheDocument();
    }));
    it('displays HonorCode for graded units if user needs integrity signature', () => __awaiter(void 0, void 0, void 0, function* () {
        const signatureStore = yield initializeTestStore({ courseMetadata: courseMetadataNeedsSignature, unitBlocks }, false);
        const signatureData = {
            id: unit.id,
            courseId: courseMetadataNeedsSignature.id,
            format: 'Homework',
        };
        render(_jsx(Unit, Object.assign({}, signatureData)), { store: signatureStore });
        expect(screen.getByText('Loading honor code messaging...')).toBeInTheDocument();
    }));
    it('handles receiving MessageEvent', () => __awaiter(void 0, void 0, void 0, function* () {
        render(_jsx(Unit, Object.assign({}, mockData)));
        loadUnit();
        // Loading message is gone now.
        yield waitFor(() => expect(screen.queryByText('Loading learning sequence...')).not.toBeInTheDocument());
        // Iframe's height is set via message.
        expect(screen.getByTitle(unit.display_name)).toHaveAttribute('height', String(messageEvent.payload.height));
    }));
    it('calls onLoaded after receiving MessageEvent', () => __awaiter(void 0, void 0, void 0, function* () {
        const onLoaded = jest.fn();
        render(_jsx(Unit, Object.assign({}, mockData, { onLoaded })));
        loadUnit();
        yield waitFor(() => expect(onLoaded).toHaveBeenCalledTimes(1));
    }));
    it('resizes iframe on second MessageEvent, does not call onLoaded again', () => __awaiter(void 0, void 0, void 0, function* () {
        const onLoaded = jest.fn();
        // Clone message and set different height.
        const testMessageWithOtherHeight = Object.assign(Object.assign({}, messageEvent), { payload: { height: 200 } });
        render(_jsx(Unit, Object.assign({}, mockData, { onLoaded })));
        loadUnit();
        yield waitFor(() => expect(screen.getByTitle(unit.display_name)).toHaveAttribute('height', String(messageEvent.payload.height)));
        window.postMessage(testMessageWithOtherHeight, '*');
        yield waitFor(() => expect(screen.getByTitle(unit.display_name)).toHaveAttribute('height', String(testMessageWithOtherHeight.payload.height)));
        expect(onLoaded).toHaveBeenCalledTimes(1);
    }));
    it('scrolls page on MessagaeEvent when receiving offset', () => __awaiter(void 0, void 0, void 0, function* () {
        // Set message to constain offset data.
        const testMessageWithOffset = { offset: 1500 };
        render(_jsx(Unit, Object.assign({}, mockData)));
        window.postMessage(testMessageWithOffset, '*');
        yield expect(waitFor(() => expect(window.scrollTo()).toHaveBeenCalled()));
        expect(window.scrollY === testMessageWithOffset.offset);
    }));
    it('scrolls page on MessagaeEvent when receiving videoFullScreen state', () => __awaiter(void 0, void 0, void 0, function* () {
        // Set message to constain video full screen data.
        const defaultTopOffset = 800;
        const testMessageWithOtherHeight = Object.assign(Object.assign({}, messageEvent), { payload: { height: 500 } });
        const testMessageWithFullscreenState = (isOpen) => ({ type: 'plugin.videoFullScreen', payload: { open: isOpen } });
        render(_jsx(Unit, Object.assign({}, mockData)));
        Object.defineProperty(window, 'scrollY', { value: defaultTopOffset, writable: true });
        window.postMessage(testMessageWithFullscreenState(true), '*');
        window.postMessage(testMessageWithFullscreenState(false), '*');
        window.postMessage(testMessageWithOtherHeight, '*');
        yield expect(waitFor(() => expect(window.scrollTo()).toHaveBeenCalledTimes(1)));
        expect(window.scrollY === defaultTopOffset);
    }));
    it('ignores MessageEvent with unhandled type', () => __awaiter(void 0, void 0, void 0, function* () {
        // Clone message and set different type.
        const testMessageWithUnhandledType = Object.assign(Object.assign({}, messageEvent), { type: 'wrong type' });
        render(_jsx(Unit, Object.assign({}, mockData)));
        window.postMessage(testMessageWithUnhandledType, '*');
        // HACK: We don't have a function we could reliably await here, so this test relies on the timeout of `waitFor`.
        yield expect(waitFor(() => expect(screen.getByTitle(unit.display_name)).toHaveAttribute('height', String(testMessageWithUnhandledType.payload.height)), { timeout: 100 })).rejects.toThrowError(/Expected the element to have attribute/);
    }));
    it('scrolls to correct place onLoad', () => {
        document.body.innerHTML = "<iframe id='unit-iframe' />";
        const mockHashCheck = jest.fn(frameVar => sendUrlHashToFrame(frameVar));
        const frame = document.getElementById('unit-iframe');
        const originalWindow = Object.assign({}, window);
        const windowSpy = jest.spyOn(global, 'window', 'get');
        windowSpy.mockImplementation(() => (Object.assign(Object.assign({}, originalWindow), { location: Object.assign(Object.assign({}, originalWindow.location), { hash: '#test' }) })));
        const messageSpy = jest.spyOn(frame.contentWindow, 'postMessage');
        messageSpy.mockImplementation(() => ({ hashName: originalWindow.location.hash }));
        mockHashCheck(frame);
        expect(mockHashCheck).toHaveBeenCalled();
        expect(messageSpy).toHaveBeenCalled();
        windowSpy.mockRestore();
    });
    it('calls useEffect and checkForHash', () => {
        const mockHashCheck = jest.fn(() => sendUrlHashToFrame());
        const effectSpy = jest.spyOn(React, 'useEffect');
        effectSpy.mockImplementation(() => mockHashCheck());
        render(_jsx(Unit, Object.assign({}, mockData)));
        expect(React.useEffect).toHaveBeenCalled();
        expect(mockHashCheck).toHaveBeenCalled();
    });
});
//# sourceMappingURL=Unit.test.js.map