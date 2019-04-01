<template>
    <el-row class="menu_page">
      <el-col>
        <el-menu class="el-menu-vertical" background-color="#303133" text-color="#fff" active-text-color="#409EFF">
            <router-link to="/home">
                <el-menu-item index="0">
                    <i class="el-icon-menu"></i>
                    <span slot="title">首页</span>
                </el-menu-item>
            </router-link>
            <template v-for="item in menuList">
                <el-submenu v-if="item.children" :index="item.path" :key="item.path">
                    <template slot="title">
                        <i :class="item.icon"></i>
                        <span slot="title">{{item.title}}</span>
                    </template>
                    <router-link v-for="(citem,index) in item.children" :to="citem.path" :key="index">
                        <el-menu-item :index="citem.path">
                            <span>{{citem.title}}</span>
                        </el-menu-item>
                    </router-link>
                </el-submenu>
            </template>
        </el-menu>
      </el-col>
    </el-row>
</template>

<script>
export default {
  name: "left-menu",
  data() {
    return {
      menuList: [
        {
          icon: "el-icon-sold-out",
          path: "fundList",
          title: "资金管理",
          children: [{ path: "/fund", title: "资金流水" }]
        },
        {
          icon: "el-icon-tickets",
          path: "infoShow",
          title: "信息管理",
          children: [{ path: "/info", title: "个人信息" }]
        }
      ]
    };
  }
};
</script>

<style scoped>
.menu_page {
  position: fixed;
  top: 60px;
  left: 0;
  min-height: 100%;
  background-color: #303133;
  z-index: 99;
}
.el-menu {
  border: none;
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu-vertical {
  width: 35px;
}
.el-submenu .el-menu-item {
  min-width: 180px;
}
a {
  text-decoration: none;
}
</style>