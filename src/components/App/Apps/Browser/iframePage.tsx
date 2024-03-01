/*
 * @Author: harley
 * @Date: 2024-02-26 20:53:19
 * @LastEditors: harley
 * @Description: 
 */
import React, { useState, useContext, useEffect, useCallback, useRef } from 'react'
import ToDoContext, { Todo } from './TodoContext'
import { Button, IconButton, Input, TextField, Autocomplete } from '@mui/material';
import appStyles from "./browser.module.scss";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RefreshIcon from '@mui/icons-material/Refresh';

const IframePage = ({ currentTodo }) => {
  const todoContext = useContext(ToDoContext)
  const myIframeRef = useRef(null)
  const ariaLabel = { 'aria-label': 'description' };
  // 初次加载
  React.useEffect(() => {
  }, [])

  useEffect(() => {
    if (todoContext.currentTodo.iframe.pageUrl) {
      // 监听iframe的src变化
      myIframeRef?.current?.contentWindow
        .addEventListener('load', function () {
        })
    }
  }, [todoContext.currentTodo.iframe.pageUrl])
  useEffect(() => {
  }, [currentTodo])

  useEffect(() => {
  }, [currentTodo.searchText])

  // url自动补全https:// 
  const completionUrl = (url: string) => {
    if (url.includes('http')) return url
    return 'https://' + url
  }


  // 是否是一个url,通过前缀是否为http/https/www判断
  const isUrl = (url: string) => {
    return url.includes('http') || url.includes('https') || url.includes('www')
  }


  return (
    <div className={appStyles.tabsContainer}>
      <div className={appStyles.menubar}>
        <div className={appStyles.menubarItem}>
          <IconButton
            size="small"
            disabled={!currentTodo.iframe.routerList.length || currentTodo.iframe.routerIndex === 0}
            onClick={() => {
              // 后退
              const routerItem = currentTodo.iframe.routerList[currentTodo.iframe.routerIndex - 1]
              todoContext.changeCurrentTodo(currentTodo, { iframe: { ...currentTodo.iframe, url: routerItem, routerIndex: currentTodo.iframe.routerIndex - 1, pageUrl: routerItem }, searchText: routerItem }) // 修改iframe的url
            }}
          >
            <ArrowBackIcon fontSize="small"></ArrowBackIcon>
          </IconButton>
        </div>
        <div className={appStyles.menubarItem}>
          <IconButton
            size="small"
            disabled={!currentTodo.iframe.routerList.length || currentTodo.iframe.routerIndex === currentTodo.iframe.routerList.length - 1}
            onClick={() => {
              // 前进
              const routerItem = currentTodo.iframe.routerList[currentTodo.iframe.routerIndex + 1]
              todoContext.changeCurrentTodo(currentTodo, { iframe: { ...currentTodo.iframe, url: routerItem, routerIndex: currentTodo.iframe.routerIndex + 1, pageUrl: routerItem }, searchText: routerItem }) // 修改iframe的url
            }}
          >
            <ArrowForwardIcon fontSize="small"></ArrowForwardIcon>
          </IconButton>
        </div>
        {/* <div className={appStyles.menubarItem}>
          <IconButton
            size="small"
            onClick={() => {
              console.log('🚀  file: iframePage.tsx:108  IframePage  currentTodo:', currentTodo)
            }}
          >
            <RefreshIcon fontSize="small"></RefreshIcon>
          </IconButton>
        </div> */}
        <div className={`${appStyles.menubarItem} ${appStyles.inputItem}`}>
          <Input
            type="text"
            className={appStyles.inputBox}
            disableUnderline={true}
            value={currentTodo.searchText}
            onChange={(e, a) => {
              todoContext.changeCurrentTodo(currentTodo, { searchText: e.target.value })
            }}
            // 回车事件
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                // value是否包含www
                const value = e.target.value
                // value是否为标准的url
                if (isUrl(value)) {
                  const _value = completionUrl(value)
                  // 修改iframe的url
                  todoContext.changeCurrentTodo(currentTodo,
                    {
                      iframe: {
                        ...currentTodo.iframe, pageUrl: _value, url: _value,
                        routerList: [...currentTodo.iframe.routerList, _value],
                        routerIndex: currentTodo.iframe.routerIndex + 1,
                      },
                      searchText: _value
                    })
                  console.log('🚀  file: iframePage.tsx:108  IframePage  currentTodo:', currentTodo)
                }
              }
            }}
          />
        </div>
      </div>
      <div className={appStyles.iframeMain}>
        {todoContext.currentTodo.iframe.pageUrl &&
          <iframe
            src={todoContext.currentTodo.iframe.pageUrl}
            style={{ width: '100%', height: '100%', border: 'none' }}
            ref={myIframeRef}
          >
          </iframe>
        }
        {
          !todoContext.currentTodo.iframe.pageUrl &&
          <div className={appStyles.emptyPage}>
            <h1>空白页</h1>
          </div>
        }
      </div>
    </div>
  )
}

export default IframePage