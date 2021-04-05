<template>
  <!--
    novalidate 속성은 HTML5의 자체적인 유효성 검사를 하지 않도록 설정한 것이다.
    HTML5의 유효성 검사는 브라우저마다 동작이 동일되지 않기 때문에 우리는 직접 유효성 검사를
    진행할 것이다.
   -->
  <b-form @submit.prevent="submit" novalidate>
      <b-form-group
        id="name-group"
        lable="이름:"
        label-for="name"
      >

        <b-form-input type="text" v-model="name" id="name"
         placeholder="이름을 입력해주세요." >
        </b-form-input>
      </b-form-group>

      <b-form-group
        id="email-group"
        lable="이메일:"
        label-for="email"
      >

        <b-form-input type="email" v-model="email" id="email"
        placeholder="이메일을 입력해주세요." >
        </b-form-input>
      </b-form-group>

      <b-form-group
        id="password-group"
        lable="비밀번호:"
        label-for="password"
      >
        <b-form-input type="password" v-model="password" id="password"
        placeholder="비밀번호를 입력해주세요">
        </b-form-input>
      </b-form-group>

      <b-form-group
        id="passwordConfirm-group"
        lable="비밀번호 확인:"
        label-for="passwordConfirm"
      >
        <b-form-input type="password" v-model="passwordConfirm" id="passwordConfirm"
        placeholder="비밀번호를 다시 입력해주세요">
        </b-form-input>
      </b-form-group>

      <b-button type="submit" variant="outline-primary">가입</b-button>

  </b-form>
</template>


<script>
export default {
  name: 'SignupForm',
  data(){
    return {
      name: '',
      email: '',
      password: '',
      passwordConfirm: ''
    }
  },
  methods: {
    submit () {
      const { name, email, password, passwordConfirm } = this
      if (!name || !email || !password || !passwordConfirm){
        alert('모든 항목을 입력해주세요.');
        return
      }
      if (password !== passwordConfirm){
        alert('비밀번호가 일치하지 않습니다.')
        return
      }
      this.$emit('submit', { name, email, password })
    }
  }
}
</script>
