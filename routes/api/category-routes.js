const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  //find all categories and send 200 status with response
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
    })
    res.status(200).json(categoryData)
  } catch (error) {
    //catch errors
    console.error(error)
    res.status(500).json({ message: 'internal server error' })
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value, including its associated Products

  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    })
    res.status(200).json(categoryData)
  } catch (error) {
    //catch any errors
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body)
    res.status(200).json(categoryData)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'internal server error' })
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id
      },
    })

    res.status(200).json(categoryData)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    //if there the id submitted doesn't exist send status 404 
    if (!categoryData) {
      res.status(404).json({ message: 'Category not found' })
    }
    res.status(200).json(categoryData)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'internal server error' })
  }
});

module.exports = router;
