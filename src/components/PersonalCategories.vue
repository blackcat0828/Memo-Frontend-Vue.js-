<template>
  <div>
  <b-nav tabs>
    <b-nav-item active>개인</b-nav-item>
    <b-nav-item>팀</b-nav-item>
  </b-nav>
</div>

</template>

<script>
import {mapGetters, mapState, mapActions} from 'vuex'

export default {
  name: 'AppHeader',
  data () {
    return {
      isActive: false
    }
  },
  computed: {
    // isAuthorized 게터를 등록한다.
    ...mapGetters(['isAuthorized']),
    ...mapState(['me'])
  },
  methods: {
    ...mapActions([])
  }
}
</script>
