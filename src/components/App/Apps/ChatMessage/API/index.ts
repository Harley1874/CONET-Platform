export const getMessageListData = () => {
  const list = [
    {
      address: '0x1234567890123456789012345678901234567890',
      message: 'hello world',
      time: '2021-10-10 10:10:10',
      name: '张三',
      avatar: 'https://mui.com/static/images/avatar/1.jpg',
      id: '1',
    },
    {
      address: '0x1234567890123456789012345678901234567890',
      message: 'hello world',
      time: '2021-10-10 10:10:10',
      name: '李四',
      avatar: 'https://mui.com/static/images/avatar/2.jpg',
      id: '2',
    },
    {
      address: '0x1234567890123456789012345678901234567890',
      message: 'hello world',
      time: '2021-10-10 10:10:10',
      name: '王五',
      avatar: 'https://mui.com/static/images/avatar/3.jpg',
      id: '3',
    },
    {
      address: '0x1234567890123456789012345678901234567890',
      message: 'hello world',
      time: '2021-10-10 10:10:10',
      name: '赵六',
      avatar: 'https://mui.com/static/images/avatar/4.jpg',
      id: '4',
    },
    {
      address: '0x1234567890123456789012345678901234567890',
      message: 'hello world',
      time: '2021-10-10 10:10:10',
      name: '张三',
      avatar: 'https://mui.com/static/images/avatar/1.jpg',
      id: '5',
    },
    {
      address: '0x1234567890123456789012345678901234567890',
      message: 'hello world',
      time: '2021-10-10 10:10:10',
      name: '李四',
      avatar: 'https://mui.com/static/images/avatar/2.jpg',
      id: '6',
    },
    {
      address: '0x1234567890123456789012345678901234567890',
      message: 'hello world',
      time: '2021-10-10 10:10:10',
      name: '王五',
      avatar: 'https://mui.com/static/images/avatar/3.jpg',
      id: '7',
    },
    {
      address: '0x1234567890123456789012345678901234567890',
      message: 'hello world',
      time: '2021-10-10 10:10:10',
      name: '赵六',
      avatar: 'https://mui.com/static/images/avatar/4.jpg',
      id: '8',
    },
    {
      address: '0x1234567890123456789012345678901234567890',
      message: 'hello world',
      time: '2021-10-10 10:10:10',
      name: '张三',
      avatar: 'https://mui.com/static/images/avatar/1.jpg',
      id: '9',
    },
    {
      address: '0x1234567890123456789012345678901234567890',
      message: 'hello world',
      time: '2021-10-10 10:10:10',
      name: '赵六',
      avatar: 'https://mui.com/static/images/avatar/4.jpg',
      id: '10',
    },
    {
      address: '0x1234567890123456789012345678901234567890',
      message: 'hello world',
      time: '2021-10-10 10:10:10',
      name: '张三',
      avatar: 'https://mui.com/static/images/avatar/1.jpg',
      id: '11',
    },
    {
      address: '0x1234567890123456789012345678901234567890',
      message: 'hello world',
      time: '2021-10-10 10:10:10',
      name: '李四',
      avatar: 'https://mui.com/static/images/avatar/2.jpg',
      id: '12',
    },
    {
      address: '0x1234567890123456789012345678901234567890',
      message: 'hello world',
      time: '2021-10-10 10:10:10',
      name: '王五',
      avatar: 'https://mui.com/static/images/avatar/3.jpg',
      id: '13',
    },
    {
      address: '0x1234567890123456789012345678901234567890',
      message: 'hello world',
      time: '2021-10-10 10:10:10',
      name: '赵六',
      avatar: 'https://mui.com/static/images/avatar/4.jpg',
      id: '14',
    },
    {
      address: '0x1234567890123456789012345678901234567890',
      message: 'hello world',
      time: '2021-10-10 10:10:10',
      name: '张三',
      avatar: 'https://mui.com/static/images/avatar/1.jpg',
      id: '15',
    },
  ];

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(list);
    }, 300);
  });
};

export const getChatInfoListData = () => {
  const list = [
    {
      type: 'sent',
      text: 'Hi, Kate',
    },
    {
      type: 'received',
      text: 'Hi, John',
      avatar: 'https://mui.com/static/images/avatar/1.jpg',
      name: 'Kate',
    },
    {
      type: 'sent',
      text: 'How are you?',
    },
    {
      type: 'received',
      text: "I'm fine, thanks",
      avatar: 'https://mui.com/static/images/avatar/1.jpg',
      name: 'Kate',
    },
    {
      type: 'sent',
      text: 'Where are you from?',
    },
    {
      type: 'received',
      text: 'I am from London',
      avatar: 'https://mui.com/static/images/avatar/1.jpg',
      name: 'Kate',
    },
    {
      type: 'sent',
      text: 'Where do you work?',
    },
    {
      type: 'received',
      text: 'I work in a bank',
      avatar: 'https://mui.com/static/images/avatar/1.jpg',
      name: 'Kate',
    },
    {
      type: 'sent',
      text: 'Ok, good',
    },
  ];

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(list);
    }, 300);
  });
};
