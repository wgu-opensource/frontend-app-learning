"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@openedx/paragon");
var _userMessages = require("../../generic/user-messages");
var _MasqueradeUserNameInput = _interopRequireDefault(require("./MasqueradeUserNameInput"));
var _MasqueradeWidgetOption = _interopRequireDefault(require("./MasqueradeWidgetOption"));
var _api = require("./data/api");
var _messages = _interopRequireDefault(require("./messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class MasqueradeWidget extends _react.Component {
  constructor(props) {
    super(props);
    this.courseId = props.courseId;
    this.state = {
      autoFocus: false,
      masquerade: 'Staff',
      active: {},
      available: [],
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
    const {
      active,
      available
    } = this.parseAvailableOptions(data);
    this.setState({
      active,
      available
    });
  }
  getOptions() {
    var _this = this;
    const options = this.state.available.map(group => /*#__PURE__*/(0, _jsxRuntime.jsx)(_MasqueradeWidgetOption.default, {
      groupId: group.groupId,
      groupName: group.name,
      role: group.role,
      selected: this.state.active,
      userName: group.userName,
      userPartitionId: group.userPartitionId,
      userNameInputToggle: function () {
        return _this.toggle(...arguments);
      },
      onSubmit: payload => this.onSubmit(payload)
    }, group.name));
    return options;
  }
  clearError() {
    this.props.onError('');
  }
  toggle(show, groupId, groupName, role, userName, userPartitionId) {
    this.setState(prevState => ({
      autoFocus: true,
      masquerade: groupName,
      shouldShowUserNameInput: show === undefined ? !prevState.shouldShowUserNameInput : show,
      active: _objectSpread(_objectSpread({}, prevState.active), {}, {
        groupId,
        role,
        userName,
        userPartitionId
      })
    }));
  }
  parseAvailableOptions(postData) {
    const data = postData || {};
    const active = data.active || {};
    const available = data.available || [];
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
    return {
      active,
      available
    };
  }
  render() {
    const {
      autoFocus,
      masquerade,
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
            id: "masquerade-widget-toggle",
            variant: "inverse-outline-primary",
            children: masquerade
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Dropdown.Menu, {
            children: this.getOptions()
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
          className: "col-4",
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
var _default = exports.default = (0, _i18n.injectIntl)(MasqueradeWidget);
//# sourceMappingURL=MasqueradeWidget.js.map