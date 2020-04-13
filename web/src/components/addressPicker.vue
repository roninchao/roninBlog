<template>
    <div class="cascader">
        <el-cascader
            v-model="value"
            :options="options"
            :props="{ expandTrigger: 'hover' }"
            @change="handleChange">
        </el-cascader>
    </div>
</template>
    
<script>
import areaData from '@/public/js/areaData.js'
export default {
    props:{
        defalutAddress:{
            default(){
                return ["1019", "1020", "1023"]
            }
        },
        type:{
            default(){
                return ''
            }
        },
    },
    data(){
        return {
            value: [],
            options: [],
            areaData:[],
        }
    },
    created(){
        this.value = this.defalutAddress;
        this.areaData = JSON.parse(JSON.stringify(areaData.helloyouluckypeople.province).replace(/name/g, "label").replace(/id/g, "value").replace(/city|county/g,"children"));
        this.areaData.map((item,index) => {
            if(!Array.isArray(item.children)){
                item.children = [item.children]
            }
            item.children.map((item2, index2) => {
                if(!Array.isArray(item2.children)){
                    item2.children = [item2.children]
                }
                if(this.type === 2){
                    delete item2.children
                }  
            })
        })
        this.options = this.areaData
        // console.log(this.options)
    },
    methods: {
        handleChange(value) {
            console.log(value)
            this.$emit('change', value)
        }
    }
    
}
</script>
    
<style lang='less' scoped>
    
</style>
