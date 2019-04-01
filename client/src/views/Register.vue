<template>
    <div class="register">
        <div class="form-containter">
            <p class="title">注册页面</p>
            <el-form :model="registerForm" :rules="registerRules" ref="registerForm" label-width="80px" class="registerForm">
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="registerForm.name" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="registerForm.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="registerForm.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="password2">
                    <el-input type="password" v-model="registerForm.password2" placeholder="请再次密码"></el-input>
                </el-form-item>
                <el-form-item label="选择身份" prop="identity">
                    <el-select v-model="registerForm.identity" placeholder="请选择身份">
                    <el-option label="管理员" value="1"></el-option>
                    <el-option label="员工" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width:100%" @click="submitForm('registerForm')">立即注册</el-button>
                </el-form-item>
                <p class="toLogin">已注册？去<router-link to="/login">登录</router-link></p>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'register',
    components: {},
    data(){
        var validatePass2 = (rule, value, callback) => {
            if (value !== this.registerForm.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            registerForm: {
                name: '',
                email: '',
                password: '',
                password2: '',
                identity: ''
            },
            registerRules: {
                name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 6, max: 50, message: '长度在 6 到 50 个字符', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                password2: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' },
                    { validator: validatePass2, trigger: 'blur' }
                ],
                identity: [
                    { required: true, message: '请选择身份', trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$post('/api/user/register',this.registerForm)
                        .then(res => {
                            if(res.code == 1){
                                this.$message({message: '注册成功!',type: 'success'});
                                this.$router.push('/login');
                            };
                        })
                }
            });
        }
    }
}
</script>

<style scoped>
    .register {
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
    .registerForm {
        background: rgba(255,255,255,.6);
        width:400px;
        padding: 40px;
        border-radius: 5px
    }
    .toLogin {
        text-align: right;
        color: #606266
    }
    .toLogin a {
        color: #409EFF
    }
</style>