import { useIntl } from "react-intl"
import { Grid, Slide, InputBase, Button, Typography, Box, Paper, Stack, TextField } from '@mui/material'
import { useEffect, useState } from "react"

import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton'
import Avatar from '@mui/material/Avatar';

import styled from './ChatPage.module.css'

import { getMessageListData } from './API/index'

import ChatWindow from './ChatWindow'

const ChatPage = () => {

  // 消息列表
  const [messageList, setMessageList] = useState([] as any[])

  // 过滤后的消息列表
  const [filterMessageList, setFilterMessageList] = useState([] as any[])

  // 搜索框的文字
  const [searchText, setSearchText] = useState('' as string)

  // 当前选中的用户
  const [currentChatUser, setCurrentChatUser] = useState({} as any)


  useEffect(() => {
    // 获取消息列表
    const fetchData = async () => {
      const list = await getMessageListData()
      setMessageList(list)
      setFilterMessageList(list)
    }
    fetchData()
  }, [])

  const handleChange = (e: string) => {
    const list = messageList.filter((item) => {
      return item.name.indexOf(e) > -1
    })
    setFilterMessageList(list)
  }

  return (
    <div className={styled.chatPage}>
      <div className={styled.left}>
        <TextField
          className={styled.searchInput}
          hiddenLabel
          id="filled-hidden-label-small"
          variant="filled"
          placeholder="搜索"
          size="small"
          fullWidth
          sx={{ fontSize: '1.2rem' }}
          onChange={async (e) => {
            await setSearchText(e.target.value)
            handleChange(e.target.value)
          }}
        />
        <List className={styled.messageList} sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {filterMessageList.map((item, index) => {
            return (
              <div key={index}>
                <ListItemButton
                  selected={item.id === currentChatUser.id}
                  onClick={() => {
                    setCurrentChatUser(item)
                  }}
                >
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={item.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.name}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {item.message}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItemButton>
                {index !== filterMessageList.length - 1 && <Divider variant="inset" component="li" />}
              </div>
            )
          })}
        </List>
      </div >
      <div className={styled.main}>
        <ChatWindow chatUser={currentChatUser}></ChatWindow>
      </div>
    </div >
  )
}

export default ChatPage