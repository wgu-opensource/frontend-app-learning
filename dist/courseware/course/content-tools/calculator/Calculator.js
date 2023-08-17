"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _paragon = require("@edx/paragon");

var _frontendPlatform = require("@edx/frontend-platform");

var _auth = require("@edx/frontend-platform/auth");

var _i18n = require("@edx/frontend-platform/i18n");

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _faCalculator = require("@fortawesome/free-solid-svg-icons/faCalculator");

var _faQuestionCircle = require("@fortawesome/free-solid-svg-icons/faQuestionCircle");

var _faTimesCircle = require("@fortawesome/free-solid-svg-icons/faTimesCircle");

var _faEquals = require("@fortawesome/free-solid-svg-icons/faEquals");

var _messages = _interopRequireDefault(require("./messages"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class Calculator extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {
      equation: '',
      result: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    const urlEncoded = new URLSearchParams();
    urlEncoded.append('equation', this.state.equation);
    const response = await (0, _auth.getAuthenticatedHttpClient)().get(`${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/calculate?${urlEncoded.toString()}`);
    this.setState(() => ({
      result: response.data.result
    }));
  }

  changeEquation(value) {
    this.setState(() => ({
      equation: value
    }));
  }

  render() {
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Collapsible.Advanced, {
      className: "calculator",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "text-right",
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Collapsible.Trigger, {
          tag: "a",
          className: "trigger btn",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Collapsible.Visible, {
            whenOpen: true,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
              icon: _faTimesCircle.faTimesCircle,
              "aria-hidden": "true",
              className: "mr-2"
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Collapsible.Visible, {
            whenClosed: true,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
              icon: _faCalculator.faCalculator,
              "aria-hidden": "true",
              className: "mr-2"
            })
          }), this.props.intl.formatMessage(_messages.default['calculator.button.label'])]
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Collapsible.Body, {
        className: "calculator-content pt-4",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("form", {
          onSubmit: this.handleSubmit,
          className: "container-xl form-inline flex-nowrap",
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
            type: "text",
            placeholder: this.props.intl.formatMessage(_messages.default['calculator.input.field.label']),
            "aria-label": this.props.intl.formatMessage(_messages.default['calculator.input.field.label']),
            className: "form-control w-100",
            onChange: event => this.changeEquation(event.target.value)
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
            className: "btn btn-primary mx-3",
            "aria-label": this.props.intl.formatMessage(_messages.default['calculator.submit.button.label']),
            type: "submit",
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
              icon: _faEquals.faEquals,
              "aria-hidden": "true"
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
            type: "text",
            tabIndex: "-1",
            readOnly: true,
            "aria-live": "polite",
            placeholder: this.props.intl.formatMessage(_messages.default['calculator.result.field.placeholder']),
            "aria-label": this.props.intl.formatMessage(_messages.default['calculator.result.field.label']),
            className: "form-control w-50",
            value: this.state.result
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Collapsible.Advanced, {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            className: "container-xl",
            children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Collapsible.Trigger, {
              className: "btn btn-link btn-sm px-0 d-inline-flex align-items-center",
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Collapsible.Visible, {
                whenOpen: true,
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
                  icon: _faTimesCircle.faTimesCircle,
                  "aria-hidden": "true",
                  className: "mr-2"
                })
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Collapsible.Visible, {
                whenClosed: true,
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactFontawesome.FontAwesomeIcon, {
                  icon: _faQuestionCircle.faQuestionCircle,
                  "aria-hidden": "true",
                  className: "mr-2"
                })
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
                id: "calculator.instructions.button.label",
                defaultMessage: "Calculator Instructions"
              })]
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Collapsible.Body, {
            className: "container-xl pt-3",
            style: {
              maxHeight: '50vh',
              overflow: 'auto'
            },
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
              tagName: "h6",
              id: "calculator.instructions",
              defaultMessage: "For detailed information, see the {expressions_link}.",
              description: "Text that precedes the link which redirects to help page calculator",
              values: {
                expressions_link: /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
                  href: (0, _frontendPlatform.getConfig)().SUPPORT_URL_CALCULATOR_MATH,
                  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
                    id: "calculator.instructions.support.title",
                    defaultMessage: "Help Center",
                    description: "Anchor text for link which redirects to help page calculator"
                  })
                })
              }
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)("strong", {
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
                  id: "calculator.instructions.useful.tips",
                  defaultMessage: "Useful tips:",
                  description: "Headline for the (list of tips) about using the calculator"
                })
              })
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("ul", {
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
                className: "hint-item",
                id: "hint-paren",
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
                  id: "calculator.hint1",
                  defaultMessage: "Use parentheses () to make expressions clear. You can use parentheses inside other parentheses.",
                  description: "The text indicate that the calculator supports parentheses"
                })
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
                className: "hint-item",
                id: "hint-spaces",
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
                  id: "calculator.hint2",
                  defaultMessage: "Do not use spaces in expressions.",
                  description: "It indicate that using a space might cause un expected behavior"
                })
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
                className: "hint-item",
                id: "hint-howto-constants",
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
                  id: "calculator.hint3",
                  defaultMessage: "For constants, indicate multiplication explicitly (example: 5*c).",
                  description: "It indicate the style of math notation"
                })
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
                className: "hint-item",
                id: "hint-howto-maffixes",
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
                  id: "calculator.hint4",
                  defaultMessage: "For affixes, type the number and affix without a space (example: 5c)."
                })
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
                className: "hint-item",
                id: "hint-howto-functions",
                children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
                  id: "calculator.hint5",
                  defaultMessage: "For functions, type the name of the function, then the expression in parentheses.",
                  description: "It indicate how to use a math function, e.g. exp(4)."
                })
              })]
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("table", {
              className: "table small",
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("thead", {
                children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
                  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("th", {
                    scope: "col",
                    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
                      id: "calculator.instruction.table.to.use.heading",
                      defaultMessage: "To Use",
                      description: "Column header which indicate  calculator functionality"
                    })
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("th", {
                    scope: "col",
                    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
                      id: "calculator.instruction.table.type.heading",
                      defaultMessage: "Type",
                      description: "Column header which indicate the supported type(s) of a the calculator functionality"
                    })
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("th", {
                    scope: "col",
                    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
                      id: "calculator.instruction.table.examples.heading",
                      defaultMessage: "Examples",
                      description: "Column header which list examples of  calculator functionality"
                    })
                  })]
                })
              }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("tbody", {
                children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
                  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("th", {
                    scope: "row",
                    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
                      id: "calculator.instruction.table.to.use.numbers",
                      defaultMessage: "Numbers",
                      description: "A calculator functionality"
                    })
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
                    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("ul", {
                      className: "list-unstyled m-0",
                      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
                        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
                          id: "calculator.instruction.table.to.use.numbers.type1",
                          defaultMessage: "Integers",
                          description: "Type of numbers that is supported the calculator"
                        })
                      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
                        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
                          id: "calculator.instruction.table.to.use.numbers.type2",
                          defaultMessage: "Fractions",
                          description: "Type of numbers that is supported by the calculator"
                        })
                      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
                        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
                          id: "calculator.instruction.table.to.use.numbers.type3",
                          defaultMessage: "Decimals",
                          description: "Type of numbers that is supported by the calculator"
                        })
                      })]
                    })
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
                    dir: "auto",
                    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("ul", {
                      className: "list-unstyled m-0",
                      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
                        children: "2520"
                      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
                        children: "2/3"
                      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
                        children: "3.14, .98"
                      })]
                    })
                  })]
                }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
                  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("th", {
                    scope: "row",
                    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
                      id: "calculator.instruction.table.to.use.operators",
                      defaultMessage: "Operators",
                      description: "A calculator functionality"
                    })
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
                    dir: "auto",
                    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("ul", {
                      className: "list-unstyled m-0",
                      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("li", {
                        children: [' + - * / ', /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
                          id: "calculator.instruction.table.to.use.operators.type1",
                          defaultMessage: "(add, subtract, multiply, divide)",
                          description: "Type of opprators that are supported by the calculator"
                        })]
                      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("li", {
                        children: ['^ ', /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
                          id: "calculator.instruction.table.to.use.operators.type2",
                          defaultMessage: "(raise to a power)",
                          description: "It indicate that symbol (^) is being used to raise power, e.g. 2^2 = 4"
                        })]
                      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("li", {
                        children: ['|| ', /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
                          id: "calculator.instruction.table.to.use.operators.type3",
                          defaultMessage: "(parallel resistors)",
                          description: "It indicate that the sympol (||) is being used to calculate (parallel resistor), it is a concept in electrical/electronic engineering"
                        })]
                      })]
                    })
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
                    dir: "auto",
                    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("ul", {
                      className: "list-unstyled m-0",
                      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
                        children: "x+(2*y)/x-1"
                      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
                        children: "x^(n+1)"
                      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
                        children: "v_IN+v_OUT"
                      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
                        children: "1||2"
                      })]
                    })
                  })]
                }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
                  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("th", {
                    scope: "row",
                    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
                      id: "calculator.instruction.table.to.use.constants",
                      defaultMessage: "Constants",
                      description: "It indicate that the calculator support constants, e.g. the speed of light"
                    })
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
                    dir: "auto",
                    children: "e, pi"
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
                    dir: "auto",
                    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("ul", {
                      className: "list-unstyled m-0",
                      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
                        children: "20*e"
                      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
                        children: "418*pi"
                      })]
                    })
                  })]
                }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
                  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("th", {
                    scope: "row",
                    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
                      id: "calculator.instruction.table.to.use.affixes",
                      defaultMessage: "Affixes"
                    })
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
                    dir: "auto",
                    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
                      id: "calculator.instruction.table.to.use.affixes.type",
                      defaultMessage: "Percent sign (%)"
                    })
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
                    dir: "auto",
                    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("ul", {
                      className: "list-unstyled m-0",
                      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
                        children: "20%"
                      })
                    })
                  })]
                }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
                  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("th", {
                    scope: "row",
                    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
                      id: "calculator.instruction.table.to.use.basic.functions",
                      defaultMessage: "Basic functions",
                      description: "It indicate that calculator supports mathematical function"
                    })
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
                    dir: "auto",
                    children: "abs, exp, fact, factorial, ln, log2, log10, sqrt"
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
                    dir: "auto",
                    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("ul", {
                      className: "list-unstyled m-0",
                      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
                        children: "abs(x+y)"
                      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
                        children: "sqrt(x^2-y)"
                      })]
                    })
                  })]
                }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
                  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("th", {
                    scope: "row",
                    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
                      id: "calculator.instruction.table.to.use.trig.functions",
                      defaultMessage: "Trigonometric functions",
                      description: "Type of mathematical function that is supported by the calculator"
                    })
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
                    dir: "auto",
                    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("ul", {
                      className: "list-unstyled m-0",
                      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
                        children: "sin, cos, tan, sec, csc, cot"
                      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
                        children: "arcsin, sinh, arcsinh"
                      })]
                    })
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
                    dir: "auto",
                    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("ul", {
                      className: "list-unstyled m-0",
                      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
                        children: "sin(4x+y)"
                      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
                        children: "arccsch(4x+y)"
                      })]
                    })
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
                    dir: "auto"
                  })]
                }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
                  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("th", {
                    scope: "row",
                    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
                      id: "calculator.instruction.table.to.use.scientific.notation",
                      defaultMessage: "Scientific notation",
                      description: "It indicate that calculator supports scientific notation"
                    })
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
                    dir: "auto",
                    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
                      id: "calculator.instruction.table.to.use.scientific.notation.type1",
                      defaultMessage: "{exponentSyntax} and the exponent",
                      description: "Type of scientific notation that is  supported by the calculator",
                      values: {
                        exponentSyntax: '10^'
                      }
                    })
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
                    dir: "auto",
                    children: "10^-9"
                  })]
                }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
                  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("th", {
                    scope: "row",
                    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
                      id: "calculator.instruction.table.to.use.scientific.notation.type2",
                      defaultMessage: "{notationSyntax} notation",
                      description: "It indicate that calculator supports (e) to be used in notation",
                      values: {
                        notationSyntax: 'e'
                      }
                    })
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
                    dir: "auto",
                    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
                      id: "calculator.instruction.table.to.use.scientific.notation.type3",
                      defaultMessage: "{notationSyntax} and the exponent",
                      description: "An example for using (e) in notation",
                      values: {
                        notationSyntax: '1e'
                      }
                    })
                  }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
                    dir: "auto",
                    children: "1e-9"
                  })]
                })]
              })]
            })]
          })]
        })]
      })]
    });
  }

}

Calculator.propTypes = {
  intl: _i18n.intlShape.isRequired
};

var _default = (0, _i18n.injectIntl)(Calculator);

exports.default = _default;
//# sourceMappingURL=Calculator.js.map