import * as fb from 'firebase'
class User {
  constructor (id, email){
    this.id = id,
    this.email = email
  }
}
export default {
    state: {
     user : null,
      },
    mutations: {
      setUser (state, payload) {
      state.user = payload
      console.log('user' ,payload ) //eslint-disable-line
      }
    },
    actions: {
       async createUser({commit}, {email, password}) {
        try {
          const user = await fb.auth().createUserWithEmailAndPassword(email, password)
          console.log('user.uid' ,user.uid ) //eslint-disable-line
          commit('setUser',new User(user.uid, user.email))

        } catch (error) {
          throw error
        }
      },
      async loginUser({commit}, {email, password} ){
        try {
          const userFb = await fb.auth().signInWithEmailAndPassword(email, password)
          console.log('userFb',userFb) //eslint-disable-line
          commit('setUser',  new User(userFb.user.uid, userFb.user.email) )
          alert("ВЫ вошли поздравляем !");
        } catch (error) {
          console.log('setError', error.message) //eslint-disable-line
          throw error
        }
         
       }
      
    },
    getters: {
      user (state) {
        return state.user
      }
    }
  }