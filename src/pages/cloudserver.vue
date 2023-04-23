<template>
    <div style="display:flex;">
        <div style="width:20%; border: 1px solid #ddd;">
            <!-- <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :collapse="isCollapse">
            <el-submenu index="1">
                <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
                </template>
                <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3" disabled>
                <i class="el-icon-document"></i>
                <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <span slot="title">导航四</span>
            </el-menu-item>
            </el-menu> -->
            <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </div>
         <div style="width:2%;">
            <el-image
                style="width: 32px; height: 32px"
                :src="srcImg"
                fit="fill"
                @click="changeModel">
            </el-image>
        </div>
        <div style="width:78%; border: 2px dashed #ddd;">
            {{rightText}}
        </div>
    </div>
</template>
<script>
import menuOpen from '../assets/images/open.png'
import menuClose from '../assets/images/close.png'
export default {
    name:"CloudServer",
    data() {
        return {
            isCollapse:false,
            fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
            srcImg:menuClose,
            data: [{
            label: '一级 1',
                children: [{
                    label: '二级 1-1',
                    children: [{
                    label: '三级 1-1-1'
                    }]
                }]
                }, {
                label: '一级 2',
                children: [{
                    label: '二级 2-1',
                    children: [{
                    label: '三级 2-1-1'
                    }]
                }, {
                    label: '二级 2-2',
                    children: [{
                    label: '三级 2-2-1'
                    }]
                }]
                }, {
                label: '一级 3',
                children: [{
                    label: '二级 3-1',
                    children: [{
                    label: '三级 3-1-1'
                    }]
                }, {
                    label: '二级 3-2',
                    children: [{
                    label: '三级 3-2-1'
                    }]
                }]
            }],
            defaultProps: {
                children: 'children',
                label: 'label',
            },
            rightText:""
        }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      changeModel(){
        console.log(this.srcImg);
        if(this.srcImg == menuOpen){
            this.srcImg = menuClose;
            this.isCollapse = false;
        }else if(this.srcImg == menuClose){
            this.srcImg = menuOpen;
            this.isCollapse = true;
        }
      },
      handleNodeClick(data) {
        console.log(data);
        this.rightText = data.label
      }
    },
}
</script>
<style scoped>

</style>