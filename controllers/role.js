const { roles } = require('../models/roles');

module.exports = {
    isAccessible : ({
      admin, subject
    }) => {
      return admin && admin.roles === 'admin' || admin_.id === subject.param('userId')
    }
  }
