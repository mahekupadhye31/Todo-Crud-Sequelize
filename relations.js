const Model = require('./allmodels');
const db = require('./dbconnection');


exports.modelRelations = async () => {
    Model.user.hasMany(Model.task);
    Model.task.belongsTo(Model.user);

    db.sync({ force: false }).then(() => {
        console.log("re synced");
    }).catch((err) => {
        console.log(err);
    });
}