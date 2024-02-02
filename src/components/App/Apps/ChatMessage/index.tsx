import { useIntl } from "react-intl"
import { Grid, Slide, InputBase, Button, Typography, Box, Paper, Stack } from '@mui/material'
import { useEffect, useState } from "react"
import { isValidateAddress } from './utils'

import ChatPage from "./ChatPage"



// 删除缓存
// localStorage.removeItem('message-address')
// 第一次登录时，输入钱包地址，点击登录，进入聊天室
const Login = ({ onLogin }) => {
  const intl = useIntl()
  const [loginAddress, setLoginAddress] = useState('' as string)

  const loginSend = async () => {
    // 校验钱包地址是否正确
    const flag = await isValidateAddress(loginAddress)
    if (!flag) {
      alert('钱包地址不正确')
      return
    }
    localStorage.setItem('message-address', loginAddress)
    // 是否执行
    console.log('loginSend',)
    if (onLogin) {
      console.log('执行了父组件传的方法')
      onLogin()
    }
  }
  return (
    <div>
      <Slide direction="right" in={true} mountOnEnter >
        <Typography variant="h5" sx={{ paddingBottom: '2rem' }}>
          请输入钱包地址
        </Typography>
      </Slide>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper elevation={1}>
            <InputBase
              sx={{ width: '100%', ml: 1, flex: 1, fontSize: '1rem', padding: '0.7rem 0.5rem 0.5rem 1rem' }}
              name="address"
              placeholder="请输入钱包地址"
              fullWidth
              onChange={(e) => {
                setLoginAddress(e.target.value)
              }}
            />
          </Paper>

        </Grid>
        <Grid item xs={12}>
          <Paper elevation={1}>
            <Button
              type="submit"
              fullWidth
              sx={{ fontSize: '1.2rem' }}
              onClick={() => {
                loginSend()
              }}
            >
              登录
            </Button>
          </Paper>
        </Grid>
      </Grid>

    </div>
  )
}


const ChatMessage = () => {
  // 登录态
  const [loginStatus, setLoginStatus] = useState(false)
  const intl = useIntl()
  useEffect(() => {
    const address = localStorage.getItem('message-address')
    if (address) {
      setLoginStatus(true)
    }
  }, [])
  return (
    <div style={{ width: '100%', height: '100%' }}>
      {
        loginStatus ? <ChatPage /> : <Login onLogin={() => {
          setLoginStatus(true)
        }} />
      }
    </div>
  )
}

export default ChatMessage