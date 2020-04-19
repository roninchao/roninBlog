<template>
    <div class="person-centre">
         <van-field
            v-model="userInfo.username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field name="checkboxGroup" label="技能">
            <template #input>
                <van-checkbox-group v-model="userInfo.checkboxGroup" direction="horizontal">
                <van-checkbox name="1" shape="square">复选框 1</van-checkbox>
                <van-checkbox name="2" shape="square">复选框 2</van-checkbox>
                </van-checkbox-group>
            </template>
        </van-field>
        <van-field name="radio" label="性别">
            <template #input>
                <van-radio-group v-model="userInfo.radio" direction="horizontal">
                <van-radio name="1">单选框 1</van-radio>
                <van-radio name="2">单选框 2</van-radio>
                </van-radio-group>
            </template>
        </van-field>
        <van-field
            v-model="userInfo.email"
            name="邮箱"
            label="邮箱"
            placeholder="邮箱"
            :rules="[{ required: true, message: '请填写邮箱' }]"
        />
         <van-field
            v-model="userInfo.tel"
            name="手机号码"
            label="手机号码"
            placeholder="手机号码"
            :rules="[{ required: true, message: '请填写手机号码' }]"
        />
        <van-field name="uploader" label="头像">
            <template #input>
                <van-uploader v-model="userInfo.uploader" />
            </template>
        </van-field>
        <van-field
        readonly
        clickable
        name="area"
        :value="value"
        label="地址"
        placeholder="选择地址"
        @click="showArea = true"
        />
        <van-popup v-model="showArea" position="bottom">
        <van-area
            :area-list="areaList"
            @confirm="onConfirm"
            @cancel="showArea = false"
        />
        </van-popup>
        <van-field
        readonly
        clickable
        name="calendar"
        :value="value"
        label="出生日期"
        placeholder="点击选择日期"
        @click="showCalendar = true"
        />
        <van-calendar v-model="showCalendar" @confirm="onConfirm2" />
        <van-button type="danger" size="large">保存</van-button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            userInfo:{},
            value: '',
            showArea: false,
            areaList: {}, // 数据格式见 Area 组件文档
            showCalendar:false
        }
    },
    methods: {
        onConfirm(values) {
            this.value = values.map((item) => item.name).join('/');
            this.showArea = false;
        },
        onConfirm2(date) {
        this.value = `${date.getMonth() + 1}/${date.getDate()}`;
        this.showCalendar = false;
        },
    },
}
</script>

<style lang="less" scoped>
    .person-centre{
        width: 100%;
        padding: 1.2rem 0 1.5rem;
    }
</style>