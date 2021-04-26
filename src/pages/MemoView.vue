<template>
  <div>
    <b-form @submit.prevent="submit" novalidate>
        <b-form-group
            id="title-group"
            label-size="lg"
            label="제목:"
            label-for="title"
        >

            <b-form-input type="text" v-model="title" id="title" style="border-color: whitesmoke;"
                :plaintext=!isUpdating>
            </b-form-input>
        </b-form-group>

        <b-form-group
            id="contents-group"
            label-size="lg"
            label="내용:"
            label-for="contents"
        >

            <b-form-textarea
            
            id="contents"
            v-model="contents"
            :plaintext=!isUpdating
            rows="6"
            style="border-color: whitesmoke;"
            ></b-form-textarea>
        </b-form-group>
        <div v-if=hasAuthority>
            <div v-if=!isUpdating>
                <div>
                    <b-button @click.prevent="onUpdateForm" variant="outline-primary">수정</b-button>
                    <b-button @click="onDelete"  variant="outline-primary">삭제</b-button>
                    <b-button @click="back" variant="outline-primary">목록으로</b-button>
                </div>
            </div>
            <div v-else>
                <b-button type="submit" variant="outline-primary">수정 완료</b-button>
                <b-button @click.prevent="onUpdateCancle" variant="outline-primary">취소</b-button>
            </div>
        </div>
        <div v-else>
            <b-button @click="back" variant="outline-primary">목록으로</b-button>
        </div>
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
    },
    memoId: {
      type: String,
      required: true
    },
  },
  data () {
    return {
      isUpdating: false,
      title: '',
      contents: '',
      creator: '',
     }
  },
  async created(){
      const memoId = this.memoId;
      const pboardid = this.boardId;
      await this.getMemo({memoId, pboardid});
      this.title = this.memo.title;
      this.contents = this.memo.contents;
      this.creator = this.memo.creator
     
  },
  computed: {
    hasAuthority(){
        
        //생성자이거나 메모장의 owner 만 수정, 삭제 가능
        return this.me.email === this.creator
    },
    ...mapState(['me','memo'])
  },
  methods: {
    async submit () {
      const { title, contents } = this
      const pboardid = this.boardId;
      const memoId = this.memo.id;
      if (!title || !contents){
        alert('모든 항목을 입력해주세요.');
        return
      }
      await this.updatePersonalMemo({title, contents, pboardid, memoId})
      this.$router.push({
            name: 'MemoLists',
            params: { boardId: pboardid}
      })
    },
    onUpdateForm(){
        this.isUpdating=true;
    },
    async onDelete(){
      const pboardid = this.boardId;
      const memoId = this.memo.id; 
      await this.deletePersonalMemo({memoId, pboardid})
      
      this.$router.push({
            name: 'MemoLists',
            params: { boardId: pboardid}
      })
    },
    onUpdateCancle(){
        this.isUpdating=false;
    },
    back(){
        this.$router.go(-1)
    },
    ...mapActions([ 'getMemo','deletePersonalMemo','updatePersonalMemo' ])
  },
}
</script>
<style scoped>

</style>
