import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function AddressForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            required
            fullWidth
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            required
            fullWidth
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Address "
            fullWidth
            autoComplete="shipping address-line1"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="appartment"
            name="appartment"
            label="Appartment/ Street"
            fullWidth
            autoComplete="shipping address-line2"
          />
        </Grid>
        <div className='row'>
                      <div className='col'>
                        <label for="selectArea" style={{paddingRight:'5px', color:'grey'}}>Area: </label>
                        <select className="form-control-sm"
                              style={{color:'grey'}}
                                id='area'
                                name='area'
                                required
                                // value={this.state.area} 
                                // onChange={this.onChange.bind(this)} 
                              >
                               <option value=''>Select Area</option>  
                              {/* {this.state.selectArea.map(place=>{
                                return <option value={place}>{place}</option>

                              })}  */}
                              
                          </select>
                      </div>    
                      <div className='col '>
                          <label for="selectArea" style={{paddingRight:'5px', color:'grey'}}>Block: </label>
                       
                           <input type="number"
                        //    onChange={this.onChangeBlock.bind(this)}
                        //    value={this.state.block}
                        //    error={errors.block}
                           name='block'
                           className='form-control-sm'
                           required
                           id="exampleInputEmail1" aria-describedby="emailHelp"
                           placeholder="1"
                           min= '1'
                        //    max={this.state.selectBlock}
                        //    className={classnames("form-control-sm", {
                        //     invalid: errors.block
                        //   })}
                            />
                          </div>    
                      </div>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            value='Karachi'
            disabled
            fullWidth
            autoComplete="shipping address-level2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="state" name="state" label="State/Province/Region" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}