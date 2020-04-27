<template>
  <div>
    <v-calendar
      :start="start"
       v-model="start"
    ></v-calendar>
  </div>
</template>
       <script>
export default {
  props: ["start"]
};
</script>
       