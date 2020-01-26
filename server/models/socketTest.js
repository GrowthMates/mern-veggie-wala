const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Test = new Schema({

        name:{
                type:String,
                required:true
        },
        description:{  
                type:String,
                required:true
        }
        
        // img:{
        //         data:Buffer,
        //         contentType: String
        // }

});
module.exports = mongoose.model('Testing',Test);