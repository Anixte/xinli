<template>
  <v-container class="pa-0">
    <v-row class="mt-4">
      <v-col
        cols="12"
        v-for="(list, index) in msgList"
        :key="index"
        class="pa-0"
      >
        <v-container
          class="pa-0"
          v-if="list.receiver == userInfo.name && userInfo.name == '校园群聊'"
          ><v-container
            ><v-row v-if="list.type == 'user'"
              ><v-col cols="1">
                <v-avatar> <img :src="list.senderimg" alt="" /> </v-avatar
              ></v-col>
              <v-col cols="auto"
                ><v-card height="50px" style="line-height: 35px" class="pa-2">
                  <span class="time">{{ list.sender }}</span
                  >{{ list.msg }}</v-card
                ></v-col
              ></v-row
            >
            <v-row v-else-if="list.type == 'my'" justify="end">
              <v-col cols="auto"
                ><v-card height="50px" style="line-height: 35px" class="pa-2">
                  <span class="time1">{{ list.sender }}</span
                  >{{ list.msg }}</v-card
                ></v-col
              ><v-col cols="1">
                <v-avatar>
                  <img
                    :src="list.senderimg"
                    alt=""
                  /> </v-avatar></v-col></v-row
          ></v-container>
        </v-container>
        <v-container v-else class="pa-0"
          ><v-container
            v-if="
              (list.receiver == myInfo.name && list.sender == userInfo.name) ||
              (list.receiver == userInfo.name && list.sender == myInfo.name)
            "
            ><v-row v-if="list.type == 'user'"
              ><v-col cols="1">
                <v-avatar> <img :src="list.senderimg" alt="" /> </v-avatar
              ></v-col>
              <v-col cols="auto"
                ><v-card height="50px" style="line-height: 35px" class="pa-2">
                  <span class="time">{{ list.sender }}</span
                  >{{ list.msg }}</v-card
                ></v-col
              ></v-row
            >
            <v-row v-else-if="list.type == 'my'" justify="end">
              <v-col cols="auto"
                ><v-card height="50px" style="line-height: 35px" class="pa-2">
                  <span class="time1">{{ list.sender }}</span
                  >{{ list.msg }}</v-card
                ></v-col
              ><v-col cols="1">
                <v-avatar>
                  <img
                    :src="list.senderimg"
                    alt=""
                  /> </v-avatar></v-col></v-row></v-container
        ></v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "chatMsg",
  data() {
    return {
      groupList: [],
      privateList: [],
    };
  },
  computed: {
    msgList() {
      console.log(this.$store.state.userInfo);
      return this.$store.state.chatMessageList;
    },
    myInfo() {
      return this.$store.state.myInfo;
    },
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
};
</script>

<style lang="less" scoped>
.time {
  position: absolute;
  top: -1.5rem;
  left: 0;
  margin: 0;
  padding: 0;
  font-size: 0.32rem;
  width: 5rem;
}

.time1 {
  position: absolute;
  top: -1.5rem;
  right: 0;
  margin: 0;
  padding: 0;
  font-size: 0.32rem;
  width: 5rem;
  text-align: right;
}
</style>
