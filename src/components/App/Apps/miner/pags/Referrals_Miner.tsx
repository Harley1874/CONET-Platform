import React, {useState, useEffect} from "react"
import { useIntl } from "react-intl"
import {cntp_address} from '../../../../../API/index'
import {Grid, CircularProgress, TextField, styled as materialStyled, TableContainer, Typography, SvgIcon, Tabs, Tab,Fab,
Table, TableHead, TableRow, TableCell, TableBody, IconButton, Paper, Stack, Box, Slide, Button, Link} from '@mui/material'
import {grey, lightGreen, blueGrey, green, red} from '@mui/material/colors'
import Community_liveness from './Community_liveness'
import useAppState from "../../../../../store/appState/useAppState"
import {initOneTimeListenState, registerReferrer} from '../../../../../API/index'
import {getWorkerService} from '../../../../../services/workerService/workerService'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import {CopyToClipboard} from "../../../../../utilities/utilities"
import c1 from '../assets/c1.svg'
import c2 from '../assets/c2.svg'
import styledCom from "styled-components"

const ItemStyle3 = materialStyled(Paper)(() => ({
    textAlign: 'center',
    borderRadius: '1rem',
    padding: '1rem',
	width: '100%'
}))

const ImgStyled = styledCom.img`
	width:100%;
`

const Referrals_Miner = () => {
	const intl = useIntl()
	const workservice = getWorkerService()
	const currentProfile = () => {
		if (workservice.data.passcode.status === 'LOCKED') {
			return null
		}
		const index = workservice.data.profiles.findIndex((n:any) => {
			return n.isPrimary
		})
		return workservice.data.profiles[index]
	}
	
	const {
		activeProfile
    } = useAppState()

	const [showReferrer, setShowReferrer] = useState(currentProfile().referrer)
	const [input, setInput] = useState('')
	const [inputShowError, setInputShowError] = useState(false)
	const [loading, setLoading] = useState(false)
	const referralsLink = activeProfile ? window.location.origin+'/?referral=' + activeProfile.keyID.toLowerCase(): ''
	const keyUpHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const key = event.key
		setInputShowError(false)
        if (key == 'Enter') {
            return _registerReferrer()
        }
    }
	const _registerReferrer = async () => {
		setLoading(true)
		const [success, kkkk ] =await registerReferrer(input)
	
		setLoading(false)
		if (success!= 'SUCCESS') {
			setTimeout(() => {
				setInputShowError (false)
			}, 3000)
			return setInputShowError (true)
		}


	}
	initOneTimeListenState('referrer', setShowReferrer)
	return (
		<ItemStyle3>
			
			<Typography variant="h5" sx={{ textAlign:'center', fontWeight: '900', padding: '1rem 0 1rem 0'}}>
				{intl.formatMessage({id: 'platform.miner.community.referral.detail'})}
			</Typography>
			<Stack sx={{width:'100%'}}
				direction='column' alignItems="center"
			>
				<ImgStyled src={c1} />
				<ImgStyled src={c2} />
			</Stack>
			
			
			{
				(!showReferrer || !showReferrer?.length ) &&
				<Stack spacing={1} direction="row"  justifyContent="center" alignItems="center" sx={{width: '100%', padding: '0rem 0 1rem 0'}}>
					<TextField
						fullWidth size="small"
						label={intl.formatMessage({id: 'platform.miner.community.liveness.referrer'})} 
						variant="standard"
						sx={{ color: grey[700] }}
						value={input}
						disabled={loading}
						onChange={e=> {
							setInput(e.target.value)
						}}
						error ={inputShowError}
						onKeyUp={keyUpHandler}
					/>
					{
						!loading && !inputShowError &&
						<Button
							variant="outlined"
							size="small"
							color='success'
							sx={{ fontFamily: 'inherit'}}
							onClick={_registerReferrer}
						>
							<Typography variant="body2" >
								{intl.formatMessage({id: 'platform.miner.community.liveness.registerReferrer'})}
							</Typography>
						</Button>
					}
					{
						loading &&
						<Box sx={{ display: 'flex' }}>
							<CircularProgress color="success" size='1rem' />
						</Box>
					}
					
				</Stack>
				
			}
			{
				showReferrer &&
				<>
					<Typography variant="body2" sx={{ textAlign:'left', color: grey[700], fontWeight: '600'}}>
						{intl.formatMessage({id: 'platform.miner.community.liveness.yourReferrer'})}
					</Typography>
					<Link color='#2e7d32' href={'https://scan.conet.network/address/'+showReferrer} target='_blank'>
						<Typography variant="body2" sx={{ textAlign:'left',fontSize:'0.8rem',wordBreak: 'break-word', padding: '0 0 1rem 0'}}>
							{showReferrer}
						</Typography>
					</Link>
				</>
			}

			
			{
				activeProfile &&
				<Stack spacing={1} direction="row"  justifyContent="flex-start" alignItems="center">
					<Typography variant="body2" sx={{ textAlign:'left', color: grey[700], fontWeight: '600'}}>
						{intl.formatMessage({id: 'platform.miner.community.referral.link'})}
					</Typography>
					<Link target='_blank'>
						<Typography variant="body2" sx={{ textAlign:'left',fontSize:'0.8rem',wordBreak: 'break-word', color: '#2e7d32' }}>
							{referralsLink}
						</Typography>
					</Link>
					<IconButton color="success" sx={{}}
						onClick={
							() => CopyToClipboard(referralsLink)
						}
					>
						<ContentCopyIcon sx={{fontSize: '1rem'}}/>
					</IconButton>
				</Stack>

			}
			
		</ItemStyle3>
		
	)
		
}

export default Referrals_Miner