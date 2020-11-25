const Joi = require('@hapi/joi');
const conn = require('../utility/mongoHelper');

class Movies {

  async addMovie(data) {
    const querySchema = Joi.object({
      name: Joi.string().required(),
      year: Joi.number().required(),
      director: Joi.string().required()
    });
    try {
      const { error, value } = await querySchema.validate(data);

      if (error) {
        return {
          status: 'Fail',
          message: error.details[0].message
        };
      } else {

        var returnVal = await conn.getOne('movie', '', { name: data.name });
        if (returnVal) {
          return {
            status: 'Fail',
            message: 'Movie Already Exist!',
            data: returnVal
          };
        } else {
          returnVal = await conn.addRecords('movie', data);
          return {
            status: 'success',
            message: 'Movie created successfully',
            data: returnVal
          };
        }

      }
    } catch (err) {
      return {
        status: 'Fail in catch',
        message: err
      };
    }
  }

  async addMultipleMovie(data) {
    try {
      if(!Array.isArray(data)){
        return {
          status: 'Fail',
          message: 'required body as array',
        };
      }
      let result = data.map(a => a.name);
      var query = {name:{$in:result}}
      var returnVal = await conn.getMany('movie',query);
      if (returnVal.length > 0) {
        return {
          status: 'Fail',
          message: 'Movie Already Exist!',
          data: returnVal
        };
      } else {
        returnVal = await conn.addManyRecords('movie',data);
        return {
          status: 'success',
          message: 'Movie created successfully',
          data: returnVal
        };
      }
    } catch (err) {
      return {
        status: 'Fail',
        message: err
      };
    }
  }

  async getMoviesByKeyword(data) {
    try {
      var returnVal = await conn.getMany('movie', { name: data.query });
      return {
        status: 'success',
        message: 'All Records from database',
        data: returnVal
      };
    } catch (err) {
      return {
        status: 'Fail in catch',
        message: err
      };
    }
  }
}

module.exports = new Movies();
