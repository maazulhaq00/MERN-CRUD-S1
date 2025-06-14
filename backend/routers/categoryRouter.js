import express from 'express';
import * as categoryController from '../controllers/categoryController.js'
import ensureAuthenticated from '../middlewares/auth.js';

const categoryRouter = express.Router();

categoryRouter.post('/', ensureAuthenticated, categoryController.createCategory)
categoryRouter.get('/', categoryController.fetchCategories)
categoryRouter.get('/:id', categoryController.fetchCategoryById)
categoryRouter.put('/:id', ensureAuthenticated, categoryController.updateCategory)
categoryRouter.delete('/:id', ensureAuthenticated, categoryController.deleteCategory)

export default categoryRouter;