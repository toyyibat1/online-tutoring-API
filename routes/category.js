const express = require('express');
const router = express.Router();
const categories = require('../controllers/category');
router.get('/', (req, res) => res.send('ok'));


router.post('/categories/create', categories.create);
router.get('/categories/find', categories.findAll); //retrieve all categories
router.get('/categories/find/subject/:id', categories.subjectsByCategory)
router.get('/categories/subject/:id', categories.findSubjectByCategoryId); //retrieve a subject in a categorybyId

router.patch('/categories/update/:id', categories.updateCategory); //update category
router.delete('/categories/delete/:id', categories.deleteCategory); //delete category
// router.get('/categories', categoriesController.getCategories);

module.exports = router;