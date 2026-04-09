export default StreakModal;
declare function StreakModal({ courseId, metadataModel, streakLengthToCelebrate, isStreakCelebrationOpen, closeStreakCelebration, streakDiscountCouponEnabled, verifiedMode, ...rest }: {
    [x: string]: any;
    courseId: any;
    metadataModel: any;
    streakLengthToCelebrate: any;
    isStreakCelebrationOpen: any;
    closeStreakCelebration: any;
    streakDiscountCouponEnabled: any;
    verifiedMode: any;
}): import("react/jsx-runtime").JSX.Element | null;
declare namespace StreakModal {
    namespace defaultProps {
        const isStreakCelebrationOpen: boolean;
        const streakDiscountCouponEnabled: boolean;
        const streakLengthToCelebrate: number;
        const verifiedMode: {};
    }
    namespace propTypes {
        export const courseId: PropTypes.Validator<string>;
        export const metadataModel: PropTypes.Validator<string>;
        const streakLengthToCelebrate_1: PropTypes.Requireable<number>;
        export { streakLengthToCelebrate_1 as streakLengthToCelebrate };
        const isStreakCelebrationOpen_1: PropTypes.Requireable<boolean>;
        export { isStreakCelebrationOpen_1 as isStreakCelebrationOpen };
        export const closeStreakCelebration: PropTypes.Validator<(...args: any[]) => any>;
        const streakDiscountCouponEnabled_1: PropTypes.Requireable<boolean>;
        export { streakDiscountCouponEnabled_1 as streakDiscountCouponEnabled };
        const verifiedMode_1: PropTypes.Requireable<PropTypes.InferProps<{
            currencySymbol: PropTypes.Requireable<string>;
            price: PropTypes.Requireable<number>;
            sku: PropTypes.Requireable<string>;
            upgradeUrl: PropTypes.Requireable<string>;
        }>>;
        export { verifiedMode_1 as verifiedMode };
    }
}
import PropTypes from "prop-types";
