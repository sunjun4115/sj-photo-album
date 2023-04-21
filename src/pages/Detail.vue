<template>
	<div>
		<h1>this is Detail</h1>
        <!-- params参数字符串写法，获取方法 -->
        <!-- <p>消息编号：{{$route.params.id}}</p>
		<p>消息标题：{{$route.params.title}}</p> -->
        <!-- params参数对象写法，在路由器中配置params为true，获取方法 -->
        <p>消息编号：{{id}}</p>
		<p>消息标题：{{title}}</p>
	</div>
</template>

<script>
	export default {
		name:'Message',
        props:['title',"id"],
        mounted(){
            console.log("mounted",this)
        },
		data() {
			return {
				
			}
		},
	}
</script>