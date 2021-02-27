<template>
	<my-text
		v-for="{ x, groupNum } in stars"
		:x="x"
		:y="10"
		:color="colors[groupNum]"
		>*</my-text
	>
	<my-text v-for="{ x } in bars" :x="x" :y="9">|</my-text>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import MyText from './MyText.vue'
import range from '../range'
import colors from '../colors'

const props = defineProps<{ numStars: number; barIndices: number[] }>()

const width = 240
const beginning = 32
const end = width - beginning

const stars = computed(() =>
	range(props.numStars).map((i) => ({
		x: beginning + (end - beginning) * (i / (props.numStars - 1)),
		groupNum: [...props.barIndices, Infinity].findIndex((num) => num >= i),
	}))
)

const bars = computed(() =>
	props.barIndices.map((i) => ({
		x: beginning + (end - beginning) * ((i + 0.5) / (props.numStars - 1)),
	}))
)
</script>
