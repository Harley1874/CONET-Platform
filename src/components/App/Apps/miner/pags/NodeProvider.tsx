import React, {useState, useEffect} from "react"
import { useIntl } from "react-intl"
import {cntp_address} from '../../../../../API/index'
import {Grid, CircularProgress, TextField, styled as materialStyled, TableContainer, Typography, SvgIcon, Tabs, Tab,
Table, TableHead, TableRow, TableCell, TableBody, IconButton, Paper, Stack, Box, Slide, Button} from '@mui/material'
import {grey, lightGreen, blueGrey, green, red} from '@mui/material/colors'
import CloudNode from './CloudNode'
import Bandwidth from './Bandwidth'
import SaaS from './SaaS'
import Storage from './Storage'

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

const NodeProvider = () => {
    const [value, setValue] = React.useState(0)
    

    const [check1, setcheck1] = useState(false)
    const [check2, setcheck2] = useState(false)
    const [check3, setcheck3] = useState(false)
    

    const [animei, setAnimei]= useState<'left'|'right'>('left')
    
	const intl = useIntl()

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        const old = value
        setValue(newValue)
        if (newValue > old) {
            return setAnimei('right') 
        }
        setAnimei('left')
    }

    return (
        <Grid container columns={{ xs: 4, sm: 8, md: 12}} sx={{ textAlign: 'center', width: '100%', padding: '0 0 3rem 0'}}>
            
            <Grid item xs={12} sx={{textAlign: 'center', width: '100%'}}>
                <Typography variant="h6" sx={{ fontWeight: '700', textAlign:'center', color: lightGreen[400]}}>
                    {intl.formatMessage({id: 'platform.miner.register.title'})}
                </Typography>
            </Grid>
            <Grid item xs={12} sx={{textAlign: 'center', width: '100%'}}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: '3rem' }}>
                    <Tabs value={value} onChange={handleChange} 
                        variant="scrollable"
                        scrollButtons
                        allowScrollButtonsMobile>
						<Tab label={intl.formatMessage({id: 'platform.joinUS.miner.cloudTitle'})} {...a11yProps(0)} />
                        <Tab label={intl.formatMessage({id: 'platform.joinUS.miner.Bandwidth'})} {...a11yProps(1)} />
                        <Tab label={intl.formatMessage({id: 'platform.joinUS.miner.SaaS'})} {...a11yProps(2)} />
                        <Tab label={intl.formatMessage({id: 'platform.joinUS.miner.storage'})} {...a11yProps(3)} />
                    </Tabs>
                </Box>
				<CustomTabPanel value={value} index={0}>
                    <Slide direction={animei} in={value===0} mountOnEnter unmountOnExit>
                        {CloudNode(check1,setcheck1)}
                    </Slide>
                    
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <Slide direction={animei} in={value===1} mountOnEnter unmountOnExit>
                        {Bandwidth(check1,setcheck1)}

                    </Slide>
                    
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <Slide direction={animei} in={value===2} mountOnEnter unmountOnExit>

                        {SaaS(check2, setcheck2)}

                    </Slide>
                    
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3}>
                    <Slide direction={animei} in={value===3} mountOnEnter unmountOnExit>
                        {Storage(check3, setcheck3)}
                    </Slide>
                    
                </CustomTabPanel>
                

            </Grid>
        </Grid>
    )
}
export default NodeProvider