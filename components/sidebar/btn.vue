<script setup>
const { title, icone, collapsable, id, active } = defineProps({
  title: String,
  icone: String,
  collapsable: Boolean,
  id: Number,
  active: Boolean,
});

const open = ref(false);
const collParent = ref(null);
const collSibling = ref(null);
const collEle = ref(null);

function expandSelection() {
  if (collEle.value.style.height) {
    collEle.value.style.height = "";
    open.value = false;
  } else {
    collEle.value.style.height = collEle.value.scrollHeight + "px";
    open.value = true;
  }
}

function collapseSelection() {
  collEle.value.style.height = "";
  open.value = false;
}

onMounted(() => {
  if (collapsable) {
    collEle.value.addEventListener("focusin", expandSelection);
    collParent.value.addEventListener("focusout", collapseSelection);
    collParent.value.addEventListener("mouseleave", collapseSelection);
  }
});

onBeforeUnmount(() => {
  if (collapsable) {
    collEle.value.removeEventListener("focusin", expandSelection);
    collParent.value.removeEventListener("focusout", collapseSelection);
    collParent.value.removeEventListener("mouseleave", collapseSelection);
  }
});
</script>
<template>
  <div class="relative" v-if="collapsable" ref="collParent">
    <div
      v-if="active"
      class="absolute left-0 h-full w-[6px] bg-primary-500"
    ></div>

    <div
      class="grid cursor-pointer grid-cols-[min-content_1fr] gap-4 px-4"
      ref="collSibling"
      @click="expandSelection"
    >
      <Icon :name="icone" size="32" />

      <div class="grid grid-cols-[1fr_min-content] items-center">
        <p>{{ title }}</p>
        <Icon
          name="mdi:chevron-up"
          class="transition-transform"
          :class="[open ? 'rotate-180' : '']"
          size="32"
        />
      </div>
    </div>

    <div
      class="h-0 w-full overflow-hidden pl-8 transition-[height] duration-300"
      ref="collEle"
    >
      <div class="flex flex-col gap-4 pt-4">
        <button
          tabindex="100"
          @click="
            async (e) => {
              e.preventDefault();
              e.currentTarget.blur();
              return await navigateTo({
                path: `/charts/${title}1`,
                query: { fromDash: 'false' },
              });
            }
          "
          class="w-full hover:bg-primary-200 hover:font-bold hover:text-primary-800 focus:bg-primary-200 focus:font-bold focus:text-primary-800"
        >
          {{ title }}1
        </button>
        <button
          tabindex="100"
          @click="
            (e) => {
              e.preventDefault();
              e.currentTarget.blur();
              return navigateTo({
                path: `/charts/${title}2`,
                query: { fromDash: 'false' },
              });
            }
          "
          class="hover:bg-primary-200 hover:font-bold hover:text-primary-800 focus:bg-primary-200 focus:font-bold focus:text-primary-800"
        >
          {{ title }}2
        </button>
      </div>
    </div>
  </div>

  <button
    v-else
    class="flex items-center gap-4 px-4 py-1 hover:bg-primary-200 hover:font-bold hover:text-primary-800 focus:bg-primary-200 focus:font-bold focus:text-primary-800"
    tabindex="100"
    @click="
      (e) => {
        e.preventDefault();
        e.currentTarget.blur();
        return navigateTo({
          path: `/charts/${title}`,
          query: { fromDash: 'false' },
        });
      }
    "
  >
    <Icon :name="icone" size="32" />
    <div>{{ title }}</div>
  </button>
</template>

<style scoped>
button {
  outline: none;
}
</style>
