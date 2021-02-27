<template>
	<StarsBars :numStars="numStars" :key="numStars" />

	<label>
		Number of stars
		<input
			type="range"
			v-model.number="numStars"
			:min="minStars"
			:max="maxStars"
		/>
	</label>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import StarsBars from './components/StarsBars.vue'

const numStars = ref(15)

const minStars = 4
const maxStars = 15
</script>
