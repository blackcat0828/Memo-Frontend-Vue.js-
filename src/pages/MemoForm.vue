<template>
  <div>
      <b-form @submit.prevent="submit" novalidate>
      <b-form-group
        id="title-group"
        label="제목:"
        label-for="title"
      >

        <b-form-input type="text" v-model="title" id="title"
         placeholder="제목을 입력해주세요." >
        </b-form-input>
      </b-form-group>

      <b-form-group
        id="contents-group"
        label="내용:"
        label-for="contents"
      >

        <b-form-textarea
          id="contents"
          v-model="contents"
          placeholder="내용을 입력해 주세요"
          rows="6"
          max-rows="12"
        ></b-form-textarea>
      </b-form-group>


      <b-button type="submit" variant="outline-primary">등록</b-button>
      <b-button @click="back" variant="outline-primary">목록으로</b-button>

  </b-form>
  </div>
</template>

<script>
import {mapGetters, mapState, mapActions} from 'vuex'
export default {
  name: 'MemoForm',
  props: {
    //라우터의 파라미터를 받아오기 위한 props를 선언
    boardId: {
      type: String,
      required: true
    }
  },
  data () {
    return {

      title: '',
      contents: '',
     }
  },
  computed: {
    // isAuthorized 게터를 등록한다.
    ...mapGetters(['isAuthorized']),
    ...mapState(['me','memos'])
  },
  methods: {
    async submit () {
      const { title, contents } = this
      const pboardid = this.boardId;
      const creator = this.me.email;
      if (!title || !contents){
        alert('모든 항목을 입력해주세요.');
        return
      }
      await this.addPersonalMemo({title, contents, creator, pboardid})
      this.$router.push({
            name: 'MemoLists',
            params: { boardId: pboardid.toString()}
      })
    },
    back(){
        this.$router.go(-1)
    },
    ...mapActions([ 'addPersonalMemo' ])
  },
}
</script>
<style scoped>

</style>
