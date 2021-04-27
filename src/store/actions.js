import api from '@/api'
import store from '@/store'
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

export default {
  async signin ({ commit }, payload){
    const {email, password} = payload
    //토큰 생성 요청
    const result = await api.post(`/auth/signin?email=${email}&&password=${password}`)
    const {Authorization} = result.data
    //토큰 저장후 토큰을 이용하여 다시 user info를 받아오는 요청
    await commit(SET_ACCESS_TOKEN, Authorization)
    const myInfo = await api.get('/users/me')
    await commit(SET_MY_INFO, myInfo.data)
    const personalBoard = await api.get(`/boards/personal?email=${myInfo.data.email}`)
    await commit(SET_PERSONALBOARD_INFO, personalBoard.data)
    const teamBoard = await api.get(`/boards/member?email=${myInfo.data.email}`)
    await commit(SET_TEAMBOARD_INFO, teamBoard.data)
  },
  async signinByToken ({commit}, token){
    // 1. 토큰을 스토어에 커밋한다.
    await commit(SET_ACCESS_TOKEN, token)
    // 2. 사용자의 정보를 받아온 후 스토어에 커밋한다.
    const myInfo = await api.get('/users/me')
    await commit(SET_MY_INFO, myInfo.data)
    const personalBoard = await api.get(`/boards/personal?email=${myInfo.data.email}`)
    await commit(SET_PERSONALBOARD_INFO, personalBoard.data)
    const teamBoard = await api.get(`/boards/member?email=${myInfo.data.email}`)
    await commit(SET_TEAMBOARD_INFO, teamBoard.data)
  },
  signout ({commit}){
    commit(DESTROY_MY_INFO)
    commit(DESTROY_ACCESS_TOKEN)
    commit(DESTROY_PERSONALBOARDS)
    commit(DESTROY_MEMOS)
  },
  async addPersonalBoard({commit}, payload){
    const result = await api.post('/boards/personal', payload)

    if(result.status === 201){
        payload.pboardid = result.data.pboardid;
        await commit(ADD_PERSONALBOARD, payload)
    }
  },
  async updateBoardTitle({commit}, payload){
    const {pboardid, title} = payload
    const result = await api.put(`/boards/personal/${pboardid}`, {title})
    if(result.status === 200){
        await commit(UPDATE_PERSONALBOARD, payload)
    }
  },
  async deleteBoardAction({commit}, pboardid){
      const result = await api.delete(`/boards/personal/${pboardid}`)
      if(result.status === 200){
        commit(DESTROY_MEMOS)
        commit(DELETE_PERSONALBOARD, pboardid)
      }
  },
  async getMemoLists ({commit}, payload){
    await commit(DESTROY_MEMOS)
    const {pboardid, perPage, currentPage} = payload;
    const result1 = await api.get(`/boards/personal/${pboardid}/length`)
    await commit(SET_MEMO_TOTAL_LENGTH, result1.data)
    const result2 = await api.get(`/boards/personal/${pboardid}?perPage=${perPage}&&currentPage=${currentPage}`)
    await commit(SET_PERSONALMEMOS, result2.data)
  },
  async getMemoListsWithTitle ({commit}, payload){
    await commit(DESTROY_MEMOS)
    const {pboardid, perPage, currentPage, title} = payload;
    const result1 = await api.get(`/boards/personal/${pboardid}/search/length?title=${title}`)
    await commit(SET_MEMO_TOTAL_LENGTH, result1.data)
    const result2 = await api.get(`/boards/personal/${pboardid}/search?title=${title}&&perPage=${perPage}&&currentPage=${currentPage}`)
    await commit(SET_PERSONALMEMOS, result2.data)
  },
  setSelectedBoardId ({commit}, boardId){
    commit(SET_SELECTEDBOARD_ID, boardId)
  },
  async addPersonalMemo({commit}, payload){
    const{title, contents, creator, pboardid} = payload
    await api.post(`/boards/personal/${pboardid}/memos`, {title, contents, creator})

  },
  setMemo ({commit}, memoId){
    commit(SET_MEMO, memoId)
  },
  async getMemo({commit}, payload){
    const {pboardid, memoId} = payload
    const result = await api.get(`/boards/personal/${pboardid}/memos/${memoId}`)
    await commit(SET_MEMO, result.data)
  },
  async updatePersonalMemo({commit}, payload){
    const {memoId, pboardid, title, contents} = payload
    await api.put(`/boards/personal/${pboardid}/memos/${memoId}`, {title, contents})
  },
  async deletePersonalMemo({commit}, payload){
    const {pboardid, memoId} = payload
    const result = await api.delete(`/boards/personal/${pboardid}/memos/${memoId}`)
  },
  async deleteBoardMemberAction({commit}, payload){
    const {pboardid, boardMember} = payload
    const result = await api.delete(`/boards/personal/${pboardid}/member?boardMember=${boardMember}`)
    if(result.status === 200){
      await commit(DELETE_BOARD_MEMBER, payload) 
    }
  },
  async addBoardMember({commit}, payload){
    const{pboardid, boardMember} = payload
    const result = await api.post(`/boards/personal/${pboardid}/member`, {boardMember})
    if(result.status === 201){
      await commit(ADD_BOARD_MEMBER, payload)
    }
  },

}
