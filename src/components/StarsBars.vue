<template>
	<div style="background-color: black">
		<svg viewBox="0 0 240 30">
			<my-text v-for="{ x } in stars" :x="x" :y="10">*</my-text>
			<my-text v-for="{ x } in bars" :x="x" :y="9">|</my-text>
			<AdditionStuff :bar-indices="barIndices" :num-stars="numStars" />
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
				Number of stars: {{ numStars }} <br />
				<input
					type="range"
					v-model.number="numStars"
					:min="3"
					:max="15"
					style="width: 20rem"
				/>
			</label>
		</div>
		<div style="padding: 1rem">
			<label>
				Number of groups: {{ numGroups }} <br />
				<input
					type="range"
					v-model.number="numGroups"
					:min="2"
					:max="numStars"
					style="width: 20rem"
				/>
			</label>
		</div>
		<div style="padding: 1rem">
			<label>
				Speed: {{ speed }} <br />
				<input
					type="range"
					v-model.number="speed"
					:min="0"
					:max="20"
					step="any"
					style="width: 20rem"
				/>
			</label>
		</div>
		<div style="padding: 1rem">
			<button
				type="button"
				@click="isPlaying = !isPlaying"
				style="font-size: 15px"
			>
				{{ isPlaying ? 'Pause' : 'Play' }}
			</button>
			<button type="button" @click="restart" style="font-size: 15px">
				Restart
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, watch, provide, readonly } from 'vue'
import range from '../range'
import MyText from './MyText.vue'
import AdditionStuff from './AdditionStuff.vue'

const numStars = ref(15)
const numGroups = ref(4)
const numBars = computed(() => numGroups.value - 1)

watch(numStars, () => {
	numGroups.value = Math.min(numGroups.value, numStars.value)
})

const width = 240
const beginning = 32
const end = width - beginning
const stars = computed(() =>
	range(numStars.value).map((i) => ({
		x: beginning + (end - beginning) * (i / (numStars.value - 1)),
	}))
)

const barIndices = ref(range(numBars.value))
function restart() {
	barIndices.value = range(numBars.value)
}
restart()
watch([numBars, numStars], () => restart())

const bars = computed(() =>
	barIndices.value.map((i) => ({
		x: beginning + (end - beginning) * ((i + 0.5) / (numStars.value - 1)),
	}))
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

const speed = ref(1 / 0.8)
provide('speed', readonly(speed))

let timeout: number
function start() {
	if (speed.value === 0) return
	timeout = setTimeout(() => {
		next()
		start()
	}, (1 / speed.value) * 1000)
}

const isPlaying = ref(true)
watch(
	[isPlaying, speed],
	([playing]) => {
		if (timeout != null) clearTimeout(timeout)
		if (playing) {
			start()
		}
	},
	{ immediate: true }
)
</script>
