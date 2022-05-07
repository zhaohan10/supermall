<template>
  <el-card shadow="never" body-style="padding: 22px 22px 7px 22px;">
    <!-- 搜索表单 -->
    <el-form
      label-width="80px"
      class="ele-form-search"
      @keyup.enter.native="search"
      @submit.native.prevent
    >
      <el-row :gutter="15">
        <el-col :lg="5" :md="5">
          <el-form-item label="公告名称:">
            <el-input v-model="where.title" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :lg="5" :md="5">
          <el-form-item label="发布人:">
            <el-input v-model="where.name" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <!-- <el-col :lg="4" :md="6" v-if="searchExpand"> -->
        <el-col :lg="8" :md="8" >
          
          <el-form-item label="发布日期:">
    <el-date-picker
      v-model="where.date"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :lg="4" :md="4">
          <div class="ele-form-actions ele-text-right">
            <el-button
              type="primary"
              icon="el-icon-search"
              class="ele-btn-icon"
              @click="search"
            >
              查询
            </el-button>
            <el-button @click="reset">重置</el-button>
            <!-- <el-link type="primary" :underline="false" @click="toggleExpand">
              <template v-if="searchExpand">
                收起<i class="el-icon-arrow-up"></i>
              </template>
              <template v-else>
                展开<i class="el-icon-arrow-down"></i>
              </template>
            </el-link> -->
          </div>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<script>
  // 默认表单数据
  const DEFAULT_WHERE = {
    title: '',
    name: '',
    date: '',
  };

  export default {
    name: 'SearchForm',
    data() {
      return {
        // 表单数据
        where: { ...DEFAULT_WHERE },
        // 搜索表单是否展开
        searchExpand: false
      };
    },
    methods: {
      /* 搜索 */
      search() {
        this.$emit('search', this.where);
      },
      /* 重置搜索 */
      reset() {
        this.where = { ...DEFAULT_WHERE };
        this.search();
      },
      /* 搜索展开/收起 */
      toggleExpand() {
        this.searchExpand = !this.searchExpand;
        this.$emit('expand-change', this.searchExpand);
      }
    }
  };
</script>
