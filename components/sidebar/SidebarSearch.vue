<script setup>
import { Icon } from "@iconify/vue";
import { onBeforeUnmount, onMounted } from "vue";

let animatePesquisaClick;
let animatePesquisaLeave;

onMounted(() => {
  const pesquisarContainer = document.getElementById("pesquisar-container");
  const pesquisarTxt = document.getElementById("pesquisar-txt");
  const sidebar = document.getElementById("sidebar-container");
  const pesquisaBtn = document.getElementById("pesquisar-btn");
  const pesquisaInput = document.getElementById("pesquisar-input");

  animatePesquisaLeave = async () => {
    pesquisarTxt.blur();
    pesquisaInput.blur();
    const pesquisaAnimation = [{ width: "32px", border: "1px solid #ffffff" }];

    const pesquisaTiming = {
      duration: 500,
      iterations: 1,
      fill: "forwards",
      easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    };

    await pesquisarContainer.animate(pesquisaAnimation, pesquisaTiming)
      .finished;
    pesquisarTxt.style.display = "flex";

    return;
  };
  animatePesquisaClick = async () => {
    const pesquisaAnimation = [{ width: "100%", border: "1px solid #737373" }];
    pesquisarContainer.focus();

    const pesquisaTiming = {
      duration: 700,
      iterations: 1,
      fill: "forwards",
      easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    };

    pesquisarTxt.style.display = "none";

    return await pesquisarContainer.animate(pesquisaAnimation, pesquisaTiming)
      .finished;
  };

  pesquisaBtn.addEventListener("focusin", animatePesquisaClick);
  pesquisaBtn.addEventListener("focusout", animatePesquisaLeave);
  sidebar.addEventListener("mouseleave", animatePesquisaLeave);
});

onBeforeUnmount(() => {
  const sidebar = document.getElementById("sidebar-container");
  const pesquisaBtn = document.getElementById("pesquisar-btn");
  pesquisaBtn.removeEventListener("focusin", animatePesquisaClick);
  pesquisaBtn.removeEventListener("focusout", animatePesquisaLeave);
  sidebar.removeEventListener("mouseleave", animatePesquisaLeave);
});
</script>
<template>
  <div
    class="relative flex w-full cursor-pointer items-center gap-4 rounded px-4 py-2"
    id="pesquisar-btn"
    @click="animatePesquisaClick"
  >
    <div
      class="relative w-[32px] overflow-hidden rounded border border-white py-1"
      id="pesquisar-container"
    >
      <input
        placeholder="Tema"
        class="w-[250px]"
        tabindex="99"
        id="pesquisar-input"
      />
      <Icon
        icon="mdi:search"
        class="absolute right-0 top-1/2 z-20 -translate-y-1/2"
        width="32"
        id="pesquisar-id"
      />
    </div>

    <p id="pesquisar-txt">Pesquisar</p>
  </div>
</template>
<style scoped>
#pesquisar-container {
  direction: rtl;
}

input {
  direction: ltr;
}

input:focus {
  outline: none;
}
</style>
