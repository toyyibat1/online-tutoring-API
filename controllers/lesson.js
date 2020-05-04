const Category = require('../models/category');
const Subject = require('../models/subject');
const Lesson = require('../models/lesson');

module.exports = {
  create : async (req, res) => {
    const {username, type} = req.body;
    const lesson = await Lesson.create({
      type,
      username
    })
    await lesson.save();
    //   const lessonById = await Lesson.findById(id);
    //   lessonById.lessons.push(lesson)
    //   await LessonById.save();
    return res.send(lesson);
  },
 
 findAll : async (req, res) => {
    const lesson = await Lesson.find()
    return res.send(lesson)
 },
 lessonById : async (req, res) => {
   const {id} = req.params;
  const lesson = await Lesson.findById(id);

  return res.send(lesson)
},
updateLesson : (req, res) => {
  const lesson = new Lesson({
    _id: req.params.id,
    username: req.body.name,
    type: req.body.type
  });
 Lesson.updateOne({_id: req.params.id}, lesson).then(
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
deleteLesson : (req, res, next) =>{
 Lesson.deleteOne({_id: req.params.id}).then(
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

