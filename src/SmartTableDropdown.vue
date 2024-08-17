<script setup>
import {ref, nextTick, onMounted} from "vue";

const isMenuVisible = ref(false);
const dropdown = ref(null);
const menuStyle = ref({});

function toggleMenu() {
  isMenuVisible.value = !isMenuVisible.value;
  if (isMenuVisible.value) {
    nextTick(adjustMenuPosition); // Корректировка позиции после рендеринга
  }
}

function closeMenu(event) {
  if (dropdown.value && !dropdown.value.contains(event.target)) {
    isMenuVisible.value = false;
  }
}

function adjustMenuPosition() {
  nextTick(() => {
    if (dropdown.value) {
      const dropdownRect = dropdown.value.getBoundingClientRect();
      const menuElement = dropdown.value.querySelector('.dropdown-block');

      if (menuElement) {
        const menuRect = menuElement.getBoundingClientRect();

        let top = dropdownRect.bottom;
        let left = dropdownRect.left;

        // Смещение вверх, если меню выходит за нижнюю границу
        if (menuRect.bottom > window.innerHeight) {
          top = dropdownRect.top - menuRect.height;
        }
        // Смещение влево, если меню выходит за правую границу
        if (menuRect.right > window.innerWidth) {
          left = dropdownRect.right - menuRect.width;
          if (left < 0) {
            left = 10; // Отступ в 10px от левой границы
          }
        }

        menuStyle.value = {
          top: `${top}px`,
          left: `${left}px`,
          position: 'fixed',
          zIndex: 1000,
        };
      }
    }
  });
}

onMounted(() => {
  document.addEventListener("click", closeMenu);
});

</script>

<template>
  <div class="dropdown" ref="dropdown">
    <button
        class="dropdown-button"
        type="button"
        @click="toggleMenu"
        aria-expanded="false"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filter" viewBox="0 0 16 16">
        <path
            d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"
        />
      </svg>
    </button>
    <transition name="fade">
      <div
          v-if="isMenuVisible"
          class="dropdown-block show"
          :style="menuStyle"
      >
        <slot name="dropdown">

        </slot>
      </div>
    </transition>
  </div>
</template>

<style>
.dropdown-block {
  display: block;
  background-color: white;
  border: 1px solid #ccc;
  z-index: 1000; /* z-index для выпадания меню поверх остальных элементов */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Тень для меню */
}

.dropdown-button {
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
}
</style>
