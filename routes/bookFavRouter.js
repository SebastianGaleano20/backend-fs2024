import { Router } from 'express'
import { bookFavController } from '../controllers/bookFavController.js'

const bookFavRouter = Router()
const { markAsFavorite, getAllFavoriteBooks, getAllFavoriteBooksById } = bookFavController()

bookFavRouter.route('/book-fav')
  .post(markAsFavorite)
  .get(getAllFavoriteBooks)

bookFavRouter.route('/book-fav/:id')
  .get(getAllFavoriteBooksById)

export default bookFavRouter