<template>
	<div>
		<h1>this is New</h1>
		<!-- <p>{{$route.query.id}}</p>
		<p>{{$route.query.title}}</p> -->
		<p>{{ id }}</p>
		<p>{{ title }}</p>
	</div>
</template>

<script>
	export default {
		name:'New',
		props:["id","title"],
        mounted(){
            console.log("mounted",this)
        },
		data() {
			return {
				
			}
		},
	}
</script>