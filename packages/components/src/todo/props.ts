import type { ExtractPropTypes } from 'vue'

export const todoProps = {
  /**
   * @description The title of the welcome message.
   */
  title: {
    type: String,
    default: '👋 你好',
  },
  /**
   * @description The description of the welcome message.
   */
  description: {
    type: String,
    default: '欢迎使用 Opuntia UI。',
  },
  /**
   * @description Whether to show the todo list.
   */
  showTodo: {
    type: Boolean,
    default: false,
  },
}

export type TodoProps = ExtractPropTypes<typeof todoProps>
