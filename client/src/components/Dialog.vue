<template>
    <div class="dialog">
        <el-dialog :title="dialog.title" :visible.sync="dialog.show" @close="handleDialogClose('formData')" :close-on-click-modal="false" :close-on-press-escape="false">
            <el-form :model="formData" :rules="formRules" ref="formData" label-width="100px" size="small">
                <el-form-item label="收支类型">
                    <el-select v-model="formData.type" placeholder="请选收支类型">
                        <el-option :label="item" :value="item" v-for="(item,index) in typeList" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="收支描述" prop="describe">
                    <el-input v-model="formData.describe" placeholder="请输入收支描述" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="收入" prop="income">
                    <el-input v-model="formData.income" placeholder="请输入收入" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="支出" prop="expend">
                    <el-input v-model="formData.expend" placeholder="请输入支出" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="现金" prop="cash">
                    <el-input v-model="formData.cash" placeholder="请输入现金" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input type="textarea" v-model="formData.remark" placeholder="请输入备注" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialog.show = false" size="mini">取 消</el-button>
                <el-button type="primary" size="mini" @click="submitForm('formData')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'dialogPage',
    props: {
        dialog: {
            type: Object
        },
        formData: {
            type: Object
        }
    },
    data(){
        return {
            typeList: ['提现','提现手续费','充值','优惠券','充值礼券','转账'],
            formRules: {
                describe: [{required: true, message: '收支描述不能为空', trigger: 'blur'}],
                income: [{required: true, message: '收入不能为空', trigger: 'blur'}],
                expend: [{required: true, message: '支出不能为空', trigger: 'blur'}],
                cash: [{required: true, message: '现金描述不能为空', trigger: 'blur'}],
            }
        }
    },
    methods: {
        //提交表单
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.dialog.isAdd){//添加
                        this.$post('/api/profile/add',this.formData)
                        .then(res => {
                            this.dialog.show = false;
                            this.$emit('update');
                            this.$message({message: '添加成功',type: 'success'});
                        })
                        .catch(err => console.log(err));
                    }else{//修改
                        this.$post(`/api/profile/edit/${this.formData.id}`,this.formData)
                            .then(res => {
                                this.dialog.show = false;
                                this.$emit('update');
                                this.$message({message: '修改成功',type: 'success'});
                            })
                            .catch(err => console.log(err));
                    }
                }
            });
        },
        handleDialogClose(formName){
            this.$refs[formName].resetFields();
        }
    }
}
</script>

<style scoped>
    
</style>