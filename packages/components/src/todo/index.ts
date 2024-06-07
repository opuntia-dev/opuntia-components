import { installWithSFC } from '@opuntia-ui/utils'
import Todo from './Todo.vue'

export type TodoInstance = InstanceType<typeof Todo>

export * from './props'
export * from './emits'

export const OpTodo = installWithSFC(Todo)

export default OpTodo
