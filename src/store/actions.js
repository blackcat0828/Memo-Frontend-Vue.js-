import api from '@/api'
import store from '@/store'
import {
  SET_ACCESS_TOKEN,
  SET_MY_INFO,
  DESTROY_ACCESS_TOKEN,
  DESTROY_MY_INFO,
  SET_PERSONALBOARD_INFO,
  DESTROY_PERSONALBOARDS,
  DESTROY_MEMOS,
  ADD_PERSONALBOARD,
  UPDATE_PERSONALBOARD,
  DELETE_PERSONALBOARD,
  SET_PERSONALMEMOS,
  SET_SELECTEDBOARD_ID,
  SET_MEMO
} from './mutations-types'

export default {
  async signin ({ commit }, payload){
    const {email, password} = payload
    const result = await api.post(`/auth/signin?email=${email}&&password=${password}`)
    const {Authorization} = result.data
    await commit(SET_ACCESS_TOKEN, Authorization)
    const myInfo = await api.get('/users/me')
    await commit(SET_MY_INFO, myInfo.data)
    const personalBoard = await api.get(`/boards/personal?email=${myInfo.data.email}`)
    await commit(SET_PERSONALBOARD_INFO, personalBoard.data)
  },
  async signinByToken ({commit}, token){
    // 1. 토큰을 스토어에 커밋한다.
    await commit(SET_ACCESS_TOKEN, token)
    // 2. 사용자의 정보를 받아온 후 스토어에 커밋한다.
    const myInfo = await api.get('/users/me')
    await commit(SET_MY_INFO, myInfo.data)
    const personalBoard = await api.get(`/boards/personal?email=${myInfo.data.email}`)
    await commit(SET_PERSONALBOARD_INFO, personalBoard.data)
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
        commit(DELETE_PERSONALBOARD, pboardid)
      }
  },
  async getMemoLists ({commit}, pboardid){
    await commit(DESTROY_MEMOS)
    const result = await api.get(`/boards/personal/${pboardid}`)
    await commit(SET_PERSONALMEMOS, result.data)
  },
  setSelectedBoardId ({commit}, boardId){
    commit(SET_SELECTEDBOARD_ID, boardId)
  },
  async addPersonalMemo({commit}, payload){
    const{title, contents, pboardid} = payload
    await api.post(`/boards/personal/${pboardid}/memos`, {title, contents})

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

}
