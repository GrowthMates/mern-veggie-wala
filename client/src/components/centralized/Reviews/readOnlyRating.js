import React from 'react';
import Rating from '@material-ui/lab/Rating';

export default function SimpleRating({value}) {

console.log(value)
  return (
    <div>
      
      {/* <Box component="fieldset" mb={3} borderColor="transparent"> */}
        {/* <Typography component="legend">Read only</Typography> */}
        <Rating name="read-only small-size" value={value} size='small'readOnly />
      {/* </Box> */}
      
    </div>
  );
}