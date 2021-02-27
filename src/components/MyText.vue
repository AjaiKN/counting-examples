<template>
	<text v-bind="pos" dominant-baseline="middle" text-anchor="middle"
		><slot
	/></text>
</template>

<script setup lang="ts">
import { defineProps, reactive, watch } from 'vue'
import gsap from 'gsap'

const TWEEN_LEN = 0.4

const props = defineProps<{ x: number; y: number }>()

const pos = reactive({ x: props.x, y: props.y })
watch([() => props.x, () => props.y], ([x, y]) => {
	gsap.to(pos, { x, y, duration: TWEEN_LEN })
})
</script>
