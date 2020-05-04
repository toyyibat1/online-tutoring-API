
const AccessControl = require("accesscontrol");
const ac = new AccessControl();
 
exports.roles = (function() {
ac.grant("student")
 .readOwn("subject")
 .updateOwn("subject")
 
ac.grant("tutor")
 .extend("student")
 .readAny("subject")
 
ac.grant("admin")
 .extend("student")
 .extend("tutor")
 .updateAny("subject")
 .deleteAny("subject")
 
return ac;
})();

