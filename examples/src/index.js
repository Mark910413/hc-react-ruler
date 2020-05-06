import React from 'react';
import { render} from 'react-dom';
import MyComponent from '../../dist';
import './style.css';
const App = () => (
 <MyComponent />
);
render(<App />, document.getElementById("root"));