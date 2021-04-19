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

    <b-card-group deck>
      <memo v-for="memo in memos" :key="memo.id" :memo="memo" :boardId="boardId"/>
    </b-card-group>
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
      test: "테스트",
    }
  },
  created(){

      this.getMemoLists(this.boardId);
  },
  computed: {
    // isAuthorized 게터를 등록한다.
    ...mapGetters(['isAuthorized']),
    ...mapState(['me','memos'])
  },
  methods: {
    ...mapActions([ 'getMemoLists' ])
  },
  components: { Memo }
}
</script>
<style scoped>

  /* .footer{
    position : fixed;
    bottom : 0;
    height: 100px;
  } */

   ul {
    list-style: none;
    padding-left: 0px;
  }
</style>
