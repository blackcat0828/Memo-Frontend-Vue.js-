<template>
  <div id="app">
    <b-container fluid="sm" class="container">
   
      <router-view name="header"/>
    
    <div id="main">
      <b-row class="side" >
        <b-col id="boards" cols="3"><router-view name="boards" /></b-col>
        <router-view name="auth" />
        <b-col cols="9"><router-view name="Memos" :key="$route.fullPath" /></b-col>
      </b-row>
    </div>
    
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
    .row { margin-bottom: 10px;}
    /* [class|="col"] {
      background: #2db34a;
      border: 1px solid #eaeaed;
      height: px;
      font-size: .8em;
      line-height: 50px;
      text-align: center;
      color: white;
      font-weight: 700;
    } */

  a:link { color: black; text-decoration: none;}
  a:visited { color: black; text-decoration: none;}
  a:hover { color: black; text-decoration: none;}
  body {
   
  }
  

  #app {
    height: 95%;
  }


</style>

