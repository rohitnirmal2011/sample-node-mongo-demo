var mongo = require('mongodb').MongoClient
const config = require("config");

var db = null // global variable to hold the connection
const uri = `mongodb+srv://root:${config.password}@rn-mongo.lx4vs.mongodb.net/${config.mongodb}?retryWrites=true&w=majority`;
if(!db){
mongo.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
    if (err) { console.error(err); return err; }
    //console.log("connected",client);
    db = client.db(config.mongodb);
})
}


class MongoHelper {

    async getOne(table, projection = '', query = {}) {
        return new Promise((resolve, reject) => {
          if(db==null){
              mongo.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
                if (err) { console.error('Connection Error',err); return err; }
                db = client.db(config.mongodb);
                //console.log('DB Connection Object',db);
              })
            }
            //console.log('test')
            db.collection(table).findOne(query, projection, (err, rows) => {
                if (err) {
                    console.log(err);
                    return reject(err)
                }
                //console.log('Record', rows);
                resolve(rows)
            })
        })
    }

    async getMany(table, query = {}) {
        return new Promise((resolve, reject) => {
            if(db==null){
              mongo.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
                if (err) { console.error('Connection Error',err); return err; }
                db = client.db(config.mongodb);
                ////console.log('DB Connection Object',db);
              })
            }
            db.collection(table).find(query).toArray((err, rows) => {
                if (err) return reject(err)

                //console.log('allRecord', rows);
                resolve(rows)
            })
        })
    }

    async addRecords(table, values) {
        return new Promise((resolve, reject) => {
            if(db==null){
              mongo.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
                if (err) { console.error('Connection Error',err); return err; }
                db = client.db(config.mongodb);
                //console.log('DB Connection Object',db);
              })
            }
            db.collection(table).insertOne(values, (err, rows) => {
                if (err) return reject(err)
                ////console.log('addRecords', rows);
                resolve(rows)
            })
        })
    }

    async addManyRecords(table, values) {
        return new Promise((resolve, reject) => {
            if(db==null){
              mongo.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
                if (err) { console.error('Connection Error',err); return err; }
                db = client.db(config.mongodb);
                //console.log('DB Connection Object',db);
              })
            }
            db.collection(table).insertMany(values, (err, rows) => {
                if (err) return reject(err)
                ////console.log('addRecords', rows);
                resolve(rows)
            })
        })
    }

}

module.exports = new MongoHelper();
