<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { todoProps } from './props'
import { todoEmits } from './emits'

defineOptions({
  name: 'OpTodo',
})

defineProps(todoProps)

const emit = defineEmits(todoEmits)

const thing = ref('')

const todoList = ref<string[]>([])

function add() {
  if (!thing.value)
    return
  todoList.value.push(thing.value)
  thing.value = ''
}

function remove(index: number) {
  todoList.value.splice(index, 1)
}

watchEffect(() => {
  emit('change', todoList.value)
})
</script>

<template>
  <div class="op-todo">
    <slot name="title">
      <h1>{{ title }}</h1>
    </slot>
    <p class="op-todo-description">
      <slot name="description">
        {{ description }}
      </slot>
    </p>
    <slot>
      <template v-if="showTodo">
        <p class="op-todo-operate">
          <input v-model="thing" type="text" placeholder="请输入内容...">
          <button class="op-todo-operate-add" @click="add">
            添加
          </button>
        </p>
        <p class="op-todo-list">
          <ul v-if="todoList.length > 0">
            <li v-for="(item, index) in todoList" :key="index">
              <span>{{ item }}</span>
              <button class="op-todo-list-remove" @click="remove(index)">
                移除
              </button>
            </li>
          </ul>
          <span v-else class="op-todo-list-empty">
            暂无内容
          </span>
        </p>
      </template>
    </slot>
  </div>
</template>

<style lang="scss">
@use './welcome.scss' as *;
</style>
