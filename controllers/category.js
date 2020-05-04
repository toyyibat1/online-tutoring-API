const Category = require('../models/category');
const Subject = require('../models/subject');

module.exports = {
  create : async (req, res) => {
    const {name, description} = req.body;
    const category = await Category.create({
      name,
      description
    })
    return res.send(category);
  },
 
 findAll : async (req, res) => {
    const category = await Category.find()
    return res.send(category)
 },
 subjectsByCategory : async (req, res) => {
   const {id} = req.params;
  const category = await Category.findById(id).populate('subjects');

  return res.send(category.subjects)
},
findSubjectByCategoryId : (req, res) => {
  Subject.findOne({category: req.params.categoryId})
  .exec(function(err, subjects){
      if(err){
          if(err.kind === 'ObjectId'){
              return res.status(404).send({
                  message: "Subjects not found with the given name" + req.params.categoryId
              });
          }
          return res.status(500).send({
              message: "Error retrieving subjects with a given categoryId" + req.params.categoryId 
          });
      }
      res.send(subjects)
  });
},
updateCategory : (req, res) => {
  const category = new Category({
    _id: req.params.id,
    name: req.body.name,
    description: req.body.description
  });
 Category.updateOne({_id: req.params.id}, category).then(
    () => {
      res.status(201).json({
        message: 'Subject updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
},
deleteCategory : (req, res, next) =>{
 Category.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error:error
      });
    }
  );
}
}


function hasAccess(accessLevel) {
  return function(req, res, next) {
    if (req.session.user && req.session.user.hasAccess(accessLevel)) {
      return next()
    }
    return res.json({
      success: false,
      error: 'Unauthorized'
    })
  }
}
