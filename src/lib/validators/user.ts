import Joi from '@hapi/joi';


const userSchema = Joi.object({
    name: Joi
      .string()
      .required(),
  
    email: Joi
      .string()
      .required(),
    
    details: Joi
      .object({
        location: Joi
          .string()
          .required()
      })
    
  })
  

  export default userSchema;