const seesionIdMap = new Map();

function setUser(id, user){
    seesionIdMap.set(id, user);
}

function getUser(id){
    return seesionIdMap.get(id);
}

module.exports = {
    setUser,
    getUser
}