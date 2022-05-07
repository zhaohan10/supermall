<template>
  <el-container>
    <el-header style="width: 100%; position: fixed; z-index: 999">
      <div class="logo">
        <img src="@/assets/logo.png" alt="" />
        <div class="title2"
          ><h4
            style="color: rgb(0, 69, 129); font-weight: bold; font-size: 0.6cm"
            >&nbsp;HRCS</h4
          ></div
        >
      </div>
      <div class="title"
        ><h3 style="color: #fff; font-weight: bold; font-size: 1cm"
          >平高集团竞聘系统</h3
        ></div
      >
      <div class="login"></div>
    </el-header>
    <el-main>
      <div style="height: 45px"></div>
      <!-- 搜索表单 -->
      <search-form @search="onSearch" />
      <el-card shadow="never">
        <!-- 高级表格 -->
        <ele-pro-table
          ref="table"        
          border="false"
          :toolbar="false"
          :stripe="striped"
          :height="tableHeight"
          :columns="columns"
          :datasource="datasource"
          :default-sort="{ prop: 'date', order: 'descending' }"
        >
          <!-- 公告标题列 -->
          <template slot="title" slot-scope="{ row }">
            <a @click="detailPubDialog(row.id)">{{ row.title }}</a>
          </template>
          <!-- 状态列 -->
          <template slot="status" slot-scope="{ row }">
            <ele-dot
              :type="row.status === 0 ? 'success' : 'danger'"
              :text="row.status === 0 ? '公示中' : '已结束'"
            />
          </template>
        </ele-pro-table>
      </el-card>
      <pub-dialog :pubDetail="pubDetail" :isPubShow="isPubShow"></pub-dialog>
    </el-main>
  </el-container>
</template>

<script>
  import { pagePub, getPubList } from '@/api/system/notify';
  import SearchForm from '@/views/list/components/search-form.vue';
  // 引入详情弹窗
  import pubDialog from '@/views/list/publicity/pubDialog.vue';

  export default {
    name: 'publicity',
    components: { SearchForm, pubDialog },
    data() {
      return {
        // 表格是否显示边框
        bordered: true,
        // 表格是否斑马纹
        striped: false,
        lastWhere: {},
        // detailList:所有竞聘公告的详情
        detailList: [],
        // 向弹窗传递的参数
        isPubShow: { value: false },
        pubDetail: {}
      };
    },
    computed: {
      // 表格高度
      tableHeight() {
        return 'calc(100vh - 260px)';
      },
      // 表格的列配置，使用国际化要用computed
      columns() {
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
            label: this.$t('list.basic.table.title'),
            showOverflowTooltip: true,
            slot: 'title',
            minWidth: 170
          },
          {
            prop: 'status',
            label: '活动状态',
            align: 'center',
            sortable: 'custom',
            width: 140,
            resizable: false,
            slot: 'status'
          },
          {
            prop: 'name',
            label: this.$t('list.basic.table.name'),
            showOverflowTooltip: true,
            width: 140
          },
          {
            prop: 'date',
            label: this.$t('list.basic.table.date'),
            sortable: 'custom',
            showOverflowTooltip: true,
            width: 140
          }
        ];
      }
    },
    mounted() {
      this.getDetailList();
    },
    methods: {
      /* 表格数据源 */
      datasource({ page, limit, where, order, filterValue }) {
        return pagePub({
          ...where,
          ...order,
          ...filterValue,
          page,
          limit
        });
      },
      /* 刷新表格 */
      reload(where) {
        this.$refs.table.reload({ page: 1, where });
      },
      /* 清空选择 */
      clearChoose() {
        this.$refs.table.clearSelection();
      },

      /* 搜索事件 */
      onSearch(where) {
        this.lastWhere = where;
        this.doReload();
      },

      /* 表格搜索 */
      doReload() {
        this.reload(this.lastWhere);
      },
      // 获取结果公示详情列表
      getDetailList() {
        this.detailList = getPubList();
      },
      // 招聘公告弹窗
      detailPubDialog(id) {
        this.isPubShow.value = true;
        this.pubDetail = detailList[id - 1];
      }
    }
  };
</script>

<style lang="scss" scoped>
  .list-tool-item > span {
    vertical-align: middle;
    margin-right: 6px;
  }

  .list-tool-divider {
    padding: 0 12px;
  }
  // 页面样式
  .el-header {
    background: rgb(14, 144, 149);
    height: 70px !important;
    display: flex;
    align-items: left;
  }
  .el-main {
    margin: 0 50px !important;
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

  .el-main {
    padding: 20px 80px;
  }
  .el-button--primary {
    background: #009297;
    border-color: #009297;
    color: #fff;
  }
  a {
    font-size: 16px;
    cursor: pointer;
    font-family: 黑体;
    color: rgba(0, 0, 0, 0.7);
  }
  a:hover {
    color: rgb(0, 146, 151);
  }
</style>
