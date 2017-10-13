const fs = require('fs');

const addUser = (userInfo, callback) => {
    fs.readFile('util/users.json', 'utf8', function (err,data) {
        if(err) {
            throw err;
        }

        const json = JSON.parse(data);
        json.push(userInfo);

        fs.writeFile("util/users.json", JSON.stringify(json), function(err) {
            if(err) {
                throw err;
            }
            
            callback(json);
        });

    });
};

module.exports = addUser;
