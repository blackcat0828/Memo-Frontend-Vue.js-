<template>
  <div id="app">
    <b-container fluid="sm">
      <b-row>
        <b-col><router-view name="header"/></b-col>
      </b-row>

      <b-row align-v="stretch">
        <b-col id="category" cols="3"><router-view name="category"/></b-col>
        <b-col><router-view/></b-col>
      </b-row>



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


</style>

