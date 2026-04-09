export default Day;
declare function Day({ date, first, items, last, }: {
    date: any;
    first: any;
    items: any;
    last: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace Day {
    namespace propTypes {
        const date: PropTypes.Validator<{
            [x: string]: any;
        }>;
        const first: PropTypes.Requireable<boolean>;
        const items: PropTypes.Validator<(PropTypes.InferProps<{
            date: PropTypes.Requireable<string>;
            dateType: PropTypes.Requireable<string>;
            description: PropTypes.Requireable<string>;
            dueNext: PropTypes.Requireable<boolean>;
            learnerHasAccess: PropTypes.Requireable<boolean>;
            link: PropTypes.Requireable<string>;
            title: PropTypes.Requireable<string>;
        }> | null | undefined)[]>;
        const last: PropTypes.Requireable<boolean>;
    }
    namespace defaultProps {
        const first_1: boolean;
        export { first_1 as first };
        const last_1: boolean;
        export { last_1 as last };
    }
}
import PropTypes from "prop-types";
