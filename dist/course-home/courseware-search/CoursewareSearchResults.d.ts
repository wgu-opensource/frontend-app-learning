export default CoursewareSearchResults;
declare function CoursewareSearchResults({ results }: {
    results?: any[] | undefined;
}): import("react/jsx-runtime").JSX.Element;
declare namespace CoursewareSearchResults {
    namespace propTypes {
        const results: PropTypes.Requireable<(PropTypes.InferProps<{
            id: PropTypes.Requireable<string>;
            title: PropTypes.Requireable<string>;
            type: PropTypes.Requireable<string>;
            location: PropTypes.Requireable<(string | null | undefined)[]>;
            url: PropTypes.Requireable<string>;
            contentHits: PropTypes.Requireable<number>;
        }> | null | undefined)[]>;
    }
    namespace defaultProps {
        const results_1: never[];
        export { results_1 as results };
    }
}
import PropTypes from "prop-types";
