import load from './load';

export default function handleToggle(req) {
  return new Promise((resolve, reject) => {
    // Write to database
    setTimeout(() => {
      // Load todos from session then continue with function with data as returned
      load(req).then(data => {
        // Clone req todo with isCompleted set to opposite of req isCompleted value
        const todo = Object.assign({}, req.body, {
          id: req.body.id,
          text: req.body.text,
          isCompleted: !req.body.isCompleted
        });
        // Map todos returning todo with id matching cloned todo or unchanged todo
        const todos = data.map(t => {
          if(t.id === todo.id){
            return todo;
          }else{return t;}
        });
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
