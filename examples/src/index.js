import React from 'react';
import { render} from 'react-dom';
import Ruler from '../../src';
import './style.css';
const Config = {
  rate: 3,
  height: 50,
  start: 0,
  end: 100,
  capacity: 1,
  unit: 15,
  centerLine: { linecolor: '#3ECEB6', width: '1', height: '0.8'},
  scaleplate: { color: '#D8D8D8', fontsize: '14', width: '1', fontcolor: '#D8D8D8', halfLineHeight: '0.4', lineHeight: '0.3', fullLineHeight: '0.6'},
  value: 10
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    }
    this.changeVal = this.changeVal.bind(this);
  }
  changeVal(e) {
    let val = e.target.value;
    // const reg = /^[-+]?([0-9]*)|([0-9]+\.?([0-9]+)?)$/;
    const reg = /^[0-9]*$/;
    if (!reg.test(val)) {return false};
    val = parseInt(val, 10);
    if (val > Config.end) {
      val = Config.end;
    };
    if ( val < Config.start || !val) {
      val = Config.start;
    };
    this.setState({
      value: val,
    });
  }
  render() {
    const { value } = this.state;
    return (
      <div className="wrapper">
        <input value={value} onChange={this.changeVal}/>
        <Ruler {...Config} value={value} onChange={(val) => {this.setState({value: val})}} />
      </div>
      
    );
  }
}
render(<App />, document.getElementById("root"));