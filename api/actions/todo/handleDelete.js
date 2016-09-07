import load from './load';

export default function handleDelete(req) {
  return new Promise((resolve, reject) => {
    // Write to database
    setTimeout(() => {
      // Load todos from session then continue with function with data as returned
      load(req).then(data => {
        // Clone req todo
        const todo = Object.assign({}, req.body);
        // Filter todos returning todos with id not matching req todo
        const todos = data.filter(todo => todo.id !== req.body.id);
        // Update session with new todos
        req.session.todos = todos;
        // Return todo for reducer handle
        resolve(todo);
        }, err => {
          reject(err);
        });
    }, 800); // Simulate async db write delay
  });
}
