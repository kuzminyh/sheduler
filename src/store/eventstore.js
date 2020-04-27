import * as fb from 'firebase'
class userEventDay {
  constructor (user, massday) {
  this.user = user,
  this.massday = massday
 }
}

export default {
    state: {
      currentDate: '',
      allEvents: '',
      eventsCurrentDate: ''
    },
    mutations: {
        writeAllevents (state, payload) {
        state.allEvents = payload
      },
       currentDate (state , payload ){
         state.currentDate = payload
       },
       eventsCurrentDate(state , payload ){
         state.eventsCurrentDate = payload
       },
       addIntoAllEvents(state , payload ){
         state.allEvents.push(payload)
        // console.log('getters.allEvents1',getters.allEvents)// eslint-disable-line
       },
     /* setError (state, payload) {
        state.error = payload
      },
      clearError (state) {
        state.error = null
      }*/
    },
    actions: {
          addIntoAllEvents({commit}, payload) {
       //  console.log('addIntoAllEvents',payload ) // eslint-disable-line
         commit('addIntoAllEvents', payload)
         //console.log('getters.allEvents',getters.allEvents)// eslint-disable-line
        },
      writeAllevents ({commit}, payload) {
        commit('writeAllevents', payload)
      },
      currentDate({commit}, payload) {
       commit('currentDate', payload)
          
      },
      async eventsCurrentDate({commit}, payload) {
         commit('eventsCurrentDate', payload)
      },
    async  copyFromCurrentDateToAllEvents({commit,getters}) {
      
        var min = new Date(`${getters.currentDate}T00:00:00Z`);
        var max = new Date(`${getters.currentDate}T23:59:59Z`);
        max =  new Date(max.getTime() + (max.getTimezoneOffset() * 60 * 1000));

        var currentDate = getters.currentDate
        var dateCurrent = new Date(currentDate)
        dateCurrent = new Date(dateCurrent.getTime() + (dateCurrent.getTimezoneOffset() * 60 * 1000));
        var meventsCurrentDate = getters.eventsCurrentDate
        var eventsAll = getters.allEvents

      
       // console.log('max',max) // eslint-disable-line
       // console.log('eventsAll',eventsAll ) // eslint-disable-line
          
        var newEventsAll = eventsAll.filter(function(number){
        
            var numberStart = new Date(number.start)
        
            return numberStart < dateCurrent | numberStart > max 
             
        },dateCurrent , max, min)
      //   console.log('newEventsAll',newEventsAll ) // eslint-disable-line

        for(var i=0; i<meventsCurrentDate.length-1;i++){

            newEventsAll.push(meventsCurrentDate[i])
        }
         commit('writeAllevents',newEventsAll)
        const userEventDay1 = new userEventDay (
          getters.user,
          newEventsAll
        ) 
        // save data to firebase
         console.log('getters.user', getters.user.id) //eslint-disable-line
         try {
           const dateFb = await fb.database().ref('user/'+getters.user.id).set(userEventDay1) //push
             console.log('dateFb', dateFb) //eslint-disable-line
         } catch (error) {
           throw error
         }
        
      }    
    },
    getters: {
      allEvents (state) {
        return state.allEvents
      },
      eventsCurrentDate (state) {
        return state.eventsCurrentDate
      },
      currentDate (state) {
        return state.currentDate
      },
     /* error (state) {
        return state.error
      }*/
    }
  }