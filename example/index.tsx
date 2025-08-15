import React from 'react';
import { createRoot } from 'react-dom/client';
import { DynamicJson } from '../src/index';

const App = () => {
  return (
    <div>
      <DynamicJson component="div" props={{ children: ['Hello World'] }} />
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

//ReactDOM.render(<App />, document.getElementById('root'));
