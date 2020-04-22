<template>
    <div class="person-centre">
        <md-header>
            <div slot="right" class="save" @click="save">保存</div>
        </md-header>
        <van-field class="avatar">
            <template #input>
                <van-image
                    width="100%"
                    height="100%"
                    fit="cover"
                    class="bottom"
                    :src="userInfo.avatar"
                />
                <van-image
                    width="3rem"
                    height="3rem"
                    fit="cover"
                    class="top"
                    :src="userInfo.avatar"
                />
            </template>
        </van-field>
        <van-field
            v-model="userInfo.username"
            name="用户名"
            label="用户名"
            disabled
            placeholder="用户名"
        />
        <van-field name="radio" label="性别">
            <template #input>
                <van-radio-group v-model="userInfo.sex" direction="horizontal">
                    <van-radio :name="1">女</van-radio>
                    <van-radio :name="2">男</van-radio>
                </van-radio-group>
            </template>
        </van-field>
        <van-field name="checkboxGroup" label="技能">
            <template #input>
                <van-checkbox-group v-model="userInfo.ability" direction="horizontal">
                    <van-checkbox :name="v._id" shape="square" v-for="(v,k) in abilityList" :key="k">{{v.category}}</van-checkbox>
                </van-checkbox-group>
            </template>
        </van-field>
        <van-field
            readonly
            clickable
            name="calendar"
            :value="userInfo.birthday"
            label="出生日期"
            placeholder="选择出生日期"
            @click="showCalendar = true"
        />
        <van-calendar v-model="showCalendar" :show-confirm="false" @confirm="onConfirm" :min-date="minDate" :default-date="new Date(userInfo.birthday)" />
        <van-field
            v-model="userInfo.tel"
            name="手机号码"
            label="手机号码"
            clearable
            placeholder="请填写手机号码"
        />
        <van-field
            v-model="userInfo.email"
            name="邮箱"
            label="邮箱"
            clearable
            placeholder="请填写邮箱"
        />
        <van-button type="danger" size="large" @click="exit">退出</van-button>
    </div>
</template>

<script>
import {mapState, mapMutations, mapActions } from 'vuex'
export default {
    data(){
        return{
            // value: '',
            showCalendar:false,
            minDate: new Date(1970, 1, 1),
        }
    },
    created(){
        this.getCategoryList()
        this.getUserInfo({userId:this.$cookie.get('userID')})
    },
    computed:{
        ...mapState('article', ['abilityList']),
        ...mapState('users', ['userInfo'])
    },
    methods: {
        ...mapMutations('users', ['logout']),
        ...mapActions('article', ['getCategoryList']),
        ...mapActions('users', ['getUserInfo','updateUserInfo']),
        onConfirm(date) {
            this.userInfo.birthday = new Date(date).getFullYear() + '-' + (new Date(date).getMonth()+1) +'-'+new Date(date).getDate()
            this.showCalendar = false;
        },
        exit(){
            this.$dialog.confirm({
                message: '退出登录？',
            }).then(() => {
                this.logout()
            });
        },
        save(){
            this.updateUserInfo()
        }
    },
}
</script>

<style lang="less" scoped>
    .person-centre{
        width: 100%;
        padding: 1.2rem 0 1.5rem;
        .save{
            font-size: 0.35rem;
        }
        .avatar{
            padding: 0;
            position: relative;
            .bottom{
                width: 100%;
                height: 6.5rem!important;
                filter: blur(15px);
            }
            .top{
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                border-radius: 50%;
                overflow: hidden;
            }
        }
        .van-checkbox{
            margin: 0 0.3rem 0.3rem 0;
        }
    }
</style>