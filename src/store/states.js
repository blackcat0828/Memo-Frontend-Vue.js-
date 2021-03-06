export default {
  boards: [],
  personalBoards:[],
  personalBoardMemoTotalLength:null,
  teamBoards:[],
  memos: [],
  memo: null,
  //토큰 방식의 인증을 사용하는 경우 보안상의 이유로 엑세스 토큰, 리프레쉬 토큰 두 가지 종류의 토큰을 발급한다.
  //실제 자원에 접근하는 데 필요한 엑세스 토큰의 경우 토큰의 유효시간을 정해두고 유효시간이 지나면
  //해당 토큰으로 자원에 접근하지 못한다. 지금은 데모이기 때문에 유효 시간을 정해 두지 않는다.
  accessToken: '',
  me: null,
  owner: null,
  selectedBoardId: null,
}
