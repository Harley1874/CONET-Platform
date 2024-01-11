import React, {useState, useEffect} from "react"
import { useIntl } from "react-intl"
import {cntp_address} from '../../../../../API/index'
import {Grid, CircularProgress, TextField, styled as materialStyled, TableContainer, Typography, SvgIcon, Tabs, Tab,
Table, TableHead, TableRow, TableCell, TableBody, IconButton, Paper, Stack, Box, Slide, Fab, Link, Dialog} from '@mui/material'
import styledCom from "styled-components"
import {grey, lightGreen, blueGrey, green, red} from '@mui/material/colors'
import useAppState from "../../../../../store/appState/useAppState"
import CloudQueueIcon from '@mui/icons-material/CloudQueue'
import { loadCSS } from 'fg-loadcss'
import type { nodeType} from '../../nodeExplorer/nodeExplorer'
import { TransitionProps } from '@mui/material/transitions'
import {Button, Divider} from '@mui/material'
import store from '../../../../../store/store'
import {setDAPPOpen} from '../../../../../store/appState/appStateActions'
const ItemStyle2 = materialStyled(Paper)(() => ({
    textAlign: 'center',
    borderRadius: '1rem',
    padding: '1rem',
    color: grey[500]
}))


const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
	  children: React.ReactElement
	},
	ref: React.Ref<unknown>,
  ) {
	return <Slide direction="up" ref={ref} {...props} />
})


const CloudNode = ( check: boolean, setcheck: React.Dispatch<React.SetStateAction<boolean>>) => {
    const intl = useIntl()
	const {
        locale
    } = useAppState()

	const [seednodes, setSeednodes] = useState(0)
	const [supernodes, setSupernodes] = useState(0)
	const [orderOpen, setOrderOpen] = useState(false)

	useEffect(() => {
        const fetchData = async () => {
			if (!active) {
				return
			}
			
			const node = loadCSS(
				'https://use.fontawesome.com/releases/v6.5.1/css/all.css',
				// Inject before JSS
				//@ts-ignore
				document.querySelector('#font-awesome-css') || document.head.firstChild
			)
			
			// const [succes, nodes] = await getAllNodes()
			// setDates(nodes[0])
			
			return () => { 
				active = false
				node.parentNode!.removeChild(node)
			}
        }

		let active = true
        fetchData()
    }, [])

	const handleClose = () => {

	}

	const setDates = (data: any) => {
		
		const nodes: nodeType[] = data.node
		
		if (nodes) {
			//	@ts-ignore
			const nodeType = Object.groupBy (nodes, (n: nodeType) => n.type)
			setSeednodes(nodeType.seed)
			setSupernodes(nodeType.super)
		}
		
	}
    return (
        
        <Grid item>
            <ItemStyle2>
                <Fab
                    size='large'
                    color='success'
                    sx={{
                        fontSize: '3rem',
                        top: (theme) => theme.spacing(-5)
                    }}
                    >
                    <CloudQueueIcon fontSize='large' />
                </Fab>
				<TableContainer component={Box} sx={{marginTop:'-2rem', padding:'0 0 1rem 0'}}>
					<Table size="small" >
						<TableHead>
							<TableRow>
								<TableCell>
									
								</TableCell>
								<TableCell align="center">
									{ intl.formatMessage({id: 'platform.joinUS.miner.cloud.table.title1'})}
								</TableCell>

								<TableCell align="center">
									{ intl.formatMessage({id: 'platform.joinUS.miner.cloud.table.title2'})}
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								<TableCell>
									{ intl.formatMessage({id: 'platform.joinUS.miner.cloud.table.item1'})}
								</TableCell>
								<TableCell align="center">
									200U
								</TableCell>
								<TableCell align="center">
									1,000U
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									{ intl.formatMessage({id: 'platform.joinUS.miner.cloud.table.item2'})}
								</TableCell>
								<TableCell align="center">
									{ intl.formatMessage({id: 'platform.joinUS.miner.cloud.table.item2-seed'})}
								</TableCell>
								<TableCell align="center">
									{ intl.formatMessage({id: 'platform.joinUS.miner.cloud.table.item2-super'})}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									{ intl.formatMessage({id: 'platform.joinUS.miner.cloud.table.item3'})}
								</TableCell>
								<TableCell align="center">
									500
								</TableCell>
								<TableCell align="center">
									100
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									{ intl.formatMessage({id: 'platform.joinUS.miner.cloud.table.item4'})}
								</TableCell>
								<TableCell align="center">
									24/7
								</TableCell>
								<TableCell align="center">
									24/7
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									{ intl.formatMessage({id: 'platform.joinUS.miner.cloud.table.item5'})}
								</TableCell>
								<TableCell align="center">
								{ intl.formatMessage({id: 'platform.joinUS.miner.cloud.table.item5-1'})}
								</TableCell>
								<TableCell align="center">
								{ intl.formatMessage({id: 'platform.joinUS.miner.cloud.table.item5-1'})}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<Link target="_blank" sx={{color: green[700]}}
										href={(locale==='zh-CN' || locale ==='zh-TW') ? 
											'https://doc.conet.network/conet-power-card': 
											'https://doceng.conet.network/conet-power-card'}>
										{ intl.formatMessage({id: 'platform.joinUS.miner.cloud.table.item7'})}
									</Link>
									
								</TableCell>
								<TableCell align="center">
									-
								</TableCell>
								<TableCell align="center">
									{ intl.formatMessage({id: 'platform.joinUS.miner.cloud.table.item7-2'})}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									{ intl.formatMessage({id: 'platform.joinUS.miner.cloud.table.item8'})}
								</TableCell>
								<TableCell align="center">
									-
								</TableCell>
								<TableCell align="center">
									{ intl.formatMessage({id: 'platform.joinUS.miner.cloud.table.item8-2'})}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									{ intl.formatMessage({id: 'platform.joinUS.miner.cloud.table.itemAvailable'})}
								</TableCell>
								<TableCell align="center">
									{seednodes}
								</TableCell>
								<TableCell align="center">
									{supernodes}
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
				{ intl.formatMessage({id: 'platform.miner.cloudnode.orderInfo'})}
				{/* <Button
					color='success'
					variant="contained"
					onClick={() => store.dispatch(setDAPPOpen('cloudNode'))}
				>
					<Typography  sx={{padding: '0 0.2rem 0rem 0rem', fontFamily:'inherit'}} >
						{intl.formatMessage({id: 'platform.miner.cloudnode.orderButton'})}
					</Typography>
					
				</Button> */}
				
            </ItemStyle2>

        </Grid>
        
    )
}

export default CloudNode