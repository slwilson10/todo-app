// Set initial mock data
const initialTodos = [
  {
    id: 0,
    text: "Build App",
    isCompleted: false
  },
  {
    id: 1,
    text: "Walk Dog",
    isCompleted: false
  },
  {
    id: 2,
    text: "Wash Dishes",
    isCompleted: false
  },
  {
    id: 3,
    text: "Sweep Floor",
    isCompleted: false
  },
  {
    id: 4,
    text: "Cook Dinner",
    isCompleted: false
  },
];

export function getTodos(req) {
  // Load todos from this session
  let todos = req.session.todos;
  // If there are no todos, use initial todos
  if (!todos) {
    todos = initialTodos;
    // Update session todos with intial todos
    req.session.todos = todos;
  }
  return todos;
}

export default function load(req) {
  return new Promise((resolve, reject) => {
    // Make async call to API
    setTimeout(() => {
        resolve(getTodos(req));
    }, 800); // Simulate async load delay
  });
}
