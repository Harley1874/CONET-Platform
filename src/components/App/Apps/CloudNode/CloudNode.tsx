import { useIntl } from "react-intl"
import { Pie } from 'react-chartjs-2'
import {Grid, CircularProgress,Stack, Box,Input,Link, Typography, TextField, Button, styled as materialStyled, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton} from '@mui/material'
import {grey, lightGreen, blueGrey, green, red} from '@mui/material/colors'

interface pieDatasets {
	label: string
	data: number[]
	backgroundColor: string[]
	borderColor: string[]
	borderWidth: number
}

interface pieData {
	labels: string[]
	datasets: pieDatasets[]
}

const PieChart = () => {
	const totalCNTP = 100000000
	const balance = totalCNTP - 0
	const intl = useIntl()
	const data: pieData = {
		labels: [
			intl.formatMessage({id: 'platform.miner.cloudnode.orderForm.pie.seednode'}),
			intl.formatMessage({id: 'platform.miner.cloudnode.orderForm.pie.supernode'}),
			intl.formatMessage({id: 'platform.miner.cloudnode.orderForm.pie.freeuser'}),
		],
		datasets: [{
			label: '',
			data: [32.3, 60.3, 7.4],
			backgroundColor: [
				'#6e7b63',
				'#a1b095',
				'#2e7d32',
			],
			//@ts-ignore
			hoverOffset: 0,
			borderWidth: 0.5,
		}]
	}

	return (
		<Stack 
			direction="column"
			justifyContent="center"
			alignItems="center">
				<Box sx={{maxWidth: '20rem'}}>
				{
				
					<Pie data={data} />
				}
				</Box>
			
		</Stack>
		
	)
}

const CloudNode = () => {
	const intl = useIntl()
	return (
		<Grid container spacing={1} columns={{ xs: 4, sm: 8, md: 12}} sx={{padding: '0rem 0 10rem 0'}}>
			<Grid item md={12} sm={8} xs={4} sx={{textAlign: 'center', width: '100%', padding: '0 0 2rem 0'}}>
				<Typography variant="h4" sx={{ fontWeight: '900'}}>
						{intl.formatMessage({id: 'platform.miner.cloudnode.orderForm.Title'})}
				</Typography>
			</Grid>
			<Grid item md={12} sm={8} xs={4} sx={{textAlign: 'center', width: '100%', padding: '0 0 2rem 0'}}>
				<Typography variant="body2" sx={{ color:green[200], fontWeight: '900'}}>
						{intl.formatMessage({id: 'platform.miner.cloudnode.orderForm.detail'})}
				</Typography>
			</Grid>
			<Grid item md={12} sm={8} xs={4} sx={{textAlign: 'center', width: '100%', padding: '0 0 2rem 0'}}>
				<PieChart />
			</Grid>
			<Grid item md={12} sm={8} xs={4} sx={{textAlign: 'center', width: '100%', padding: '0 0 2rem 0'}}>
				<Input placeholder={intl.formatMessage({id: 'platform.miner.community.liveness.yourReferrer'})} sx={{width: '100%'}}/>
			</Grid>
			<Grid item md={12} sm={8} xs={4} sx={{textAlign: 'center', width: '100%', padding: '0 0 2rem 0'}}>
				<Input placeholder={intl.formatMessage({id: 'platform.miner.cloudnode.orderForm.walletAddr'})} sx={{width: '100%'}}/>
			</Grid>
			<Grid item md={6} sm={4} xs={2} sx={{textAlign: 'center', width: '100%', padding: '0 0 2rem 0'}}>
				<Input type='number' placeholder={intl.formatMessage({id: 'platform.miner.cloudnode.orderForm.seednodeAmount'})} sx={{width: '100%'}}/>
			</Grid>
			<Grid item md={6} sm={4} xs={2} sx={{textAlign: 'center', width: '100%', padding: '0 0 2rem 0'}}>
				<Input type='number' placeholder={intl.formatMessage({id: 'platform.miner.cloudnode.orderForm.supernodeAmount'})} sx={{width: '100%'}}/>
			</Grid>
			<Grid item md={12} sm={8} xs={4} sx={{textAlign: 'center', width: '100%', padding: '0 0 2rem 0'}}>
				<Link target="_blank" href='https://etherscan.io/address/0xf832ac957988150368714f7af254c4108917bd18' >
					{intl.formatMessage({id: 'platform.miner.cloudnode.orderForm.CONETWalletAddress'})}
				</Link>
					
			</Grid>
			<Grid item md={12} sm={8} xs={4} sx={{textAlign: 'center', width: '100%', padding: '0 0 2rem 0'}}>
				<Input placeholder={intl.formatMessage({id: 'platform.miner.cloudnode.orderForm.tx'})} sx={{width: '100%'}}/>
			</Grid>
			<Grid item md={12} sm={8} xs={4} sx={{textAlign: 'center', width: '100%', padding: '0 0 2rem 0'}}>
				<Input placeholder={intl.formatMessage({id: 'platform.miner.cloudnode.orderForm.email'})} sx={{width: '100%'}}/>
			</Grid>
			<Grid item md={12} sm={8} xs={4} sx={{textAlign: 'center', width: '100%', padding: '0 0 2rem 0'}}>
				<Typography variant='body2' sx={{ color:green[200], fontWeight: '900'}}>
					{intl.formatMessage({id: 'platform.miner.cloudnode.orderForm.node'})}
				</Typography>
			</Grid>
			<Grid item md={12} sm={8} xs={4} sx={{textAlign: 'center', width: '100%', padding: '0 0 2rem 0'}}>
				<Button size="large">
					{intl.formatMessage({id: 'platform.manageProfiles.deleteProfile.confirmButton'})}
				</Button>
			</Grid>
		</Grid>

	)
}

export default CloudNode