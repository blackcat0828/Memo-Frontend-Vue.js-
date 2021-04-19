<template>
  <b-col cols="6">
    <div class="sign-in-page">
      <h3>로그인</h3>
      <signin-form @submit="onSubmit" />
      <p>회원이 아니신가요? <router-link :to="{ name: 'Signup'}">회원가입하러 가기</router-link></p>
    </div>
  </b-col>
</template>

<script>
import SigninForm from '@/components/SigninForm'
import { mapActions, mapState} from 'vuex'

export default {
  name: 'Signin',
  components: {SigninForm},
  computed: {
    ...mapState(['me']),
  },
  methods: {
    async onSubmit(payload){
     await this.signin(payload)
          
    this.$router.push({ name: 'home'})
  

    },
    ...mapActions([ 'signin','getPersonalBoardInfo' ])
  },
}
</script>
