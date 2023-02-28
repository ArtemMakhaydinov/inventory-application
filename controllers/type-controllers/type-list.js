const Type = require('../../models/type-model');

exports.get = (req, res, next) => {
    Type.find({}, 'name')
        .sort({ name: 1 })
        .exec(function (err, types) {
            if (err) {
                return next(err);
            }

            res.render('type-list', {
                title: 'Type list',
                types,
            });
        });
};