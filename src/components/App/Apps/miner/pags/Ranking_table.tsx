import React, { useState, useEffect } from "react"
import { useIntl } from "react-intl"
import { Grid } from "react-loader-spinner"
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Typography, Stack, Paper } from '@mui/material'

const Ranking_table = () => {

  const intl = useIntl()
  // 表格排名数据
  const [rankData, setRankData] = useState([])

  useEffect(() => {
    const fetchData = () => {
      const data = []
      for (let i = 0; i < 100; i++) {
        const obj = {
          rank: i,
          name: 'ADDR ' + i,
          invitedBy: 'POINTS ' + i
        }
        data.push(obj)
      }
      setRankData(data)
    }
    fetchData()
  }, [])

  // 表头基础样式
  const tableHeaderStyle = {
    '--md-palette-background-default': "transparent",
    'backdropFilter': 'saturate(50%) blur(4px)',
  }

  return (
    <Stack spacing={1} justifyContent="center" alignItems="center" sx={{ width: '100%', padding: '1rem 0 0 0' }}>
      <Paper sx={{ width: '100%', padding: '1rem' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader >
            <TableHead>
              <TableRow>
                <TableCell sx={{ ...tableHeaderStyle, 'textAlign': 'left' }}>
                  {intl.formatMessage({ id: 'platform.miner.register.rank.table.title1' })}
                </TableCell>
                <TableCell sx={{ ...tableHeaderStyle, 'textAlign': 'center' }}>
                  {intl.formatMessage({ id: 'platform.miner.register.rank.table.walletAddr' })}
                </TableCell>
                <TableCell sx={{ ...tableHeaderStyle, 'textAlign': 'center' }}>
                  {intl.formatMessage({ id: 'platform.miner.register.rank.table.points' })}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                rankData.map(n => (
                  <TableRow key={n.rank}>
                    <TableCell> {n.rank} </TableCell>
                    <TableCell align="center"> {n.name} </TableCell>
                    <TableCell align="center"> {n.invitedBy} </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Stack>


  )
}

export default Ranking_table