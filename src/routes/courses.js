const { PATH_COURSES, PATH_CART_ADD } = require('../routes/shareRoutes');
const Course = require('../models/Course');

class Courses {
  get = async (req, res) => {
    const courses = (await Course.find()).map(({ title, price, img, id }) => ({ title, price, img, id }));

    return {
      courses,
      pathCartAdd: PATH_CART_ADD,
    };
  };

  addNew = async ({ body: { title, price, img } = {} }, res) => {
    const course = new Course({ title, price, img });

    try {
      await course.save();

      res.redirect(PATH_COURSES);
    } catch (e) {
      console.error('Error', e);
    }
  };

  editForm = async (req, res) => {
    if (!req.query.allow) {
      return res.redirect('/');
    }

    const course = await Course.findById(req.params.id);

    return { course };
  };

  edit = async ({ body: { title, price, img, id } }, res) => {
    //

    try {
      await Course.findByIdAndUpdate(id, { title, price, img });

      res.redirect(PATH_COURSES);
    } catch (e) {
      console.error('Error', e);
    }
  };

  getCourse = async (req, res) => {
    const course = await Course.findById(req.params.id);

    return { course };
  };
}

module.exports = new Courses();
