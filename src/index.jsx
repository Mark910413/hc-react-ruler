import React from 'react';
import Ruler from './ruler.js';

class RulerEle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
    };
    this.canvas = React.createRef();
    this.ruler = null;
  }
  componentDidMount() {
    this.drawRuler(this.state);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({value: nextProps.value});
      this.ruler.setValue(nextProps.value);
    }
  }
  componentWillUnmount() {
    this.ruler.destory();
  }
  drawRuler(options) {
    const {height = 50, start = 0, end = 100, capacity = 1, value = 0, unit = 10, centerLine = {}, scaleplate = {}, onChange = () => {}, rate = 1} = options;
    /* eslint-disable no-new */
    this.ruler = new Ruler({
      elem: this.canvas,
      width: this.canvas.offsetWidth, // 画布宽
      height, // 画布高
      start, // 最小值
      end, // 最大值
      capacity, // 每个刻度代表值
      value, // 当前值
      unit, // 刻度距离
      centerLine, // 中心线
      scaleplate, // 刻度样式
      rate,
      onChange: (val) => {
        this.setState({value: val}, () => {
          onChange(val);
        });
      },
    });
  }
  destoryRuler () {
    this.ruler.destory();
  }
  render() {
    return (
      <div className="box">
        <div className="ruler-dom" ref={(el) => { this.canvas = el; }} id="ruler"  style={{width: '100%', display: 'block', height: '71px'}} />
        {/* <button onClick={this.destoryRuler.bind(this)}>destory</button> */}
      </div>
    );
  }
}

export default RulerEle;
