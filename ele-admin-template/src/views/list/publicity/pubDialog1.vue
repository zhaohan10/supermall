<template>
  <el-dialog
    :visible.sync="isPubShow.value"
    width="70%"
    center
    :close="handleClose"
  >
    <el-card>
      <br />
      <h2 style="color: red; font-size: 40px; text-align: center"
        >XXXXXX公司文件</h2
      ><br />
      <p style="text-align: center">XX［2022］XX号</p><br />
      <p style="text-align: center">
        集团分管领导：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        单位负责人：</p
      >
      <el-divider style="background: red"></el-divider>
      <h3 style="font-weight: bold; text-align: center"
        >关于XX单位部分岗位公开<br />竞聘情况的汇报</h3
      ><br />
      <div class="text-content">
        <p style="text-align: left"> 组织部（人资部）：</p>
        <p
          >为加强平高集团XX公司（以下简称“XXXX”）员工队伍建设，根据集团人力资源管理工作指导思想及相关规定，结合XX单位实际，在集团范围内开展部分岗位公开竞聘，现将竞聘情况汇报如下：</p
        >
        <p style="font-weight: bold">一、方案公布</p>
        <p
          >组织部（人资部）于XX年XX月XX日在协同办公发布竞聘公告，公布竞聘岗位、任职条件、报名办法、竞聘程序等内容，共包含XX个部门XX个岗位，需求XX人。</p
        >
        <p style="font-weight: bold">二、资格审查</p>
        <p
          >根据实际报名情况，经过对竞聘者资格条件等进行了核查筛选，共XX个部门XX个岗位XX人符合竞聘条件（原报名人数为XX人）</p
        >
        <p style="font-weight: bold">三、综合测评</p>
        <p
          >经组织部（人资部）同意，于XX年XX月XX日开展综合测评，综合测评采用面试答辩的方式，由竞聘人员介绍个人工作经历、德才表现和做好竞争职位工作的思路、工作措施等，并就评委会提出的问题现场进行等辩，评委会对竞聘人员进行现场评分，共XX位竞聘人员参加测评。
        </p>
        <p style="font-weight: bold">四、拟录用情况</p>
        <p
          >根据综合测评结果，结合各部门“三定”情况和人员需求情况，拟录用XX个岗位XX人（详见附件）</p
        ><br />
        <p style="text-indent: 420px">XX单位</p>
        <p style="text-indent: 420px">XX年XX月X日</p>
        <br /><br /><br
      /></div>
      <template>
        <el-table
          :data="tableData"
          border
          show-summary
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column
            type="index"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column label="部门/岗位" width="220"> </el-table-column>
          <el-table-column label="需求人数" width="50"> </el-table-column>
          <el-table-column label="参加面试人数" width="70"> </el-table-column>
          <el-table-column label="拟录用人数" width="70"> </el-table-column>
          <el-table-column label="备注" width="90"> </el-table-column>
        </el-table>
      </template>
    </el-card>
  </el-dialog>
</template>

<script>
  export default {
    name: 'infoDialog',
    props: {
      isPubShow: Object,
      pubDetail: Object
    },
    data() {
      return {
        downloadUrl: '../', //下载文件地址
        tableData: []
      };
    },

    method: {
      handleClose() {
        this.isPubShow.value = false;
      },
      // arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      //   if (rowIndex % 2 === 0) {
      //     if (columnIndex === 0) {
      //       return [1, 2];
      //     } else if (columnIndex === 1) {
      //       return [0, 0];
      //     }
      //   }
      // }
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
  .el-divider {
    background: var(--color-danger-7) !important;
    margin: 10px 0;
  }

  .text-content,
  p {
    font-family: '仿宋';
    font-size: 20px;
    text-indent: 40px;
    /*段落首行缩进，text-indent的值为font-size的2倍，相当于缩进2个汉字*/
    line-height: 40px;
    /*line-height的值为font-size的1.5倍，即1.5倍行距，使用line-height: 1.5效果相同;*/
    text-align: justify;
    /*左右对齐*/
    font-weight: 600;
  }
</style>
