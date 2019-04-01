<template>
    <div class="info">
        <el-row type="flex" justify="center" align="center" class="container">
            <el-col :span="8" class="logo-container">
                <img :src="user.avatar" class="logo-img">
            </el-col>
            <el-col :span="16" class="info-container">
                <div class="user-name">
                    <i class="el-icon-service"></i>
                    {{user.name}}
                </div>
                <div class="user-auth">
                    <i class="el-icon-setting"></i>
                    {{user.identity | fliterType}}
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'info',
    components: {},
    computed: {
        user(){
            return this.$store.getters.user
        }
    },
    filters: {
        fliterType(value){
            switch(value){
                case '1':
                    return '管理员'
                    break;
                case '2':
                    return '普通员工'
                    break;
            }
        }
    }
}
</script>

<style scoped>
    .info {
        width: 100%;
        height: 100%;
    }
    .container {
        height: 100%;
        width: 100%;
    }
    .logo-container {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .logo-img {
        width: 200px;
        height: 200px;
        border-radius: 50%
    }
    .info-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        background: #e5e9f2;
        padding-left: 20px;
        font-size: 20px;
        font-weight: bold
    }
    .user-name {
        margin-bottom: 10px
    }
</style>