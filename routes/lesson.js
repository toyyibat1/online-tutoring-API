const express = require('express');
const router = express.Router();
const lessons = require('../controllers/lesson');
router.get('/', (req, res) => res.send('ok'));

router.post('/lesson/create', lessons.create); // book or create a lesson
router.get('/lesson/find', lessons.findAll); //retrieve all lesson
router.get('/lesson/:id', lessons.lessonById); //retrieve a lesson in a lesson by Id

router.patch('/lesson/update/:id', lessons.updateLesson); //update lesson
router.delete('/lesson/delete/:id', lessons.deleteLesson); //delete lesson

module.exports = router;