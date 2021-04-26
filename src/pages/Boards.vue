<template>
  <div>
    <div>
      <div v-if="personalActive">
        <b-nav tabs fill >
          <b-nav-item active><button id="memoTap" @click="onPersonalBoard">내 메모장</button></b-nav-item>
          <b-nav-item><button id="memoTap" @click="onTeamBoard">팀 메모장</button></b-nav-item>
        </b-nav>
      </div>
      <div v-else>
        <b-nav tabs fill >
          <b-nav-item><button id="memoTap" @click="onPersonalBoard">내 메모장</button></b-nav-item>
          <b-nav-item active><button id="memoTap" @click="onTeamBoard">팀 메모장</button></b-nav-item>
        </b-nav>
      </div>
    </div>
    <div id="sidebar">
      <div v-if="personalActive">
          <div id="personalBoardLists">
            <br>
            <ul>
              <personalBoard v-for="board in personalBoards" :key="board.pboardid" :board="board"
                :selectedBoardId="selectedBoardId"
                @updateBoard="updateBoard"
                @deleteBoard="deleteBoard"
                @deleteBoardMember="deleteBoardMember"
                @addBoardMember="addBoardMember"
                @setSelectedBoardId="setSelectedBoardId"
              />
            </ul>
          </div>
          <div v-if="addPersonalBoardForm">  
              <b-form-input type="text" ref="content" 
              @blur="handleBlur"
              @keydown.enter="onAddPersonalSubmit"
              placeholder="제목 입력후 Enter"></b-form-input>
          </div>

        
          <div id="addButtonArea">
            <button id="addFormButton" @click="onAddPersonalBoardForm">메모장 <b-icon icon="plus-square" aria-hidden="true"></b-icon></button>
          </div>
      </div>


      <div v-else>
          <div id="teamBoardLists">
            <br>
            <ul>
              <teamBoard v-for="board in teamBoards" :key="board.pboardid" :board="board"
                :selectedBoardId="selectedBoardId"
                @deleteBoardMember="deleteBoardMember"
                @setSelectedBoardId="setSelectedBoardId"
              />
            </ul>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState, mapActions} from 'vuex'
import personalBoard from '@/components/PersonalBoard'
import teamBoard from '@/components/TeamBoard'
export default {
  name: 'Boards',
  data () {
    return {
      personalActive: true,
      teamActive: false,
      addPersonalBoardForm: false,
      addTeamBoardForm: false,
      personalBoardTitle: '',
    }
  },
  computed: {
    // isAuthorized 게터를 등록한다.
    ...mapGetters(['isAuthorized']),
    ...mapState(['me','personalBoards','teamBoards','selectedBoardId'])
  },
  methods: {
    onPersonalBoard(){
      this.personalActive = true;
      this.teamActive = false;
    },
    onTeamBoard(){
      this.personalActive = false;
      this.teamActive = true;
    },
    onAddPersonalBoardForm(){
        this.addPersonalBoardForm = true;
        this.$nextTick(()=>{
            this.$refs.content.focus();
        });
    },
    onAddPersonalSubmit(e){
        const owner = this.me.email
        const title = e.target.value.trim();
        const memberList = [];
        if(title.length <= 0){
                return false;
          }
        this.addPersonalBoard({title, owner, memberList})

        // 추가 완료 후, 인풋에서 포커스를 제거한다.
        this.$refs.content.blur();
    },
    updateBoard(payload){
        this.updateBoardTitle(payload);
    },
    handleBlur(){
          this.addPersonalBoardForm = false;
    },
    deleteBoard(pboardid){
      this.deleteBoardAction(pboardid);
    },
    deleteBoardMember(payload){
      this.deleteBoardMemberAction(payload)
    },
    addBoardMember(payload){
      this.addBoardMember(payload);
    },
    setSelectedBoardId(boardid){
      this.setSelectedBoardId(boardid);
    },
    ...mapActions([ 'addPersonalBoard', 'updateBoardTitle', 'deleteBoardAction', 'setSelectedBoardId', 'deleteBoardMemberAction','addBoardMember' ])
  },
  components: { personalBoard, teamBoard }
}
</script>
<style scoped>
  #memoTap{
    border:0;
    outline: 0;
    background-color: white;
  }
  
  
  #addFormButton {
    border:0;
    outline: 0;
    background-color: whitesmoke;
    width: 100%
  }

   ul {
    list-style: none;
    padding-left: 0px;
  }
  #addButtonArea {
    font-size: 20px;
    white-space: nowrap;
    background-color: whitesmoke;
  }
  #sidebar {
    min-height: 765px;
    max-height: 765px;
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>
