import React, {useState, useEffect} from "react"
import { useIntl } from "react-intl"
import {cntp_address} from '../../../../../API/index'
import {Grid, CircularProgress, TextField, styled as materialStyled, TableContainer, Typography, SvgIcon, Tabs, Tab,
Table, TableHead, TableRow, TableCell, TableBody, IconButton, Paper, Stack, Box, Slide, Button} from '@mui/material'
import styledCom from "styled-components"
import boostImg from '../assets/boost.gif'
import {grey, lightGreen, blueGrey, green, red} from '@mui/material/colors'

const BoostImg = styledCom.img`
    width: 7rem;
`

const Boost = (CONET_balance: number, setBoost: React.Dispatch<React.SetStateAction<boolean>>) => {
    const intl = useIntl()
    return (

        <Grid item >
            <Box sx={{paddingTop: '4rem'}}>

                
                <Paper sx={{ borderRadius: '1rem'}}>
                    
                    <Grid container spacing={4} >
                        <Grid item xs={4} sx={{ textAlign: 'center'}}>
                            <BoostImg src={boostImg}/>
                        </Grid>
                        <Grid item xs={8} sx={{ textAlign: 'left'}}>
                            <Typography variant="h5" sx={{ fontWeight: '900', color: CONET_balance > 1000 ? 'black': grey[400] }}>
                                {intl.formatMessage({id: 'platform.miner.register.boost'})}
                            </Typography>
                            <Typography variant="h6" sx={{paddingBottom: '1rem', color: CONET_balance > 1000 ? 'black': grey[400] }}>
                                {intl.formatMessage({id: 'platform.miner.register.boost.detail'})}
                            </Typography>
                            <Button

                                variant="outlined"
                                disabled
                                sx={{fontFamily:'inherit', margin: '2rem' }}>
                                    { intl.formatMessage({id: 'platform.joinUS.forDeveloper.button'})}
                            </Button>
                            
                        </Grid>
                    </Grid>
                </Paper>
                
            </Box>
        </Grid>
    )
}

export default Boost
