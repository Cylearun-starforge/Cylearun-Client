<script setup lang="ts">

import { ref, reactive, effect } from 'vue';

const emits = defineEmits(['click']);
const props = defineProps({
    maskFile: {
        type: String,
        required: true
    },
})

const state = reactive({
    hover: false,
})
const canvas = document.createElement('canvas');
const buttonRef = ref<HTMLButtonElement>();
const onClick = (e: MouseEvent) => {
    e.preventDefault();
    if (!state.hover) {
        return;
    }
    emits('click', e)
}
const image = new Image();
image.src = props.maskFile
image.onload = setMask;

effect(() => {
    window.addEventListener('resize', setMask);
    return () => {
        window.removeEventListener('resize', setMask);
    }
})

function setMask() {
    canvas.width = buttonRef.value.clientWidth;
    canvas.height = buttonRef.value.clientHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(
        image,
        0,
        0,
        image.width,
        image.height,
        0,
        0,
        buttonRef.value.clientWidth,
        buttonRef.value.clientHeight
    );
}


const onPixel = (x: number, y: number) => {
    const p = getElementViewPosition(buttonRef.value);
    console.log('element', p);
    console.log('hover', x, y)
    const pixel = canvas.getContext('2d').getImageData(x - p.x, y - p.y, 1, 1);
    if (pixel.data[0] === 0 && pixel.data[1] === 0 && pixel.data[2] === 0) {
        return false;
    }
    return true;
};



// 获取元素的绝对位置坐标（像对于浏览器视区左上角）
function getElementViewPosition(element: HTMLElement) {
    // 计算x坐标
    let actualLeft = element.offsetLeft;
    let current = element.offsetParent as HTMLElement;
    while (current !== null) {
        actualLeft += current.offsetLeft + current.clientLeft;
        current = current.offsetParent as HTMLElement;
    }
    let elementScrollLeft;
    if (document.compatMode === 'BackCompat') {
        elementScrollLeft = document.body.scrollLeft;
    } else {
        elementScrollLeft = document.documentElement.scrollLeft;
    }
    const left = actualLeft - elementScrollLeft;
    // 计算y坐标
    let actualTop = element.offsetTop;
    current = element.offsetParent as HTMLElement;
    while (current !== null) {
        actualTop += current.offsetTop + current.clientTop;
        current = current.offsetParent as HTMLElement;
    }
    let elementScrollTop;
    if (document.compatMode === 'BackCompat') {
        elementScrollTop = document.body.scrollTop;
    } else {
        elementScrollTop = document.documentElement.scrollTop;
    }
    const right = actualTop - elementScrollTop;
    // 返回结果
    return { x: left, y: right };
}

</script>


<template>
    <button ref="buttonRef" @mouseleave="state.hover = false"
        @mousemove="e => { state.hover = onPixel(e.clientX, e.clientY) }" @click="onClick"
        :style="{ cursor: state.hover ? 'pointer' : 'initial' }">
        <slot></slot>
    </button>
</template>
