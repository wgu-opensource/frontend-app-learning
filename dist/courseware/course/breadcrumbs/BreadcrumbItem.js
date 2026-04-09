import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { getConfig } from '@edx/frontend-platform';
import { useToggle, ModalPopup, Menu, Button, } from '@openedx/paragon';
import { Link, useLocation } from 'react-router-dom';
import JumpNavMenuItem from '../JumpNavMenuItem';
const BreadcrumbItem = ({ content, withSeparator, separator, courseId, sequenceId, unitId, isStaff, }) => {
    const defaultContent = content.filter((destination) => destination.default)[0] || { id: courseId, label: '', sequences: [] };
    const showRegularLink = getConfig().ENABLE_JUMPNAV !== 'true' || content.length < 2 || !isStaff;
    const [isOpen, open, close] = useToggle(false);
    const [target, setTarget] = useState(null);
    const { pathname } = useLocation();
    const isPreview = pathname.startsWith('/preview');
    const baseUrl = defaultContent.sequences.length
        ? `/course/${courseId}/${defaultContent.sequences[0].id}`
        : `/course/${courseId}/${defaultContent.id}`;
    const link = isPreview ? `/preview${baseUrl}` : baseUrl;
    return (_jsxs(_Fragment, { children: [withSeparator && separator && (_jsx("li", Object.assign({ className: "col-auto p-0 mx-2 text-primary-500 text-truncate text-nowrap", role: "presentation", "aria-hidden": true }, { children: separator }))), _jsx("li", Object.assign({ style: {
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                }, "data-testid": "breadcrumb-item" }, { children: showRegularLink ? (_jsx(Link, Object.assign({ className: "text-primary-500", to: link }, { children: defaultContent.label }))) : (_jsxs(_Fragment, { children: [
                        // @ts-ignore
                        _jsx(Button, Object.assign({ className: "text-primary-500 m-0 p-0", variant: "link", onClick: open, ref: setTarget }, { children: defaultContent.label })), _jsx(ModalPopup, Object.assign({ positionRef: target, isOpen: isOpen, onClose: close }, { children: _jsx(Menu, { children: content.map((item) => (_jsx(JumpNavMenuItem, { isDefault: item.default, sequences: item.sequences, courseId: courseId, title: item.label, currentSequence: sequenceId, currentUnit: unitId, onClick: close }, item.label))) }) }))] })) }))] }));
};
export default BreadcrumbItem;
//# sourceMappingURL=BreadcrumbItem.js.map