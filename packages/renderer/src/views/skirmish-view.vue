<script setup lang="ts">
import SkirmishBackground from '@/components/skirmish/skirmish-background.vue';
import PlayerInfo from '@/components/game/player-info.vue';
import { Player } from 'config/game/player-type';
import { reactive } from 'vue';
import AddPlayerButton from '@/components/game/add-player-button.vue';
import BackButton from '@/components/back-button.vue';
import SkirmishRightInfo from '@/components/skirmish/skirmish-right-info.vue';
import MapPreview from '@/components/game/map-preview.vue';
import AlphaButton from '@/components/alpha-button.vue';
import GameOptions from '@/components/game/game-options.vue';
import { GameOptionConstructor } from 'config/game/game-options';

const state = reactive({
  players: [] as Player[],
  maxPlayers: 8,
  options: new GameOptionConstructor['标准对战[传统]'](),
  selectingSide: false,
});

state.players.push(
  {
    type: 'human',
    info: {
      avatar: '/user/avatar.png',
      avatarBox: '/user/box.png',
      card: '/user/info_card.png',
      level: '/user/level.png',
      username: '用户名test',
      color: '#0096C3',
      location: 1,
      side: 'fue',
      team: 'A',
    },
  },
  {
    type: 'bot',
    info: {
      style: 'random',
      difficulty: 'hard',
      color: '#00C396',
      location: 1,
      side: 'allied',
      team: 'B',
    },
  }
);

const addPlayer = () => {
  if (state.players.length < state.maxPlayers) {
    state.players.push({
      type: 'empty',
      info: {
        side: 'random',
      },
    });
  }
};
</script>
<template>
  <skirmish-background />
  <div class="skirmish-view-root flex">
    <div>
      <!-- TODO: use user id instead of index -->
      <player-info v-for="(player, i) in state.players" :key="i" :player="player" />
      <add-player-button v-if="state.players.length < state.maxPlayers" @click="addPlayer" />
    </div>
    <div class="skirmish-map-container flex">
      <div class="map-preview-and-options flex flex-col">
        <map-preview :player-count="[1, 4]" :map-name="{ zh: '围困之都', en: 'SIEGE OF' }" />
        <div class="game-options-container flex">
          <alpha-button background="/game/start.png" class="game-start-button">
            <div class="zh">开始游戏</div>
            <div class="en">-S-T-A-R-T-</div>
          </alpha-button>

          <game-options v-model:options="state.options" />
        </div>
      </div>
      <skirmish-right-info />
    </div>
  </div>
  <back-button class="back-button" />
</template>

<style scoped>
.skirmish-view-root {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 20px;
  padding-right: 0;
  gap: 12px;
}

.skirmish-map-container {
  flex: 1;
}

.map-preview-and-options {
  flex: 1;
}

.game-options-container {
  width: 100%;
  justify-content: space-evenly;
}

.game-start-button {
  width: 190px;
  height: 69px;
  background-size: 100% 100%;
}

.game-start-button > div {
  color: rgb(134, 200, 217);
}

.game-start-button > .zh {
  font-size: 26px;
}

.game-start-button > .en {
  font-size: 22px;
}

.back-button {
  position: absolute;
  right: 12px;
  bottom: 12px;
}
</style>
