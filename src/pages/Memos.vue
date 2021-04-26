<template>
  <div>
    <b-navbar id="headerMemo" type="light" variant="white">

    <!-- <b-navbar-toggle target="nav-collapse"></b-navbar-toggle> -->

    <!-- <b-collapse id="nav-collapse" is-nav> -->
        <b-nav-form @submit.prevent="pageClick" novalidate> 
          <b-form-input size="sm" class="mr-sm-2" v-model="title" placeholder="제목으로 검색"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit" variant="secondary">검색</b-button>
        </b-nav-form>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-text>
            <b-button size="sm" class="my-2 my-sm-0" variant="secondary">
              <router-link style="color:white;"
                :to="{ name: 'MemoForm', params:{ boardId: boardId.toString()}}">
                메모 등록
              </router-link>
            </b-button>
          </b-nav-text>
        </b-navbar-nav>
    <!-- </b-collapse> -->
    </b-navbar>



    <div v-if="memos[0]==null">
      메모를 등록해 주세요.
    </div>
    <div v-else>
      <b-card-group deck>
        <memo v-for="memo in memos" :key="memo.id" :memo="memo" :boardId="boardId"/>
      </b-card-group>
    </div>
    <br>
    <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        align="center"
        @page-click="pageClick"
      ></b-pagination>
  </div>
</template>

<script>
import {mapGetters, mapState, mapActions} from 'vuex'
import Memo from '@/components/Memo'
export default {
  name: 'Memos',
  props: {
    //라우터의 파라미터를 받아오기 위한 props를 선언
    boardId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      personalActive: true,
      teamActive: false,
      currentPage: 1,
      rows: null,
      perPage: 4,
      title: '',
    }
  },
  async created(){
      const pboardid = this.boardId;
      const perPage = this.perPage
      const currentPage = this.currentPage
      await this.getMemoLists({pboardid, perPage, currentPage});
      this.rows = this.personalBoardMemoTotalLength;
  },
  computed: {
    // isAuthorized 게터를 등록한다.
    ...mapGetters(['isAuthorized']),
    ...mapState(['me','memos', 'personalBoardMemoTotalLength'])
  },
  methods: {
      pageClick: function (bvEvent, page){
              const {title} = this
              this.title = title;
              let currentPage = page;
              if(page){
                this.currentPage = page;
                currentPage = page;
              }else{
                this.currentPage = 1;
                currentPage = 1;
              }
              
              const perPage = this.perPage;
              const pboardid = this.boardId;

              if(this.title){
                this.getMemoListsWithTitle({pboardid, title, perPage, currentPage})
                this.rows = this.personalBoardMemoTotalLength;
              }else{
                this.getMemoLists({pboardid, perPage, currentPage});
              }
			},
    ...mapActions([ 'getMemoLists','getMemoListsWithTitle' ])
  },
  components: { Memo }
}
</script>
<style scoped>
</style>
