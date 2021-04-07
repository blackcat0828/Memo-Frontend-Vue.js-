<template>
<div>
  <div v-if="personalActive">
    <b-nav tabs fill>
      <b-nav-item active><button @click="onPersonalBoard">개인</button></b-nav-item>
      <b-nav-item><button @click="onTeamBoard">팀</button></b-nav-item>
    </b-nav>
  </div>
  <div v-else>
    <b-nav tabs fill>
      <b-nav-item><button @click="onPersonalBoard">개인</button></b-nav-item>
      <b-nav-item active><button @click="onTeamBoard">팀</button></b-nav-item>
    </b-nav>
  </div>

  <div v-if="personalActive">
      개인 보드 리스트 출력
  </div>
  <div v-else>
    팀 보드 리스트 출력
  </div>
</div>
</template>

<script>
import {mapGetters, mapState, mapActions} from 'vuex'

export default {
  name: 'AppHeader',
  data () {
    return {
      personalActive: true,
      teamActive: false,
      test: "테스트"
    }
  },
  computed: {
    // isAuthorized 게터를 등록한다.
    ...mapGetters(['isAuthorized']),
    ...mapState(['me','personalBoards','teamBoards'])
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
    ...mapActions([])
  }
}
</script>
<style scoped>
  button {
    border:0;
    outline: 0;
    background-color: white;
  }
</style>
