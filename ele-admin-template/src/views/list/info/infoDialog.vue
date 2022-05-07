<template>
  <el-dialog
    :visible.sync="isInfoShow.value"
    width="70%"
    center
    :close="handleClose"
  >
    <el-card>
      <br />
      <h1 class="title">关于{{ infoDetail.company }}部分岗位公开竞聘的通知</h1>
      <br />

      <div class="text-content">
        <p>集团各部门、各单位：</p>
        <p
          >为深化集团内部人力资源市场建设，进一步优化人员队伍结构，根据工作安排，组织开展
          {{ infoDetail.company }} 单位部分岗位公开竞聘，具体如下：</p
        >
        <p>一、竞聘岗位</p>
        <p
          >本次{{ infoDetail.company }}单位竞转岗位{{
            infoDetail.jobItems
          }}个，人员需求{{
            infoDetail.totalNumber
          }}人，相应岗位及任职资格条件详见附件1。</p
        >
        <p>二、竞聘程序</p>
        <p>
          （一）应聘报名，集团在册在岗员工根据公开竞聘岗位和任职资格条件自愿申报，于{{
            infoDetail.deadline
          }}前持《竞聘报名表》（见附件
          2．纸质版正反面打印）及学历学位证、专业技术资格证、身份证等相关证明材料原件、复印件（1份）到集团组织部（人资部）报名。
        </p>
        <p
          >（二）资格审查，集团组织部（人资部）会同招聘单位按照报名条件对应转人员资格进行审查，筛选出符合竞聘条件人选.</p
        >
        <p
          >（三）竞聘考评。集团组织部（人资部）会同招聘单位从专业素养、工作能力、综合素质等方面对应聘人选进行工作业绩评价和岗位胜任能力测评。</p
        >
        <p
          >（四）确定人选。依据竞聘考评成绩，经组织考察合格后，择优确定拟聘人选，履行报批程序，并公示5个工作日。</p
        >
        <p
          >（五）岗位聘用，办理人员聘用手续，组织上岗培训。考核合格后上岗。本次岗位竞聘须进行试岗。</p
        >
        <p>1．试岗期6个月。</p>
        <p
          >2．试用期内，员工人事、工资关系转至试岗单位，绩效由试岗单位考核评价。</p
        >
        <p>3．试肉期满考核评价不合格者，退回原单位。</p>
        <p>三、相关要求</p>
        <p>
          参与岗位竞转人员按照竞转程序要求，认真填写报名表，确保填写的信息准确无误，所提交的相关材料真实有效。若有弄虚作假，视情节轻重给于相关责任人纪律处分。
        </p>
        <br />
        <p>联系人：李秀娟</p>
        <p>联系电话：3803887</p><br />
        <a :href="`${downloadUrl}/static/任职资格.docx`">附件1：任职资格</a>
        <a :href="`${downloadUrl}/static/报名表.docx`">附件2：报名表</a><br />
        <p style="text-indent: 420px">党委组织部（人力资源部）</p>
        <p style="text-indent: 420px">{{ infoDetail.date }}</p>
        <br /><br /><br /></div
    ></el-card>
  </el-dialog>
</template>

<script>
  export default {
    name: 'infoDialog',
    props: {
      isInfoShow: Object,
      infoDetail: Object
    },
    data() {
      return {
        downloadUrl: '../' //下载文件地址
      };
    },

    method: {
      handleClose() {
        this.isInfoShow.value = false;
      },
    }
  };
</script>
<style scoped>
  .el-card {
    padding: 10px 100px;
  }
  .title {
    text-align: center;
  }
  .text-content,
  p {
    	font-family: "仿宋";
    font-size: 20px;
    text-indent: 40px;
    /*段落首行缩进，text-indent的值为font-size的2倍，相当于缩进2个汉字*/
    line-height: 40px;
    /*line-height的值为font-size的1.5倍，即1.5倍行距，使用line-height: 1.5效果相同;*/
    text-align: justify;
    /*左右对齐*/
    font-weight: 600;
  }
  a {
    color: blue;
    text-decoration: underline;
    display: block;
  }
</style>
