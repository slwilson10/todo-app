import load from './load';

export default function handleDeleteAll(req) {

  return new Promise((resolve, reject) => {
    // Write to database
    setTimeout(() => {
      // Load todos from session then continue with function with data as returned
      load(req).then(data => {
        // Clone req todo
        console.log(data);
        // Filter todos returning todos with id not matching req todo
        const todos = data.filter(todo => todo.isCompleted === false);
        // Update session with new todos
        req.session.todos = todos;
        // Return todo for reducer handle
        resolve(todos);
        }, err => {
          reject(err);
        });
    }, 800); // Simulate async db write delay
  });
}
