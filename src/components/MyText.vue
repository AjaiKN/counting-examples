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
import { computed, defineProps, inject } from 'vue'
import type { ComputedRef } from 'vue'
import { useTweened } from '../useTweened'

const speed = inject<ComputedRef<number>>('speed')!
const duration = computed(() => 1 / speed.value / 3)

const props = defineProps<{ x: number; y: number }>()

const tweenedX = useTweened(
	computed(() => props.x),
	() => ({ duration: duration.value })
)
const tweenedY = useTweened(
	computed(() => props.y),
	() => ({ duration: duration.value })
)
</script>
