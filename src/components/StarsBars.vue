<template>
	<div style="background-color: black">
		<svg viewBox="0 0 240 50">
			<RenderStarsBars :bar-indices="barIndices" :num-stars="numStars" />
			<AdditionStuff :bar-indices="barIndices" :num-stars="numStars" />

			<MyText :x="40" :y="40">Count:</MyText>
			<MyText :x="60" :y="40">{{ count }}</MyText>

			<MyText :x="117" :y="40" :size="16">(</MyText>
			<MyText :x="140" :y="36">{{ numStars }} - 1 gaps</MyText>
			<MyText :x="140" :y="44">{{ numGroups }} - 1 bars</MyText>
			<MyText :x="163" :y="40" :size="16">)</MyText>
			<MyText :x="200" :y="40">
				= {{ numPossibilities }} possibilit{{
					numPossibilities == 1 ? 'y' : 'ies'
				}}
			</MyText>
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
		<div v-if="!isPlaying" style="padding: 1rem">
			<button type="button" @click="next()" style="font-size: 15px">
				Next
			</button>
		</div>
		<p>
			<a href="https://github.com/Aurelius333/counting-examples">Source code</a>
		</p>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, watch, provide, readonly } from 'vue'
import range from '../range'
import RenderStarsBars from './RenderStarsBars.vue'
import AdditionStuff from './AdditionStuff.vue'
import MyText from './MyText.vue'

const numStars = ref(15)
const numGroups = ref(4)
const numBars = computed(() => numGroups.value - 1)

watch(numStars, () => {
	numGroups.value = Math.min(numGroups.value, numStars.value)
})

const count = ref(1)

const barIndices = ref(range(numBars.value))
function restart() {
	barIndices.value = range(numBars.value)
	count.value = 1
}
restart()
watch([numBars, numStars], () => restart())

function moveBarForward(index: number) {
	const maxIndex = numStars.value - 1 - (numBars.value - index)
	barIndices.value[index]++
	if (barIndices.value[index] > maxIndex) {
		if (index === 0) {
			// it's done, so undo the change and the count incrementing
			barIndices.value[index]--
			count.value--
		} else {
			moveBarForward(index - 1)
			barIndices.value[index] = barIndices.value[index - 1] + 1
		}
	}
}

function next() {
	moveBarForward(numBars.value - 1)
	count.value++
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

function combinations(n: number, r: number) {
	let ret = 1
	for (let i = n; i > r; i--) {
		ret *= i
	}
	for (let i = 1; i <= n - r; i++) {
		ret /= i
	}
	return ret
}

const numPossibilities = computed(() =>
	combinations(numStars.value - 1, numGroups.value - 1)
)
</script>
