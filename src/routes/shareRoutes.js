const ROUTES = {
  HOME: '/',
  COURSE: {
    one: '/courses/:id',
    all: '/courses',
    add: '/add-course',
    edit: '/edit-course/:id',
    delete: '/courses/:id/del',
  },
  ABOUT: '/about',
  CART: {
    one: '/cart',
    add: '/cart/add',
    delete: '/cart/delete/:id',
  },
  ORDERS: '/orders',
  MONGO:
    'https://cloud.mongodb.com/v2/5f25a07dc1362f5ba4b613ee#metrics/replicaSet/5f3fc57e872877171e05ef4c/explorer/shop/courses/find',
};

module.exports = {
  ROUTES,
};
