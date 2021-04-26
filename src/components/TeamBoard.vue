<template>
    <div>

        <b-icon icon="clipboard" aria-hidden="true"></b-icon> 
        
        
        <router-link
              @click.native="isSelected"
              
              :class="{ 'text-danger font-weight-bold': isSelectedBoard}"
              :to="{ name: 'MemoLists', params:{ boardId: board.pboardid.toString(), owner: board.owner}}">
              {{board.title}}
        </router-link>
        
        
          <b-dropdown variant="white">

            <b-dropdown-item-button v-b-modal=modalName variant="secondary">
              <b-icon icon="people" aria-hidden="true"></b-icon>
              멤버 관리
            </b-dropdown-item-button>          

          </b-dropdown>



        <!-- 멤버 관리 모달 -->
        <div>
          <b-modal
            centered
            :id="modalName"
            :title="modalTitle"
            hide-footer
          >


              <div class="mt-3">
                <div>
                  관리자: {{board.owner}}
                </div>
                <br>
                <div v-if="board.memberList.length === 0"></div>
                <div v-else>
                  맴버:
                        <ul>
                            <boardMember v-for="member in board.memberList" :key="member.boardMember" :member="member" :owner="board.owner"
                            @deleteBoardMember="deleteBoardMember"
                            />
                        </ul>
                </div>
              </div>
          </b-modal>
        </div>


    </div>
     
</template>

<script>
import {mapActions, mapState} from 'vuex'
import boardMember from '@/components/BoardMember'

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
        modalName: 'modal'+this.board.pboardid,
        modalTitle: this.board.title + ' 멤버 관리'
    }
    },
    computed:{
    isSelectedBoard(){
            return this.board.pboardid === this.selectedBoardId;
    },
    ...mapState(['me'])

    },
    methods: {

    isSelected(){
        this.$emit('setSelectedBoardId', this.board.pboardid)
    },
    deleteBoardMember(boardMember){
        const pboardid = this.board.pboardid;
        const boardType = 'team';
        this.$emit('deleteBoardMember', {pboardid, boardMember, boardType});
    },
    },
    components: { boardMember }

}

</script>