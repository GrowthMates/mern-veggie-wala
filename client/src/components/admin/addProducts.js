import React,{Component} from 'react';
import TextField from '@material-ui/core/TextField';
import { Link, withRouter } from "react-router-dom";
// import './register.css'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {addProduct} from '../../actions/productsAction'
import classnames from "classnames";

class AddProducts extends Component{

    constructor() {
        super();
        this.state = {
          name: "",
          description: '',
          price: '',   
          stock:'',
          // imgPath:'',   
          errors: {}
        };
      }

      componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
          // this.props.history.push("/dashboard");
        }
      }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
      }
    onChange = e => {
      e.preventDefault();
        this.setState({ [e.target.id]: e.target.value });
        console.log('total Data',[e.target.id], e.target.value );
      };
    onSubmit = e => {
        e.preventDefault();
  console.log('oNsubmit State-------',this.state)
    const newProduct = {
          name: this.state.name,          
          description: this.state.description,
          price: this.state.price,
          stock: this.state.stock,
          // imgPath: this.state.imgPath,
          // imgType: this.state.imgType
        };
    this.props.addProduct(newProduct, this.props.history);
    this.setState({
      name: "",
      description: '',
      price: '',   
      stock:'',
       });

    console.log(newProduct)
      };
      
    render(){
        
        const { errors } = this.state;

        return(
          <div className='mainDiv'>
              <h4 className='name'>
                  Add New Product
              </h4>
              <hr className='hrr' />


              {/* <h5 class>
                  UserName <span style={{color: 'red'}}> *</span>
              </h5> */}

         <form noValidate onSubmit={this.onSubmit}>   
            <div className='fields'> 
               <h5 class>
                  Product Name <span style={{color: 'red'}}> *</span>
              </h5>
              <TextField 
              onChange={this.onChange}
              value={this.state.name}
              error={errors.name}
              className='textfields' 
              id="name" 
              label="ProductName"
              required 
              className={classnames("", {
                invalid: errors.name
              })}
              />
              <span className="red-text">{errors.name}</span>
              <br/><br/>
              <h5 class>
                  Description <span style={{color: 'red'}}> *</span>
              </h5>
              <TextField 
              onChange={this.onChange}
              value={this.state.description}
              error={errors.description}
              className='textfields' 
              id="description" 
              label="Description" 
              required
              className={classnames("", {
                invalid: errors.description
              })}
              />
               <span className="red-text">{errors.description}</span>
              <br/><br/>
              <h5 class>
                  Price <span style={{color: 'red'}}> *</span>
              </h5>
              <TextField 
              onChange={this.onChange}
              value={this.state.price}
              error={errors.price}
              className='textfields' 
              id="price" 
              label="price" 
              required
              className={classnames("", {
                invalid: errors.name
              })}
              />
              <span className="red-text">{errors.price}</span>
              <br/><br/>

              <h5 class>
                  Stock <span style={{color: 'red'}}> *</span>
              </h5>
              <TextField 
              onChange={this.onChange}
              value={this.state.stock}
              error={errors.stock}
              className='textfields' 
              id="stock" 
              label="stock" 
              required
              className={classnames("", {
                invalid: errors.name
              })}
              />
              <span className="red-text">{errors.stock}</span>
              <br/><br/>


              <h5 class>
                  Image <span style={{color: 'red'}}> *</span>
              </h5>
              <TextField 
              onChange={this.onChange}
              value={this.state.imgPath}
              error={errors.image}
              autoComplete='image'
              className='file'
              type='file' 
              id="imgPath" 
              label="image" 
              required
              />
              <span className="red-text">{errors.image}</span>
              <br/><br/>

             
           
              <br/><br/>
          
              <button type="submit" class="btn btn-secondary btn-lg btn-block">Block level button</button>
              
              </div>
          </form>
              
          </div>
             
        )
    }
}
AddProducts.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  export default connect(
    mapStateToProps,
    { addProduct }
  )(withRouter(AddProducts));