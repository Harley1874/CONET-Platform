import React, {useState, useEffect} from "react"
import { useIntl } from "react-intl"
import {cntp_address} from '../../../../../API/index'
import {Grid, CircularProgress, TextField, styled as materialStyled, TableContainer, Typography, SvgIcon,Fab, ButtonProps,
Table, TableHead, TableRow, TableCell, TableBody, IconButton, Paper, Stack, Box, Slide, Button} from '@mui/material'
import {grey, lightGreen, blueGrey, green, red} from '@mui/material/colors'
import {startLiveness, stopLiveness, isLivenessRunning} from '../../../../../API/index'
import miner2 from '../../../../../assets/miner/FancyNyan.webp'
import minerPause from '../../../../../assets/miner/FancyNyanPause.png'
import {Tabs, Tab, Button as ButtonNext, Divider} from '@mui/material-next'
import ErrorIcon from '@mui/icons-material/Error'

const ItemStyle3 = materialStyled(Paper)(() => ({
    textAlign: 'center',
    borderRadius: '1rem',
    padding: '1rem',
	width: '100%'
}))

const ColorButton = materialStyled(Button)<ButtonProps>(({ theme }) => ({
   
    '&:hover': {
        
    },
    fontFamily: [
        'Inter',
        '"Inter Placeholder"',
        'sans-serif',
    ].join(','),
    fontWeight: '900',
    fontSize: '20px',
    padding: '0.5rem 4rem 0.5rem 4rem',
    borderRadius: '2rem'
}))


const Community_liveness = (CNTP: string, setCNTP: (v:string) => void, setTodayCNTP: (v:string) => void) => {
	const intl = useIntl()
	const [showLoader, setShowLoader] = useState(false)
	const [firstLoader, setFirstLoader] = useState(0)
	const [showSameIPError, setShowSameIPError] = useState(false)
	const [showInstanceError, setShowInstanceError] = useState(false)
	const [minting, setMinting] = useState(false)
	const [showTimeOutError, setShowTimeOutError] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			if (!active) {
				return
			}
			
			if (showLoader) {
				if (minting) {
					await stopLiveness()
					setShowLoader (false)
					// setIslivenessRunning(false)
					return setMinting(false)
				}
				
				startLiveness((err, data ) => {
					if (showLoader) {
						setShowLoader (false)
					}
					if(data[0] === 'TIMEOUT') {
						
						return setShowTimeOutError(true)
					}
					if (data[0] === 'FAILURE') {
						
						return setShowInstanceError(true)
					}
					if (!minting) {
						setMinting(true)
					}
					setCNTP(data[0])
					setTodayCNTP(data[1])
					console.log ('showLoader',data)
					
				})
			}

		}
		
		let active = true
        fetchData()
        return () => { active = false }
	},[showLoader])

	useEffect(() => {
		const fetchData = async () => {
			if (!active) {
				return
			}
			if (minting) {
				return console.log(`minting is true return!`)
			}
			
			isLivenessRunning ((err, data ) => {
				if (!data.length||err) {
					return
				}
				
				if (!minting) {
					setMinting(true)
					setCNTP(data[0])
					setTodayCNTP(data[1])
				}
			})
		}
		
		let active = true
        fetchData()
        return () => { active = false }
	},[minting])

	const clearError = () => {
		
			setShowSameIPError(false)
			setShowTimeOutError(false)
			setShowInstanceError(false)
		
	}

	const clickStart = async () => {
		if (showTimeOutError||showInstanceError) {
			return clearError()
		}
		setShowLoader(true)
	}
	return (
		<ItemStyle3>
			<Stack justifyContent="center" alignItems="center" spacing={2}>
			{
				(!showTimeOutError && !showInstanceError && !showSameIPError) &&
				<Stack spacing={2}>
					<Typography variant="body1" sx={{textAlign:'center', color: grey[500]}}>
						{intl.formatMessage({id: 'platform.miner.community.liveness.detail'})}
					</Typography>
					
				</Stack>

			}
			
			{
				showSameIPError &&
				<Typography variant="body1" sx={{textAlign:'center', color: red[700], padding: '0 0 1rem 0'}}>
					{intl.formatMessage({id: 'platform.miner.community.liveness.sameIPError'})}
				</Typography>
			}
			{
				showTimeOutError &&
				<Stack spacing={1}>
					<Typography variant="body1" sx={{textAlign:'center', color: red[700],}}>
						{intl.formatMessage({id: 'platform.miner.community.liveness.Timeout1'})}
					</Typography>
					<Typography variant="body1" sx={{textAlign:'center', color: red[700]}}>
						{intl.formatMessage({id: 'platform.miner.community.liveness.Timeout2'})}
					</Typography>
				</Stack>
				
			}
			{
				showInstanceError &&
				<Typography variant="body1" sx={{textAlign:'center', color: red[700], padding: '0 0 1rem 0'}}>
					{intl.formatMessage({id: 'platform.miner.community.liveness.sameMinerError'})}
				</Typography>
			}
			<Typography variant="h5" sx={{textAlign:'center', color: green[500], fontWeight: '800'}}>
				{CNTP} CNTP
			</Typography>
				
			{
				minting? <img src={miner2} style={{width: '5rem'}} />: <img src={minerPause} style={{ width: '5rem'}} />
			}
			{
				(showTimeOutError || showInstanceError) &&
				<ColorButton variant="outlined" color="error" endIcon={<ErrorIcon color="error" />} onClick={clickStart} sx={{ borderRadius: '2rem'}}>
					<Typography  sx={{ fontStyle: "inherit", }}>
						{
							intl.formatMessage({id: 'platform.button.error'})
						}
					</Typography>	
				</ColorButton>
			}
			{
				!showTimeOutError && !showInstanceError &&
				<Stack spacing={1}>
					{
						minting &&
						<Typography variant="body2" sx={{textAlign:'center', color: red[700], padding: '0 0 1rem 0'}}>
							{intl.formatMessage({id: 'platform.miner.community.liveness.chainDelayInfo'})}
						</Typography>
					}
					
					<ButtonNext
						onClick={clickStart}
						variant="elevated"
						color='primary'
						disabled={showLoader}
						sx={{fontFamily:'inherit', color: '#4caf50'}}
					>
						<Typography  sx={{padding: '0 0.2rem 0rem 0rem'}}>
							
							{intl.formatMessage({id: minting? 'platform.miner.register.MinerAni.stop':'platform.miner.register.button'})}
					
						</Typography>
						{ showLoader && <CircularProgress size={20} color="success" variant="indeterminate"  />}
						
					</ButtonNext>
				</Stack>

				
			}
			
			</Stack>
		</ItemStyle3>
		
	)
		
}

export default Community_liveness