<template>
  <div>
    <b-navbar id="headerMemo" type="light" variant="white">

    <!-- <b-navbar-toggle target="nav-collapse"></b-navbar-toggle> -->

    <!-- <b-collapse id="nav-collapse" is-nav> -->


        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-text>
            <router-link
              :to="{ name: 'MemoForm', params:{ boardId: boardId.toString()}}">
              메모 등록
            </router-link>
          </b-nav-text>
        </b-navbar-nav>
    <!-- </b-collapse> -->
    </b-navbar>


    <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        align="center"
        @page-click="pageClick"
      ></b-pagination>

    <div v-if="memos[0]==null">
      메모를 등록해 주세요.
    </div>
    <div v-else>
      <b-card-group deck>
        <memo v-for="memo in memos" :key="memo.id" :memo="memo" :boardId="boardId"/>
      </b-card-group>
    </div>
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
      perPage: 9,
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

              this.currentPage = page;
              const currentPage = page;
              const perPage = this.perPage;
              const pboardid = this.boardId;
              this.getMemoLists({pboardid, perPage, currentPage});
			},
    ...mapActions([ 'getMemoLists' ])
  },
  components: { Memo }
}
</script>
<style scoped>
</style>
