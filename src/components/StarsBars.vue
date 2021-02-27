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
				{{ (barIndices[ind] ?? numStars - 1) - (barIndices[ind - 1] ?? -1) }}
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

	<div
		style="
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			font-size: 20px;
		"
	>
		<div style="padding: 1rem">
			<label>
				Number of stars <br />
				<input
					type="range"
					v-model.number="numStars"
					:min="4"
					:max="15"
					style="width: 20rem"
				/>
			</label>
		</div>
		<div style="padding: 1rem">
			<label>
				Number of groups <br />
				<input
					type="range"
					v-model.number="numGroups"
					:min="1"
					:max="numStars"
					style="width: 20rem"
				/>
			</label>
		</div>
		<div style="padding: 1rem">
			<button type="button" @click="restart" style="font-size: 15px">
				Restart
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import MyText from './MyText.vue'

const numStars = ref(15)
const numGroups = ref(4)
const numBars = computed(() => numGroups.value - 1)

watch(numStars, () => {
	numGroups.value = Math.min(numGroups.value, numStars.value)
})

const TIME_BETWEEN = 0.8

function range(n: number) {
	return [...Array(n).keys()]
}

const stars = computed(() =>
	range(numStars.value).map((i) => ({ x: 32 + i * 12 }))
)
const barIndices = ref(range(numBars.value))
function restart() {
	barIndices.value = range(numBars.value)
}
restart()
watch(numBars, () => restart())

const bars = computed(() =>
	barIndices.value.map((i) => ({ x: 32 + i * 12 + 6 }))
)

function next(index = numBars.value - 1) {
	const maxIndex = numStars.value - 1 - (numBars.value - index)
	barIndices.value[index]++
	if (barIndices.value[index] > maxIndex) {
		if (index === 0) {
			barIndices.value[index]--
		} else {
			next(index - 1)
			barIndices.value[index] = barIndices.value[index - 1] + 1
		}
	}
}
setInterval(() => {
	next()
}, TIME_BETWEEN * 1000)
</script>
