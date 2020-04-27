<template>
<div>
  <v-data-table
    :headers="headers"
    :items="events"
    sort-by="calories"
    class="elevation-1"
    
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>My CRUD</v-toolbar-title>
        
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-btn color="primary" dark class="mb-2" @click="onSave">Save all tem</v-btn>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="600px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on" @click="newItem">New Item</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model = "editedItem.start" :rules="rules" > label="Start"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field  v-model = "editedItem.end" v-mask= "mask" label="End" placeholder="yyyy/mm/dd hh:mm:ss"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.color" label="Color"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-btn
        small
        class="mr-2"
        @click="editItem(item)"
      >
        edit
      </v-btn>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        delete
      </v-icon>
    </template>
    </v-data-table> 
    
   <div class="text-center pt-2">
      <v-btn color="primary" @click="initialize">Reset</v-btn>

    </div>
  </div>
</template>

<script> 
//:custom-filter="filterOnDate"
import { mask } from 'vue-the-mask'
  export default {
    props: ['editedDate'],  //'events' :masked="masked"  mask="####/##/## ##:##:##" placeholder="dd/mm/yyyy hh:mm:ss" "editedItem.end" v-mask= "mask"
    directives: {
      mask,
    },
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'start',
          align: 'left',
          sortable: false,
          value: 'start',
        },
        { text: 'name', value: 'name' },
        { text: 'end', value: 'end' },
        { text: 'color', value: 'color' },
        { text: 'Actions', value: 'action', sortable: false }
       ],
       mask: "####-##-## ##:##:##" ,
       masked: false,
      desserts: [],
      editedIndex: -1,
      editedItem: {
        start: '',
        name: '',
        end: ''
       },
      defaultItem: {
        start: '',
        name: '',
        end: ''
       },
       rules: [
        value => !!value || 'Required.',
        value => (value || '').length <= 20 || 'Max 20 characters',
        value => {
        //  const pattern = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
          const pattern = /\d{4}-\d{1,2}-\d{1,2} \d{1,2}:\d{2}/
          console.log('value',value) // eslint-disable-line
          return pattern.test(value) || 'Invalid date.'
        },
      ]
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
       events () {
          return  this.$store.getters.eventsCurrentDate
        }

    },

    watch: {
      dialog (val) {
        //alert(1111)
        val || this.close()
       },
    },

    created () {
      //console.log('start',this.formatDate(first, !allDay)) // eslint-disable-line
      this.initialize()
    },

    methods: {
      newItem(){
       // alert(55)
       this.editedItem.start = this.$store.getters.currentDate
       this.editedItem.end = this.$store.getters.currentDate
      },
      onSave( ) {
        // alert(0)
         this.$store.dispatch('eventsCurrentDate', this.events)
   
         this.$store.dispatch('copyFromCurrentDateToAllEvents')
      },
       initialize () {
       /*  var allEvents = this.$store.getters.eventsCurrentDate
         console.log('allEvents ',allEvents) // eslint-disable-line
         console.log('editedDate ',this.editedDate) // eslint-disable-line
         var mass = allEvents
         var ed = this.editedDate
        var mass_events = mass.filter(function(number ){
          console.log('ed ',new Date(ed)) // eslint-disable-line
          console.log('number ', new Date(number.start))   // eslint-disable-line
          // console.log('mass_events ',mass_events) // eslint-disable-line  
          return new Date(number.start) >= new Date(ed)
          },ed)
        console.log('mass_events ',mass_events) // eslint-disable-line */
         //this.events = this.$store.getters.eventsCurrentDate
      },

      editItem (item) {
        //alert(1)
        this.editedIndex = this.events.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.events.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.events.splice(index, 1)
         this.$store.dispatch('eventsCurrentDate', this.events)
         this.$store.dispatch('copyFromCurrentDateToAllEvents')
         console.log('eventsCurrentDate1 ',this.$store.getters.eventsCurrentDate ) // eslint-disable-line  
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
         // alert("save")
        if (this.editedIndex > -1) {
          Object.assign(this.events[this.editedIndex], this.editedItem)
        } else {
          this.events.push(this.editedItem)

         /* var obj =  this.editedItem 
          obj.end = obj.start
          console.log('obj ',obj) // eslint-disable-line 
          this.editedItem = obj*/
          this.$store.dispatch('addIntoAllEvents', this.editedItem)
        }
        this.close()
      },
    },
  }
</script>