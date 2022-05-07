<template>
  <div>
    <el-container>

      <el-main>
        <div class="main">
          <div class="information">
            <div
              class="information_title"
              style="position: relative; text-align: center"
            >
              <img
                src="@/assets/公告栏.png"
                alt=""
                style="display: block; float: left"
              />
              <h3 style="float: left">竞聘公告</h3>
              <el-button
                type="text"
                @click="showMoreInfo"
                style="color: blue; display: block; float: right"
                ><i class="el-icon-plus"></i>查看更多&nbsp;</el-button
              >
            </div>
            <div style="clear: both"></div>
            <el-card>
              <el-table
                :data="newTableData1"
                style="width: 100% ;height=450"
                :default-sort="{ prop: 'date', order: 'descending' }"
                stripe
              >
                <el-table-column prop="title" label="公告内容" align="left">
                  <template slot-scope="scope">
                    <i class="el-icon-link"></i>&nbsp;<a
                      @click="detailInfoDialog(scope.row.id)"
                      style="cursor: pointer; font-family: 黑体"
                      >{{ scope.row.title }}</a
                    >
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="发布人" width="100">
                </el-table-column>
                <el-table-column
                  prop="date"
                  label="发布日期"
                  sortable
                  width="100"
                >
                </el-table-column>
              </el-table>
              <el-button
                type="text"
                @click="showMoreInfo"
                style="color: blue; display: block; float: right"
                ><i class="el-icon-plus"></i>查看更多&nbsp;</el-button
              >
            </el-card>
          </div>
          <div style="width: 30px"></div>
          <div class="publicity">
            <div
              class="publicity_title"
              style="position: relative; text-align: center"
            >
              <img
                src="@/assets/任前公示.png"
                alt=""
                style="display: block; float: left"
              />
              <h3 style="float: left">结果公示</h3>
              <el-button
                type="text"
                @click="showMorePub"
                style="color: blue; display: block; float: right"
                ><i class="el-icon-plus"></i>查看更多&nbsp;</el-button
              >
            </div>
            <div style="clear: both"></div>
            <el-card>
              <el-table
                :data="newTableData2"
                style="width: 100% ;height=450"
                :default-sort="{ prop: 'date', order: 'descending' }"
                stripe
              >
                <el-table-column prop="title" label="公告内容" align="left">
                  <template slot-scope="scope">
                    <i class="el-icon-link"></i>&nbsp;
                    <a
                      @click="detailPubDialog(scope.row.id)"
                      style="cursor: pointer; font-family: 黑体"
                      >{{ scope.row.title }}</a
                    >
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="发布人" width="80">
                </el-table-column>
                <el-table-column
                  prop="date"
                  label="发布日期"
                  sortable
                  width="100"
                >
                </el-table-column>
              </el-table>
              <el-button
                type="text"
                @click="showMorePub"
                style="color: blue; display: block; float: right"
                ><i class="el-icon-plus"></i>查看更多&nbsp;</el-button
              >
            </el-card>
            <info-dialog
              :infoDetail="infoDetail"
              :isInfoShow="isInfoShow"
            ></info-dialog>
            <pub-dialog
              :pubDetail="pubDetail"
              :isPubShow="isPubShow"
            ></pub-dialog>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import infoDialog from '@/views/welcome/infoDialog.vue';
  import pubDialog from '@/views/welcome/pubDialog.vue';
  import {
    detailList,
    detailList2,
    tableData,
    newTableData1,
    newTableData2
  } from '../home/mock';
  export default {
    name: 'welcome',
    components: { infoDialog, pubDialog },
    data() {
      return {
        tableData, //表格数据，应为页面创建时获取到
        detailList, //竞聘详情
        detailList2, //公示详情
        newTableData1, //欢迎页显示10条数据
        newTableData2,
        userInfo: {},
        dailyMessage: {},
        expandMore: false,
        total: 26,
        detailTitle: '',
        id: 0, //公告id
        // 网络请求参数
        queryInfo: {
          searchForm: {},
          pagenum: 1,
          pagesize: 10
        },
        searchForm: {
          creationTime: '',
          publisher: '',
          name: ''
        },
        isInfoShow: { value: false },
        infoDetail: {},
        isPubShow: { value: false },
        pubDetail: {},

      };
    },
    created() {},
    methods: {
      detailInfoDialog(id) {
        //   const { data: res } = await this.$http.get("categories/" + id);
        //   if (res.meta.status !== 200) {
        // console.log(res);
        // this.$message.error("查询分类信息失败");
        //   }
        // 此处应该发送请求，根据id获取对应的信息，存储在detailList中
        //   this.editForm = res.data;
        this.isInfoShow.value = true;
        this.infoDetail = detailList[id - 1];
      },
      detailPubDialog(id) {
        //   const { data: res } = await this.$http.get("categories/" + id);
        //   if (res.meta.status !== 200) {
        // console.log(res);
        // this.$message.error("查询分类信息失败");
        //   }
        // 此处应该发送请求，根据id获取对应的信息，存储在detailList中
        //   this.editForm = res.data;
        this.isPubShow.value = true;
        this.pubDetail = detailList2[id - 1];
      },
      onSubmit() {},
      // 监听每页数量的改变事件
      handleSizeChange(newVal) {
        this.queryInfo.pagesize = newVal;
      },
      // 监听当前页码的改变事件
      handleCurrentChange(newVal) {
        this.queryInfo.pagenum = newVal;
      },
      showMoreInfo() {
        // this.$router.push('/welcome/information');
      // let routeData = this.$router.resolve({ path:'/welcome/information'});
      // window.open(routeData.href, 'newWindow', 'top=0'); //打开新窗口
      // window.open(routeData.href, '_blank'); //打开新标签
            this.$router.push('/list/info');
      },
      showMorePub() {
      // let routeData = this.$router.resolve({ path:'/welcome/publicity'});
      // window.open(routeData.href, 'newWindow', 'top=0'); //打开新窗口
      // window.open(routeData.href, '_blank'); //打开新标签
      this.$router.push('/list/publicity');
      },
      login() {
        this.$router.push('/login');
      }
    }
  };
</script>

<style scoped lang="scss">
  // 页面样式
  .el-header {
    background: rgb(14, 144, 149);
    height: 70px !important;
    display: flex;
    align-items: left;
  }
  .el-button--primary {
    background: #009297;
    border-color: #009297;
    color: #fff;
  }
  .logo {
    flex: 1;
    height: 100%;
    font-family: 'Helvetica Neue';
    font-size: 24px;
    color: #ffffff;
    display: flex;
    img {
      padding-top: 5px;
      height: 90%;
    }
  }
  .title2 {
    font-size: 24px;
    color: rgb(0, 69, 129);
    text-align: center;
    line-height: 70px;
    font-family: '微软雅黑';
    font-weight: 700px;
    // padding-bottom: 23px;
  }
  .title {
    flex: 1;
    font-family: '微软雅黑';
    font-size: 36px;
    color: #ffffff;
    text-align: center;
    line-height: 70px;
    font-weight: 500;
  }
  .login {
    flex: 1;
    // margin-left: auto;
    text-align: right;
    padding-top: 20px;
    font-size: 22px;
  }

  // 主题内容样式
  .main {
    display: flex;
  }
  .information {
    flex: 1;
  }
  .information_title,
  .publicity_title {
    // background: 	rgba(72,201,176,.800);
    position: relative;
    // text-align: center;
    h3 {
      display: block;
      // color:#000;
      color: #009297;
      padding: 10px 50px 0;
      font-size: 18px;
      font-weight: 600;
    }
    img {
      position: absolute;
      left: 10;
      top: 0;
      height: 40px;
      width: 40px;
    }
  }

  .publicity {
    flex: 1;
    // padding-left: 10px;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
  .el-table a:hover {
    color: #48c9b0;
  }
</style>
