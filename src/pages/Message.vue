<template>
	<div>
		<h1>this is Message</h1>
        <!-- 测试params方式传参 -->
        <ul>
            <li v-for="m in messaageList" :key="m.id">
                <!-- 跳转路由并携带params参数，to的字符串写法 -->
				<!-- <router-link :to="`/Message/Detail/${m.id}/${m.title}`">{{m.title}}</router-link>&nbsp;&nbsp; -->
                <!-- 跳转路由并携带params参数，to的对象写法 -->
                <router-link :to="{
                    name:'Detail',
                    params:{
                        id:m.id,
                        title:m.title
                    }
                }">
                    {{ m.title }}
                </router-link>
            </li>
        </ul>
        <!-- 测试query方式传参 -->
        <div v-for="n in newList" :key="n.id">
            <!-- 跳转路由并携带query参数，to的字符串写法 -->
            <!-- <router-link :to="`/Message/New?id=${n.id}&title=${n.title}`">
                {{ n.title }}
            </router-link> -->
            <!-- 跳转路由并携带query参数，to的对象写法 -->
            <router-link :to="{
                path:'/Message/New',
                query:{
                    id:n.id,
                    title:n.title
                }
            }">
                {{ n.title }}
            </router-link>
            
        </div>
        <router-view></router-view>
	</div>
</template>

<script>
	export default {
		name:'Message',
		data() {
			return {
				messaageList:[
                    {id:"001",title:"messgea001"},
                    {id:"002",title:"messgea002"},
                    {id:"003",title:"messgea003"},
                ],
                newList:[
                    {id:"001",title:"new001"},
                    {id:"002",title:"new002"},
                    {id:"003",title:"new003"},
                ]
			}
		},
	}
</script>