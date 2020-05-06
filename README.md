<p align="middle" ><img src="https://raw.githubusercontent.com/Mark910413/markdown/master/example.jpg"/></p>
<h2 align="middle">Hc React Ruler</h2>

## Installation
### npm
```sh
$ npm i hc-react-ruler
```

## 🚀 How to use
```javascript
import Ruler from "hc-react-ruler";

...

const config = {
        rate: 1.5,
        height: 50,
        start: 0,
        end: 100,
        capacity: 1,
        unit: 15,
        centerLine: { linecolor: '#3ECEB6', width: '1', height: '0.8'},
        scaleplate: { color: '#D8D8D8', fontsize: '14', width: '1', fontcolor: '#D8D8D8', halfLineHeight: '0.4', lineHeight: '0.3', fullLineHeight: '0.6'},
      }
...	

<Ruler {...config} value={this.state.value} />

...

```
	
	
## ⭐️ Show Your Support
Please give a ⭐️ if this project helped you!
