<template>
    <div class="userBox">
        <div class="userLeft">
            <h2>个人信息</h2>
            <div style="text-align: center">
              <div class="el-upload">
                <!-- <img :src="avatar ? baseApi + '/avatar/' + user.avatarName : Avatar" title="点击上传头像" class="avatar" @click="toggleShow"> -->
                <img :src="avatar ? avatar : defaultAvatar" title="点击上传头像" class="avatar" @click="toggleShow">
                <myUpload
                :modelValue.sync="show"
                @crop-success="cropSuccess"
                @crop-upload-success="cropUploadSuccess"
                @crop-upload-fail="cropUploadFail"
                url="http://192.168.14.24:8088/auth/uploadPicture/1"
                />
              </div>
            </div>
            <div style="margin-top: 50px;">
            <div class="uesrDetail">
                <div>登录账号</div>
                <div>sunjun</div>
            </div>
            <div class="uesrDetail">
                <div>性别</div>
                <div>男</div>
            </div>
            <div class="uesrDetail">
                <div>手机号码</div>
                <div>15288888888</div>
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
                <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="名称" >
                    <el-input v-model="form.nickName"></el-input>
                </el-form-item>
                <el-form-item label="手机号" >
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="form.sex">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
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
        <el-form label-width="80px">
            <el-form-item label="旧密码" >
                <el-input v-model="modifyPassword.oldPassword"></el-input>
            </el-form-item>
            <el-form-item label="新密码" >
                <el-input v-model="modifyPassword.newPassword"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" >
                <el-input v-model="modifyPassword.confirmPassword"></el-input>
            </el-form-item>
           
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="modifyDialog = false">取 消</el-button>
            <el-button type="primary" @click="saveModifyPassword">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>
<script>
    import myUpload from 'vue-image-crop-upload'
    export default{
        name:"UserInfo",
        props:["userId"],
        components: { myUpload },
        mounted(){
            console.log("userInfo",this)
            this.defaultAvatar = "http://192.168.14.24:8088/userAvatarFile/"+ this.$store.state.userInfo.userAvatar
        },
        data(){
            return{
                show: false,
                defaultAvatar:"",
                avatar:"",
                modifyDialog:false,
                form: {
                    nickName: '',
                    phone: '',
                    sex: '',
                },
                modifyPassword:{
                    oldPassword:"",
                    newPassword:"",
                    confirmPassword:"",
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
                this.modifyDialog = false;
            },
            onSubmit() {
                console.log('submit!');
                console.log(this.form);
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
