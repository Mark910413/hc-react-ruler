"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _ruler = _interopRequireDefault(require("./ruler.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var RulerEle = /*#__PURE__*/function (_React$Component) {
  _inherits(RulerEle, _React$Component);

  var _super = _createSuper(RulerEle);

  function RulerEle(props) {
    var _this;

    _classCallCheck(this, RulerEle);

    _this = _super.call(this, props);
    _this.state = _objectSpread({}, props);
    _this.canvas = _react["default"].createRef();
    _this.ruler = null;
    return _this;
  }

  _createClass(RulerEle, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.drawRuler(this.state);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value !== this.state.value) {
        this.setState({
          value: nextProps.value
        });
        this.ruler.setValue(nextProps.value);
      }
    }
  }, {
    key: "drawRuler",
    value: function drawRuler(options) {
      var _this2 = this;

      var _options$height = options.height,
          height = _options$height === void 0 ? 50 : _options$height,
          _options$start = options.start,
          start = _options$start === void 0 ? 0 : _options$start,
          _options$end = options.end,
          end = _options$end === void 0 ? 100 : _options$end,
          _options$capacity = options.capacity,
          capacity = _options$capacity === void 0 ? 1 : _options$capacity,
          _options$value = options.value,
          value = _options$value === void 0 ? 0 : _options$value,
          _options$unit = options.unit,
          unit = _options$unit === void 0 ? 10 : _options$unit,
          _options$centerLine = options.centerLine,
          centerLine = _options$centerLine === void 0 ? {} : _options$centerLine,
          _options$scaleplate = options.scaleplate,
          scaleplate = _options$scaleplate === void 0 ? {} : _options$scaleplate,
          _options$onChange = options.onChange,
          _onChange = _options$onChange === void 0 ? function () {} : _options$onChange,
          _options$rate = options.rate,
          rate = _options$rate === void 0 ? 1 : _options$rate;
      /* eslint-disable no-new */


      this.ruler = new _ruler["default"]({
        elem: this.canvas,
        width: this.canvas.offsetWidth,
        // 画布宽
        height: height,
        // 画布高
        start: start,
        // 最小值
        end: end,
        // 最大值
        capacity: capacity,
        // 每个刻度代表值
        value: value,
        // 当前值
        unit: unit,
        // 刻度距离
        centerLine: centerLine,
        // 中心线
        scaleplate: scaleplate,
        // 刻度样式
        rate: rate,
        onChange: function onChange(val) {
          _this2.setState({
            value: val
          }, function () {
            _onChange(val);
          });
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "ruler-dom"
      }, /*#__PURE__*/_react["default"].createElement("canvas", {
        ref: function ref(el) {
          _this3.canvas = el;
        },
        id: "ruler",
        width: "100%",
        style: {
          width: '100%',
          display: 'block'
        }
      }));
    }
  }]);

  return RulerEle;
}(_react["default"].Component);

var _default = RulerEle;
exports["default"] = _default;