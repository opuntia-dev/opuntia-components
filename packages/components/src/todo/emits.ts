export const todoEmits = {
  change: (todoList: string[]) => todoList,
}

export type TodoEmits = typeof todoEmits
