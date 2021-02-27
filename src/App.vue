<template>
	<StarsBars :numStars="numStars" :key="numStars.toString() + keyChanger" />

	<label>
		Number of stars
		<input
			type="range"
			v-model.number="numStars"
			:min="minStars"
			:max="maxStars"
		/>
	</label>
	<button type="button" @click="restart">Restart</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import StarsBars from './components/StarsBars.vue'

// TODO: hacky
const keyChanger = ref(false)
function restart() {
	keyChanger.value = !keyChanger.value
}

const numStars = ref(15)

const minStars = 4
const maxStars = 15
</script>
