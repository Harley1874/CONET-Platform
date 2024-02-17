import Grid from '@mui/material/Grid'
import Slide from '@mui/material/Slide'
import {HTMLAttributes, useState, useEffect, SyntheticEvent, ReactNode, useMemo, useRef} from "react"
import Typography from '@mui/material/Typography'
import {platform,profile} from '../../../../API/platform'

const TestPage = (platform: platform, authorizationkey: string) => {

	// 
	// const conetToken = currentProfile().tokens.conet

	const [SRP, SetSRP] = useState('')
	const [profiles, setpProfiles] = useState<profile[]>()
	useEffect(() => {
		const fetchData = async () => {
			if (!active) {
				return
			}
			//		Passcode success
			const _SRP = await platform.showSRP (authorizationkey)
			SetSRP(_SRP)
			const _profiles = await platform.getAllProfiles(authorizationkey)
			console.log (_profiles)
			setpProfiles (_profiles)
		}

		let active = true
		fetchData()
		return () => { active = false }
	}, [])


	return (

		<Grid container spacing={2} direction="column" sx={{ padding: '1rem 0 10rem 0' }}>
			<Grid item sx={{}} >

					<Typography variant="h4" sx={{ fontWeight: '600' }}>
						TEST PAGE
					</Typography>
					
			</Grid>
			<Grid item sx={{}} >

					<Typography variant="body1" sx={{ fontWeight: '600' }}>
						SRP = {SRP}
					</Typography>
					
			</Grid>

		</Grid>

	)
}

export default TestPage