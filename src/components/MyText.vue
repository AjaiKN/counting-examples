<template>
	<text
		:x="tweenedX"
		:y="tweenedY"
		dominant-baseline="middle"
		text-anchor="middle"
		><slot
	/></text>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { useTweened } from '../useTweened'

const duration = 0.4

const props = defineProps<{ x: number; y: number }>()

const tweenedX = useTweened(
	computed(() => props.x),
	{ duration }
)
const tweenedY = useTweened(
	computed(() => props.y),
	{ duration }
)
</script>
