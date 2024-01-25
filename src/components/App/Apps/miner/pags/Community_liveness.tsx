import React, { useState, useEffect } from "react"
import { useIntl } from "react-intl"
import { cntp_address } from '../../../../../API/index'
import {
	Grid, CircularProgress, TextField, styled as materialStyled, TableContainer, Typography, SvgIcon, Fab, ButtonProps,
	Table, TableHead, TableRow, TableCell, TableBody, IconButton, Paper, Stack, Box, Slide, Button, LinearProgress
} from '@mui/material'
import { grey, lightGreen, blueGrey, green, red } from '@mui/material/colors'
import { startLiveness, stopLiveness, isLivenessRunning } from '../../../../../API/index'
import miner2 from '../../../../../assets/miner/FancyNyan.webp'
import minerPause from '../../../../../assets/miner/FancyNyanPause.png'
import { Tabs, Tab, Button as ButtonNext, Divider } from '@mui/material-next'
import ErrorIcon from '@mui/icons-material/Error'
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred'
import FancyNyanStoped from '../assets/FancyNyanStoped.png'

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

interface Ratedata {
	ipaddress: number
	online: number
	rate: number
	status: number
}

const Community_liveness = (CNTP: string, setCNTP: (v: string) => void, setTodayCNTP: (v: string) => void) => {
	const intl = useIntl()
	const [showLoader, setShowLoader] = useState(false)
	const [firstLoader, setFirstLoader] = useState(0)
	const [showSameIPError, setShowSameIPError] = useState(false)
	const [showInstanceError, setShowInstanceError] = useState(false)
	const [minting, setMinting] = useState(false)
	const [showTimeOutError, setShowTimeOutError] = useState(false)
	const [regError, setRegError] = useState(false)
	const [rateProgress, setRateProgress] = useState(0)
	const [rateProgressBuffer, setRateProgressBuffer] = useState(0)
	const [rateProgressColor, setRateProgressColor] = useState<'success' | 'warning' | 'error'>('success')
	const [onlineCount, setOnlineCount] = useState(0)
	const [onlineRate, setOnlineRate] = useState('')
	const [disconnect, setDisconnect] = useState(false) // 连接被断开
	// 没有网络，无法链接服务器
	const [onInternet, setOnInternet] = useState(false)
	const clearError = () => {

		setShowSameIPError(false)
		setShowTimeOutError(false)
		setShowInstanceError(false)
		setRegError(false)
		setOnInternet(false)
		setDisconnect(false)
	}
	const formatDat = (rateData: Ratedata) => {
		if (!rateData) {
			return
		}
		let process = 0
		if (rateData.online < 1000) {
			process = (rateData.online / 1000) * 100
			process = process > 90 ? 90 : process
			setRateProgressColor('success')

		} else if (rateData.online < 2000) {
			process = (rateData.online / 2000) * 100
			process = process > 90 ? 90 : process
			setRateProgressColor('warning')

		} else {
			process = (rateData.online / 10000) * 100
			process = process > 90 ? 90 : process
			setRateProgressColor('error')
		}

		setOnlineCount(rateData.online)
		setRateProgress(process)
		setRateProgressBuffer(process + Math.random() * 7)
		const cntpRate = (rateData.rate / (rateData.online * 24)).toFixed(6)
		setOnlineRate(cntpRate)
	}

	const precessCallback = (err: string, data: string[]) => {
		clearError()
		if (showLoader) {
			setShowLoader(false)
		}
		if (!data.length) {
			return
		}
		if (data[0] === 'TIMEOUT') {
			return setShowTimeOutError(true)
		}
		if (data[0] === 'sameInstance') {
			return setShowInstanceError(true)
		}

		if (data[0] === 'SAMEIP') {
			return setShowSameIPError(true)
		}
		if (data[0] === 'FAILURE') {
			return setRegError(true)
		}

		// 没有网络，无法链接服务器
		if (data[0] === 'NOINTERNET') {
			return setOnInternet(true)
		}

		// 连接被断开
		if (data[0] === 'DISCONNECT') {
			setMinting(false)
			return setDisconnect(true)
		}

		if (!minting) {
			setMinting(true)
		}
		setCNTP(data[0])
		setTodayCNTP(data[1])
		//	@ts-ignore
		const rateData: Ratedata = data[2]
		formatDat(rateData)
	}

	useEffect(() => {
		const fetchData = async () => {
			if (!active) {
				return
			}

			// 开始挖矿
			if (showLoader) {
				if (minting) {
					await stopLiveness()
					setShowLoader(false)
					// setIslivenessRunning(false)
					return setMinting(false)
				}


				startLiveness(precessCallback)

			}

		}

		let active = true
		fetchData()
		return () => { active = false }
	}, [showLoader])

	useEffect(() => {
		const fetchData = async () => {
			if (!active) {
				return
			}
			if (minting) {
				return console.log(`minting is true return!`)
			}

			isLivenessRunning(precessCallback)
		}

		let active = true
		fetchData()
		return () => { active = false }
	}, [minting])



	const clickStart = async () => {
		if (showTimeOutError || showInstanceError || regError || showSameIPError || onInternet || disconnect) {
			return clearError()
		}
		setShowLoader(true)
	}
	return (
		<ItemStyle3>
			<Stack justifyContent="center" alignItems="center" spacing={2}>
				{
					(!showTimeOutError && !showInstanceError && !showSameIPError) && !regError && !minting && !onInternet && !disconnect &&
					<Stack spacing={2}>
						<Typography variant="body1" sx={{ textAlign: 'center', color: grey[500] }}>
							{intl.formatMessage({ id: 'platform.miner.community.liveness.detail' })}
						</Typography>
					</Stack>
				}
				{
					regError &&
					<Typography variant="body1" sx={{ textAlign: 'center', color: red[700], padding: '0 0 1rem 0' }}>
						{intl.formatMessage({ id: 'platform.miner.community.liveness.sameIPError' })}
					</Typography>
				}
				{
					showSameIPError &&
					<Typography variant="body1" sx={{ textAlign: 'center', color: red[700], padding: '0 0 1rem 0' }}>
						{intl.formatMessage({ id: 'platform.miner.community.liveness.sameIPError' })}
					</Typography>
				}
				{
					showTimeOutError &&
					<Stack spacing={1}>
						<Typography variant="body1" sx={{ textAlign: 'center', color: red[700], }}>
							{intl.formatMessage({ id: 'platform.miner.community.liveness.Timeout1' })}
						</Typography>
						<Typography variant="body1" sx={{ textAlign: 'center', color: red[700] }}>
							{intl.formatMessage({ id: 'platform.miner.community.liveness.Timeout2' })}
						</Typography>
					</Stack>
				}
				{
					onInternet &&
					<Typography variant="body1" sx={{ textAlign: 'center', color: red[700], padding: '0 0 1rem 0' }}>
						{intl.formatMessage({ id: 'platform.miner.community.liveness.onInternet' })}
					</Typography>
				}
				{
					showInstanceError &&
					<Typography variant="body1" sx={{ textAlign: 'center', color: red[700], padding: '0 0 1rem 0' }}>
						{intl.formatMessage({ id: 'platform.miner.community.liveness.sameMinerError' })}
					</Typography>
				}

				<Typography variant="h5" sx={{ textAlign: 'center', color: green[500], fontWeight: '800' }}>
					{CNTP} CNTP
				</Typography>

				{
					minting ? <img src={miner2} style={{ width: '5rem' }} /> : disconnect? <img src={FancyNyanStoped} style={{ width: '5rem' }} /> : <img src={minerPause} style={{ width: '5rem' }} />
				}
				{
					(showTimeOutError || showInstanceError || showSameIPError || regError|| onInternet ) &&
					<ColorButton variant="outlined" color="error" endIcon={<ErrorIcon color="error" />} onClick={clickStart} sx={{ borderRadius: '2rem' }}>
						<Typography sx={{ fontStyle: "inherit", }}>
							{intl.formatMessage({ id: 'platform.miner.community.liveness.ErrorButton' })}
						</Typography>
					</ColorButton>
				}
				{
					!showTimeOutError && !showInstanceError && !showSameIPError && !regError && !onInternet &&
					<Stack spacing={1}>
						{
							rateProgress > 0 && minting &&
							<Stack spacing={1}>
								<Stack spacing={1} direction="row" sx={{ fontStyle: "inherit" }}>
									<Typography variant="caption" sx={{ color: green[700] }}>
										{intl.formatMessage({ id: 'platform.miner.community.liveness.onlineMiners' })}:
									</Typography>
									<Typography variant="caption" sx={{ color: '#9ccc65' }}>
										{onlineCount}
									</Typography>
									<Typography variant="caption" sx={{ color: green[700] }}>
										{intl.formatMessage({ id: 'platform.miner.community.liveness.rewordRate' })}:
									</Typography>
									<Typography variant="caption" sx={{ color: '#9ccc65' }}>
										{onlineRate}
									</Typography>

									<Typography variant="caption" sx={{ color: green[700] }}>
										{intl.formatMessage({ id: 'platform.miner.community.liveness.eachMin' })}
									</Typography>
								</Stack>

								<LinearProgress
									variant="buffer"
									value={rateProgress}
									valueBuffer={rateProgressBuffer}
									color={rateProgressColor}
								/>
							</Stack>

						}
						{
							disconnect &&
							<ColorButton variant="outlined" color="error" endIcon={<ReportGmailerrorredIcon color="error" />} onClick={clickStart} sx={{ borderRadius: '2rem' }}>
								<Typography sx={{ fontStyle: "inherit", }}>
									{intl.formatMessage({ id: 'platform.miner.community.liveness.disconnect' })}
								</Typography>
							</ColorButton>
						}
						{
							!disconnect &&
							<ButtonNext
								onClick={clickStart}
								variant="elevated"
								color='primary'
								disabled={showLoader}
								sx={{ fontFamily: 'inherit', color: '#4caf50' }}
							>
								<Typography sx={{ padding: '0 0.2rem 0rem 0rem' }}>

									{intl.formatMessage({ id: minting ? 'platform.miner.register.MinerAni.stop' : 'platform.miner.register.button' })}
								</Typography>

								{
									showLoader && <CircularProgress size={20}
										color="success"
										variant="indeterminate" />
								}

							</ButtonNext>
						}

					</Stack>


				}
				{
					minting &&
					<Typography variant="caption" sx={{ fontStyle: "inherit", color: '#9ccc65' }}>
						{intl.formatMessage({ id: 'platform.miner.community.liveness.chainDelayInfo' })}
					</Typography>
				}
			</Stack>
		</ItemStyle3>

	)

}

export default Community_liveness