export async function listInfo(params) {
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
              company: '平高电气组合事业部',
              position:"副部长",
              date: '2020-05-21',
            },
            {
              id: 2,
              company: '通用电气',
              position:"科长",
              date: '2021-11-09',
            },
            {
              id: 3,
              company: '技术中心基础所',
              position:"主任工程师",
              date: '2022-05-21',
            },
            {
              id: 4,
              company: '技术中心综合部',
              position:"专员",
              date: '2022-01-31',
            },
            {
              id: 5,
              company: '平芝机械制造',
              position:"设计师",
              date: '2021-08-21',
            },
          ],
          count:5
    };
    
    }