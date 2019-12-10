import React from 'react';

const Div = React.forwardRef(
  function Div(props, ref) { 
    return <div {...props} ref={ref} />
  }
);

export default Div;