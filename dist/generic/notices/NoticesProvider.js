var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useEffect, useState } from 'react';
import { getConfig } from '@edx/frontend-platform';
import PropTypes from 'prop-types';
import { getNotices } from './api';
/**
 * This component uses the platform-plugin-notices plugin to function.
 * If the user has an unacknowledged notice, they will be rerouted off
 * course home and onto a full-screen notice page. If the plugin is not
 * installed, or there are no notices, we just passthrough this component.
 */
const NoticesProvider = ({ children }) => {
    const [isRedirected, setIsRedirected] = useState();
    useEffect(() => {
        function getData() {
            return __awaiter(this, void 0, void 0, function* () {
                if (getConfig().ENABLE_NOTICES) {
                    const data = yield getNotices();
                    if (data && data.results && data.results.length > 0) {
                        const { results } = data;
                        setIsRedirected(true);
                        window.location.replace(`${results[0]}?next=${window.location.href}`);
                    }
                }
            });
        }
        getData();
    }, []);
    return isRedirected === true ? null : children;
};
NoticesProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
export default NoticesProvider;
//# sourceMappingURL=NoticesProvider.js.map