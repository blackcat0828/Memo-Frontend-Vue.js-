<template>
  <b-form @submit.prevent="submit">
      <b-form-group
        id="email-group"
        label="이메일:"
        label-for="email"
        description="나중에 여기에 에러 메세지 표시"
      >

        <b-form-input type="email" v-model="email" id="email"
        placeholder="이메일을 입력해주세요." >
        </b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="비밀번호:"
        label-for="input-2"
      >
        <b-form-input id="input-2" v-model="password" type="password"
        placeholder="비밀번호를 입력해주세요">
        </b-form-input>
      </b-form-group>

      <b-button type="submit" variant="outline-primary">로그인</b-button>

  </b-form>
</template>
<script>
export default {
  name: 'SigninForm',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    submit(){
      const { email, password} = this
      this.$emit('submit', {email, password})
    }
  }
}
</script>
