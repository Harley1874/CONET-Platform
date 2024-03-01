/*
 * @Author: harley
 * @Date: 2024-01-18 17:05:33
 * @LastEditors: harley
 * @Description: 
 */
import { createContext } from 'react'

export interface Todo {
	searchText: string
	keyID: string
	proxyEntryUrl?: string
	// currentTodo: Todo,
	iframe: {
		url: string
		routerList: string[]
	}
}


interface TodosContextProps {
	todos: Todo[]
	addOrChangTodo: (todo: Todo) => void
	deleteTodo: (todo: Todo) => void
	showIFrame: (todo: Todo, proxyEntryUrl: string) => void
	currentTodo: Todo,
	changeCurrentTodo: (todo: Todo, data: any) => void
}

const TodoContext = createContext<TodosContextProps>({

	todos: [],
	addOrChangTodo: () => { },
	deleteTodo: () => { },
	showIFrame: () => { },
	currentTodo: { searchText: '', keyID: '' },
	changeCurrentTodo: () => { }
})

export default TodoContext