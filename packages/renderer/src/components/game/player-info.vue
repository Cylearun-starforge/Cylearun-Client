<script lang="ts" setup>
import { Player, BotDifficulties, BotStyles } from './player-type';
import { PropType, computed } from 'vue';
import DropdownSelector from './dropdown-selector.vue';

defineEmits(['update:botStyle']);
const props = defineProps({
  /**
   * If user object is null, we render this component as bot mode
   */
  player: {
    type: Object as PropType<Player>,
    required: true,
  },
});

const bosCombatStyles = Object.entries(BotStyles).map(([key, value]) => ({
  display: value,
  value: key,
}));

const hasPlayer = computed(() => props.player.type !== 'empty');

const playerAvatar = computed(() => {
  if (props.player.type === 'empty') {
    return '';
  }

  if (props.player.type === 'human') {
    return props.player.info.avatar;
  }

  return '/user/avatar_ai.png';
});

const playerAvatarBox = computed(() => {
  if (props.player.type === 'empty') {
    return '/user/box.png';
  }

  if (props.player.type === 'human') {
    return props.player.info.avatarBox;
  }

  return '/user/box.png';
});

const playerCard = computed(() => {
  if (props.player.type === 'empty') {
    return '';
  }

  if (props.player.type === 'human') {
    return props.player.info.card;
  }

  return '/user/info_card_ai.png';
});

const playerLevel = computed(() => {
  if (props.player.type === 'human') {
    return props.player.info.level;
  }

  return null;
});

const playerName = computed(() => {
  if (props.player.type === 'empty') {
    return '空位';
  }

  if (props.player.type === 'human') {
    return props.player.info.username;
  }

  return BotDifficulties[props.player.info.difficulty];
});

const playerTeamTag = computed(() => {
  if (props.player.type === 'empty') {
    return '';
  }

  return `/game/team${props.player.info.team}.png`;
});

const sideImage = computed(() => {
  if (props.player.type === 'empty') {
    return '/game/side_random.png';
  }
  switch (props.player.info.side.zh) {
    case '地球联合理事会':
      return '/game/side_fue.png';
    case '盟军':
      return '/game/side_allied.png';
    default:
      return '/game/side_random.png';
  }
});
</script>

<template>
  <div class="player-info-root">
    <img
      v-if="hasPlayer"
      :src="playerAvatar"
      class="player-avatar"
      :style="{ backgroundImage: `url('${playerAvatarBox}')` }"
      draggable="false"
    />
    <div v-else class="player-avatar" :style="{ backgroundImage: `url('${playerAvatarBox}')` }"></div>
    <img v-if="player.type === 'bot'" src="/game/bot_tag.png" class="tag" style="left: 14px" draggable="false" />
    <img v-if="hasPlayer" :src="playerTeamTag" class="tag" style="left: 210px" draggable="false" />
    <div class="player-info-container flex">
      <div class="player-card">
        <img v-if="hasPlayer" :src="playerCard" draggable="false" />
        <div class="info zh">
          <div :class="`name ${!hasPlayer ? 'name-empty' : ' '}`">{{ playerName }}</div>
          <div v-if="props.player.type === 'human'">{{ props.player.info.group ?? '<无战队>' }}</div>
          <div v-if="props.player.type === 'human'">{{ props.player.info.title ?? '<测试称号>' }}</div>
          <dropdown-selector
            v-if="props.player.type === 'bot'"
            class="player-card-bot-style-selector"
            :candidates="bosCombatStyles"
            :value="props.player.info.style"
            @update:value="$emit('update:botStyle', $event)"
          />
        </div>
      </div>
      <div class="side-card">
        <img v-if="hasPlayer" :src="sideImage" draggable="false" />
        <div class="info">
          <div class="zh">{{ props.player.info.side.zh }}</div>
          <div class="en">{{ props.player.info.side.en }}</div>
        </div>
        <div v-if="props.player.type !== 'empty'" class="right-selector-box flex flex-col">
          <div>
            <div class="selector-num">{{ props.player.info.location }}</div>
          </div>
          <div>
            <div :style="{ backgroundColor: props.player.info.color }"></div>
          </div>
        </div>
      </div>
      <div class="level-box">
        <img v-if="playerLevel !== null" :src="playerLevel" draggable="false" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.player-info-root {
  width: 462px;
  height: 86.75px;
}

.player-avatar {
  width: 86.75px;
  height: 86.75px;
  padding: 11px;
  background-size: cover;
  z-index: 10;
}

.player-info-container {
  position: absolute;
  left: 68px;
  top: 0;
  width: calc(100% - 68px);
  height: 100%;
}

.tag {
  position: absolute;
  width: 22.68px;
  height: 40px;
  z-index: 10;
}

.player-card {
  background-image: url('/user/info_card_box.png');
  background-size: 100% 100%;
  width: 196.67px;
  height: 87.22px;
}

.player-card > .info {
  width: 100%;
  height: 100%;
  padding: 8px 28px 8px 16px;
}

.player-card > .info > .name {
  font-size: 20px;
}

.player-card > .info > .name-empty {
  opacity: 0.7;
}

.player-card > .info > div {
  font-size: 16px;
  margin: 4px auto;
}

.player-card-bot-style-selector {
  width: 100%;
  height: 50%;
  color: rgba(255, 255, 255, 0.7);
}

.player-card > img,
.side-card > img {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 8px;
}

.side-card {
  background-image: url('/game/side_box.png');
  background-size: 100% 100%;
  width: 196.67px;
  height: 87.22px;
}

.side-card > .info {
  width: 100%;
  height: 50%;
  transform: translateY(38px);
  padding: 0 8px 0 30px;
}

.side-card > .info > div {
  font-size: 18px;
}

.side-card > .info > .en {
  font-size: 20px;
}
.level-box {
  background-image: url('/user/level_box.png');
  background-size: 100% 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 56px;
  height: 56px;
  transform: translate(-50%, -50%);
}

.level-box > img {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 8px;
}

.right-selector-box {
  width: 36px;
  height: 72px;
  position: absolute;
  right: 8px;
  top: 8px;
  /* transform: translateY(-50%); */
}

.right-selector-box > div {
  background-image: url('/game/right_selector_box.png');
  background-size: 100% 100%;
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.right-selector-box > div > div {
  width: 20px;
  height: 20px;
  background-color: rgba(0, 0, 0, 0.7);
}

.selector-num {
  font-size: 20px;
  font-family: auto;
  text-align: center;
}
</style>
