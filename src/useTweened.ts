import { computed, reactive, ref, Ref, watch } from 'vue'
import gsap from 'gsap'

export function useTweened(original: Ref<number>, options: any = {}) {
	const tweenedObject = reactive({ value: original.value })
	watch(original, (newVal) => {
		console.log(newVal)
		gsap.to(tweenedObject, { value: newVal, ...options })
	})
	return computed(() => tweenedObject.value)
}
