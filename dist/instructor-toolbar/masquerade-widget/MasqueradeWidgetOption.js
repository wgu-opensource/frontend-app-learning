"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _paragon = require("@edx/paragon");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
class MasqueradeWidgetOption extends _react.Component {
  onClick(event) {
    // TODO: Remove this hack when we upgrade Paragon
    // Note: The current version of Paragon does _not_ close dropdown components
    // automatically (or easily programmatically) when you click on an item.
    // We can simulate this behavior by programmatically clicking the
    // toggle button on behalf of the user.
    // The newest version of Paragon already contains this behavior,
    // so we can remove this when we upgrade to that point.
    event.target.parentNode.parentNode.click();
    const {
      groupId,
      role,
      userName,
      userPartitionId,
      userNameInputToggle
    } = this.props;
    const payload = {};
    if (userName || userName === '') {
      userNameInputToggle(true);
      return false;
    }
    if (role) {
      payload.role = role;
    }
    if (groupId) {
      payload.group_id = parseInt(groupId, 10);
      payload.user_partition_id = parseInt(userPartitionId, 10);
    }
    this.props.onSubmit(payload).then(() => {
      global.location.reload();
    });
    return true;
  }
  isSelected() {
    /* eslint-disable arrow-body-style */
    const isEqual = ['groupId', 'role', 'userName', 'userPartitionId'].reduce((accumulator, currentValue) => {
      return accumulator && this.props[currentValue] === this.props.selected[currentValue];
    }, true);
    return isEqual;
  }
  render() {
    const {
      groupName
    } = this.props;
    if (!groupName) {
      return null;
    }
    const selected = this.isSelected();
    let className;
    if (selected) {
      className = 'active';
    }
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Dropdown.Item, {
      className: className,
      href: "#",
      onClick: event => this.onClick(event),
      children: groupName
    });
  }
}
MasqueradeWidgetOption.propTypes = {
  groupId: _propTypes.default.number,
  groupName: _propTypes.default.string.isRequired,
  onSubmit: _propTypes.default.func.isRequired,
  role: _propTypes.default.string,
  selected: _propTypes.default.shape({
    courseKey: _propTypes.default.string.isRequired,
    groupId: _propTypes.default.number,
    role: _propTypes.default.string,
    userName: _propTypes.default.string,
    userPartitionId: _propTypes.default.number
  }),
  userName: _propTypes.default.string,
  userNameInputToggle: _propTypes.default.func.isRequired,
  userPartitionId: _propTypes.default.number
};
MasqueradeWidgetOption.defaultProps = {
  groupId: null,
  role: null,
  selected: null,
  userName: null,
  userPartitionId: null
};
var _default = MasqueradeWidgetOption;
exports.default = _default;
//# sourceMappingURL=MasqueradeWidgetOption.js.map