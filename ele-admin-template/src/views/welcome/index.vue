<template>
  <div>
    <el-container>
      <el-header style="width: 100%; position: fixed; z-index: 999">
        <div class="logo">
          <img src="@/assets/logo.png" alt="" />
          <div class="title2"
            ><h4
              style="
                color: rgb(0, 69, 129);
                font-weight: bold;
                font-size: 0.6cm;
              "
              >&nbsp;HRCS</h4
            ></div
          >
        </div>
        <div class="title"
          ><h3 style="color: #fff; font-weight: bold; font-size: 1cm"
            >平高集团竞聘系统</h3
          ></div
        >
        <div class="login"
          ><el-button type="primary" @click="login">登录</el-button></div
        >
      </el-header>
      <el-main>
        <div style="height: 70px"></div>
        <div class="carousel">
          <el-carousel :interval="3000" type="card" height="200px">
            <el-carousel-item v-for="item in imgList" :key="item.name">
              <img
                :src="item.src"
                style="height: 100%; width: 100%"
                alt="图片丢失了"
              />
            </el-carousel-item>
          </el-carousel>
        </div>
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
              <!-- 竞聘公告 -->
              <!-- 高级表格 -->
              <ele-pro-table
                ref="table1"
                border="false"
                :toolbar="false"
                :height="tableHeight"
                :columns="columns1"
                :datasource="datasource1"
                :default-sort="{ prop: 'date', order: 'descending' }"
                :needPage="false"
                :pageSize="10"
              >
                <!-- 公告标题列 -->
                <template slot="title" slot-scope="{ row }">
                  <a
                    @click="detailInfoDialog(row.id)"
                    style="cursor: pointer; font-family: 黑体"
                    >{{ row.title }}</a
                  >
                </template>
                <!-- 状态列 -->
                <template slot="status" slot-scope="{ row }">
                  <ele-dot
                    :type="row.status === 0 ? 'success' : 'danger'"
                    :text="row.status === 0 ? '进行中' : '已结束'"
                  />
                </template>
              </ele-pro-table>
              <el-button
                type="text"
                @click="showMoreInfo"
                style="color: blue; display: block; float: right"
                ><i class="el-icon-plus"></i>查看更多&nbsp;</el-button
              >
            </el-card>
            <info-dialog
              :infoDetail="infoDetail"
              :isInfoShow="isInfoShow"
            ></info-dialog>
          </div>
          <div style="width: 30px"></div>
          <!-- 结果公示 -->
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
              <ele-pro-table
                ref="table2"
                border="false"
                :toolbar="false"
                :height="tableHeight"
                :columns="columns2"
                :datasource="datasource2"
                :default-sort="{ prop: 'date', order: 'descending' }"
                :needPage="false"
                :pageSize="10"
              >
                <!-- 公告标题列 -->
                <template slot="title" slot-scope="{ row }">
                  <a
                    @click="detailPubDialog(row.id)"
                    style="cursor: pointer; font-family: 黑体"
                    >{{ row.title }}</a
                  >
                </template>
                <!-- 状态列 -->
                <template slot="status" slot-scope="{ row }">
                  <ele-dot
                    :type="row.status === 0 ? 'success' : 'danger'"
                    :text="row.status === 0 ? '公示中' : '已结束'"
                  />
                </template>
              </ele-pro-table>
              <el-button
                type="text"
                @click="showMorePub"
                style="color: blue; display: block; float: right"
                ><i class="el-icon-plus"></i>查看更多&nbsp;</el-button
              >
            </el-card>
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
  import { pageInfo, getInfoList } from '@/api/system/notify';
  import { pagePub, getPubList } from '@/api/system/notify';
  export default {
    name: 'welcome',
    components: { infoDialog, pubDialog },
    data() {
      return {
        // detailList1:所有竞聘公告的详情
        detailList1: [],
        // 向弹窗传递的参数
        isInfoShow: { value: false },
        infoDetail: {},
        // detailList2:所有结果公示的详情
        detailList2: [],
        // 向弹窗传递的参数
        isPubShow: { value: false },
        pubDetail: {},
        imgList: [
          {
            name: '新闻1',
            src: require('@/assets/0.png')
          },
          {
            name: '新闻2',
            src: require('@/assets/1.jpg')
          },
          {
            name: '新闻3',
            src: require('@/assets/2.jpg')
          },
          {
            name: '新闻4',
            src: require('@/assets/3.jpg')
          }
        ]
      };
    },
    computed: {
      // 表格的列配置，使用国际化要用computed
      columns1() {
        return [
          {
            columnKey: 'index',
            type: 'index',
            width: 45,
            align: 'center',
            showOverflowTooltip: true,
            fixed: 'left'
          },
          {
            prop: 'title',
            label: '公告名称',
            showOverflowTooltip: true,
            slot: 'title',
            minWidth: 140
          },
          {
            prop: 'status',
            label: '活动状态',
            align: 'center',
            sortable: 'custom',
            width: 110,
            resizable: false,
            slot: 'status'
          },
          {
            prop: 'name',
            label: '发布人',
            width: 80,
            showOverflowTooltip: true
          },

          {
            prop: 'date',
            label: '发布日期',
            showOverflowTooltip: true,
            sortable: 'custom'
          }
        ];
      },
      // 表格的列配置，使用国际化要用computed
      columns2() {
        return [
          {
            columnKey: 'index',
            type: 'index',
            width: 45,
            align: 'center',
            showOverflowTooltip: true,
            fixed: 'left'
          },
          {
            prop: 'title',
            label: '公告名称',
            showOverflowTooltip: true,
            slot: 'title',
            minWidth: 140
          },
          {
            prop: 'status',
            label: '活动状态',
            align: 'center',
            sortable: 'custom',
            width: 110,
            resizable: false,
            slot: 'status'
          },
          {
            prop: 'name',
            label: '发布人',
            showOverflowTooltip: true,
            width: 80
          },

          {
            prop: 'date',
            label: '发布日期',
            sortable: 'custom',
            showOverflowTooltip: true
          }
        ];
      }
    },
    mounted() {
      this.getDetailList1();
      this.getDetailList2();
    },
    methods: {
      /* 表格数据源 */
      datasource1({ page, limit, where, order, filterValue }) {
        return pageInfo({
          ...where,
          ...order,
          ...filterValue,
          page,
          limit
        });
      },
      /* 表格数据源 */
      datasource2({ page, limit, where, order, filterValue }) {
        return pagePub({
          ...where,
          ...order,
          ...filterValue,
          page,
          limit
        });
      },
      // 获取招聘公告详情列表
      getDetailList1() {
        this.detailList1 = getInfoList();
      },
      // 招聘公告弹窗
      detailInfoDialog(id) {
        this.isInfoShow.value = true;
        this.infoDetail = detailList1[id - 1];
      },
      // 获取结果公示详情列表
      getDetailList2() {
        this.detailList2 = getPubList();
      },
      // 招聘公告弹窗
      detailPubDialog(id) {
        this.isPubShow.value = true;
        this.pubDetail = detailList2[id - 1];
      },
      showMoreInfo() {
        // this.$router.push('/welcome/information');
        let routeData = this.$router.resolve({ path: '/welcome/information' });
        // window.open(routeData.href, 'newWindow', 'top=0'); //打开新窗口
        window.open(routeData.href, '_blank'); //打开新标签
      },
      showMorePub() {
        let routeData = this.$router.resolve({ path: '/welcome/publicity' });
        // window.open(routeData.href, 'newWindow', 'top=0'); //打开新窗口
        window.open(routeData.href, '_blank'); //打开新标签
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
      width: 25%;
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
</style>
