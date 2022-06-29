<script setup lang="ts">
import SkirmishBackground from '@/components/skirmish/skirmish-background.vue';
import UserInfo from '@/components/home/user/user-info.vue';
import AlphaButton from '@/components/alpha-button.vue';
import { RouterLink } from 'vue-router';
import PlayerInfo from '@/components/game/player-info.vue';
import { Player, PlayerTeam, PlayerLocation, PlayerSide } from '@/components/game/player-type';
import { reactive } from 'vue';

const state = reactive({
  players: [] as Player[],
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
      side: {
        zh: '地球联合理事会',
        en: 'F.U.E.',
      },
      team: 'A',
    },
  },
  {
    type: 'bot',
    info: {
      style: '随机',
      difficulty: 'hard',
      color: '#00C396',
      location: 1,
      side: {
        zh: '盟军',
        en: 'ALLIED FORCES',
      },
      team: 'B',
    },
  },
  {
    type: 'empty',
    info: {
      side: {
        zh: '随机',
        en: 'RANDOM',
      },
    },
  }
);
</script>
<template>
  <skirmish-background />
  <div class="skirmish-view-root flex">
    <div>
      <!-- TODO: use user id instead of index -->
      <player-info v-for="(player, i) in state.players" :key="i" :player="player" />
    </div>
  </div>
</template>

<style scoped>
.skirmish-view-root {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 20px;
}
</style>
