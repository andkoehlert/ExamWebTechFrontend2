<template>
  <div class="card">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div class="p-7">
        <img src="../../assets/images/" alt="product" class="mx-auto my-7">
      </div>
      <div class="p-7">
        <h3 class="font-bold border-b-2 mb-4 pb-2">Login for elever</h3>
        <p class="text-gray-800 mb-2"></p>
        
     
        <input type="email" 
               class="m-2 p-2 border-l hover:border-b focus:border-b border-blue-600 bg-transparent text-dark-300 focus:outline-none" 
               placeholder="Email" 
               v-model="email" />
      
        <input type="password" 
               class="m-2 p-2 border-l hover:border-b focus:border-b border-blue-600 bg-transparent text-dark-300 focus:outline-none" 
               placeholder="Password" 
               v-model="password" />

        <div class="flex gap-4 mt-4">
          <button
                  class="btn flex" 
                 >
            <i class="material-icons mr-2"><NuxtLink to="/chat/useChat"  class="material-symbols-outlined">login</NuxtLink></i>
            
          </button>
       
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>


</script>

<style scoped>


</style>