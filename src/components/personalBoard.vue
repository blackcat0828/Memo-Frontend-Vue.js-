<template>
  
        <div v-if="!isEditing">
        <b-icon icon="clipboard" aria-hidden="true"></b-icon> 
        
        
        <router-link
              @click.native="isSelected"
              
              :class="{ 'text-danger font-weight-bold': isSelectedBoard}"
              :to="{ name: 'MemoLists', params:{ boardId: board.pboardid.toString()}}">
              {{board.title}}
        </router-link>
        
        
          <b-dropdown variant="white">
            <b-dropdown-item-button @click="onClickUpdate" variant="secondary">
              <b-icon icon="pencil-square" aria-hidden="true"></b-icon>
              이름 수정
            </b-dropdown-item-button>
            <b-dropdown-item-button @click="deleteBoard" variant="secondary">
              <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
              삭제
            </b-dropdown-item-button>
          </b-dropdown>
        </div>
        <div v-else>
          <b-form-input type="text" ref="content" 
            @blur="handleBlur"
            @keydown.enter="onUpdate"
            :value="board.title"></b-form-input>
        </div>
     
</template>

<script>
import {mapActions} from 'vuex'

export default {

name: 'personalBoard',

props: {
  board: {

    type: Object

  },
  selectedBoardId: {
    tyep: Number
  }
},
data () {
    return {
      isEditing: false,
      isActive: false,
   }
},
computed:{
  isSelectedBoard(){
          return this.board.pboardid === this.selectedBoardId;
  }
},
methods: {
  onClickUpdate(){
    this.isEditing = true;
    this.$nextTick(()=>{
        this.$refs.content.focus();
    });
  },
  // updateBoard(e) {
  //   const id = this.memo.id
  //   const content = e.target.value.trim();
  //   if(content.length <= 0){
  //   return false;
  //   }
  //   this.$emit('updateMemo', {id, content });
  //   // this.isEditing = false;
  //   // 수정 완료 후, 인풋에서 포커스를 제거한다.
  //   this.$refs.content.blur();
  // },
  onUpdate(e){
        const pboardid = this.board.pboardid;
        const title = e.target.value.trim();
      
        if(title.length <= 0){
                return false;
          }
        this.$emit('updateBoard', {pboardid, title});

        // 추가 완료 후, 인풋에서 포커스를 제거한다.
        this.$refs.content.blur();
  },
  handleBlur(){
        this.isEditing = false;
  },
  deleteBoard(){
        const pboardid = this.board.pboardid;
        this.$emit('deleteBoard', pboardid);
  },
  isSelected(){
    this.$emit('setSelectedBoardId', this.board.pboardid)
  },
}

}

</script>