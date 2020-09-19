new Vue({
  el: '#app',
  data() {
    return {
      isDark: true,
      show: true,
      todoTitle: '',
      todos: [],
    };
  },
  created() {
    const query = `
      query {
        getTodos {
          id title done createdAt updatedAt
        }
      }
    `;

    fetch('/graphql', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ query }),
    })
      .then((res) => res.json())
      .then(({ data }) => (this.todos = data.getTodos))
      .catch((e) => console.error('e', e));
  },
  methods: {
    addTodo() {
      const title = this.todoTitle.trim();

      if (!title) {
        return;
      }

      const query = `
        mutation {
          createTodo(todo: {title: "${title}"}) {
            title
            done
            id
            createdAt
            updatedAt
          }
        }
      `;

      fetch('/graphql', {
        method: 'post',
        headers: [['Content-Type', 'application/json'], ['Accept', 'application/json']],
        body: JSON.stringify({ query }),
      })
        .then((res) => res.json())
        .then(({ data }) => {
          this.todos.push(data.createTodo);
          this.todoTitle = '';
        })
        .catch((e) => console.error('e', e));

      this.todoTitle = '';
    },

    completeTodo(id, title) {
      const query = `
        mutation {
          completeTodo(id: "${id}", title: "${title}") {
            id
            updatedAt zzz
          }
        }
      `;

      fetch('/graphql', {
        method: 'post',
        headers: [['Content-Type', 'application/json'], ['Accept', 'application/json']],
        body: JSON.stringify({ query }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log('rest', res);
          const {
            data: { completeTodo: todo },
          } = res;
          const idx = this.todos.findIndex(({ id }) => id === todo.id);

          this.todos[idx].updatedAt = todo.updatedAt;
        })
        .catch((e) => console.error('e', e));
    },

    removeTodo(id, title) {
      const query = `
        mutation {
          deleteTodo(id: "${id}", title: "${title}"){} 
        }
      `;

      fetch('/graphql', {
        method: 'post',
        headers: [['Content-Type', 'application/json'], ['Accept', 'application/json']],
        body: JSON.stringify({ query }),
      })
        .then((res) => {
          console.log('res', res);
          this.todos = this.todos.filter((t) => t.id !== id);
        })
        .catch((e) => console.error('e', e));
    },
  },
  filters: {
    capitalize(value) {
      return (
        value
          .toString()
          .charAt(0)
          .toUpperCase() + value.slice(1)
      );
    },
    date(value, withTime) {
      const options = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
      };

      if (withTime) {
        options.hour = '2-digit';
        options.minute = '2-digit';
        options.second = '2-digit';
      }
      return new Intl.DateTimeFormat('ru-RU', options).format(new Date(+value));
    },
  },
});
