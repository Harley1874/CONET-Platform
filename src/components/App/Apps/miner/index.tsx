

import { useIntl } from "react-intl"

import {Grid, CircularProgress, TextField, styled as materialStyled, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton} from '@mui/material'
import styledCom from "styled-components"
import Typography from '@mui/material/Typography'
import useAppState from "../../../../store/appState/useAppState"


import {Stack, Link, SvgIcon} from '@mui/material'


import React, {useState, useEffect} from "react"
import {Tabs, Tab, Button, Divider} from '@mui/material-next'
import {getWorkerService} from '../../../../services/workerService/workerService'


import AD from './AD-1'
import DashBoardpanel from './pags/DashBoardpanel'
import BoostTabPanel from './pags/BoostTabPanel'
import NodeProvider from './pags/NodeProvider'
import Community from './pags/Community'
const StyleDiv = styledCom.div`
`

const currentProfile = () => {
	const workerService = getWorkerService()
	if (workerService.data.passcode.status === 'LOCKED') {
		return null
	}
	const index = workerService.data.profiles.findIndex((n:any) => {
		return n.isPrimary
	})

	return workerService.data.profiles[index]
}


const Miner = () => {
    const {
        locale,
		setDAPPOpen
    } = useAppState()

    const intl = useIntl()

	const [showNodeMiner, setShowNodeMiner] = useState(true)
	const [showBosste, setShowBosste] = useState(false)
	const [cntp, setCntp] = useState('0')
	const [todayCntp, setTodayCntp] = useState('0')

	useEffect(() => {
		const fetchData = () => {
			if (!active) {
				return
			}
			const profile = currentProfile()
			setCntp(profile.tokens.cntp.balance)
		}
		
		let active = true
        fetchData()
        return () => { active = false }
	},[])

	return (
		<Grid container spacing={1} columns={{ xs: 4, sm: 8, md: 12}} sx={{padding: '0rem 0 10rem 0'}}>
			<Grid item md={12} sm={8} xs={4} sx={{textAlign: 'center', width: '100%', padding: '0 0 2rem 0'}}>
				<Typography variant="h4" sx={{ fontWeight: '900'}}>
					{intl.formatMessage({id: 'platform.miner.header.title'})}
				</Typography>
				<Link target="_blank" href={(locale==='zh-CN' || locale ==='zh-TW') ? 
					'https://doc.conet.network/he-xin-ji-shu/qu-zhong-xin-hua-zhuan-yong-wang-luo-dcpn/qu-zhong-xin-hua-wu-li-ji-chu-she-shi-wang-luo': 
					'https://doceng.conet.network/core-technology/decentralized-private-network-dcpn/decentralized-physical-infrastructure-network'}>
					<Typography variant="body1" sx={{ color: '#2e7d32'}}>
						{intl.formatMessage({id: 'platform.miner.header.title.detial'})}
					</Typography>
				</Link>
				<Link target="_blank" href={'https://scan.conet.network/token/0x0f43685B2cB08b9FB8Ca1D981fF078C22Fec84c5?tab=contract'}>
					<Typography variant="body2" sx={{ color: '#2e7d32'}}>
						{intl.formatMessage({id: 'platform.miner.header.title.smartContract'})}
					</Typography>
				</Link>
				
			</Grid>
			<DashBoardpanel />
			<Grid item md={12} sm={8} xs={4} sx={{textAlign: 'center', width: '100%', cursor: 'pointer', marginTop: '2rem'}}>
				<StyleDiv onClick={() => setShowNodeMiner(true)}>
					<AD />
				</StyleDiv>
				
			</Grid>
			<Grid item md={12} sm={8} xs={4} sx={{textAlign: 'center', width: '100%', padding: '5rem 0 3rem 0'}}>
				{Community(todayCntp, setCntp, setTodayCntp)}
			</Grid>
			
			
			{
				!showNodeMiner &&
				<Grid item md={12} sm={8} xs={4} sx={{textAlign: 'center', width: '100%', padding: '5rem 0 3rem 0'}}>
					<Button variant="elevated" onClick={
							() => setShowNodeMiner(true)
						} 
						sx={{fontFamily: 'inherit'}}>
						{intl.formatMessage({id: 'platform.miner.register.title'})}
					</Button>
				</Grid>
			}
			
			
			{
				showNodeMiner && 
					<Grid item md={12} sm={8} xs={4} sx={{textAlign: 'center', width: '100%'}}>
						
						<NodeProvider/>
					</Grid>
			}

			{
				!showBosste && 
				<Grid item md={12} sm={8} xs={4} sx={{textAlign: 'center', width: '100%', padding: '5rem 0 3rem 0'}}>
					<Button variant="elevated" onClick={
							() => setShowBosste(true)
						} 
						sx={{fontFamily: 'inherit'}}>
						{intl.formatMessage({id: 'platform.miner.register.boost'})}
					</Button>
				</Grid>
			}
			
			
			{
				showBosste && 
					<Grid item md={12} sm={8} xs={4} sx={{textAlign: 'center', width: '100%', padding: '5rem 0 5rem 0'}}>
						<BoostTabPanel />
					</Grid>
			}

		</Grid>

    )
}

export default Miner