<template>
  <div class="ele-body">
    <el-card shadow="never">
      <!-- 高级表格 -->
      <ele-pro-table
        ref="table"
        row-key="id"
        title="我的填报"
        :border="bordered"
        :stripe="striped"
        :tools-theme="toolDefault ? 'default' : 'none'"
        :height="tableHeight"
        :full-height="tableFullHeight"
        :columns="columns"
        :datasource="datasource"
        :row-click-checked="true"
        :selection.sync="selection"
        :row-click-checked-intelligent="false"
        @done="onDone"
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
              <span>表头背景</span>
              <el-switch v-model="toolDefault" />
            </div>
            <div class="list-tool-divider">
              <el-divider direction="vertical" />
            </div>
          </div>
        </template>
        <!-- 用户名列 -->
        <template slot="nickname" slot-scope="{ row }">
          <router-link :to="'/list/user-info/' + row.userId">
            {{ row.nickname }}
          </router-link>
        </template>
        <!-- 状态列 -->
        <template slot="status" slot-scope="{ row }">
          <ele-dot
            :ripple="row.status === 0"
            :type="[null, 'danger'][row.status]"
            :text="['正常', '冻结'][row.status]"
          />
        </template>
        <!-- 操作列 -->
        <template slot="action" slot-scope="{ row }">
          <el-link
            type="primary"
            :underline="false"
            icon="el-icon-view"
            @click.stop="openView(row)"
          >
            查看
          </el-link>
        </template>
      </ele-pro-table>
    </el-card>
  </div>
</template>

<script>
  import { listInfo } from '@/api/system/signup';

  export default {
    name: 'ListBasic',
    data() {
      return {
        // 表格选中数据
        selection: [],
        // 搜索表单是否展开
        searchExpand: false,
        // 表格是否显示边框
        bordered: true,
        // 表格是否斑马纹
        striped: false,
        // 表头工具栏风格
        toolDefault: true,
        // 表格固定高度
        fixedHeight: false,
        // 表格搜索参数
        lastWhere: {}
      };
    },
    computed: {
      // 表格高度
      tableHeight() {
        return this.fixedHeight
          ? this.searchExpand
            ? 'calc(100vh - 540px)'
            : 'calc(100vh - 488px)'
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
            prop: 'company',
            label: '填报单位',
            align: 'center',
            showOverflowTooltip: true,
            minWidth: 110
          },
          {
            prop: 'position',
            label: '填报职位',
            minWidth: 110,
            align: 'center',
            resizable: false,
            hideInSetting: true
          },
          {
            prop: 'date',
            label: '填报时间',
            width: 130,
            align: 'center',    
            sortable: 'custom',
            resizable: false,
            hideInSetting: true
          },
          {
            columnKey: 'action',
            label: '操作',
            width: 130,
            align: 'center',
            resizable: false,
            slot: 'action',
            hideInSetting: true
          }
        ];
      }
    },
    methods: {
      /* 表格数据源 */
      datasource({ page, limit, where, order, filterValue }) {
        return listInfo({
          ...where,
          ...order,
          ...filterValue,
          page,
          limit
        });
      },
      /* 表格数据请求完成事件 */
      onDone() {
        this.$nextTick(() => {
          // 回显id为12、11、9的数据的复选框
          const ids = [12, 11, 9];
          this.$refs.table.setSelectedRowKeys(ids);
        });
      },
      /* 刷新表格 */
      reload(where) {
        this.$refs.table.reload({ page: 1, where });
      },

      openView(row) {
        console.log(row);
        this.$message.info('点击了修改');
      },
      /* 销毁表格 */
      destroyTable() {
        this.$refs.table.reRenderTable();
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
