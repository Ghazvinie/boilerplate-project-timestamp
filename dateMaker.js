module.exports = function (req, res, next) {
    let date = req.params.date;
    const jsonObj = {
        unix: '',
        utc: ''
    };

    if (/\d{5,}/.test(date)) {
        // Is numerical date
        date = new Date(parseInt(date));
        // Check date is valid
        if (date == 'Invalid Date') {
            return ({ error: 'Invalid Date' });
        }

        jsonObj.unix = date.valueOf();
        jsonObj.utc = date.toUTCString();
    } else {
        // Is string date
        date = new Date(date);
        // Check date is valid
        if (date == 'Invalid Date') {
            return ({ error: 'Invalid Date' });
        }
        jsonObj.unix = date.valueOf();
        jsonObj.utc = date.toUTCString();
    }
    res.json(jsonObj);
    next();
};

