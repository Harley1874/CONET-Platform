/*
 * @Author: harley
 * @Date: 2024-01-18 17:05:33
 * @LastEditors: harley
 * @Description: 
 */
/*
 * @Author: harley
 * @Date: 2024-01-18 17:05:33
 * @LastEditors: harley
 * @Description: 
 */
import React, { useState, useContext, useEffect, useCallback } from 'react'
import ToDoContext, { Todo } from './TodoContext'
import { todo } from './index'
import Grid from '@mui/material/Grid'
import TabArea, { StyledTab } from './TabArea'
import SvgIcon from '@mui/material/SvgIcon'
import Box from '@mui/material/Box'
import SearchPage from './searchPage'
import appStyles from "./browser.module.scss";
import { ReactComponent as StarIcon } from '../../../../assets/logo/CoNET_logo.svg'
import AddIcon from '@mui/icons-material/Add';
import { TabList, TabContext, TabPanel } from '@mui/lab';
import { Tabs, Tab } from '@mui/material';
import { styled } from '@mui/material/styles';
import IframePage from './iframePage'
const AntTabs = styled(TabList)({
	'& .MuiTabs-indicator': {
		display: 'none'
	},
});

const ShowSearchTextInput = () => {

	const todoContext = useContext(ToDoContext)

	const [value, setValue] = React.useState('0');
	useEffect(() => {
		if (todoContext.todos.length) {
			setValue(todoContext.currentTodo.keyID)
		}
	}, [todoContext.todos])

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
		todoContext.showIFrame(todoContext.todos.find(n => n.keyID === newValue))
	};

	const addContent = () => {
		const _todo = todo()
		todoContext.addOrChangTodo(_todo)
	}



	const plusTab = () => {
		return (
			<div className={appStyles.plusTab} onClick={addContent}>
				<AddIcon />
			</div>
		)
	}

	// logo组件
	const logo = () => {
		return (
			<div className={appStyles.logo}>
				<SvgIcon component={StarIcon} inheritViewBox
					sx={{ fontSize: '20px' }}
				/>
			</div>
		)
	}




	return (
		<Grid container item xs={12} width="100%" sx={{ backgroundColor: '#d3e3fd' }}>
			<Box sx={{ width: '100%' }}>
				<div className={appStyles.container}>
					<TabContext value={todoContext.currentTodo.keyID} >
						<div className={appStyles.navbar}>
							{logo()}
							<AntTabs onChange={handleChange} className={appStyles.navList} indicatorColor="secondary">
								{
									todoContext.todos.length &&
									todoContext.todos.map((todo: Todo) =>
										<Tab
											label={`新标签页`}
											value={todo.keyID}
											key={todo.keyID}
											className={`${appStyles.navItem} ${todo.keyID === todoContext.currentTodo.keyID ? appStyles.selected : ''}`}
										></Tab>
									)
								}
							</AntTabs>
							{plusTab()}
						</div>
						<div className={appStyles.tabsContents}>
							{
								todoContext.todos.length &&
								todoContext.todos.map((todo: Todo) =>
									<TabPanel
										value={todo.keyID}
										key={todo.keyID}
										className={`${appStyles.contentPanel} ${todo.keyID === todoContext.currentTodo.keyID ? appStyles.active : ''}`}
									>
										<IframePage currentTodo={todoContext.currentTodo}></IframePage>
									</TabPanel>
								)
							}
						</div>

					</TabContext>
				</div>
			</Box>

		</Grid>
	)
}

export default ShowSearchTextInput