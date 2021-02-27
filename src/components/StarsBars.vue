<template>
	<div style="background-color: black">
		<svg viewBox="0 0 240 30">
			<my-text v-for="{ x } in stars" :x="x" :y="10">*</my-text>
			<my-text v-for="{ x } in bars" :x="x" :y="9">|</my-text>
			<my-text
				v-for="ind in range(barIndices.length + 1)"
				:x="50 + 40 * ind"
				:y="20"
			>
				{{ (barIndices[ind] ?? 14) - (barIndices[ind - 1] ?? -1) }}
			</my-text>
			<my-text
				v-for="ind in range(barIndices.length)"
				:x="50 + 40 * ind + 20"
				:y="20"
			>
				+
			</my-text>
		</svg>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps } from 'vue'
import MyText from './MyText.vue'

const props = defineProps<{ numStars: number }>()

const TIME_BETWEEN = 0.8

function range(n: number) {
	return [...Array(n).keys()]
}

const stars = computed(() =>
	range(props.numStars).map((i) => ({ x: 32 + i * 12 }))
)
const barIndices = ref([0, 1, 5])
const bars = computed(() =>
	barIndices.value.map((i) => ({ x: 32 + i * 12 + 6 }))
)

function* barIndicesGenerator() {
	for (let i = 0; i < props.numStars - 1; i++) {
		for (let j = i + 1; j < props.numStars - 1; j++) {
			for (let k = j + 1; k < props.numStars - 1; k++) {
				yield [i, j, k]
			}
		}
	}
}

let gen = barIndicesGenerator()

function next() {
	const newVal = gen.next().value
	if (newVal != null) barIndices.value = newVal
}
next()
setInterval(() => {
	next()
}, TIME_BETWEEN * 1000)
</script>
