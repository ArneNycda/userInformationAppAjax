const json = require('./../util/users.json');
const queryUsers = query => {
    const queryLC = query.toLowerCase();
    
    return json.filter(user => user.firstname.toLowerCase().includes(queryLC) || user.lastname.toLowerCase().includes(queryLC));
};

module.exports = queryUsers;
