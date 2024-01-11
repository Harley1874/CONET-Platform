import React, {useState, useEffect} from "react"
import { useIntl } from "react-intl"
import {cntp_address} from '../../../../../API/index'
import {Grid, CircularProgress, TextField, styled as materialStyled, TableContainer, Typography, SvgIcon, Tabs, Tab,Fab,
Table, TableHead, TableRow, TableCell, TableBody, IconButton, Paper, Stack, Box, Slide, Button} from '@mui/material'
import {grey, lightGreen, blueGrey, green, red} from '@mui/material/colors'
import DnsIcon from '@mui/icons-material/Dns'

const ItemStyle2 = materialStyled(Paper)(() => ({
    textAlign: 'center',
    borderRadius: '1rem',
    padding: '1rem',
    color: grey[500]
}))

const SaaS = (check: boolean,setcheck: React.Dispatch<React.SetStateAction<boolean>>) => {

    const intl = useIntl()
    return (
        <Grid item>
            <ItemStyle2>
                <Fab
                    size='large'
                    color='success'
                    sx={{
                        fontSize: '3rem',
                        top: (theme) => theme.spacing(-5),
                        bottom: (theme) => theme.spacing(2),
                    }}
                    >
                    <DnsIcon fontSize='large' />
                </Fab>

                <Typography variant="h5" sx={{ fontWeight: '900', textAlign:'center', color: grey[500] }}>
                    {intl.formatMessage({id:'platform.joinUS.miner.SaaS'})}
                </Typography>
                <Typography variant="h6" sx={{  textAlign:'center', color: grey[500]}}>
                    {intl.formatMessage({id:'platform.joinUS.miner.SaaSDetail'})}
                    
                </Typography>
                <Button

                    variant="outlined" size="large"
                    disabled
                    sx={{fontFamily:'inherit' }}>

                        { intl.formatMessage({id: 'platform.joinUS.forDeveloper.button'})}
                </Button>
            </ItemStyle2>

        </Grid>
    )
}

export default SaaS