<template>
  <div class="container">
    <h1 class="page-headline">채팅방 입장</h1>
    <!-- Responsive toggle switch -->
    <div class="switch-box" v-if="isReady">
      <ul class="switch-list">
        <li
          class="list-item"
          :class="{ selected: selected === 0 }"
          @click="changeSelected(0), (isPreview = false)"
        >
          Użytkownicy
        </li>
        <li
          class="list-item"
          :class="{ selected: selected === 1 }"
          @click="changeSelected(1), (isPreview = true)"
        >
          Czat
        </li>
      </ul>
    </div>
    <!-- End Responsive toggle -->

    <JoinUserComponent
      v-if="!isReady"
      v-model:username="username"
      @submit="joinToChat"
      :errorLoginMsg="errorLoginMsg"
    />

    <div class="wrapper" v-if="isReady">
      <UserListComponent :users="users" :isPreview="isPreview" />
      <ChatBoxComponent
        :isPreview="isPreview"
        :messages="messages"
        :isTyping="isTyping"
        :userId="userId"
        :errorSendMsg="errorSendMsg"
        v-model:message="message"
        @submit="sendMessage"
      />
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { ref, watch } from 'vue'

import JoinUserComponent from './LoginBox'
import UserListComponent from './UserList'
import ChatBoxComponent from './ChatBox'

export default {
  name: 'Chat',
  components: {
    JoinUserComponent,
    UserListComponent,
    ChatBoxComponent,
  },
  setup() {
    const socket = io('http://localhost:3000', {
      withCredentials: true,
    })

    // if you want to run locally, please remove comment below

    //const socket = io('http://localhost:3001')
    const users = ref([])
    const messages = ref([])
    const message = ref('')
    const username = ref('')
    const selected = ref(0)

    let isReady = ref(false)
    let isPreview = ref(false)
    let isTyping = ref(false)
    let userId = ref('')

    const changeSelected = (i) => {
      selected.value = i
    }

    /*********VALIDATE************* */

    let errorLoginMsg = ref('')
    let errorSendMsg = ref('')

    //***************Socket function*******************

    socket.on('initChat', (data) => {
      messages.value = data.messages
    })

    socket.on('userConnected', (username) => {
      console.log(`${username} has joined`)
    })

    socket.on('userDisconnected', (username) => {
      console.log(`${username} has leaved`)
    })

    socket.on('getUsers', (data) => {
      users.value = data
    })

    socket.on('newMessage', (data) => {
      messages.value.push(data)
    })

    // *********User Typing********

    socket.on('isTyping', (data) => {
      isTyping.value = data
    })
    socket.on('stopTyping', () => {
      isTyping.value = false
    })

    watch(message, (m) => {
      m ? socket.emit('isTyping', username.value) : socket.emit('stopTyping')
    })

    //*****Join User to Chat************

    const joinToChat = () => {
      if (/^([a-zA-Z0-9\uAC00-\uD7A3]{3,})+$/.test(username.value) == false) {
        errorLoginMsg.value = '3글자 이상 입력해 주세요!'
      } else {
        console.log(username.value);
        socket.emit('enterUsername', { username: username.value })
        username.value = ''
        isReady.value = true
        userId.value = socket.id
      }
    }

    /*********Send New Message******** */

    const sendMessage = () => {
      console.log(message.value)
      if (message.value == '') {
        errorSendMsg.value = '메시지를 입력해 주세요!'
      } else {
        socket.emit('newMessage', {
          username: username.value,
          message: message.value,
        })
        message.value = ''
      }
    }

    return {
      socket,
      username,
      message,
      users,
      messages,
      joinToChat,
      sendMessage,
      userId,
      isReady,
      isTyping,
      isPreview,
      selected,
      changeSelected,
      errorLoginMsg,
      errorSendMsg,
    }
  },
}
</script>

<style lang="scss">
@use './scss/index.scss' as *;

.wrapper {
  @include flex;
  width: 100%;
  height: 30rem;
}
/*******MEDIA_QUERY*************/

@include smallerPhone {
  .container {
    font-size: $font_size_to_340;
    .wrapper {
      width: 100%;
    }
  }
}
@include mostPhone {
  .container {
    font-size: $font_size_to_340;
    .wrapper {
      width: 100%;
    }
  }
}
@include mostTablets {
  .container {
    font-size: $font_size_to_576;
    .wrapper {
      width: 100%;
    }
  }
}
@include smallerDesktop {
  .container {
    font-size: $font_size_to_1200;
    .wrapper {
      width: 100%;
    }
  }
}
</style>
