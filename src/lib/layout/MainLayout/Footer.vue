<template>
  <footer class="bg-card text-card-foreground border-t border-border">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <!-- Copyright -->
        <div class="text-muted-foreground text-sm">
          © {{ currentYear }} Horse Racing Game. All rights reserved.
        </div>
        
        <!-- Links -->
        <div class="flex space-x-6 text-sm">
          <a
            href="#"
            class="text-muted-foreground hover:text-primary transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            class="text-muted-foreground hover:text-primary transition-colors"
          >
            Terms of Service
          </a>
          <a
            href="#"
            class="text-muted-foreground hover:text-primary transition-colors"
          >
            Support
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// Component name for linting
defineOptions({
  name: 'MainFooter'
})

const currentYear = computed(() => new Date().getFullYear())
</script> 