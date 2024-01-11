import React, {useState, useEffect} from "react"
import { useIntl } from "react-intl"
import {cntp_address} from '../../../../../API/index'
import {Grid, CircularProgress, TextField, styled as materialStyled, TableContainer, Typography, SvgIcon, Tabs, Tab,Fab,
Table, TableHead, TableRow, TableCell, TableBody, IconButton, Paper, Stack, Box, Slide, Button} from '@mui/material'
import {grey, lightGreen, blueGrey, green, red} from '@mui/material/colors'
import Community_liveness from './Community_liveness'
import Referrals_Table from './Referrals_Table'
import Referrals_Miner from './Referrals_Miner'


interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}


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

const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
}

const Community = (CNTP: string, setCNTP:(v: string) => void, setTodayCNTP:(v: string) => void) => {
	const intl = useIntl()
	const [value, setValue] = React.useState(0)
	const [animei, setAnimei]= useState<'left'|'right'>('left')
	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        const old = value
        setValue(newValue)
        if (newValue > old) {
            return setAnimei('right') 
        }
        setAnimei('left')
    }

	return (
		<Grid container alignItems="center" direction="column" sx={{ textAlign: 'center', width: '100%'}}>
			
			<Grid item xs={12} sx={{textAlign: 'center', width: '100%'}}>
				<Typography variant="h6" sx={{ fontWeight: '700', textAlign:'center', color: lightGreen[400]}}>
					{intl.formatMessage({id: 'platform.miner.community.title'})}
				</Typography>
			</Grid>
			<Grid item xs={12} sx={{textAlign: 'center', width: '100%'}}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs value={value} onChange={handleChange} 
                        variant="scrollable"
                        scrollButtons
                        allowScrollButtonsMobile>
                        <Tab label={intl.formatMessage({id: 'platform.miner.community.liveness.title'})} {...a11yProps(0)} />
                        <Tab label={intl.formatMessage({id: 'platform.miner.register.referrals'})} {...a11yProps(1)} />
						<Tab label={intl.formatMessage({id: 'platform.miner.register.referralsList'})} {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <Slide direction={animei} in={value===0} mountOnEnter unmountOnExit>
						<Stack spacing={1} justifyContent="center" alignItems="center" sx={{width: '100%', padding:'1rem 0 0 0'}}>
						{Community_liveness(CNTP, setCNTP, setTodayCNTP)}
						</Stack>
                    </Slide>
                </CustomTabPanel>
				<CustomTabPanel value={value} index={1}>
                    <Slide direction={animei} in={value===1} mountOnEnter unmountOnExit>
						<Stack spacing={1} justifyContent="center" alignItems="center" sx={{width: '100%', padding:'1rem 0 0 0'}}>
							<Referrals_Miner />
						</Stack>
                    </Slide>
                </CustomTabPanel>
				<CustomTabPanel value={value} index={2}>
                    <Slide direction={animei} in={value===2} mountOnEnter unmountOnExit>
						<Stack spacing={1} justifyContent="center" alignItems="center" sx={{width: '100%', padding:'1rem 0 0 0'}}>
							<Referrals_Table />
						</Stack>
                    </Slide>
                </CustomTabPanel>
            </Grid>
		</Grid>
	)
	
}

export default Community