const LOAD = 'redux-example/todos/LOAD';
const LOAD_SUCCESS = 'redux-example/todos/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/todos/LOAD_FAIL';
const EDIT_START = 'redux-example/todos/EDIT_START';
const EDIT_STOP = 'redux-example/todos/EDIT_STOP';
const HOVER_START = 'redux-example/todos/HOVER_START';
const HOVER_STOP = 'redux-example/todos/HOVER_STOP';
const SAVE = 'redux-example/todos/SAVE';
const SAVE_SUCCESS = 'redux-example/todos/SAVE_SUCCESS';
const SAVE_FAIL = 'redux-example/todos/SAVE_FAIL';
const TOGGLE = 'redux-example/todos/TOGGLE';
const TOGGLE_SUCCESS = 'redux-example/todos/TOGGLE_SUCCESS';
const TOGGLE_FAIL = 'redux-example/todos/TOGGLE_FAIL';
const DELETE = 'redux-example/todos/DELETE';
const DELETE_SUCCESS = 'redux-example/todos/DELETE_SUCCESS';
const DELETE_FAIL = 'redux-example/todos/DELETE_FAIL';


const initialState = {
  loaded: false,
  editing: {},
  saveError: {},
  isEditing: false,
  hovering: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };
    case EDIT_START:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: true
        },
        isEditing: true
      };
    case EDIT_STOP:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: false
        },
        isEditing: false
      };
      case HOVER_START:
        return {
          ...state,
          hovering: {
            ...state.hovering,
            [action.id]: true
          }
        };
      case HOVER_STOP:
        return {
          ...state,
          hovering: {
            ...state.hovering,
            [action.id]: false
          }
        };
    case SAVE:
      return state; // 'saving' flag handled by redux-form
    case SAVE_SUCCESS:
      let isNew = true;
      const saveData = [...state.data].map(todo => {
        if (todo.id === action.result.id) {
          isNew = false;
          return action.result;
        }
        return todo;
      });
      if (isNew) {
        saveData.push(action.result);
      }

      return {
        ...state,
        data: saveData,
        editing: {
          ...state.editing,
          [action.id]: false
        },
        saveError: {
          ...state.saveError,
          [action.id]: null
        },
        isEditing: false
      };
    case SAVE_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        saveError: {
          ...state.saveError,
          [action.id]: action.error
        },
        isEditing: false
      } : state;
    case TOGGLE:
      return state;
    case TOGGLE_SUCCESS:
      const toggleData = [...state.data].map(todo => {
        if (todo.id === action.result.id) {
          return action.result;
        }
        return todo;
      });
      return {
        ...state,
        data: toggleData
      };
    case TOGGLE_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        saveError: {
          ...state.saveError,
          [action.id]: action.error
        }
      } : state;
    case DELETE:
      return state;
    case DELETE_SUCCESS:
      // const deleteData = [...state.data];
      const deleteData = [...state.data].filter(todo => todo.id !== action.result.id);
      // deleteData[action.result.id] = action.result;
      return {
        ...state,
        data: deleteData
      };
    case DELETE_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        saveError: {
          ...state.saveError,
          [action.id]: action.error
        }
      } : state;
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.todos && globalState.todos.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/todo/load/param1/param2') // params not used, just shown as demonstration
  };
}

export function handleSave(todo) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    id: todo.id,
    promise: (client) => client.post('/todo/update', {
      data: todo
    })
  };
}

export function handleToggle(todo) {
  return {
    types: [TOGGLE, TOGGLE_SUCCESS, TOGGLE_FAIL],
    id: todo.id,
    promise: (client) => client.post('/todo/handleToggle', {
      data: todo
    })
  };
}

export function handleDelete(todo) {
  return {
    types: [DELETE, DELETE_SUCCESS, DELETE_FAIL],
    id: todo.id,
    promise: (client) => client.post('/todo/handleDelete', {
      data: todo
    })
  };
}

export function handleMouseOver(id) {
  return { type: HOVER_START, id };
}

export function handleMouseLeave(id) {
  return { type: HOVER_STOP, id };
}

export function handleEditStart(id) {
  return { type: EDIT_START, id };
}

export function handleEditStop(id) {
  return { type: EDIT_STOP, id };
}
