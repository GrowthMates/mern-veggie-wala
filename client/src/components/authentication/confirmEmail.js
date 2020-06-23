import React from 'react'
import Axios from 'axios'

export default class ConfirmEmail extends React.Component{
    

    componentDidMount() {
        const token = this.props.match.params.token
        if(token){
            Axios.put(`/verify/${token}`).then(res => {
                if(res.data.success){
                    window.location.replace("http://localhost:3000/user/login")
                }
            })
            .catch(error=>{
                console.log(error)
                document.write(error)
            })
        }
        else{
            document.write("<h2>Page not Found.</h2>")
        }
    }

    render(){
        return(
            <div style={{margin:"auto"}}>
                <h2>Loading...</h2>
            </div>
        )
    }
}

