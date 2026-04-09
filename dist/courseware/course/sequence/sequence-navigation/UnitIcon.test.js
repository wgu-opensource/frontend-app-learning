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
import { initializeTestStore, render } from '../../../../setupTest';
import UnitIcon from './UnitIcon';
describe('Unit Icon', () => {
    const types = {
        video: 'fa-video',
        other: 'fa-book',
        vertical: 'fa-tasks',
        problem: 'fa-edit',
        lock: 'fa-lock',
        undefined: 'fa-book',
    };
    const courseMetadata = Factory.build('courseMetadata');
    const unitBlocks = Object.keys(types).map(contentType => Factory.build('block', { id: contentType, type: contentType }, { courseId: courseMetadata.id }));
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield initializeTestStore({ courseMetadata, unitBlocks });
    }));
    unitBlocks.forEach(block => {
        it(`renders correct icon for ${block.type} unit`, () => {
            // Suppress warning for undefined prop type.
            if (block.type === 'undefined') {
                jest.spyOn(console, 'error').mockImplementation(() => { });
            }
            const { container } = render(_jsx(UnitIcon, { type: block.type }));
            expect(container.querySelector('svg')).toHaveClass(types[block.type]);
        });
    });
});
//# sourceMappingURL=UnitIcon.test.js.map