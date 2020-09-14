type State = {
  pageId:string | null;
}

export const state = ():State => ({
  pageId: null
})

export const mutations = {
  setPage (state:State, pageId:string) {
    state.pageId = pageId
  }
}
export const getters = {
  pageId (state:State) {
    return state.pageId
  }
}
