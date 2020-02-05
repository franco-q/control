<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a v-if="true" class="btn btn-link" href="#"><i class="fa fa-arrow-left"></i></a>
    <template>
      <button class="navbar-toggler" type="button">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item active">
            <router-link :to="{name: 'PlayersList'}">HOME</router-link>
          </li>
          <li class="nav-item active">
            <router-link :to="{name: 'CreatePlayer'}">Nuevo</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Tarifas</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Debitos</a>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0 ml-auto">
          <div class="input-group">
            <input type="text" class="form-control">
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button">Buscar</button>
            </div>
          </div>
        </form>
      </div>
    </template>
  </nav>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
  computed: {
    drawerOpen() {
      return this.$store.getters.drawerOpen
    },

    minToTray() {
      return this.$store.getters.minToTray
    }
  },

  methods: {
    toggleDrawer() {
      this.$store.dispatch('toggleDrawer')
    },

    winClose() {
      ipcRenderer.send('window-close')
    },

    winMinimize() {
      ipcRenderer.send('window-minimize', this.minToTray)
    }
  }
}
</script>

<style lang="scss" scoped>
.Icon--close,
.Icon--minimize {
  & line {
    stroke: $colorBlueGrey;
    transition: $transitionDefault;
  }
}

.Menu-line {
  background-color: $colorBlueGrey;
  display: inline-block;
  transition: $transitionDefault;
  width: 20px;
  height: 2px;
  &:last-child {
    width: 10px;
  }
}

.Menu-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 80%;
  &.is-collapsed {
    & .Menu-line:first-child {
      transform: rotate(-45deg);
      width: 12px;
    }
    & .Menu-line:last-child {
      transform: rotate(45deg);
      width: 12px;
    }
  }
}

.Title {
  color: $colorGreen;
  font-size: 1rem;
  font-weight: 200;
  padding-top: 18px;
}

.Titlebar {
  letter-spacing: 0.05em;
  margin-bottom: 18px;
  position: relative;
  text-align: center;
  height: 50px;
  -webkit-app-region: drag;
}

.Icon-wrapper--titlebar {
  -webkit-app-region: no-drag;
  &:hover .Menu-line {
    background-color: $colorRed;
  }
  &:hover .Icon--close line,
  &:hover .Icon--minimize line {
    stroke: $colorRed;
  }
}
</style>
