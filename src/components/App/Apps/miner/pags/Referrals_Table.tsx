import React, {useState, useEffect} from "react"
import { useIntl } from "react-intl"
import {cntp_address} from '../../../../../API/index'
import {Grid, AccordionDetails, TextField, styled as materialStyled, TableContainer, Typography, SvgIcon, Tabs, Tab,Fab,
Table, TableHead, TableRow, TableCell, TableBody, IconButton, Paper, Stack, Box, Slide, Button, Link, Accordion, AccordionSummary} from '@mui/material'
import {grey, lightGreen, blueGrey, green, red} from '@mui/material/colors'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import Community_liveness from './Community_liveness'
import useAppState from "../../../../../store/appState/useAppState"
import { referrerList} from '../../../../../API/index'

const Referrals_Table = () => {
	const [listValve, setListValve] = React.useState<string[]>([])
	const [expanded, setExpanded] = React.useState<string | false>('')

	const intl = useIntl()
	useEffect(() => {
        
        const fetchData = async () => {
			if (!active) {
				return
			}
			const [success, data] = await referrerList()
			if (success === 'SUCCESS') {
				setListValve (data[0])
			}
        }
		let active = true
        fetchData()
        return () => { active = false }
    }, [])

	const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      	setExpanded(newExpanded ? panel : false)
    }

	const Row = (props: { row: string}) => {
		const { row } = props
		const [open, setOpen] = React.useState(false)

		const [currentReferralsList, setCurrentReferralsList] = React.useState([])
		useEffect(() => {
        
			const fetchData = async () => {
				if (!active) {
					return
				}
				const [success, data] = await referrerList()
				if (success === 'SUCCESS') {
					setListValve (data[0])
				}
			}
			
			let active = true
			fetchData()
			return () => { active = false }
		}, [])

		return (
			<>
				{
					currentReferralsList.length > 0 &&
					currentReferralsList.map(n => (
						<Accordion expanded={expanded === n} onChange={handleChange(n)} key={n}>
							<AccordionSummary id={n} >
								<Typography variant="body2" sx={{ textAlign:'left', color: grey[500]}}>
									{n}
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Row row={n}/>
							</AccordionDetails>
						</Accordion>
					))
				}
			</>
		)
	}

	return (
		<Stack sx={{width: '100%'}}>
			{
				
				listValve.length === 0  &&
				<Box sx={{ width:'100%', height: '5rem' }}>
					<Typography variant="h6" sx={{ textAlign:'center', color: grey[500]}}>
						{intl.formatMessage({id: 'platform.miner.register.referralsEmpty'})}
					</Typography>
				</Box>
				
			}
			{
				// listValve.length >0 &&
				// <TableContainer component={Paper}>
				// 	<Table sx={{ width:'100%' }} size="small">
				// 		<TableBody>
				// 			{
				// 				listValve.map(n => (
				// 					<Row key={n} row={n} />
				// 				))
				// 			}
				// 		</TableBody>
				// 	</Table>
				// </TableContainer>
			}
			{
				listValve.length >0 &&
				
				listValve.map(n => (
					<Accordion expanded={expanded === n} onChange={handleChange(n)} key={n}>
						<AccordionSummary id={n} >
							<Typography variant="body2" sx={{ textAlign:'left', color: grey[500]}}>
								{n}
							</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Row row={n}/>
						</AccordionDetails>
					</Accordion>
				))
				
				
				
			}
			
		</Stack>

	)
}

export default Referrals_Table