import React, {useState, useEffect} from "react"
import { useIntl } from "react-intl"
import {} from '../../../../../API/index'
import {Grid, CircularProgress, TextField, styled as materialStyled, TableContainer, Button, Typography, SvgIcon, Tabs, Tab,
Table, TableHead, TableRow, TableCell, TableBody, IconButton, Paper, Stack, Box, Slide, Fab, Link} from '@mui/material'
import styledCom from "styled-components"
import {grey, lightGreen, blueGrey, green, red} from '@mui/material/colors'

import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing'

const ItemStyle2 = materialStyled(Paper)(() => ({
    textAlign: 'center',
    borderRadius: '1rem',
    padding: '1rem',
    color: grey[500]
}))

const Bandwidth = ( check: boolean, setcheck: React.Dispatch<React.SetStateAction<boolean>>) => {

    const intl = useIntl()
    
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
                    <CallMissedOutgoingIcon fontSize='large' />
                </Fab>

                <Typography variant="h5" sx={{ fontWeight: '900', textAlign:'center'}}>
                    {intl.formatMessage({id:'platform.joinUS.miner.Bandwidth'})}
                </Typography>
                <Typography variant="h6" sx={{ textAlign:'center', }}>
                    {intl.formatMessage({id:'platform.joinUS.miner.BandwidthDetail'})}
                </Typography>
                
                <Button
                    variant="outlined" size="large"
                    disabled
                    sx={{fontFamily:'inherit'}}>

                        { intl.formatMessage({id: 'platform.joinUS.forDeveloper.button'})}
                </Button>
            </ItemStyle2>
        </Grid>
        
    )
}
export default Bandwidth