import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
const withParamsAndNavigation = WrappedComponent => {
    const WithParamsNavigationComponent = props => {
        const { courseId, sequenceId, unitId } = useParams();
        const navigate = useNavigate();
        const { pathname } = useLocation();
        const isPreview = pathname.startsWith('/preview');
        return (_jsx(WrappedComponent, Object.assign({ routeCourseId: courseId, routeSequenceId: sequenceId, routeUnitId: unitId, navigate: navigate, isPreview: isPreview }, props)));
    };
    return WithParamsNavigationComponent;
};
export default withParamsAndNavigation;
//# sourceMappingURL=utils.js.map