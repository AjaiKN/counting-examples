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
import { ref, computed, reactive, watch } from 'vue'
import MyText from './MyText.vue'

const TIME_BETWEEN = 2

function range(n: number) {
	return [...Array(n).keys()]
}

const stars = range(15).map((i) => ({ x: 32 + i * 12 }))
const barIndices = ref([0, 1, 5])
const bars = computed(() =>
	barIndices.value.map((i) => ({ x: 32 + i * 12 + 6 }))
)

function* barIndicesGenerator() {
	const len = 15
	for (let i = 0; i < len - 1; i++) {
		for (let j = i + 1; j < len - 1; j++) {
			for (let k = j + 1; k < len - 1; k++) {
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
