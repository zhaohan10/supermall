<template>
  <div>
    <table align="center" width="400" cellspacing="0" class="infoTable">
      <tr>
        <td class="title first">姓 名</td>
        <td>{{detail.realName}}</td>
        <td class="title">性 别</td>
        <td>{{detail.sex == 1?'男':'女'}}</td>
        <td class="title">出生年月<br />( 岁)</td>
        <td>{{detail.birthday}}<br />({{detail.age}})</td>
        <td rowspan="3" colspan="2"
          >{{detail.avatar}}</td
        >
      </tr>
      <tr>
        <td class="title">民 族</td>
        <td>{{detail.ethnic}}</td>
        <td class="title">籍 贯</td>
        <td>湖北武汉</td>
        <td class="title">出 生 地</td>
        <td>湖北武汉 </td>
      </tr>
      <tr>
        <td class="title">入党时间</td>
        <td>2000.10</td>
        <td class="title">参加工作<br />时 间</td>
        <td>2001.07</td>
        <td class="title">健康状况</td>
        <td>良好</td>
      </tr>
      <tr>
        <td class="title">专业技术<br />职 务 </td>
        <td>xxxx</td>
        <td class="title">熟悉专业<br />有何专长 </td>
        <td colspan="4"></td>
      </tr>
      <tr>
        <td class="title">熟悉何种<br />外 语</td>
        <td><el-input clearable> </el-input></td>
        <td class="title">熟悉程度</td>
        <td colspan="4"></td>
      </tr>
      <tr>
        <td class="title" rowspan="2"
          >学&nbsp;&nbsp;&nbsp;&nbsp;历<br />学&nbsp;&nbsp;&nbsp;&nbsp;位</td
        >
        <td class="title">全日制教育</td>
        <td></td>
        <td class="title">毕业院校<br />系及专业</td>
        <td colspan="3"></td>
      </tr>
      <tr>
        <td class="title">在职教育</td>
        <td></td>
        <td class="title">毕业院校<br />系及专业</td>
        <td colspan="3"></td>
      </tr>
      <tr>
        <td class="title">现工作单位<br />及职务</td>
        <td colspan="6"></td>
      </tr>
      <tr>
        <td class="title" rowspan="2">近三年年度<br />绩效考核情<br />况</td>
        <td class="title">考核年度</td>
        <td>2018</td>
        <td colspan="2">2019</td>
        <td colspan="2">2020</td>
      </tr>
      <tr>
        <td class="title">考核等级</td>
        <td></td>
        <td colspan="2"></td>
        <td colspan="2"></td>
      </tr>
      <tr>
        <td class="title">联系电话<br />手 机</td>
        <td colspan="2"></td>

        <td class="title">竞聘单位/岗位</td>
        <td colspan="3"></td>
      </tr>
      <tr>
        <td class="title" rowspan=""
          ><br />简<br /><br /><br />历<br /><br
        /></td>
        <td colspan="6"></td>
      </tr>
      <tr>
        <td class="title" rowspan=""
          ><br />奖<br />惩<br />情<br />况<br /><br
        /></td>
        <td colspan="6"></td>
      </tr>
      <tr>
        <td class="title" rowspan=""
          ><br />培<br />训<br />情<br />况<br /><br
        /></td>
        <td colspan="6"></td>
      </tr>
      <tr>
        <td rowspan="6" class="title"
          ><br />家<br />庭<br />主<br />要<br />成<br />员<br
        /></td>
        <td class="title">称谓</td>
        <td class="title">姓名</td>
        <td class="title">出生年月</td>
        <td class="title">政治面貌</td>
        <td colspan="2" class="title">工作单位及职务</td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td colspan="2"></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td colspan="2"></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td colspan="2"></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td colspan="2"></td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td colspan="2"></td>
      </tr>
      <tr>
        <td class="title" rowspan=""
          ><br />自<br />我<br />评<br />价<br /><br
        /></td>
        <td colspan="6"></td>
      </tr>
      <tr>
        <td class="title" rowspan=""
          ><br />本<br />人<br />承<br />诺<br /><br
        /></td>
        <td colspan="6" style="text-align: left"
          >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;报名表所填写的信息准确无误，所提交的证件、资料真实有效，如有弄虚作假，一经发现，视情节轻重给予相应处分。<br /><p
            style="text-align: right; padding-right: 120px"
            >报名人（签名）</p
          ><br /><p style="text-align: right; padding-right: 80px"
            >年 月 日</p
          ></td
        >
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'infoTable',
    data(){
      return{
      }
    },
    props:{
      detail:Object
    }
  };
</script>

<style scoped>
.infoTable >>> .el-input__inner{
    border: 0px;
}
  table {
    border-right: 1px solid #000000;
    border-bottom: 1px solid #000000;
    text-align: center;
    width: 100%;
  }

  table th {
    border-left: 1px solid #000000;
    border-top: 1px solid #000000;
  }

  table td {
    border-left: 1px solid #000000;
    border-top: 1px solid #000000;
    height: 50px;
  }

  .title {
    font-weight: bold;
  }
  .first {
    width: 100px;
  }
</style>
