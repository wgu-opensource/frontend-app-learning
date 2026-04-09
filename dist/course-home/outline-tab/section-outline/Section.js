import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Collapsible, IconButton } from '@openedx/paragon';
import { Minus, Plus } from '@openedx/paragon/icons';
import { useModel } from '../../../generic/model-store';
import genericMessages from '../../../generic/messages';
import { useContextId } from '../../../data/hooks';
import messages from '../messages';
import SectionTitle from './SectionTitle';
import SequenceLink from './SequenceLink';
const Section = ({ defaultOpen, expand, section, }) => {
    const intl = useIntl();
    const courseId = useContextId();
    const { complete, sequenceIds, title, hideFromTOC, } = section;
    const { courseBlocks: { sequences, }, } = useModel('outline', courseId);
    const [open, setOpen] = useState(defaultOpen);
    useEffect(() => {
        setOpen(expand);
    }, [expand]);
    useEffect(() => {
        setOpen(defaultOpen);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (_jsx("li", { children: _jsx(Collapsible, Object.assign({ className: "mb-2", styling: "card-lg", title: _jsx(SectionTitle, Object.assign({}, { complete, hideFromTOC, title })), open: open, onToggle: () => { setOpen(!open); }, iconWhenClosed: (_jsx(IconButton, { alt: intl.formatMessage(messages.openSection), iconAs: Plus, onClick: () => { setOpen(true); }, size: "sm" })), iconWhenOpen: (_jsx(IconButton, { alt: intl.formatMessage(genericMessages.close), iconAs: Minus, onClick: () => { setOpen(false); }, size: "sm" })) }, { children: _jsx("ol", Object.assign({ className: "list-unstyled" }, { children: sequenceIds.map((sequenceId, index) => (_jsx(SequenceLink, { id: sequenceId, sequence: sequences[sequenceId], first: index === 0 }, sequenceId))) })) })) }));
};
export default Section;
//# sourceMappingURL=Section.js.map