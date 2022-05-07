<template>
  <div class="ele-body">
    <!-- 搜索表单 -->
    <search-form @search="onSearch" @expand-change="onExpandChange" />
    <el-card shadow="never">
      <!-- 高级表格 -->
      <ele-pro-table
        ref="table"
        title="竞聘公告"
        :border="bordered"
        :stripe="striped"
        :height="tableHeight"
        :full-height="tableFullHeight"
        :columns="columns"
        :datasource="datasource"
      >
        <!-- 表头工具按钮 -->
        <template slot="toolkit">
          <div class="ele-space">
            <div class="list-tool-item">
              <span>边框</span>
              <el-switch v-model="bordered" />
            </div>
            <div class="list-tool-divider">
              <el-divider direction="vertical" />
            </div>
            <div class="list-tool-item">
              <span>斑马线</span>
              <el-switch v-model="striped" />
            </div>
            <div class="list-tool-divider">
              <el-divider direction="vertical" />
            </div>
            <div class="list-tool-item">
              <span>固定高度</span>
              <el-switch v-model="fixedHeight" @change="destroyTable" />
            </div>
            <div class="list-tool-divider">
              <el-divider direction="vertical" />
            </div>

            <div class="list-tool-divider">
              <el-divider direction="vertical" />
            </div>
          </div>
        </template>
        <!-- 公告标题列 -->
        <template slot="title" slot-scope="{ row }">
          <a
            @click="detailInfoDialog(row.id)"
            style="cursor: pointer; font-family: 黑体"
            >{{ row.title }}</a
          >
        </template>
      </ele-pro-table>
    </el-card>
    <info-dialog
      :infoDetail="infoDetail"
      :isInfoShow="isInfoShow"
    ></info-dialog>
  </div>
</template>

<script>
  import { pageInfo, getInfoList } from '@/api/system/notify';
  import SearchForm from '../components/search-form.vue';
  // 引入详情弹窗
  import infoDialog from '@/views/list/info/infoDialog.vue';

  export default {
    name: 'InfoList',
    components: { SearchForm, infoDialog },
    data() {
      return {
        // 表格是否显示边框
        bordered: true,
        // 表格是否斑马纹
        striped: false,
        // 表头工具栏风格
        // toolDefault: true,
        // 表格固定高度
        fixedHeight: true,
        // 用户名筛选值
        // nicknameFilterValue: '',
        // 表格搜索参数
        lastWhere: {},
        // detailList:所有竞聘公告的详情
        detailList: [],
        // 向弹窗传递的参数
        isInfoShow: { value: false },
        infoDetail: {}
      };
    },
    computed: {
      // 表格高度
      tableHeight() {
        return this.fixedHeight
          ? this.searchExpand
            ? 'calc(100vh - 410px)'
            : 'calc(100vh - 370px)'
          : null;
      },
      // 表格全屏时高度
      tableFullHeight() {
        return this.fixedHeight ? 'calc(100vh - 126px)' : null;
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
            minWidth: 110
          },
          {
            prop: 'name',
            label: this.$t('list.basic.table.name'),
            showOverflowTooltip: true,
            minWidth: 110
          },
          {
            prop: 'date',
            label: this.$t('list.basic.table.date'),
            showOverflowTooltip: true
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
        return pageInfo({
          ...where,
          ...order,
          ...filterValue,
          page,
          limit
        });
      },
      /* 销毁表格 */
      destroyTable() {
        this.$refs.table.reRenderTable();
      },
      /* 刷新表格 */
      reload(where) {
        this.$refs.table.reload({ page: 1, where });
      },
      /* 清空选择 */
      clearChoose() {
        this.$refs.table.clearSelection();
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
      },
      // 获取招聘公告详情列表
      getDetailList() {
        this.detailList = getInfoList();
      },
      // 招聘公告弹窗
      detailInfoDialog(id) {
        this.isInfoShow.value = true;
        this.infoDetail = detailList[id - 1];
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
</style>
