export const initializeTodos = () => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    const storedDate = localStorage.getItem('date');
    const currentDate = new Date().toLocaleDateString();
  
    if (storedDate !== currentDate) {
      localStorage.clear();
      localStorage.setItem('date', currentDate);
    }
  
    return { storedTodos };
  };
  
  export const updateLocalStorage = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };