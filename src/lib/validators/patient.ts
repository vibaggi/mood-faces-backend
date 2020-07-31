import Joi from '@hapi/joi';


const patientSchema = Joi.object({
    name: Joi
        .string()
        .required(),

    age: Joi
        .number()
        .required(),

    city: Joi
        .string()
        .required(),

    infectionDate: Joi
        .date()
        .required()

})


export default patientSchema;