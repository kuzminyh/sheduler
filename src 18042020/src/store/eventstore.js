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
      eventsCurrentDate({commit}, payload) {
         commit('eventsCurrentDate', payload)  
      },
     copyFromCurrentDateToAllEvents({commit,getters}) {
      
        var min = new Date(`${getters.currentDate}T00:00:00Z`);
        var max = new Date(`${getters.currentDate}T23:59:59Z`);
        max =  new Date(max.getTime() + (max.getTimezoneOffset() * 60 * 1000));

        var currentDate = getters.currentDate
        var dateCurrent = new Date(currentDate)
        dateCurrent = new Date(dateCurrent.getTime() + (dateCurrent.getTimezoneOffset() * 60 * 1000));

        console.log('getters.currentDate',getters.currentDate) // eslint-disable-line
        console.log('dateCurrent',dateCurrent) // eslint-disable-line
       // 
       // dateCurrent = dateCurrent.toUTCString()
        

        
        var meventsCurrentDate = getters.eventsCurrentDate
        var eventsAll = getters.allEvents

      
        console.log('max',max) // eslint-disable-line
        console.log('eventsAll',eventsAll ) // eslint-disable-line
          
        var newEventsAll = eventsAll.filter(function(number){
        
            var numberStart = new Date(number.start)
             console.log('numberStart0',numberStart   ) // eslint-disable-line
            //numberStart = numberStart.toGMTString();
           //   console.log('numberStart1',numberStart   ) // eslint-disable-line
           // numberStart = new Date(numberStart)
           // console.log('numberStart2',numberStart   ) // eslint-disable-line
             // numberStart = new Date(numberStart.getTime() + numberStart.getTimezoneOffset()*60*1000)  
           // console.log('numberStart3',numberStart   ) // eslint-disable-line
           //console.log('max',max ) // eslint-disable-line
            console.log('huy', `${numberStart < dateCurrent | numberStart > max}`) // eslint-disable-line
            return numberStart < dateCurrent | numberStart > max 
             
        },dateCurrent , max, min)
         console.log('newEventsAll',newEventsAll ) // eslint-disable-line

        for(var i=0; i<meventsCurrentDate.length-1;i++){
            newEventsAll.push(meventsCurrentDate[i])
        }
        
        commit('writeAllevents',newEventsAll)
        
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