import React from 'react';

const Div = React.forwardRef(function Div(props, ref) {
  return <div css={{ fontSize: 16 }} {...props} ref={ref} />;
});

export default Div;
