import {

  SET_ACCESS_TOKEN,
  SET_MY_INFO,
  DESTROY_ACCESS_TOKEN,
  DESTROY_MY_INFO,
  SET_PERSONALBOARD_INFO,
  SET_TEAMBOARD_INFO,
  DESTROY_PERSONALBOARDS,
  DESTROY_MEMOS,
  ADD_PERSONALBOARD,
  UPDATE_PERSONALBOARD,
  DELETE_PERSONALBOARD,
  SET_PERSONALMEMOS,
  SET_SELECTEDBOARD_ID,
  SET_MEMO,
  SET_MEMO_TOTAL_LENGTH,
  DELETE_BOARD_MEMBER,
  ADD_BOARD_MEMBER
} from './mutations-types'
import api from '@/api'
import Cookies from 'js-cookie'

export default {
  [SET_ACCESS_TOKEN] (state, accessToken){
    // 스토어 상태의 토큰을 업데이트하고
    // api 모듈을 사용하여 HTTP 헤더에 토큰을 심어준다.
    if(accessToken) {
      state.accessToken = accessToken

      //common 필드는 이 Axios 객체에서 어떤 메소드든지 상관없이 헤더에 이 값을 사용한다는 것을 의미
        //defaults.headers.get 으로 사용하면 Axios 객체는 GET 메소드를 사용할때만 이값을 헤더에 사용
        //헤더 안에 여러 필드중 Authorization 필드에 토큰값을 담아주는 것이 목적이므로
        //api.defaults.headers.common.Authorization에 접근한 뒤 Bearer 토큰값과 같은 형식으로 값을
        //담아준다.
      api.defaults.headers.common.Authorization = `Bearer ${accessToken}`

      //쿠키에 토큰을 저장
      Cookies.set('accessToken', accessToken)
    }
  },
  [SET_MY_INFO] (state, me){
    if(me){
      state.me = me
    }
  },
  [SET_PERSONALBOARD_INFO] (state, personalBoardInfo){
    if(personalBoardInfo){
      state.personalBoards = personalBoardInfo
    }
  },
  [SET_TEAMBOARD_INFO] (state, teamBoardInfo){
    if(teamBoardInfo){
      state.teamBoards = teamBoardInfo
    }
  },
  [ADD_PERSONALBOARD] (state, personalBoard){
    if(personalBoard){
      state.personalBoards.push(personalBoard)
    }
  },
  [UPDATE_PERSONALBOARD] (state, personalBoard){
    const {pboardid, title} = personalBoard;
    const targetIndex = state.personalBoards.findIndex(v => v.pboardid === pboardid);
    const targetBoard = state.personalBoards[targetIndex];
    //targetBoard.title = title;
    //객체 내부에 key 중복선언시 나중에 선언한 key가 기존 key값을 덮어씀
    state.personalBoards.splice(targetIndex, 1, {...targetBoard, title})
  },
  [DELETE_PERSONALBOARD] (state, pboardid){
      const targetIndex = state.personalBoards.findIndex(v => v.pboardid === pboardid);
      state.personalBoards.splice(targetIndex, 1);
  },
  [DESTROY_ACCESS_TOKEN] (state) {
    state.accessToken=''
    delete api.defaults.headers.common.Authorization
    Cookies.remove('accessToken')
  },
  [DESTROY_MY_INFO] (state) {
    state.me = null
  },
  [DESTROY_PERSONALBOARDS] (state) {
    state.personalBoards = []
  },
  [DESTROY_MEMOS] (state) {
    state.memos = []
  },
  [SET_PERSONALMEMOS] (state, personalMemos){
    if(personalMemos){
      state.memos = personalMemos;
    }
  },
  [SET_SELECTEDBOARD_ID] (state, boardId){

      state.selectedBoardId = boardId;

  },
  [SET_MEMO] (state, memo){
    state.memo = memo;
  },
  [SET_MEMO_TOTAL_LENGTH] (state, length){
    state.personalBoardMemoTotalLength = length;
  },
  [DELETE_BOARD_MEMBER] (state, payload){
    const {pboardid, boardMember, boardType} = payload
    if(boardType === 'team'){
      const targetBoardIndex = state.teamBoards.findIndex(v => v.pboardid === pboardid);
      // const targetBoard = state.teamBoards[targetBoardIndex];
      // const targetMemberIndex = targetBoard.memberList.findIndex(v => v.boardMember === boardMember)

      state.teamBoards.splice(targetBoardIndex, 1);

    }else{
      const targetBoardIndex = state.personalBoards.findIndex(v => v.pboardid === pboardid);
      const targetBoard = state.personalBoards[targetBoardIndex];
      const targetMemberIndex = targetBoard.memberList.findIndex(v => v.boardMember === boardMember)

      state.personalBoards[targetBoardIndex].memberList.splice(targetMemberIndex, 1);
    }
  },
  [ADD_BOARD_MEMBER] (state, payload){
    const{pboardid, boardMember} = payload  
    const targetBoardIndex = state.personalBoards.findIndex(v => v.pboardid === pboardid);
      
    state.personalBoards[targetBoardIndex].memberList.push(payload);
  },
}
