<template>
 
    <v-app>
      <v-sheet height="600" class="mt-12">
        <v-calendar
          ref="calendar"
          v-model="value"
          :weekdays="weekday"
          :type="type"
          :events="events"
          :event-overlap-mode="mode"
          :event-overlap-threshold="30"
          :event-color="getEventColor"
          @click:more="moreEvents"
          @click:date="changeEvents"
          @change="getEventsFromDatabase"
        ></v-calendar>
      </v-sheet>

      <v-form>
        <my-editDate v-if="show" :editedDate="editedDate"></my-editDate>
       </v-form>
    </v-app>
 
</template>

<script>
import * as fb from 'firebase'
import editDate from "./EditDate.vue" // v-show="show"

export default {
  //@change="getEvents"getEventsFromDatabase
  // let
  data: () => ({
    objectDay: "",
    isUserLoggedIn: true,
    type: "month",
    show: false,
    editedDate: "",
    editDescription: "",
    types: ["month", "week", "day", "4day"],
    mode: "stack",
    modes: ["stack", "column"],
    weekday: [0, 1, 2, 3, 4, 5, 6],
    weekdays: [
      { text: "Sun - Sat", value: [0, 1, 2, 3, 4, 5, 6] },
      { text: "Mon - Sun", value: [1, 2, 3, 4, 5, 6, 0] },
      { text: "Mon - Fri", value: [1, 2, 3, 4, 5] },
      { text: "Mon, Wed, Fri", value: [1, 3, 5] }
    ],
    value: "",
    //events: [],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1"
    ],
    names: [
      "Meeting",
      "Holiday",
      "PTO",
      "Travel",
      "Event",
      "Birthday",
      "Conference",
      "Party"
    ]
  }),
  components: {
    myEditDate: editDate
 
  },
  computed: {
    changeHeight() {
      return 900;
    },
    events() {
      return this.$store.getters.allEvents;
    },
    links() {
      return [
        { title: "Login", icon: "lock", url: "/login" },
        { title: "Registration", icon: "face", url: "/registration" }
      ];
    }
  },
  methods: {
    onLogin(){
      alert(1)
      this.$router.push('/login')
    },//{start, end}
     async getEventsFromDatabase() {
         var userId = fb.auth().currentUser.uid;
         console.log('userId', 'user/' + userId) // eslint-disable-line
       const events =  await fb.database().ref('user/' + userId).once('value').then(function(snapshot) {
           var key = snapshot.key
           var massDay = snapshot.child('massday').val()
           console.log('key', key) // eslint-disable-line
           //console.log('childKey', childKey) // eslint-disable-line
           const events = [];
           for (let i = 0; i < massDay.length; i++) {
               events.push({
               start: massDay[i].start,
               name: massDay[i].name,
               end: massDay[i].end,
               color: massDay[i].color
             });  
           }
           return events 
        })
        this.$store.dispatch("writeAllevents", events);
      },
      getEvents({ start, end }) {
      const events = [];
      //   console.log('start', start) // eslint-disable-line
      const min = new Date(`${start.date}T00:00:00`);
      const max = new Date(`${end.date}T23:59:59`);
      // console.log('min', min) // eslint-disable-line
      // const days = (max.getTime() - min.getTime()) / 86400000;
      const eventCount = 3;
      //this.rnd(days, days + 1); //20

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0;
        const firstTimestamp = this.rnd(min.getTime(), max.getTime());
        //   console.log('firstTimestamp',firstTimestamp) // eslint-disable-line
        const first = new Date(firstTimestamp - (firstTimestamp % 900000));
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
        const second = new Date(first.getTime() + secondTimestamp);
        // console.log('start',this.formatDate(first, !allDay)) // eslint-disable-line
        events.push({
          start: this.formatDate(first),
          name: this.names[this.rnd(0, this.names.length - 1)],
          end: this.formatDate(second),
          color: this.colors[this.rnd(0, this.colors.length - 1)]
        });
      }
          this.$store.dispatch("writeAllevents", events);
    },
    moreEvents() {},

    getEventColor(event) {
      return event.color;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    formatDate(a) {
      //console.log('firstTimestamp', `${a.getFullYear()}-0${a.getMonth()+1}`) // eslint-disable-line
      /* console.log(withTime)// eslint-disable-line
         let d = a;
          d = [
            '0' + d.getDate(),
            '0' + (d.getMonth() + 1),
            '' + d.getFullYear(),
            '0' + d.getHours(),
            '0' + d.getMinutes()
          ].map(component => component.slice(-2)); // взять последние 2 цифры из каждой компоненты
           // соединить компоненты в дату
          return d.slice(0, 3).join('-') + ' ' + d.slice(3).join(':');*/
      let year = a.getFullYear();
      let month = a.getMonth() + 1;
      let day = a.getDate();
      let hour = a.getHours();
      let minutes = a.getMinutes();
      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;
      hour = hour < 10 ? "0" + hour : hour;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      return `${year}-${month}-${day} ${hour}:${minutes}`;

      /*  if (a.getMonth()<9){
           return withTime
        ? `${a.getFullYear()}-0${a.getMonth() +
            1}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}`
        : `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`;
        }
        else {
            return withTime
        ? `${a.getFullYear()}-${a.getMonth() +
            1}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}`
        : `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`;
        }*/
    },
    changeEvents(start) {
      var mass = this.events;
      //  const min = new Date(`${start.date}T00:00:00`);
      var min = new Date(`${start.date}T00:00:00`);
      var max = new Date(`${start.date}T23:59:59`);
      min = new Date(min.getTime() + min.getTimezoneOffset() * 60 * 1000);
      max = new Date(max.getTime() + max.getTimezoneOffset() * 60 * 1000);
      var date = new Date(); //Current timestamp
      date = date.toGMTString();
      date = new Date(date); //will convert to present timestamp offset
      //  console.log("date1",date); // eslint-disable-line
      date = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
      console.log("date2", date); // eslint-disable-line
      var mass_events = mass.filter(
        function(number) {
          var numberStart = new Date(number.start);
          numberStart = new Date(
            numberStart.getTime() + numberStart.getTimezoneOffset() * 60 * 1000
          );
          return new Date(numberStart) >= min && new Date(numberStart) <= max;
        },
        max,
        min
      );
     
      this.$store.dispatch("eventsCurrentDate", mass_events);
      var mCurDate = this.$store.getters.currentDate;
      this.$store.dispatch("currentDate", start.date);
      console.log("start.date", start.date); // eslint-disable-line
      
      if (mCurDate == start.date) {
        if (this.show) {
          //   alert(1)
        } else {
          this.show = !this.show;
        }
      } else {
        this.show = true;
      }
    },
    addToSheduler() {
     
    }
  }
};
</script>
