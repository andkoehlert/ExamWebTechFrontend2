<template>
  <div>
    <header class="shadow-sm bg-white">
      <nav class="container mx-auto p-4 flex justify-between items-center">
        <NuxtLink to="/" class="font-bold">
          <img src="../assets/images/toll.png" class="h-20" alt="Logo">
        </NuxtLink>

       
        <button @click="toggleMenu" class="lg:hidden text-2xl">
          <span class="material-icons">menu</span>
        </button>

        <!-- Navbar Links -->
        <ul :class="{'flex-col': isMenuOpen, 'hidden': !isMenuOpen, 'lg:flex': true, 'lg:flex-row': !isMenuOpen}" class="flex gap-10 items-center transition-all">
          <li><NuxtLink to="/" class="py-2 px-4">Home</NuxtLink></li>
          <li><NuxtLink to="/about" class="py-2 px-4">About</NuxtLink></li>
       

        <li class="relative">
  <button
    @click="isDropdownOpen = !isDropdownOpen"
    class="py-2 px-4 flex items-center gap-1 hover:bg-gray-100 rounded"
  >
    Default
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>

  <div
    v-if="isDropdownOpen"
    class="absolute top-full mt-1 w-48 bg-white shadow-lg border rounded z-50"
  >
    <NuxtLink
      to="/products/createProduct"
      class="block px-4 py-2 hover:bg-gray-100"
    >
      Create something
    </NuxtLink>
      <NuxtLink
      to="/editor/editor"
      class="block px-4 py-2 hover:bg-gray-100"
    >
      Something
    </NuxtLink>
 

  </div>
</li>
          <li >
  <NuxtLink to="/login/login" class="py-2 px-4">Login</NuxtLink>
</li>

          
        </ul>
      </nav>
    </header>

    <!-- Page content -->
    <div class="container mx-auto p-4">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isDropdownOpen = ref(false);

const isMenuOpen = ref(false);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}
</script>

<style scoped>
.router-link-exact-active {
  font-weight: bold;
}
</style>