<template>
    <div class="fund">
        <div class="opareation">
            <el-form :model="searchData" size="small" style="flex:1">
                <el-form-item label="日期范围">
                    <el-date-picker v-model="date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                    <el-button type="primary" size="mini" class="query" @click="query">查询</el-button>
                </el-form-item>
            </el-form>
            <div class="button-container">
                <el-button type="primary" size="mini" @click="addData">添加</el-button>
            </div>
        </div>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="date" label="日期" width="250" align="center">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="describe" label="描述" width="150" align="center"></el-table-column>
            <el-table-column prop="income" label="收入" width="150" align="center">
                <template slot-scope="scope">
                    <span style="color: #67C23A">+{{ scope.row.income }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="expend" label="支出" width="150" align="center">
                <template slot-scope="scope">
                    <span style="color: #F56C6C">-{{ scope.row.expend }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="cash" label="现金" width="150" align="center">
                <template slot-scope="scope">
                    <span style="color: #409EFF">{{ scope.row.cash }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="remark" label="备注" align="center"></el-table-column>
            <el-table-column fixed="right" label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <el-button @click="editRow(scope.$index,scope.row)" type="primary" size="mini">编辑</el-button>
                    <el-button @click="delRow(scope.$index,scope.row)" type="danger" size="mini">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="el-page" background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.current_page"
            :page-sizes="page.page_sizes"
            :page-size="page.page_size"
            :layout="page.layout"
            :total="page.total">
        </el-pagination>
        <DialogPage :dialog="dialog" :formData="formData" @update="getProfile"></DialogPage>
    </div>
</template>

<script>
import DialogPage from '../components/Dialog'
export default {
    name: 'fund',
    components: {
        DialogPage
    },
    data(){
        return {
            date: '',
            searchData: {
                startDate: '',
                endDate: ''
            },
            page: {
                current_page: 1,
                page_sizes: [5, 10, 20, 50],
                page_size: 5,
                layout: 'total, sizes, prev, pager, next, jumper',
                total: 0
            },
            allTableData: [],
            tableData: [],
            filterTableData: [],
            dialog: {
                show: false,
                title: '',
                isAdd: true
            },
            formData: {
                type: '',
                describe: '',
                income: '',
                expend: '',
                cash: '',
                remark: '',
                id: ''
            },
        }
    },
    methods: {
        //获取列表数据
        getProfile(){
            this.$get('/api/profile')
                .then(res => {
                    this.allTableData = res.data;
                    this.filterTableData = res.data;
                    this.filterPage();
                }).catch(err => console.log(err))
        },
        //过滤数据
        filterPage(){
            this.page.total = this.allTableData.length;
            this.page.page_size = 5;
            this.page.current_page = 1;
            this.tableData = this.allTableData.filter((item,index) => {
                return index < this.page.page_size;
            });
        },
        //添加
        addData(){
            this.dialog = {
                show: true,
                title: '添加资金',
                isAdd: true
            };
            this.formData = {
                type: '',
                describe: '',
                income: '',
                expend: '',
                cash: '',
                remark: '',
                id: ''
            };
        },
        //修改
        editRow(index,row){
            this.dialog = {
                show: true,
                title: '修改资金',
                isAdd: false
            };
            this.formData = {
                type: row.type,
                describe: row.describe,
                income: row.income,
                expend: row.expend,
                cash: row.cash,
                remark: row.remark,
                id: row._id
            };
        },
        //删除
        delRow(index,row){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                 this.$delete(`/api/profile/${row._id}`)
                    .then(res => {
                        this.$message({message: '删除成功',type: 'success'});
                        this.getProfile();
                    })
            }).catch(() => {});
        },
        //page_size下拉更改
        handleSizeChange(pageSize){
            this.page.current_page = 1;
            this.page.page_size = pageSize;
            this.tableData = this.allTableData.filter((item,index) => {
                return index < pageSize;
            });
        },
        //跳转页
        handleCurrentChange(page){
            let index = this.page.page_size * (page - 1);
            let nums = this.page.page_size * page;
            let table = [];
            for(let i = index; i < nums; i++){
                if(this.allTableData[i]){
                    table.push(this.allTableData[i]);
                };
            };
            this.tableData = table;
        },
        //查询
        query(){
            if(this.date && this.date.length > 0){
                this.searchData.startDate = this.date[0];
                this.searchData.endDate = this.date[1];
                const sTime = this.searchData.startDate.getTime();
                const eTime = this.searchData.endDate.getTime();
                this.allTableData = this.filterTableData.filter(item => {
                    let date = new Date(item.date).getTime();
                    return date >= sTime && date <= eTime;
                });
                this.filterPage();
            }else{
                this.getProfile();
            }
        }
    },
    created(){
        //获取列表数据
        this.getProfile();
    }
}
</script>

<style scoped>
    .fund {
        padding: 20px
    }
    .opareation {
        display: flex;
        justify-content: space-between
    }
    .query {
        margin-left:20px
    }
    .el-page {
        margin-top: 20px;
        text-align: right
    }
</style>