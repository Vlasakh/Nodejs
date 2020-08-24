const ROUTES = {
  HOME: '/',
  COURSE: {
    one: '/courses/:id',
    all: '/courses',
    add: '/add-course',
    edit: '/edit-course/:id',
    delete: '/courses/edit',
  },
  ABOUT: '/about',
  CART: {
    one: '/cart',
    add: '/cart/add',
  },
};

module.exports = {
  ROUTES,
};
