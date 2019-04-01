<template>
    <div class="login">
        <div class="form-containter">
            <p class="title">登录页面</p>
            <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="80px" class="loginForm">
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="loginForm.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width:100%" @click="submitForm('loginForm')">登录</el-button>
                </el-form-item>
                <p class="toRegister">还没有注册？现在<router-link to="/register">注册</router-link></p>
            </el-form>
        </div>
    </div>
</template>

<script>
import jwt_decode from 'jwt-decode'
export default {
    name: 'login',
    components: {},
    data(){
        return {
            loginForm: {
                email: '',
                password: '',
            },
            loginRules: {
                email: [
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        submitForm(formName){//登录
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$post('/api/user/login',this.loginForm)
                        .then(res => {
                            if(res.code == 1){
                                //存储token
                                const {access_token} = res.data;
                                localStorage.setItem('access_token',access_token);
                                const decoded = jwt_decode(access_token);
                                this.$store.dispatch('setAuth',!this.isEmpty(decoded));
                                this.$store.dispatch('setUser',decoded);
                                this.$message({message: '登录成功!',type: 'success'});
                                this.$router.push('/index');
                            };
                        })
                };
            });
        },
        isEmpty(value){//判断是否为空
            return (
                value === undefined || value === null ||
                (typeof value === 'object' && Object.keys(value).length === 0) ||
                (typeof value === 'string' && value.trim().length === 0)
            )
        }
    }
}
</script>

<style scoped>
    .login {
        height: 100%;
        width: 100%;
        background: url('../assets/img/bg.jpg') no-repeat center;
        background-size: 100% 100%;
    }
    .form-containter {
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -240px;
        margin-top: -194px;
    }
    .title {
        font-size: 20px;
        color: #fff;
        font-weight: 400;
        text-align: center;
        padding: 20px
    }
    .loginForm {
        background: rgba(255,255,255,.6);
        width: 400px;
        padding: 40px;
        border-radius: 5px
    }
    .toRegister {
        text-align: right;
        color: #606266
    }
    .toRegister a {
        color: #409EFF
    }
</style>