const { ROUTES } = require('../routes/shareRoutes');
const Course = require('../models/Course');

class Courses {
  getAll = async () => {
    const courses = (await Course.find()).map(({ title, price, img, id }) => ({ title, price, img, id }));

    return {
      courses,
      pathCartAdd: ROUTES.CART.add,
    };
  };

  addNew = async ({ user, body: { title, price, img } = {} }, res) => {
    const course = new Course({ title, price, img, userId: user });

    try {
      await course.save();

      res.redirect(ROUTES.COURSE.all);
    } catch (e) {
      console.error('Error', e);
    }
  };

  editForm = async (req, res) => {
    if (!req.query.allow) {
      return res.redirect('/');
    }

    const { title, price, img, id } = await Course.findById(req.params.id);

    return {
      pathEditCourse: ROUTES.COURSE.edit.replace(':id', id),
      pathDelCourse: ROUTES.COURSE.delete.replace(':id', id),
      course: { title, price, img, id },
    };
  };

  edit = async ({ body: { title, price, img, id } }, res) => {
    try {
      await Course.findByIdAndUpdate(id, { title, price, img });

      res.redirect(ROUTES.COURSE.all);
    } catch (e) {
      console.error('Error', e);
    }
  };

  del = async ({ params: { id } }, res) => {
    try {
      await Course.deleteOne({ _id: id });
      res.redirect(ROUTES.COURSE.all);
    } catch (e) {
      console.error('Error', e);
    }
  };

  getCourse = async (req) => {
    const { title, img, price } = await Course.findById(req.params.id);

    return { course: { title, img, price }, layout: 'course' };
  };
}

module.exports = new Courses();
