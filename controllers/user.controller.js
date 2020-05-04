exports.allAccess = (req, res)=> {
    res.status(200).send("Public cotent");
}
exports.userBoard = (req, res)=> {
    res.status(200).send("User cotent");
}
exports.adminBoard = (req, res)=> {
    res.status(200).send("Admin cotent");
}
exports.tutorBoard = (req, res)=> {
    res.status(200).send("tutor cotent");
}
