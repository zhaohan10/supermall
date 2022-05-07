<template>
  <el-dialog
    :visible.sync="isPubShow.value"
    width="70%"
    center
    :close="handleClose"
  >
    <el-card>
      <br />
      <h1 class="title">关于对xx部分岗位公开竞聘<br>拟录用情况公示的通知</h1>
      <br /><br>

      <div class="text-content">
        <p>按照公开竞聘程序，现对xx部分岗位公开竞聘拟录用情况进行公示，具体如下：</p>
        
        <table class="table1">
          <tbody style="text-align:center">
            <tr>
              <td>序号</td>
              <td>单位</td>
              <td>姓名</td>
              <td>拟录用岗位</td>
            </tr>
            <tr>
              <td>1</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td>2</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td>3</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          </tbody>
        </table>
        <p
          >公示期限：</p
        >
        <p
          >为广泛听取广大员工意见，加强对竞聘工作的监督，在公示期间，可采用书面或口头等多种形式向平高集团有限公司人力资源部反映有关情况。</p
        >
        <p
          >公示电话：0375-3803887,13937543224。</p
        >
        <p
          >公示邮箱：pinggaorenzi@163.com</p
        >
        <p>通讯地址：平顶山市湛河区和顺路22号，邮编：467000。</p>
        <p style="text-indent: 320">平高集团有限公司人力资源部</p>
        <p style="text-indent: 320">XX年XX月X日</p>
        <br /><br /><br /><br /><br />
                <table class="table2">
          <tbody style="text-align:center">
            <tr>
              <td>发布部门</td>
              <td>党委组织部(人力资源部)</td>
              <td>发布时间</td>
              <td>&nbsp;&nbsp;</td>
            </tr>
          </tbody>
                </table>

        </div
    ></el-card>
  </el-dialog>
</template>

<script>
  export default {
    name: 'pubDialog',
    props: {
      isPubShow: Object,
      pubDetail: Object
    },
    data() {
      return {
      };
    },

    method: {
      handleClose() {
        this.isPubShow.value = false;
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
    font-size: 26px;
    text-indent: 52px;
    /*段落首行缩进，text-indent的值为font-size的2倍，相当于缩进2个汉字*/
    line-height: 52px;
    /*line-height的值为font-size的1.5倍，即1.5倍行距，使用line-height: 1.5效果相同;*/
    text-align: justify;
    /*左右对齐*/
    font-weight: 600;
  }
    .table1 {
    border-right: 1px solid #000000;
    border-bottom: 1px solid #000000;
    text-align: center;
    margin:auto;
    width: 70%;
  }

  .table1 th {
    border-left: 1px solid #000000;
    border-top: 1px solid #000000;
  }

  .table1 td {
    border-left: 1px solid #000000;
    border-top: 1px solid #000000;
    height: 50px;
  }
  .title {
    font-weight: bold;
  }
      .table2 {
    border-right: 0.5px solid #000000;
    border-bottom: 0.5px solid #000000;
    text-align: center;
    margin:auto;
    width: 70%;
  }

  .table2 th {
    border-left: 0.5px solid #000000;
    border-top: 0.5px solid #000000;
  }

  .table2 td {
    border-left: 0.5px solid #000000;
    border-top: 0.5px solid #000000;
    height: 50px;
  }
</style>
