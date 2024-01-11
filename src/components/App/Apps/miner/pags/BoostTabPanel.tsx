import React, {useState, useEffect} from "react"
import { useIntl } from "react-intl"
import {cntp_address} from '../../../../../API/index'
import {Grid, CircularProgress, TextField, styled as materialStyled, TableContainer, Typography, SvgIcon, Tabs, Tab,
Table, TableHead, TableRow, TableCell, TableBody, IconButton, Paper, Stack, Box, Slide, } from '@mui/material'
import styledCom from "styled-components"
import {grey, lightGreen, blueGrey, green, red} from '@mui/material/colors'

import Boost from './Boost'

interface TabPanelProps {
	children?: React.ReactNode
	index: number
	value: number
}

const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
}

const BoostImg = styledCom.img`
    width: 7rem;
`

const CustomTabPanel = (props: TabPanelProps) => {
	const { children, value, index, ...other } = props

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && 
				children
			}
		</div>
	)
}

const BoostTabPanel = () => {
	const intl = useIntl()
	const [value, setValue] = React.useState(0)
	const [animei, setAnimei]= useState<'left'|'right'>('left')
    const [boost, setBoost]= useState(false)
	const [CONET_balance, setCONET_balance] = useState(0)
	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        const old = value
        setValue(newValue)
        if (newValue > old) {
            return setAnimei('right') 
        }
        setAnimei('left')
    }
	return (
		<Grid container alignItems="center" direction="column" sx={{ textAlign: 'center', width: '100%', padding: '0 0 5rem 0'}}>
			<Grid item xs={12} sx={{textAlign: 'center', width: '100%'}}>
				<Typography variant="h6" sx={{ fontWeight: '700', textAlign:'center',color: lightGreen[400]}}>
					{intl.formatMessage({id: 'platform.miner.register.boost'})}
				</Typography>
			</Grid>
			<Grid item xs={12} sx={{textAlign: 'center', width: '100%'}}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs value={value} onChange={handleChange} 
                        variant="scrollable"
                        scrollButtons
                        allowScrollButtonsMobile>
                        <Tab label={intl.formatMessage({id: 'platform.miner.register.boost'})} {...a11yProps(3)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
					<Slide direction={animei} in={value===0} mountOnEnter unmountOnExit>
						{Boost(CONET_balance, setBoost)}
					</Slide>
                </CustomTabPanel>
            </Grid>
		</Grid>
	)
	
}

export default BoostTabPanel
