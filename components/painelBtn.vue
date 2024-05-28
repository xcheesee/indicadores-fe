<script setup>
const props = defineProps({
  texto: String,
});

const container = ref(null);
const transitionContainer = ref(false);

async function triggerPageTransition(e) {
  //preparando botao para realizar transicao
  const element = e.currentTarget;
  element.classList.remove(
    "bg-white",
    "hover\:bg-primary-200",
    "hover\:border-primary-800",
  );
  element.classList.add("bg-primary-200", "border-primary-800");
  //criando e aplicando styles em clones com position:fixed para animar expansao de pagina
  const [svg, text] = element.children[0].children;
  const svgOffset = svg.getBoundingClientRect();
  const cloneSvg = svg.cloneNode(true);
  const btn = createFixedCloneEle(element, "div");
  btn.style.opacity = "0";
  btn.classList.add("border-2", "border-primary-800", "bg-primary-200");
  const cloneText = createFixedCloneEle(text, "p");
  cloneText.innerText = props.texto;
  cloneText.classList.add(
    "text-primary-700",
    "font-bold",
    "text-3xl",
    "text-center",
  );
  cloneText.style.width = "";
  cloneText.style.opacity = "0";
  cloneSvg.style.position = "fixed";
  cloneSvg.style.left = svgOffset.left + "px";
  cloneSvg.style.top = svgOffset.top + "px";
  cloneSvg.classList.add("text-primary-700");
  cloneSvg.style.opacity = "0";

  await animateTransition(btn, cloneText, cloneSvg, element);
}

async function animateTransition(element, text, svg, og) {
  //aplicar animacoes de pressionar botao e expandi-lo na pagina
  const shrinkAnimation = [
    { transform: "scale(1)" },
    { transform: "scale(.8)" },
    { transform: "scale(1)" },
  ];

  const growAnimation = [
    { borderWidth: "0px", offset: 0.3 },
    {
      width: "100vw",
      height: "100vh",
      top: "0px",
      left: "0px",
      borderWidth: "0px",
    },
  ];

  const textAnimation = [
    {
      top: "22px",
      left: "96px",
      fontSize: "3rem",
      color: "#0b4935",
    },
  ];

  const svgAnimation = [
    { opacity: "0", offset: 0.2 },
    { top: "0px", left: "0px", opacity: "0" },
  ];

  const growTiming = {
    duration: 500,
    iterations: 1,
    fill: "forwards",
    easing: "cubic-bezier(0, 0, 0.2, 1)",
  };

  const pressTiming = {
    duration: 200,
    iterations: 1,
    fill: "forwards",
    easing: "cubic-bezier(0.4, 0, 1, 1)",
  };
  //container com tamanho 100vh/vw para posicionar o clone do botao de position:fixed
  transitionContainer.value = true;
  container.value.appendChild(element);
  container.value.appendChild(text);
  container.value.appendChild(svg);

  await og.animate(shrinkAnimation, pressTiming).finished;
  element.style.opacity = "100";
  svg.style.opacity = "100";
  text.style.opacity = "100";
  og.style.opacity = "0";
  element.animate(growAnimation, growTiming);
  svg.animate(svgAnimation, growTiming);
  return await text.animate(textAnimation, growTiming).finished;
}

function createFixedCloneEle(ele, eleType) {
  const offset = ele.getBoundingClientRect();
  const clone = document.createElement(eleType);
  clone.style.position = "fixed";
  clone.style.left = offset.left + "px";
  clone.style.top = offset.top + "px";
  clone.style.width = offset.width + "px";
  clone.style.height = offset.height + "px";
  return clone;
}
</script>

<template>
  <ClientOnly>
    <div
      class="absolute left-0 top-0 z-20 h-full w-full"
      :class="transitionContainer ? '' : 'hidden'"
      ref="container"
    ></div>
    <button
      @click="
        async (e) => {
          await triggerPageTransition(e);
          return navigateTo({
            path: `/charts/${texto}`,
            query: { fromDash: 'true' },
          });
        }
      "
      class="relative flex h-48 w-full cursor-pointer items-center justify-center gap-4 rounded border-2 border-primary-500 bg-secondary-50 py-4 shadow-lg *:text-primary-700 hover:border-primary-800 hover:bg-primary-300 focus:border-primary-800 focus:bg-primary-300"
      :class="$attrs.class"
    >
      <div
        class="grid grid-cols-[max-content_1fr] items-center justify-center gap-4 px-4"
      >
        <slot name="icone"></slot>
        <p class="justify-self-start text-center text-3xl font-bold">
          {{ texto }}
        </p>
      </div>
    </button>
  </ClientOnly>
</template>
<style scoped>
button {
  outline: none;
}
</style>
