<template>
  <div class="home">
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
        <div class="login"></div>
      </el-header>
      <el-main>
        <div style="height: 70px"></div>
        <!-- 搜索表单 -->
        <search-form @search="onSearch" @expand-change="onExpandChange" />
        <div class="table" style="overflow: hidden">
          <el-table
            ref="table"
            :data="tableData"
            style="width: 100%"
            height="400"
            :default-sort="{ prop: 'date', order: 'descending' }"
            stripe
          >
            <el-table-column prop="title" label="公告内容" align="left">
              <template slot-scope="scope">
                <!-- <a @click="detailDialog(scope.row.id)" style="color: blue; cursor: pointer">{{ scope.row.title }}</a> -->
                <a
                  @click="detailDialog(scope.row.id)"
                  style="color: blue; cursor: pointer"
                  >{{ scope.row.title }}</a
                >
              </template>
            </el-table-column>
            <el-table-column prop="date" label="发布日期" sortable width="220">
            </el-table-column>
            <el-table-column label="拟稿单位"
              >党委组织部(人力资源部)
            </el-table-column>
            <el-table-column prop="name" label="发布人" width="220">
            </el-table-column>
          </el-table>
        </div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[5, 10, 20]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          background
        >
        </el-pagination>
        <info-dialog
          :isInfoShow="isInfoShow"
          :infoDetail="infoDetail"
        ></info-dialog>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import infoDialog from './infoDialog.vue';
  import searchForm from './components/search-form.vue';

  import { detailList, recommendList, tableData } from './mock';
  export default {
    name: 'information',
    components: { infoDialog, searchForm },
    data() {
      return {
        recommendList,
        tableData, //表格数据，应为页面创建时获取到
        detailList, //竞聘详情
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
        // 搜索表单是否展开
        searchExpand: false,
        isInfoShow: { value: false },
        infoDetail: {},
        // 表格搜索参数
        lastWhere: {}
      };
    },
    created() {},
    // mounted() {},
    methods: {
      /* 刷新表格 */
      reload(where) {
        this.$refs.table.reload({ page: 1, where });
      },
      detailDialog(id) {
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
      onSubmit() {},
      // 监听每页数量的改变事件
      handleSizeChange(newVal) {
        this.queryInfo.pagesize = newVal;
      },
      // 监听当前页码的改变事件
      handleCurrentChange(newVal) {
        this.queryInfo.pagenum = newVal;
      },
      /* 搜索展开改变事件 */
      onExpandChange(value) {
        this.searchExpand = value;
      },
      /* 搜索事件 */
      onSearch(where) {
        this.lastWhere = where;
        this.doReload();
      },
      /* 表格搜索 */
      doReload() {
        this.reload(this.lastWhere);
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
  }
    .logo {
    flex: 1;
    height: 100%;
    font-family: 'Helvetica Neue';
    font-size: 24px;
    color: #ffffff;
    display: flex;
  }
  .logo img {
    padding-top: 5px;
    height: 90%;
          width:25%
  }
  .title2 {
    font-size: 24px;
    text-align: center;
    line-height: 70px;
    font-family: '微软雅黑';
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
  }
  .el-main {
    padding: 20px 80px;
  }
  .el-button--primary {
    background: #009297;
    border-color: #009297;
    color: #fff;
  }

</style>
