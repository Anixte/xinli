<template>
  <v-card class="mx-auto" max-width="300" tile>
    <v-list rounded>
      <v-subheader>Chat List</v-subheader>
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
        @change="changeType()"
      >
        <v-list-item v-for="(item, i) in items" :key="i">
          <v-list-item-avatar>
            <v-img :src="item.avatar"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="item.name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "chatAside",
  data: () => ({
    selectedItem: 0,
    username: JSON.parse(window.sessionStorage.getItem("socketData")).name,
  }),
  methods: {
    changeType() {
      //   console.log(this.selectedItem);
      if (this.selectedItem == 0) {
        this.$store.commit("changeChatType", "group");
      } else {
        this.$store.commit("changeChatType", "private");
      }
      this.$store.commit("setUserInfo", this.items[this.selectedItem]);
    },
  },
  computed: {
    items() {
      let list = this.$store.state.userList;
      list = list.filter((item) => item.name != this.username);
      //   console.log(list);
      return list;
    },
  },
  created() {
    this.changeType();
  },
};
</script>

<style></style>
