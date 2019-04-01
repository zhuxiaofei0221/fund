<template>
    <div class="headerNav">
        <el-row>
            <el-col :span="12" class="logo-container">
                <img src="../assets/img/logo.png" alt="">
                <p class="title">nodejs后台管理系统</p>
            </el-col>
            <el-col :span="12" class="info-container">
                <img :src="user.avatar">
                <el-dropdown @command="dropdown">
                    <span class="el-dropdown-link">
                        {{user.name}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="info">个人资料</el-dropdown-item>
                        <el-dropdown-item command="logout">注销</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'header-nav',
    computed: {
        user(){
            return this.$store.getters.user;
        }
    },
    methods: {
        //下拉菜单
        dropdown(command){
            switch(command){
                case 'info':
                    this.showInfo();
                    break;
                case 'logout':
                    this.logout();
                    break;
            };
        },
        //显示个人资料
        showInfo(){
            this.$router.push('/info')
        },
        //注销
        logout(){
            //删除token
            localStorage.removeItem('access_token');
            //删除授权信息
            this.$store.dispatch('logout');
            //跳转到登录
            this.$router.push('/login');
        }
    }
}
</script>

<style scoped>
    .headerNav{
        width: 100%;
        height: 60px;
        line-height: 60px;
        background: #303133;
        overflow: hidden
    }
    .logo-container {
        display: flex;
        align-items: center;
        padding: 0 20px
    }
    .logo-container img{
        height: 40px;
        width: 40px;
        margin-right:20px
    }
    .logo-container .title {
        color: #fff;
        font-size: 20px
    }
    .info-container {
        padding: 0 20px;
        display: flex;
        align-items: center;
        justify-content: flex-end
    }
    .info-container img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 20px
    }
    .info-container .el-dropdown-link {
        color: #409eff;
        cursor: pointer;
    }
</style>