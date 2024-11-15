"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@edx/paragon");
var _userMessages = require("../../generic/user-messages");
var _MasqueradeUserNameInput = _interopRequireDefault(require("./MasqueradeUserNameInput"));
var _MasqueradeWidgetOption = _interopRequireDefault(require("./MasqueradeWidgetOption"));
var _api = require("./data/api");
var _messages = _interopRequireDefault(require("./messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
class MasqueradeWidget extends _react.Component {
  constructor(props) {
    super(props);
    this.courseId = props.courseId;
    this.state = {
      autoFocus: false,
      masquerade: 'Staff',
      options: [],
      shouldShowUserNameInput: false,
      masqueradeUsername: null
    };
  }
  componentDidMount() {
    (0, _api.getMasqueradeOptions)(this.courseId).then(data => {
      if (data.success) {
        this.onSuccess(data);
      } else {
        // This was explicitly denied by the backend;
        // assume it's disabled/unavailable.
        // eslint-disable-next-line no-console
        this.onError('Unable to get masquerade options');
      }
    }).catch(response => {
      // There's not much we can do to recover;
      // if we can't fetch masquerade options,
      // assume it's disabled/unavailable.
      // eslint-disable-next-line no-console
      console.error('Unable to get masquerade options', response);
    });
  }
  onError(message) {
    this.props.onError(message);
  }
  async onSubmit(payload) {
    this.clearError();
    const options = await (0, _api.postMasqueradeOptions)(this.courseId, payload);
    return options;
  }
  onSuccess(data) {
    const options = this.parseAvailableOptions(data);
    this.setState({
      options
    });
  }
  clearError() {
    this.props.onError('');
  }
  toggle(show) {
    this.setState(prevState => ({
      autoFocus: true,
      masquerade: 'Specific Student...',
      shouldShowUserNameInput: show === undefined ? !prevState.shouldShowUserNameInput : show
    }));
  }
  parseAvailableOptions(postData) {
    var _this = this;
    const data = postData || {};
    const active = data.active || {};
    const available = data.available || [];
    const options = available.map(group => /*#__PURE__*/(0, _jsxRuntime.jsx)(_MasqueradeWidgetOption.default, {
      groupId: group.groupId,
      groupName: group.name,
      role: group.role,
      selected: active,
      userName: group.userName,
      userPartitionId: group.userPartitionId,
      userNameInputToggle: function () {
        return _this.toggle(...arguments);
      },
      onSubmit: payload => this.onSubmit(payload)
    }, group.name));
    if (active.userName) {
      this.setState({
        autoFocus: false,
        masquerade: 'Specific Student...',
        masqueradeUsername: active.userName,
        shouldShowUserNameInput: true
      });
    } else if (active.groupName) {
      this.setState({
        masquerade: active.groupName
      });
    } else if (active.role === 'student') {
      this.setState({
        masquerade: 'Learner'
      });
    }
    return options;
  }
  render() {
    const {
      autoFocus,
      masquerade,
      options,
      shouldShowUserNameInput,
      masqueradeUsername
    } = this.state;
    const specificLearnerInputText = this.props.intl.formatMessage(_messages.default.placeholder);
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "flex-grow-1",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "row",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          className: "col-auto col-form-label pl-3",
          children: "View this course as:"
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Dropdown, {
          className: "flex-shrink-1 mx-1",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Dropdown.Toggle, {
            variant: "inverse-outline-primary",
            children: masquerade
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Dropdown.Menu, {
            children: options
          })]
        })]
      }), shouldShowUserNameInput && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "row mt-2",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
          className: "col-auto col-form-label pl-3",
          id: "masquerade-search-label",
          children: `${specificLearnerInputText}:`
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_MasqueradeUserNameInput.default, {
          id: "masquerade-search",
          className: "col-4 form-control",
          autoFocus: autoFocus,
          defaultValue: masqueradeUsername,
          onError: errorMessage => this.onError(errorMessage),
          onSubmit: payload => this.onSubmit(payload)
        })]
      })]
    });
  }
}
MasqueradeWidget.propTypes = {
  courseId: _propTypes.default.string.isRequired,
  intl: _i18n.intlShape.isRequired,
  onError: _propTypes.default.func.isRequired
};
MasqueradeWidget.contextType = _userMessages.UserMessagesContext;
var _default = (0, _i18n.injectIntl)(MasqueradeWidget);
exports.default = _default;
//# sourceMappingURL=MasqueradeWidget.js.map