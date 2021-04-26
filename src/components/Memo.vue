<template>
    <div>
          <!-- img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            img-top -->
          <b-card
            no-body
            tag="article"
            style="max-width: 380px; min-width: 380px"
            class="mb-2"
          >  
            <template #header>
              <span style="font-size: 13px;">등록일: {{memo.date.replace('T',' / ')}}</span><br>
              <span style="font-size: 13px;">생성자: {{memo.creator}}</span>
            </template>       

            <b-card-body id="cardBody" :title="memo.title">
              <b-card-text>
                {{memo.contents}}
              </b-card-text>
            </b-card-body>

            <template #footer>
              <router-link style="font-size: 14px;" 
                :to="{ name: 'MemoView', 
                params:{ memoId: memo.id.toString(), boardId: boardId.toString()}
                }">
                상세보기<b-icon icon="arrow-right-square" aria-hidden="true"></b-icon>
              </router-link>
            </template>
          
          </b-card>
 

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
    },
  },
  data () {
      return {
        isEditing: false,
    }
  },
}

</script>
<style scoped>

  #cardBody {
    min-height: 200px; 
    max-height: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal; 
 
    text-align: left; 
    word-wrap: break-word; 
  }
</style>