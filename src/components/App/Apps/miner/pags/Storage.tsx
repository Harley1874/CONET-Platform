import React, {useState, useEffect} from "react"
import { useIntl } from "react-intl"
import {cntp_address} from '../../../../../API/index'
import {Grid, CircularProgress, TextField, styled as materialStyled, TableContainer, Typography, SvgIcon, Tabs, Tab,Fab,
Table, TableHead, TableRow, TableCell, TableBody, IconButton, Paper, Stack, Box, Slide, Button} from '@mui/material'
import {grey, lightGreen, blueGrey, green, red} from '@mui/material/colors'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload'
const ItemStyle2 = materialStyled(Paper)(() => ({
    textAlign: 'center',
    borderRadius: '1rem',
    padding: '1rem',
    color: grey[500]
}))


const Storage = (check: boolean,setcheck: React.Dispatch<React.SetStateAction<boolean>>) => {

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
                        bottom: (theme) => theme.spacing(2)
                    }}
                    >
                    <DriveFolderUploadIcon fontSize='large' />
                </Fab>

                
                <Typography variant="h5" sx={{ fontWeight: '900', textAlign:'center', color: grey[500]  }}>
                    {intl.formatMessage({id:'platform.joinUS.miner.storage'})}
                </Typography>

                <Typography variant="body1" sx={{ textAlign:'center', color: grey[500]}}>
                    {intl.formatMessage({id:'platform.joinUS.miner.storageDetail'})}
                </Typography>
                <Button
                    variant="outlined" 
                    disabled
                    sx={{ fontFamily:'inherit' }}
				>

                    { intl.formatMessage({id: 'platform.joinUS.forDeveloper.button'})}
                </Button>
            </ItemStyle2>

        </Grid>
    )
}
export default Storage