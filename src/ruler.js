class Ruler {
  constructor(options) {
    this.ver = '1.0.5';
    this.init(options);
  }
  init(options) {
    this.destory();
    this.removeEventFn = null;
    this.pixelRatio = window.devicePixelRatio || 2;
    this.timer = null;
    this.optionInit(options);
    this.domInit();
    this.addEvent();
    this.renderCanvas();
  }
  optionInit(options) {
    const { scaleplate = {}, centerLine = {} } = options;
    // 基本样式配置
    const defaultConfig = {
      unit: 10, // 刻度间隔，默认值10
      start: 0, // 中心线位置，默认值为开始值
      background: '#fff', // 画布背景色，默认白色
      linecolor: '#000', // 中心线颜色，默认黑色
      capacity: 1, // 每个刻度代表的值
      rate: 1, // 实际滑动距离与手指滑动距离比值  灵敏度
      width: 200, // 宽度
      height: 100,
    };
    // 刻度样式配置
    const defaultScaleplate = {
      color: '#f00', // 刻度线颜色
      width: 1,  // 刻度线宽度
      fontsize: 12, // 刻度值字体大小 
      fontcolor: 'f00', // 刻度值字体颜色
      fontfamily: 'Courier New', //  刻度值字体样式
      fullLineHeight: '0.6',
      halfLineHeight: 0.4,
      lineHeight: '0.3',
    };
    // 中心线配置 
    const defaultCenterLine = {
      width: 2,
      linecolor: '#f00',
      height: 0.8,
    }
    // 入参处理
    const mergeScaleplate = {...defaultScaleplate, ...scaleplate};
    const mergeCenterLine = {...defaultCenterLine, ...centerLine};
    const mergeOptions = {...defaultConfig, ...options, scaleplate: mergeScaleplate, centerLine: mergeCenterLine};
    this.options = mergeOptions;

    this.options.scaleplate.width = this.options.scaleplate.width * this.pixelRatio; // 刻度宽度
    this.options.scaleplate.fontsize =  this.options.scaleplate.fontsize * this.pixelRatio; // 刻度值字体大小

    this.options.centerLine.width = this.options.centerLine.width * this.pixelRatio; // 中心线宽度
    this.options.centerLine.height = this.options.centerLine.height * this.pixelRatio; // 中心线高度
    
    this.options.unit = this.options.unit * this.pixelRatio; // 刻度间隔，默认值10
    this.options.value = this.options.value === undefined ? this.options.start : this.options.value; // 中心线位置，默认值为开始值

    this.moveDistance = -(this.options.value / this.options.capacity) * this.options.unit; // 滑动的距离
  }
  domInit() {
    this.wrapperDom = (typeof this.options.elem) === 'string' ? document.querySelector(this.options.elem) : this.options.elem;
    this.canvas = document.createElement('canvas');
    this.canvas.style.height = this.options.height + (this.options.scaleplate.fontsize / this.pixelRatio) * 1.5 + 'px';
    this.options.width = this.options.width * this.pixelRatio;
    this.options.height = this.options.height * this.pixelRatio;
    this.canvas.width = parseInt(this.options.width); 
    this.canvas.height = parseInt(this.options.height + (this.options.scaleplate.fontsize * 1.5));
    this.wrapperDom.appendChild(this.canvas);
  }
  renderCanvas(setValue = false) {
    const ctx = this.canvas.getContext('2d');
    const {options = {} } = this;
    const canvasWidth = this.canvas.width;
    const canvasHeight = this.canvas.height;
    // 两个端点的对moveDistance的取值
    // 向左边拖是正数 但dom的移动是负数 所以 这里要取反
    this.moveDistance = this.moveDistance >= 0 ? 0 : this.moveDistance;
    this.moveDistance = -this.moveDistance >= (options.end / options.capacity) * options.unit ? - (options.end / options.capacity) * options.unit : this.moveDistance;

    // 显示的值 处理小数
    const bitArr = options.capacity.toString().split('.');
    const bitNum = bitArr[1] ? bitArr[1].length : 0; // 保证除法运算时的精度
    options.value = (Math.ceil(Math.abs(this.moveDistance) / options.unit) * ((10 ** bitNum) * options.capacity)) / (10 ** bitNum);

    let i = 0;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.lineWidth = options.scaleplate.width;
    for (i; ((i * options.unit) + (this.moveDistance + (options.width / 2)) < options.width) && (i * options.capacity <= options.end); i++) {
      // 画刻度线 x轴坐标
      const x = (i * options.unit) + (this.moveDistance + (options.width / 2));
      const textValue = options.capacity * i;

      ctx.beginPath();
      ctx.moveTo(x, Math.ceil((options.height * 3) / 4));
      ctx.fillStyle = options.scaleplate.fontcolor;

      if (i % 10 === 0) { // 第1或10格刻度
        ctx.moveTo(x, Math.ceil(options.height * (1 - options.scaleplate.fullLineHeight)));
        ctx.font = `${options.scaleplate.fontsize}px ${options.scaleplate.fontfamily}`; // 设置文本的字体大小和字体样式
        ctx.fillStyle = options.scaleplate.fontcolor;
        ctx.fillText(textValue, x - ((textValue.toString()).length * (this.options.scaleplate.fontsize * 0.3)), (this.options.scaleplate.fontsize * 1.5) + options.height);
      } else if (i % 5 === 0) { // 第5格刻度
        ctx.moveTo(x, Math.ceil(options.height * (1 - options.scaleplate.halfLineHeight)));
      } else { // 其他刻度
        ctx.moveTo(x, Math.ceil(options.height * (1 - options.scaleplate.lineHeight)));
      }
      ctx.lineTo(x, options.height);
      ctx.strokeStyle = options.scaleplate.color;
      ctx.stroke(); // 实际地绘制出通过 moveTo() 和 lineTo() 方法定义的路径
      ctx.closePath(); // 关闭当前的绘制路径
    }
    // 绘制中心线
    ctx.beginPath();
    ctx.fillStyle = this.canvas.background;
    ctx.fillRect = (0, 0, this.canvas.width, this.canvas.height);
    ctx.lineWidth = options.centerLine.width;
    ctx.moveTo(Math.floor(this.canvas.width / 2), (1 - options.centerLine.height) * options.height);
    ctx.lineTo(Math.floor(this.canvas.width / 2), this.options.height);
    ctx.strokeStyle = options.centerLine.linecolor;
    ctx.stroke();
    ctx.closePath();

    // 标尺底部线
    ctx.beginPath();
    ctx.moveTo(0, this.options.height - 1);
    ctx.lineTo(this.options.width, this.options.height - 1);
    ctx.strokeStyle =  options.scaleplate.color;
    ctx.lineWidth = options.scaleplate.width * 1;
    ctx.stroke();
    ctx.closePath();
    if (this.options.onChange && !setValue) {
      this.options.onChange(options.value);
    }
  }
  setValue(value) {
    if (typeof value !== 'number' && !parseInt(value, 10) && (parseInt(value, 10) !== 0)) { return false; }
    if (this.timer) { window.cancelAnimationFrame(this.timer); }
    const that = this;
    const targetX = -(value / this.options.capacity) * this.options.unit;
    let distance = targetX - this.moveDistance;
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
  addEvent() {
    let startX;
    let x;
    let curX;
    let startTime;
    let endTime;
    let sliding = false;
    const _this = this;
    // 添加手指触碰屏幕时的touchstart事件
    this.canvas.addEventListener('touchstart', touchStartFn, false);
    this.canvas.addEventListener('mousedown', touchStartFn, false);
    // 添加手指滑动屏幕时的touchmove事件
    this.canvas.addEventListener('touchmove', touchMoveFn, false);
    this.canvas.addEventListener('mousemove', touchMoveFn, false);
    // 结束滑动
    this.canvas.addEventListener('touchend', touchEndFn, false);
    this.canvas.addEventListener('touchout', touchEndFn, false);
    this.canvas.addEventListener('mouseup', touchEndFn, false);
    this.canvas.addEventListener('mouseout', touchEndFn, false);

    function touchStartFn (e) {
      sliding = true;
      e.stopPropagation();
      e.preventDefault();
      startTime = (new Date()).getTime();
      x = e.clientX || e.touches[0].clientX; // 获取第一个手指对象的X轴坐标值
      startX = x;
    }
    function touchMoveFn(e) {
      e.stopPropagation();
      e.preventDefault();
      if (!sliding) { return false; }
      if (_this.timer) {
        window.cancelAnimationFrame(_this.timer);
      }
      curX = e.clientX || e.touches[0].clientX;
      _this.moveDistance += (curX - x) * _this.options.rate;
      x = curX;
      _this.renderCanvas();
    }
    function touchEndFn(e) {
      e.stopPropagation();
      e.preventDefault();
      if (!sliding) { return; }
      sliding = false;
      endTime = (new Date()).getTime();
      curX = e.clientX || e.changedTouches[0].clientX;
      const totalTime = endTime - startTime;
      const totalX = (curX - startX) * _this.options.rate;
      let curSpeed = parseInt((totalX / totalTime) * 1000, 10);
      function move() {
        const distanceUnit = Math.abs(_this.moveDistance % _this.options.unit) - (totalX >= 0 ? 0 : _this.options.unit);
        if (Math.abs(curSpeed) <= 50) {
          _this.moveDistance += distanceUnit;
          _this.renderCanvas();
          return false;
        } else {
          _this.moveDistance += curSpeed / 60; // 1/60 60帧刚好
          _this.renderCanvas();
          curSpeed -= curSpeed / 10; // 每次衰减
        }
        _this.timer = window.requestAnimationFrame(move);
      }
      move();
    }
    
    this.removeEventFn = () => {
      this.canvas.removeEventListener('touchstart', touchStartFn);
      this.canvas.removeEventListener('mousedown', touchStartFn);
      this.canvas.removeEventListener('touchmove', touchMoveFn);
      this.canvas.removeEventListener('mousemove', touchMoveFn);
      this.canvas.removeEventListener('touchend', touchEndFn);
      this.canvas.removeEventListener('touchout', touchEndFn);
      this.canvas.removeEventListener('mouseup', touchEndFn);
      this.canvas.removeEventListener('mouseout', touchEndFn);
    }
  }
  destory() {
    if (this.removeEventFn && this.canvas) { 
      this.removeEventFn(); 
      this.wrapperDom.removeChild(this.canvas);
    }
    this.canvas = null;
  }
}

export default Ruler;
