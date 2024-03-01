/*
 * @Author: harley
 * @Date: 2024-01-18 17:05:33
 * @LastEditors: harley
 * @Description: 
 */
import { useState, useRef, useEffect, useCallback } from 'react'
import TodoContext, { Todo } from './TodoContext'
import TodoList from './showTodoList'
import { v4 } from 'uuid'
import TippyDropdownTab from './TippyDropdown'

export const todo = () => {
	return {
		searchText: '',
		keyID: v4(),
		// iframe的信息
		iframe: {
			url: '', // iframe的url
			routerList: [''], // iframe的路由列表
			routerIndex: 0, // 当前路由索引
			// iframe 渲染的页面
			pageUrl: '',
		}
	}
}

const TodoMain = () => {
	// 定义初始化的todo
	const _todo = todo()
	// 定义一个todo数组
	const [todos, setTodos] = useState<Todo[]>([_todo])
	// 当前激活的todo
	const [currentTodo, setCurrentTodo] = useState<Todo>(_todo)
	const addOrChangTodo = useCallback((_todo: Todo) => {
		// 添加一个todo
		if (!_todo.keyID) _todo.keyID = v4()
		const result = [...todos, _todo]
		setTodos(result)
		setCurrentTodo(_todo)
	}, [todos])

	const deleteTodo = useCallback((_todo: Todo) => {
		// 删除一个todo
		const result = todos.filter(n => n.keyID !== _todo.keyID)
		setTodos(result)
	}, [todos])

	const showIFrame = useCallback((_todo: Todo) => {
		if (!_todo.keyID) {
			return
		}
		if (_todo.keyID === currentTodo) {
			return
		}
		setCurrentTodo(_todo)
	}, [todos])

	// 修改currentTodo的属性
	const changeCurrentTodo = useCallback((_todo: Todo, data: any) => {
		const todo = todos.find(n => n.keyID === _todo.keyID)
		if (!todo) {
			return
		}
		Object.assign(todo, data)
		setTodos([...todos])
		setCurrentTodo(todo)
	}, [todos])


	return (
		<TodoContext.Provider value={{
			showIFrame,
			addOrChangTodo,
			deleteTodo,
			changeCurrentTodo,
			todos,
			currentTodo,
		}}>
			<TodoList />
			<TippyDropdownTab />
		</TodoContext.Provider>
	)
}

export default TodoMain