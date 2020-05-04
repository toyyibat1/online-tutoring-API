const express = require('express');
const router = express.Router();
const subjects = require('../controllers/subject');
router.get('/', (req, res) => res.send('ok'));

router.post('/subjects/create/:id', subjects.create); //create subject under each category by categoryId
router.get('/subjects/populate/:id', subjects.categoryBySubject); //get a particular subject by subjectId
router.get('/subject/:id', subjects.findSubjectById) //retrieve a subject in a category
router.patch('/subject/update/:id', subjects.updateSubjectByCategory); //update subject by id
router.delete('/subject/delete/:id', subjects.deleteSubject);

router.get('/subjects', subjects.findAll);
router.get('/subjects/:subjectName', subjects.findByName); //byname in asceding order
router.get('/subjects/category/:categoryId', subjects.findByCategoryId); // retrieve all subject in a category

module.exports = router;