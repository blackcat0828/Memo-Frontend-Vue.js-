<template>
    <div>
          <!-- img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            img-top -->
          <b-card
            no-body
            tag="article"
            style="max-width: 240px; min-width: 240px"
            class="mb-2"
          >  
            <template #header>
              <span style="font-size: 13px;">등록일: {{memo.date.replace('T',' / ')}}</span>
            </template>       

            <b-card-body id="cardBody" :title="memo.title">
              <b-card-text>
                {{memo.contents}}
              </b-card-text>
            </b-card-body>

            <template #footer>
              <router-link style="font-size: 20px;" 
                :to="{ name: 'MemoView', params:{ memoId: memo.id.toString(), boardId: boardId.toString()}}">
                상세보기<b-icon icon="arrow-right-square" aria-hidden="true"></b-icon>
              </router-link>
            </template>
          
          </b-card>
              <!-- <router-link
                    :to="{ name: 'MemoLists', params:{ boardId: memo.id.toString()}}">
                    {{memo.title}}
              </router-link> -->

          <div>
</div>
        

    </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {

name: 'Memo',

props: {
  memo: {
    type: Object,
    required: true
  },
  boardId: {
    type: String,
    required: true
  }
},
data () {
    return {
      isEditing: false,
   }
},
methods: {

}

}

</script>
<style scoped>

  #cardBody {
    min-height: 160px; 
    max-height: 160px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal; 
    line-height: 20px; 
    text-align: left; 
    word-wrap: break-word; 
    display: -webkit-box; 
    -webkit-line-clamp: 6; 
    -webkit-box-orient: vertical;
  }
</style>