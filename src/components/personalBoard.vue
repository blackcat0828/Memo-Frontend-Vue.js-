<template>
    <div>
        <div v-if="!isEditing">
          <b-icon icon="clipboard" aria-hidden="true"></b-icon> 
          
          
          <router-link
                @click.native="isSelected"
                
                :class="{ 'text-danger font-weight-bold': isSelectedBoard}"
                :to="{ name: 'MemoLists', params:{ boardId: board.pboardid.toString(), owner: board.owner}}">
                {{board.title}}
          </router-link>
          
          
            <b-dropdown variant="white">
              <b-dropdown-item-button @click="onClickUpdate" variant="secondary">
                <b-icon icon="pencil-square" aria-hidden="true"></b-icon>
                이름 수정
              </b-dropdown-item-button>
              <b-dropdown-item-button v-b-modal=modalName variant="secondary">
                <b-icon icon="people" aria-hidden="true"></b-icon>
                멤버 관리
              </b-dropdown-item-button>          
              <b-dropdown-item-button @click="deleteBoard" variant="secondary">
                <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
                메모장 삭제
              </b-dropdown-item-button>
            </b-dropdown>
        </div>
        <div v-else>
          <b-form-input type="text" ref="content" 
            @blur="handleBlur"
            @keydown.enter="onUpdate"
            :value="board.title"></b-form-input>
        </div>

        <!-- 멤버 관리 모달 -->
        <div>
          <b-modal
            centered
            :id="modalName"
            :title="modalTitle"
            ref="modal"
            cancel-title="닫기"
            ok-title="멤버 추가"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk"
          >


              <div class="mt-3">
                <div>
                  관리자: {{board.owner}}
                </div>
                <br>
                <div v-if="board.memberList.length === 0"></div>
                <div v-else>
                  맴버:
                    <ul>
                        <boardMember v-for="member in board.memberList" :key="member.boardMember" :member="member" :owner="board.owner"
                          @deleteBoardMember="deleteBoardMember"
                        />
                    </ul>
                </div>
                
                <div v-if="board.owner===me.email">
                  <br>
                  <form ref="form" @submit.stop.prevent="handleSubmit">
                    <b-form-group
                      label="추가할 멤버 email:"
                      label-for="name-input"
                      invalid-feedback="email을 입력해 주세요"
                      :state="nameState"
                    >
                      <b-form-input
                        id="name-input"
                        v-model="name"
                        :state="nameState"
                        required
                      ></b-form-input>
                    </b-form-group>
                  </form>
                </div>
              </div>
            </b-modal>
       </div>


    </div>
     
</template>

<script>
import {mapActions, mapState} from 'vuex'
import boardMember from '@/components/BoardMember'

export default {

  name: 'personalBoard',

  props: {
    board: {

      type: Object

    },
    selectedBoardId: {
      tyep: Number
    }
  },
  data () {
      return {
        isEditing: false,
        isActive: false,
        name: '',
        nameState: null,
        submittedNames: [],
        modalName: 'modal'+this.board.pboardid,
        modalTitle: this.board.title + ' 멤버 관리'
    }
  },
  computed:{
    isSelectedBoard(){
            return this.board.pboardid === this.selectedBoardId;
    },
    ...mapState(['me'])

  },
  methods: {
    onClickUpdate(){
      this.isEditing = true;
      this.$nextTick(()=>{
          this.$refs.content.focus();
      });
    },
    onUpdate(e){

          const pboardid = this.board.pboardid;
          const title = e.target.value.trim();
          if(title.length <= 0){
                  return false;
            }

          this.$emit('updateBoard', {pboardid, title});

          // 추가 완료 후, 인풋에서 포커스를 제거한다.
          this.$refs.content.blur();
    },
    handleBlur(){
          this.isEditing = false;
    },
    deleteBoard(){
          const pboardid = this.board.pboardid;
          this.$emit('deleteBoard', pboardid);
    },
    isSelected(){
      this.$emit('setSelectedBoardId', this.board.pboardid)
    },
    checkFormValidity() {
          const valid = this.$refs.form.checkValidity()
          this.nameState = valid
          return valid
    },
    resetModal() {
          this.name = ''
          this.nameState = null
    },
    handleOk(bvModalEvt) {
          // Prevent modal from closing
          bvModalEvt.preventDefault()
          // Trigger submit handler
          this.handleSubmit()
    },
    handleSubmit() {
          if (!this.checkFormValidity()) {
            return
          }
          
          const pboardid = this.board.pboardid;
          const boardMember = this.name;
          this.$emit('addBoardMember', {pboardid, boardMember});
          
          this.resetModal()
    },
    deleteBoardMember(boardMember){
          const pboardid = this.board.pboardid;
          const boardType = 'personal';
          this.$emit('deleteBoardMember', {pboardid, boardMember, boardType});
    },
  },
  components: { boardMember }

}

</script>