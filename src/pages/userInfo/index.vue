<template>
    <div class="userBox">
        <div class="userLeft">
            <h2>个人信息</h2>
            <div style="text-align: center;height: 150px;">
              <div class="el-upload">
                <!-- <img :src="avatar ? baseApi + '/avatar/' + user.avatarName : Avatar" title="点击上传头像" class="avatar" @click="toggleShow"> -->
                <img :src="avatar ? avatar : defaultAvatar" title="点击上传头像" class="avatar" @click="toggleShow">
                <myUpload
                :modelValue.sync="show"
                @crop-success="cropSuccess"
                @crop-upload-success="cropUploadSuccess"
                @crop-upload-fail="cropUploadFail"
                :url=url
                />
              </div>
            </div>
            <div style="margin-top: 50px;">
            <div class="uesrDetail">
                <div>登录账号</div>
                <div>{{userInfo.userName}}</div>
            </div>
            <div class="uesrDetail">
                <div>性别</div>
                <div>{{Gender}}</div>
            </div>
            <div class="uesrDetail">
                <div>手机号码</div>
                <div>{{userInfo.phone}}</div>
            </div>
            <div class="uesrDetail">
                <div>安全设置</div>
                <div class="modifpw" @click="modifyPassWord">修改密码</div>
            </div>
            </div>
        </div>
        <div class="userRight">
            <div>
                <span style="font-size: 16px;font-weight: bold;">用户资料</span>
                <el-divider></el-divider>
            </div>
            <div style="width: 30%;">
                <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                    <el-form-item label="名称" prop="realName">
                        <el-input v-model="form.realName"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="phone">
                        <el-input v-model="form.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio-group v-model="form.gender">
                            <el-radio label="1">男</el-radio>
                            <el-radio label="0">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-button type="primary" @click="onSubmit">保存配置</el-button>
                </el-form>
            </div>
        </div>
        <!-- 修改密码弹框 -->
        <el-dialog
        title="修改密码"
        :visible.sync="modifyDialog"
        width="30%"
        >
            <el-form :model="modifyPassword" label-width="80px">
                <el-form-item label="旧密码" >
                    <el-input type="password" v-model="modifyPassword.oldPassword"></el-input>
                </el-form-item>
                <el-form-item label="新密码" >
                    <el-input type="password" v-model="modifyPassword.newPassword"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" >
                    <el-input type="password" v-model="modifyPassword.confirmPassword"></el-input>
                </el-form-item>
                <el-button @click="modifyDialog = false">取 消</el-button>
                <el-button type="primary" @click="saveModifyPassword">确 定</el-button>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    import myUpload from 'vue-image-crop-upload';
    import UserInfo from '../../api/userInfo';
    export default{
        name:"UserInfo",
        props:["userId"],
        components: { myUpload },
        mounted(){
            console.log("userInfo",this)
            this.defaultAvatar = "http://192.168.14.24:8088/userAvatarFile/"+ this.$store.state.userInfo.userAvatar;
            this.url = "http://192.168.14.24:8088/auth/uploadPicture/" + this.$store.state.userInfo.userId;
            this.userInfo.userName = this.$store.state.userInfo.userName ? this.$store.state.userInfo.userName : "无";
            this.userInfo.gender = this.$store.state.userInfo.gender ? (this.$store.state.userInfo.gender == 1 ? "男" : "女") : "无";
            this.userInfo.phone = this.$store.state.userInfo.phone ? this.$store.state.userInfo.phone : "无";
        },
        data(){
            return{
                show: false,
                url:"http://192.168.14.24:8088/auth/uploadPicture/",
                defaultAvatar:"",
                avatar:"",
                modifyDialog:false,
                userInfo:{
                    userName:"",
                    gender:"",
                    phone:"",
                },
                form: {
                    realName: this.$store.state.userInfo.realName ? this.$store.state.userInfo.realName : "",
                    phone: this.$store.state.userInfo.phone ? this.$store.state.userInfo.phone : "",
                    gender: this.$store.state.userInfo.gender ? (this.$store.state.userInfo.gender).toString() : "1",
                },
                modifyPassword:{
                    oldPassword:"",
                    newPassword:"",
                    confirmPassword:"",
                },
                rules: {
                    realName: [
                    { required: true, message: '请输入用户昵称', trigger: 'blur' },
                    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                    ],
                    phone: [
                    { required: true, trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            toggleShow() {
                this.show = !this.show
            },
            cropSuccess(imgDataUrl, field) {
                console.log("-------- crop success --------");
                console.log(imgDataUrl);
                //把头像设置成上传的图片
                this.avatar = imgDataUrl;
                console.log(field);
            },
            //上传成功回调
            cropUploadSuccess(res, originPicName) {
                //res是后端返回的结果，originPicName是后端接收到图片的名字
                console.log("-------- upload success --------");
                console.log(res);
                let userInfoObj = {};
                userInfoObj.userName = this.$store.state.userInfo.userName;
                userInfoObj.userId = this.$store.state.userInfo.userId;
                userInfoObj.userAvatar = res.data;
                this.imagecropperShow = false;
                // this.imagecropperKey = this.imagecropperKey + 1;
                this.avatar = "http://192.168.14.24:8088/userAvatarFile/"+ res.data;
                console.log("userInfoObjuserInfoObj",userInfoObj);
                this.$store.dispatch("getUserInfo",userInfoObj)
            },
            //上传失败回调
            cropUploadFail(status, field) {
                console.log("-------- upload fail --------");
                console.log("上传失败状态" + status);
                console.log("field: " + field);
            },
            modifyPassWord(){
                console.log("修改密码");
                this.modifyDialog = true;
            },
            saveModifyPassword(){
                console.log("modifyPassword",this.modifyPassword);
                this.$confirm('修改密码后需要从新登录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        let modifyPWObj = JSON.parse(JSON.stringify(this.modifyPassword));
                        modifyPWObj.id = this.$store.state.userInfo.userId;
                        UserInfo.modifyPassword(modifyPWObj).then(res=>{
                            console.log(res);
                            if(res.code === 0){
                                    this.modifyDialog = false;
                                    this.$message({
                                        message: '修改成功',
                                        type: 'success'
                                    });
                                    sessionStorage.setItem("nowSelect","1");
                                    this.$router.push({name:"login"});
                                }else{
                                    this.$message({
                                        message: '修改失败，请重试',
                                        type: 'error'
                                    });
                            }
                        }).catch(err=>{
                            this.modifyDialog = false;
                            console.log(err)
                            this.$message({
                                message: '修改失败，请重试',
                                type: 'error'
                            });
                        })
                    }).catch(() => {
                        // this.modifyDialog = false;
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });          
                });
                
            },
            onSubmit() {
                console.log('submit!');
                console.log(this.form);
                let userInfoObj = JSON.parse(JSON.stringify(this.form));
                userInfoObj.id = this.$store.state.userInfo.userId;
                console.log("userInfoObj",userInfoObj);
                UserInfo.setUser(userInfoObj).then(res=>{
                    console.log(res);
                        if(res.code === 0){
                            this.$message({
                                message: '保存成功',
                                type: 'success'
                            });
                            this.userInfo.gender = res.data.gender;
                            this.userInfo.userName = res.data.username;
                            this.userInfo.phone = res.data.phone;
                            this.form.realName = res.data.realName;
                            this.form.phone = res.data.phone;
                            this.form.gender = (res.data.gender).toString();
                        }else{
                            this.$message({
                            message: '保存失败，请重试',
                            type: 'error'
                        });
                    }
                    
                }).catch(err=>{
                    console.log(err)
                    this.$message({
                        message: '保存失败，请重试',
                        type: 'error'
                    });
                })
            }

        },
        computed:{
            Gender(){
                if(this.userInfo.gender === 1){
                    return "男";
                }else if(this.userInfo.gender === 0){
                    return "女";
                }else{
                    return "无";
                }
            }
        }
    }
</script>
<style scoped>
.userBox{
    display: flex;
    justify-content: space-evenly;
    margin-top: 30px;
}
.userLeft{
    width: 20%;
    height: 500px;
    border: 1px solid #ddd; 
    box-sizing: border-box;
    border-radius: 10px;
    box-shadow:10px 0px 10px 0px rgba(0,0,0,0.1);
}
.userLeft h2{
    font-size: 16px;
    font-weight: bold;
    border-bottom: 1px solid #ebebeb;
    padding-bottom: 20px;
}
.avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }

  .avatar:hover {
    width: 130px;
    height: 130px;
  }
.uesrDetail{
    display: flex;
    justify-content: space-between;
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 20px;
    padding-bottom: 10px;
    border-bottom: 1px dashed #ddd;
}
.modifpw{
    color: #317ef3;
}
.modifpw:hover{
    cursor: pointer;
}
.userRight{
    width: 75%;
    height: 380px;
    padding-top: 10px;
    border: 1px solid #ddd; 
    box-sizing: border-box;
    border-radius: 10px;
    box-shadow:10px 0px 10px 0px rgba(0,0,0,0.1);
}

</style>
