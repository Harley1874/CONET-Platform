
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@mui/material';
import {
  Navbar,
  Page,
  Messages,
  MessagesTitle,
  Message,
  Messagebar,
  Link,
  MessagebarAttachments,
  MessagebarAttachment,
  MessagebarSheet,
  MessagebarSheetImage,
  f7ready,
  f7,
  App,
} from 'framework7-react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';

// import 'framework7/css/bundle' // Bundle CSS

import './lib/framework7/framework7-bundle.css';
import Framework7 from 'framework7/lite-bundle';
import Framework7React from 'framework7-react';

// 初始化Framework7
Framework7.use(Framework7React);

import { getChatInfoListData } from './API/index'

export default ({ chatUser }) => {

  const [messagesData, setMessagesData] = useState([]);

  // 当前聊天窗口是否打开
  const [isChatWindowOpen, setIsChatWindowOpen] = useState(false)

  useEffect(() => {
    // 如果chatUser对象中存在数据
    if (Object.keys(chatUser).length === 0) {
      setIsChatWindowOpen(false)
      return
    }
    setIsChatWindowOpen(true)
    setMessagesData([])
    setMessagebarValue('')
    // 获取聊天记录
    const fetchData = async () => {
      const list = await getChatInfoListData()
      setMessagesData(list)
    }
    fetchData()
  }, [chatUser])


  // 消息栏内容
  const [messagebarValue, setMessagebarValue] = useState('');

  // 发送消息
  const submitMessage = (message) => {
    if (!message || message.length === 0) return;
    const newMessagesData = [
      ...messagesData,
      {
        text: message,
        type: 'sent',
      },
    ];
    setMessagesData(newMessagesData);
    setMessagebarValue('');
  };


  const isFirstMessage = (message, index) => {
    const previousMessage = messagesData[index - 1];
    if (message.isTitle) return false;
    if (
      !previousMessage ||
      previousMessage.type !== message.type ||
      previousMessage.name !== message.name
    )
      return true;
    return false;
  };
  const isLastMessage = (message, index) => {
    const nextMessage = messagesData[index + 1];
    if (message.isTitle) return false;
    if (!nextMessage || nextMessage.type !== message.type || nextMessage.name !== message.name)
      return true;
    return false;
  };
  const isTailMessage = (message, index) => {
    const nextMessage = messagesData[index + 1];
    if (message.isTitle) return false;
    if (!nextMessage || nextMessage.type !== message.type || nextMessage.name !== message.name)
      return true;
    return false;
  };


  const renderPage = () => {
    return (
      <Page>
        {/* 头部 */}
        <Navbar title={chatUser.name}></Navbar>

        {/* 内容区域 */}
        <Messages>
          <MessagesTitle></MessagesTitle>
          {messagesData.map((message, index) => (
            <Message
              key={index}
              type={message.type}
              image={message.image}
              name={message.name}
              avatar={message.avatar}
              first={isFirstMessage(message, index)}
              last={isLastMessage(message, index)}
              tail={isTailMessage(message, index)}
            >
              {message.text && (
                <span slot="text" dangerouslySetInnerHTML={{ __html: message.text }} />
              )}
            </Message>
          ))}
        </Messages>

        <Messagebar
          placeholder={`请输入`}
          sheetVisible={false}
          attachmentsVisible={false}
          value={messagebarValue}
          onInput={(e) => {
            setMessagebarValue(e.target.value);
          }}
        >

          <Button
            variant={messagebarValue?.length > 0 ? 'contained' : 'outlined'}
            onClick={() => {
              submitMessage(messagebarValue)
            }}
          >
            <SendIcon></SendIcon>
          </Button>
        </Messagebar>
      </Page >
    );
  };

  return (
    <App>
      {
        isChatWindowOpen && renderPage()
      }
    </App>
  );
};