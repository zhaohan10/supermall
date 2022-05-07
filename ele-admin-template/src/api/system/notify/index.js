import axios from '@/utils/request';

/**
 * 分页查询竞聘通知
 * @param params 查询条件
 */
export async function pageInfo(params) {
//   const res = await axios.get('/system/notify/info/page', {
//     params
//   });
//   if (res.data.code === 0) {
//     console.log(res.data.data);
//     return res.data.data;
//   }
//   return Promise.reject(new Error(res.data.message));
return {
    list:[
        {
          id: 1,
          title: '关于平高电气部分岗位公开竞聘的通知',
          date: '2020-05-21',
          status:0,
          name: '王小虎'
        },
        {
          id: 2,
          title: '关于技术中心部分岗位公开竞聘的通知',
          status:1,
          date: '2021-03-05',
          name: '王小虎'
        },
        {
          id: 3,
          title: '关于平高东芝部分岗位公开竞聘的通知',
          status:1,
          date: '2022-01-21',
          name: '王小虎'
        },
        {
          id: 4,
          title: '关于平高威海部分岗位公开竞聘的通知',
          status:1,
          date: '2020-07-21',
          name: '王小虎'
        },
        {
          id: 5,
          title: '关于通用电气部分岗位公开竞聘的通知',
          status:0,
          date: '2020-05-21',
          name: '王小虎'
        },
        {
          id: 6,
          title: '关于平高电气部分岗位公开竞聘的通知',
          status:0,
          date: '2020-09-21',
          name: '王小虎'
        },
        {
          id: 7,
          title: '关于平高电气部分岗位公开竞聘的通知',
          status:1,
          date: '2020-11-21',
          name: '王小虎'
        },
        {
          id: 8,
          title: '关于平高电气部分岗位公开竞聘的通知',
          status:1,
          date: '2015-03-21',
          name: '王小虎'
        },
        {
          id: 9,
          title: '关于平高电气部分岗位公开竞聘的通知',
          status:0,
          date: '2022-11-21',
          name: '王小虎'
        },
        {
          id: 10,
          title: '关于平高电气部分岗位公开竞聘的通知',
          status:0,
          date: '2020-11-21',
          name: '王小虎'
        },
        {
          id: 11,
          title: '关于平高电气部分岗位公开竞聘的通知',
          status:1,
          date: '2015-01-21',
          name: '王小虎'
        },
        {
          id: 12,
          title: '关于平高电气部分岗位公开竞聘的通知',
          status:0,
          date: '2021-11-21',
          name: '王大虎'
        }
      ],
      count:12
};

}

/**
 * 根据查询竞聘公告
 */
export async function getInfoList() {
  data = [
    {
      id: 1,
      message: 'message1',
      company: '平高电气组合事业部',
      jobItems: 4,
      totalNumber: 13,
      deadline: '2020-07-20',
      date: '2019-11-21'
    },
    {
      id: 2,
      message: 'message2',
      company: '技术中心',
      jobItems: 5,
      totalNumber: 17,
      deadline: '2020-12-20',
      date: '20120-11-21'
    },
    {
      id: 3,
      message: 'message3',
      company: '平高东芝',
      jobItems: 1,
      totalNumber: 2,
      deadline: '2020-01-01',
      date: '2019-11-21'
    },
    {
      id: 4,
      message: 'message4',
      company: '平高威海',
      jobItems: 2,
      totalNumber: 6,
      deadline: '2020-05-20',
      date: '2020-04-21'
    },
    {
      id: 5,
      message: 'message',
      company: '通用电气',
      jobItems: 3,
      totalNumber: 7,
      deadline: '2022-12-20',
      date: '2022-11-21'
    },
    {
      id: 6,
      message: 'message6',
      company: '平高电气生产物资部',
      jobItems: 8,
      totalNumber: 17,
      deadline: '2017-12-20',
      date: '2017-11-21'
    },
    {
      id: 7,
      message: 'message7',
      company: '平高电气组合事业部',
      jobItems: 4,
      totalNumber: 13,
      deadline: '2020-07-20',
      date: '2019-11-21'
    },
    {
      id: 8,
      message: 'message8',
      company: '平高电气组合事业部',
      jobItems: 4,
      totalNumber: 13,
      deadline: '2020-07-20',
      date: '2019-11-21'
    },
    {
      id: 9,
      message: 'message9',
      company: '平高电气组合事业部',
      jobItems: 4,
      totalNumber: 13,
      deadline: '2020-07-20',
      date: '2019-11-21'
    },
    {
      id: 10,
      message: 'message10',
      company: '平高电气组合事业部',
      jobItems: 4,
      totalNumber: 13,
      deadline: '2020-07-20',
      date: '2019-11-21'
    },
    {
      id: 11,
      message: 'message11',
      company: '平高电气组合事业部',
      jobItems: 4,
      totalNumber: 13,
      deadline: '2020-07-20',
      date: '2019-11-21'
    },
    {
      id: 12,
      message: 'message12',
      company: '平高电气组合事业部',
      jobItems: 4,
      totalNumber: 13,
      deadline: '2020-07-20',
      date: '2019-11-21'
    }
  ];
  return data;
}

// 结果公示表格
export async function pagePub(params) {
  //   const res = await axios.get('/system/notify/info/page', {
  //     params
  //   });
  //   if (res.data.code === 0) {
  //     console.log(res.data.data);
  //     return res.data.data;
  //   }
  //   return Promise.reject(new Error(res.data.message));
  return {
      list:[
        {
          id: 1,
          title: '关于平高电气部分岗位拟录用情况的通知',
          status:1,
          date: '2020-05-21',
          name: '王小虎'
        },
        {
          id: 2,
          title: '关于技术中心部分岗位拟录用情况的通知',
          status:0,
          date: '2021-03-05',
          name: '王小虎'
        },
        {
          id: 3,
          title: '关于平高东芝部分岗位拟录用情况的通知',
          status:1,
          date: '2022-01-21',
          name: '王小虎'
        },
        {
          id: 4,
          title: '关于平高威海部分岗位拟录用情况的通知',
          status:1,
          date: '2020-07-21',
          name: '王小虎'
        },
        {
          id: 5,
          title: '关于通用电气部分岗位拟录用情况的通知',
          status:0,
          date: '2020-05-21',
          name: '王小虎'
        },
        {
          id: 6,
          title: '关于平高电气部分岗位拟录用情况的通知',
          status:0,
          date: '2020-09-21',
          name: '王小虎'
        },
        {
          id: 7,
          title: '关于平高电气部分岗位拟录用情况的通知',
          status:0,
          date: '2020-11-21',
          name: '王小虎'
        },
        {
          id: 8,
          title: '关于平高电气部分岗位拟录用情况的通知',
          status:0,
          date: '2015-03-21',
          name: '王小虎'
        },
        {
          id: 9,
          title: '关于平高电气部分岗位拟录用情况的通知',
          status:1,
          date: '2022-11-21',
          name: '王小虎'
        },
        {
          id: 10,
          title: '关于平高电气部分岗位拟录用情况的通知',
          status:0,
          date: '2020-11-21',
          name: '王小虎'
        },
        {
          id: 11,
          title: '关于平高电气部分岗位拟录用情况的通知',
          status:0,
          date: '2015-01-21',
          name: '王小虎'
        },
        {
          id: 12,
          title: '关于平高电气部分岗位拟录用情况的通知',
          status:1,
          date: '2021-11-21',
          name: '王大虎'
        }
      ],
        count:12
  };
  
  }

// 查询公示信息列表
export async function getPubList() {
 return 1;
}