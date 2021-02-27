<template>
	<my-text
		v-for="ind in range(barIndices.length + 1)"
		:x="beginning + dist * ind"
		:y="20"
		:color="colors[ind]"
	>
		{{ (barIndices[ind] ?? numStars - 1) - (barIndices[ind - 1] ?? -1) }}
	</my-text>
	<my-text
		v-for="ind in range(barIndices.length)"
		:x="beginning + dist * ind + dist / 2"
		:y="20"
	>
		+
	</my-text>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import MyText from './MyText.vue'
import range from '../range'
import colors from '../colors'

const props = defineProps<{ barIndices: number[]; numStars: number }>()

const beginning = 40
const end = 240 - 40
const totalDist = end - beginning
const dist = computed(() => totalDist / props.barIndices.length)
</script>
