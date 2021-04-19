<template>
  <div>
    <div>
      <div v-if="personalActive">
        <b-nav tabs fill >
          <b-nav-item active><button id="memoTap" @click="onPersonalBoard">내 메모</button></b-nav-item>
          <b-nav-item><button id="memoTap" @click="onTeamBoard">팀 메모</button></b-nav-item>
        </b-nav>
      </div>
      <div v-else>
        <b-nav tabs fill id="tab">
          <b-nav-item><button id="memoTap" @click="onPersonalBoard">내 메모</button></b-nav-item>
          <b-nav-item active><button id="memoTap" @click="onTeamBoard">팀 메모</button></b-nav-item>
        </b-nav>
      </div>
    </div>
    <div id="sidebar">
      <div v-if="personalActive">
          <div id="personalBoardLists">
            <ul>
              <personalBoard v-for="board in personalBoards" :key="board.pboardid" :board="board"
                :selectedBoardId="selectedBoardId"
                @updateBoard="updateBoard"
                @deleteBoard="deleteBoard"
                @setSelectedBoardId="setSelectedBoardId"
              />
            </ul>
          </div>
          <div v-if="addPersonalBoardForm">  
              <b-form-input type="text" ref="content" 
              @blur="handleBlur"
              @keydown.enter="onPersonalSubmit"
              placeholder="제목 입력후 Enter"></b-form-input>
          </div>

        
          <div id="addButtonArea">
            <button id="addFormButton" @click="onAddPersonalBoard">메모장 <b-icon icon="plus-square" aria-hidden="true"></b-icon></button>
          </div>
      </div>


      <div v-else>
          <div id="teamBoardLists">
          팀 보드 리스트 출력
          </div>
            <div id="addButtonArea">
              <button id="addFormButton" @click="onAddTeamBoard">메모장 <b-icon icon="plus-square" aria-hidden="true"></b-icon></button>
            </div>
          </b-navbar>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState, mapActions} from 'vuex'
import personalBoard from '@/components/personalBoard'
export default {
  name: 'Boards',
  data () {
    return {
      personalActive: true,
      teamActive: false,
      test: "테스트",
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
    onAddPersonalBoard(){
        this.addPersonalBoardForm = true;
        this.$nextTick(()=>{
            this.$refs.content.focus();
        });
    },
    onPersonalSubmit(e){
        const owner = this.me.email
        const title = e.target.value.trim();
      
        if(title.length <= 0){
                return false;
          }
        this.addPersonalBoard({title, owner})

        // 추가 완료 후, 인풋에서 포커스를 제거한다.
        this.$refs.content.blur();
    },
    updateBoard(payload){
        this.updateBoardTitle(payload);
    },
    handleBlur(){
          this.addPersonalBoardForm = false;
    },
    onAddTeamBoard(){
      
    },
    deleteBoard(pboardid){
      this.deleteBoardAction(pboardid);
    },
    setSelectedBoardId(boardid){
      this.setSelectedBoardId(boardid);
    },
    ...mapActions([ 'addPersonalBoard', 'updateBoardTitle', 'deleteBoardAction', 'setSelectedBoardId' ])
  },
  components: { personalBoard }
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

  /* .footer{
    position : fixed;
    bottom : 0;
    height: 100px;
  } */

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
    max-height: 765px;
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>
