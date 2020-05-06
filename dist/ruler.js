"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Ruler = /*#__PURE__*/function () {
  function Ruler(options) {
    _classCallCheck(this, Ruler);

    this.ver = '1.0.0';
    this.options = options;
    this.options.scaleplate = this.options.scaleplate === undefined ? {} : this.options.scaleplate;
    this.options.scaleplate.color = this.options.scaleplate.color === undefined ? '#f00' : this.options.scaleplate.color; // 刻度颜色

    this.options.scaleplate.width = this.options.scaleplate.width === undefined ? 1 : this.options.scaleplate.width; // 刻度宽度

    this.options.scaleplate.fontsize = this.options.scaleplate.fontsize === undefined ? 12 : this.options.scaleplate.fontsize; // 刻度值字体大小

    this.options.scaleplate.fontcolor = this.options.scaleplate.fontcolor === undefined ? '#f00' : this.options.scaleplate.fontcolor; // 刻度值字体颜色

    this.options.scaleplate.fontfamily = this.options.scaleplate.fontfamily === undefined ? 'Courier New' : this.options.scaleplate.fontfamily; // 刻度值字体样式

    this.options.centerLine = this.options.centerLine === undefined ? {} : this.options.centerLine;
    this.options.centerLine.width = this.options.centerLine.width === undefined ? 2 : this.options.centerLine.width;
    this.options.centerLine.linecolor = this.options.centerLine.linecolor === undefined ? '#f00' : this.options.centerLine.linecolor;
    this.options.centerLine.height = this.options.centerLine.height === undefined ? '0.8' : this.options.centerLine.height;
    this.options.scaleplate.fullLineHeight = this.options.fullLineHeight === undefined ? '0.6' : this.options.fullLineHeight;
    this.options.scaleplate.halfLineHeight = this.options.fullLineHeight === undefined ? '0.4' : this.options.halfLineHeight;
    this.options.scaleplate.lineHeight = this.options.lineHeight === undefined ? '0.3' : this.options.lineHeight;
    this.options.unit = this.options.unit === undefined ? 10 : this.options.unit; // 刻度间隔，默认值10

    this.options.value = this.options.value === undefined ? this.options.start : this.options.value; // 中心线位置，默认值为开始值

    this.options.background = this.options.background === undefined ? '#fff' : this.options.background; // 画布背景色，默认白色

    this.options.linecolor = this.options.linecolor === undefined ? '#000' : this.options.linecolor; // 中心线颜色，默认黑色

    this.options.capacity = this.options.capacity === undefined ? 1 : this.options.capacity; // 每个刻度代表的值

    this.moveDistance = -(this.options.value / this.options.capacity) * this.options.unit; // 滑动的距离

    this.options.rate = this.options.rate ? this.options.rate : 1;
    this.timer = null;
    this.init();
  }

  _createClass(Ruler, [{
    key: "init",
    value: function init() {
      this.canvas = typeof this.options.elem === 'string' ? document.querySelector(this.options.elem) : this.options.elem;
      this.canvas.width = this.options.width;
      this.canvas.height = this.options.height + this.options.scaleplate.fontsize * 1.5;
      this.addEvent();
      this.renderCanvas();
    }
  }, {
    key: "renderCanvas",
    value: function renderCanvas() {
      var setValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var ctx = this.canvas.getContext('2d');
      var _this$options = this.options,
          options = _this$options === void 0 ? {} : _this$options; // 两个端点的对moveDistance的取值

      this.moveDistance = this.moveDistance >= 0 ? 0 : this.moveDistance;
      this.moveDistance = -this.moveDistance >= options.end / options.capacity * options.unit ? -(options.end / options.capacity) * options.unit : this.moveDistance; // 显示的值

      var bitArr = options.capacity.toString().split('.');
      var bitNum = bitArr[1] ? bitArr[1].length : 0;
      options.value = Math.ceil(Math.abs(this.moveDistance) / options.unit) * (Math.pow(10, bitNum) * options.capacity) / Math.pow(10, bitNum);
      var i = 0;
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      ctx.lineWidth = options.scaleplate.width;

      for (i; i * options.unit + (this.moveDistance + options.width / 2) < options.width && i * options.capacity <= options.end; i++) {
        // 画刻度线 x轴坐标
        var x = i * options.unit + (this.moveDistance + options.width / 2);
        var textValue = options.capacity * i;
        ctx.beginPath();
        ctx.moveTo(x, Math.ceil(options.height * 3 / 4));
        ctx.fillStyle = options.scaleplate.fontcolor;

        if (i % 10 === 0) {
          // 第1或10格刻度
          ctx.moveTo(x, Math.ceil(options.height * (1 - options.scaleplate.fullLineHeight)));
          ctx.font = "".concat(options.scaleplate.fontsize, "px ").concat(options.scaleplate.fontfamily); // 设置文本的字体大小和字体样式

          ctx.fillStyle = options.scaleplate.fontcolor;
          ctx.fillText(textValue, x - textValue.toString().length * (this.options.scaleplate.fontsize * 0.3), this.options.scaleplate.fontsize * 1.5 + options.height);
        } else if (i % 5 === 0) {
          // 第5格刻度
          ctx.moveTo(x, Math.ceil(options.height * (1 - options.scaleplate.halfLineHeight)));
        } else {
          // 其他刻度
          ctx.moveTo(x, Math.ceil(options.height * (1 - options.scaleplate.lineHeight)));
        }

        ctx.lineTo(x, options.height);
        ctx.strokeStyle = options.scaleplate.color;
        ctx.stroke(); // 实际地绘制出通过 moveTo() 和 lineTo() 方法定义的路径

        ctx.closePath(); // 关闭当前的绘制路径
      } // 绘制中心线


      ctx.beginPath();
      ctx.fillStyle = this.canvas.background;
      ctx.fillRect = (0, 0, this.canvas.width, this.canvas.height);
      ctx.lineWidth = options.centerLine.width;
      ctx.moveTo(Math.floor(this.canvas.width / 2), (1 - options.centerLine.height) * options.height);
      ctx.lineTo(Math.floor(this.canvas.width / 2), this.options.height);
      ctx.strokeStyle = options.centerLine.linecolor;
      ctx.stroke();
      ctx.closePath(); // 标尺底部线

      ctx.beginPath();
      ctx.moveTo(0, this.options.height);
      ctx.lineTo(this.canvas.width, this.options.height);
      ctx.strokeStyle = options.scaleplate.color;
      ctx.lineWidth = options.scaleplate.width;
      ctx.stroke();
      ctx.closePath();

      if (this.options.onChange && !setValue) {
        this.options.onChange(options.value);
      }
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      if (typeof value !== 'number' && !parseInt(value, 10) && parseInt(value, 10) !== 0) {
        return false;
      }

      if (this.timer) {
        window.cancelAnimationFrame(this.timer);
      }

      var that = this;
      var targetX = -(value / this.options.capacity) * this.options.unit;
      var distance = targetX - this.moveDistance;

      function move() {
        that.moveDistance += distance / 10;
        distance -= distance / 10;

        if (Math.abs(distance) < 5) {
          that.moveDistance = targetX;
          that.renderCanvas(true);
        } else {
          that.renderCanvas(true);
          that.timer = window.requestAnimationFrame(move);
        }
      }

      move();
    }
  }, {
    key: "addEvent",
    value: function addEvent() {
      var _this = this;

      var startX;
      var x;
      var curX;
      var startTime;
      var endTime; // 添加手指触碰屏幕时的touchstart事件

      this.canvas.addEventListener('touchstart', function (e) {
        e.stopPropagation();
        e.preventDefault();
        startTime = new Date().getTime();
        x = e.touches[0].clientX; // 获取第一个手指对象的X轴坐标值

        startX = x;
      }, false); // 添加手指滑动屏幕时的touchmove事件

      this.canvas.addEventListener('touchmove', function (e) {
        e.stopPropagation();
        e.preventDefault();

        if (_this.timer) {
          window.cancelAnimationFrame(_this.timer);
        }

        curX = e.touches[0].clientX;
        _this.moveDistance += (curX - x) * _this.options.rate;
        x = curX;

        _this.renderCanvas();
      }, false);
      this.canvas.addEventListener('touchend', function (e) {
        e.stopPropagation();
        e.preventDefault();
        endTime = new Date().getTime();
        curX = e.changedTouches[0].clientX;
        var totalTime = endTime - startTime;
        var totalX = (curX - startX) * _this.options.rate;
        var that = _this;
        var curSpeed = parseInt(totalX / totalTime * 1000, 10);

        function move() {
          var distanceUnit = Math.abs(that.moveDistance % that.options.unit) - (totalX >= 0 ? 0 : that.options.unit);

          if (Math.abs(curSpeed) <= 50) {
            that.moveDistance += distanceUnit;
            that.renderCanvas();
            return false;
          } else {
            that.moveDistance += curSpeed / 60; // 1/60 60帧刚好

            that.renderCanvas();
            curSpeed -= curSpeed / 10; // 每次衰减
          }

          that.timer = window.requestAnimationFrame(move);
        }

        move();
      }, false);
    }
  }]);

  return Ruler;
}();

var _default = Ruler;
exports["default"] = _default;