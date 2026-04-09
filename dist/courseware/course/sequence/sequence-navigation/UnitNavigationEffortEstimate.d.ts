export default UnitNavigationEffortEstimate;
/**
 * Note: this component is basically ignored and just acts as a pass-through to children components right now because
 * effort estimation is no longer attached to the sequence model. It used to be attached, via the LMS blocks API and
 * its block transformers. But as part of the effort to remove reliance on modulestore blocks on the LMS side, we
 * stopped calling that API and we lost effort estimation in the deal.
 *
 * See https://openedx.atlassian.net/browse/AA-930 for the initiative to refactor Effort Estimation to avoid the
 * modulestore, which would allow us to revive the usefulness of this component again.
 */
declare function UnitNavigationEffortEstimate({ children, sequenceId, unitId, }: {
    children: any;
    sequenceId: any;
    unitId: any;
}): any;
declare namespace UnitNavigationEffortEstimate {
    namespace propTypes {
        const children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        const sequenceId: PropTypes.Validator<string>;
        const unitId: PropTypes.Requireable<string>;
    }
    namespace defaultProps {
        const children_1: null;
        export { children_1 as children };
        const unitId_1: null;
        export { unitId_1 as unitId };
    }
}
import PropTypes from "prop-types";
