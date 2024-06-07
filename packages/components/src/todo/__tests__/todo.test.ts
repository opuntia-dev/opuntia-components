import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import Todo from '../Todo.vue'

const title = 'Title text'

const description = 'description text'

const addValue = 'Test this component!'

it('test use for Todo.vue', () => {
  const wrapper = mount(Todo)

  expect(wrapper.classes()).toContain('op-todo')
})

describe('test props for Todo.vue', () => {
  it('title', () => {
    const wrapper = mount(Todo, {
      props: {
        title,
      },
    })

    expect(wrapper.find('h1').text()).toEqual(title)
  })

  it('description', () => {
    const wrapper = mount(Todo, {
      props: {
        description,
      },
    })

    expect(wrapper.find('.op-todo-description').text()).toEqual(description)
  })

  it('show-todo', async () => {
    const wrapper = mount(Todo, {
      props: {
        showTodo: true,
      },
    })

    expect(wrapper.find('.op-todo-operate').exists()).toEqual(true)
    expect(wrapper.find('.op-todo-todo-list').exists()).toEqual(true)

    const inputElm = wrapper.find('input')
    expect(inputElm.exists()).toBe(true)

    await inputElm.setValue('')
    const addBtn = wrapper.get('.op-todo-operate-add')
    await addBtn.trigger('click')
    expect(wrapper.find('.op-todo-todo-list-empty').exists()).toEqual(true)

    await inputElm.setValue(addValue)
    await addBtn.trigger('click')
    expect(wrapper.find('.op-todo-todo-list span').text()).toEqual(addValue)

    const removeBtn = wrapper.get('.op-todo-todo-list-remove')
    await removeBtn.trigger('click')
    expect(wrapper.find('.op-todo-todo-list-empty').exists()).toEqual(true)
  })
})

describe('test events for Todo.vue', () => {
  it('change', async () => {
    const handleChange = vi.fn()

    const wrapper = mount(Todo, {
      props: {
        showTodo: true,
        onChange: handleChange,
      },
    })

    const inputElm = wrapper.find('input')

    await inputElm.setValue(addValue)
    const addBtn = wrapper.get('.op-todo-operate-add')
    await addBtn.trigger('click')
    expect(handleChange).toHaveBeenCalledTimes(1)
  })
})

describe('test slots for Todo.vue', () => {
  it('default', () => {
    const wrapper = mount(Todo, {
      slots: {
        default: `<footer>${description}</footer>`,
      },
    })
    expect(wrapper.find('footer').text()).toEqual(description)
  })

  it('title', () => {
    const wrapper = mount(Todo, {
      slots: {
        title: `<header>${title}</header>`,
      },
    })

    expect(wrapper.find('header').text()).toEqual(title)
  })

  it('description', () => {
    const wrapper = mount(Todo, {
      slots: {
        description: `<main>${description}</main>`,
      },
    })
    expect(wrapper.find('main').text()).toEqual(description)
  })
})
