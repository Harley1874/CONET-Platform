
import ToDoContext, { Todo } from './TodoContext'
import { useContext, forwardRef, useCallback } from 'react'
import { Box, styled } from '@mui/system'
import Button from '@mui/material/Button'
import SvgIcon from '@mui/material/SvgIcon'
import { ReactComponent as StarIcon } from '../../../../assets/logo/CoNET_logo.svg'
import CloseIcon from '@mui/icons-material/Close'
import { useIntl } from "react-intl"
import appStyles from "./browser.module.scss";
import { Tabs, Tab } from '@mui/material';

interface StyledTabProps {
	label: string
	component: any
}

const cutTextLength = (text: string) => {
	const u = text.split(/^http[s]\:\/\//i)
	const _u = u[0] || u[1]
	const _uu = _u.substring(0, 10)
	return _uu
}


export const StyledTab = styled((props: StyledTabProps) => (
	<Tab disableRipple {...props} />
))(({ theme }) => ({
	textTransform: 'none',
	fontWeight: '500',
	borderTopLeftRadius: '5px',
	borderTopRightRadius: '5px',
	fontSize: 'small',
	marginRight: 0,
	padding: '0px 8px 0px 8px',
	color: 'rgba(0, 0, 0, 0.4)',
	minHeight: '30px',
	whiteSpace: 'pre',
	'&.Mui-focusVisible': {
		backgroundColor: '#A8C7FA',
	},
	'&:hover': {
		backgroundColor: '#A8C7FA',
		color: 'rgba(0, 0, 0, 1)'
	},
	'&.Mui-selected': {
		backgroundColor: '#fff',
		color: 'red',
		'&:before': {
			content: '""',
			position: 'absolute',
			backgroundColor: 'red',
			width: '10px',
			height: '10px',
			left: '-10px',
			bottom: 0,
		}
	},
	'&.MuiTabs-indicatorSpan': {
		// backgroundColor: 'rgba(0,0,0,0)',
		backgroundColor: 'red',
		// display: 'none'
	},
}))

const TabArea = (todo: Todo, currentTab: Todo,) => {
	const todoContext = useContext(ToDoContext)
	const intl = useIntl()

	const deleteTodo = () => {
		todoContext.deleteTodo(todo)
	}

	const ClostButtom = () => {
		return (
			<>
				{
					todoContext.todos?.length > 1 &&
					<Box sx={{ display: 'inherit', paddingLeft: '1rem' }}
						className={appStyles.navItem}
						onClick={deleteTodo}>
						<CloseIcon sx={{ fontSize: '20px' }} />
					</Box>
				}
			</>
		)
	}

	const GridRoot = forwardRef((props, ref) => {

		return (<Button variant="text" {...props}
			startIcon={<SvgIcon component={StarIcon} inheritViewBox sx={{ fontSize: '20px' }} />}
			endIcon={ClostButtom()}
		>
			{cutTextLength(intl.formatMessage({ id: 'platform.app.browser.tab.newTabName' }))}
		</Button>
		)
	})

	return (
		<div className={`${appStyles.navItem} ${currentTab.keyID === todo.keyID ? appStyles.selected : 'other'}`}
			onClick={() => {
				todoContext.showIFrame(todo)
			}}
		>
			<Tab className={appStyles.navItemTextContainer}>
				{cutTextLength(intl.formatMessage({ id: 'platform.app.browser.tab.newTabName' }))}
			</Tab>
		</div>
	)
}

export default TabArea