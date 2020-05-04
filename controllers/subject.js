const Category = require('../models/category');
const Subject = require('../models/subject');

module.exports = {
    create : async (req, res) => {
        console.log(req.params);
        category = req.params;
        id = category.id
      const {name, code, description} = req.body;
      const subject = await Subject.create({
        name,
        code,
        description,
        category: id
      });
      await subject.save();
      const categoryById = await Category.findById(id);

      categoryById.subjects.push(subject)
      await categoryById.save();

      return res.send(categoryById);
    },

   categoryBySubject : async (req, res) => {
     const {id} = req.params;
     const categoryBySubject = await Subject.findById(id);
    // const categoryBySubject = await Subject.findById(id).populate('category');
     res.send(categoryBySubject)
  },
  findSubjectById : async (req, res) => {
    const {id} = req.params;
    const categoryBySubject = await Subject.findById(id);
  
     res.send(categoryBySubject)
},
  findAll : (req, res) => {
        Subject.find()
        .then(subjects => {
            res.send(subjects);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
  },
  findByName :  (req, res) => {
    Subject.find({name: req.params.name}, null, {sort: {name: 1}})
        .then(name => {
            res.send(name);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
    });
},

findByCategoryId : (req, res) => {
        Subject.find({category: req.params.categoryId})
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
    updateSubjectByCategory : (req, res) => {
        const subject = new Subject({
          _id: req.params.id,
          name: req.body.name,
          description: req.body.description,
          code: req.body.code
        });
       Subject.updateOne({_id: req.params.id}, subject).then(
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
    deleteSubject : (req, res) =>{
    Subject.deleteOne({_id: req.params.id}).then(
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

// exports.findAll = (req, res) => {
//     Subject.find()
//     .then(subjects => {
//         res.send(subjects);
//     }).catch(err => {
//         res.status(500).send({
//             message: err.message
//         });
//     });
// };

// exports.findByName = (req, res) => {
//     Subject.findOne({name: req.params.subjectName})
//     .populate('category')
//     .exec(function(err, subject){
//         if(err){
//             if(err.kind === 'ObjectId'){
//                 return res.status(404).send({
//                     message: "Subjects not found with the given name" + req.params.subjectName
//                 });
//             }
//             return res.status(500).send({
//                 message: "Error retrieving category with a given categoryId" + req.params.subjectName
//             });
//         }
//         res.send(subject)
//     });
// };
 
// exports.findByCategoryId = (req, res) => {
//     Subject.find({category: req.params.categoryId})
//     .exec(function(err, subjects){
//         if(err){
//             if(err.kind === 'ObjectId'){
//                 return res.status(404).send({
//                     message: "Subjects not found with the given name" + req.params.categoryId
//                 });
//             }
//             return res.status(500).send({
//                 message: "Error retrieving subjects with a given categoryId" + req.params.categoryId 
//             });
//         }
//         res.send(subjects)
//     });
// };
