<template>
  <b-navbar toggleable="lg" type="light" variant="white">
    <b-navbar-brand href="#">Memo</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">Link</b-nav-item>
          <b-nav-item href="#" disabled>Disabled</b-nav-item>
        </b-navbar-nav>


        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <div v-if="isAuthorized">
          <b-nav-text>
              {{me.name}}님 환영합니다.
          </b-nav-text>
          </div>
          <div v-if="isAuthorized">
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>내정보</em>
              </template>
              <b-dropdown-item >프로필</b-dropdown-item>
              <b-dropdown-item @click="onClickSignout">로그아웃</b-dropdown-item>
            </b-nav-item-dropdown>
          </div>

          <div v-else>

              <b-navbar-nav>
                <b-nav-text>
                  <router-link :to="{ name: 'Signin'}">로그인</router-link>
                </b-nav-text>
              </b-navbar-nav>

          </div>

        </b-navbar-nav>
    </b-collapse>
  </b-navbar>

</template>

<script>
import {mapGetters, mapState, mapActions} from 'vuex'

export default {
  name: 'AppHeader',
  computed: {
    // isAuthorized 게터를 등록한다.
    ...mapGetters(['isAuthorized']),
    ...mapState(['me'])
  },
  methods: {

    onClickSignout(){
      this.signout()
      //this.$router.go({name: 'PostListPage'})
    },
    ...mapActions(['signout'])
  }
}
</script>
