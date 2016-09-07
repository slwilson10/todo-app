import load from './load';

export default function update(req) {
  return new Promise((resolve, reject) => {
    // Write to database
    setTimeout(() => {
      // Load todos from session then continue with function with data as returned
      load(req).then(data => {
        // Clone req todo
        let todo = req.body;
        let todos = data
        if (todo.id === undefined) {
          todo = {
            id: data.length + 1,
            text: todo.text,
            isCompleted: false
          };

          todos.push(todo);
        } else {
          todo = {
            id: todo.id,
            text: todo.text,
            isCompleted: false
          };
          // Map todos returning todo with id matching cloned todo or unchanged todo
          todos = todos.map(t => {
            if(t.id === todo.id){
              return todo
            }else{return t}
          });
        }
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
