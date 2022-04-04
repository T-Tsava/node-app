const { body } = require('express-validator')

exports.validate = (method) => {
  switch (method) {
    case 'createUser': {
     return [ 
        body('taskName', 'tskame doesnt exists').exists()
       ]   
    }
  }
}