<script setup lang="ts">
import { ref } from 'vue'
import HeroSection from '../components/HeroSection.vue'
import SkillsSection from '../components/SkillsSection.vue'
import ProjectsPreview from '../components/ProjectsPreview.vue'
import ContactCTA from '../components/ContactCTA.vue'
</script>

<template>
  <div>
    <HeroSection />
    <SkillsSection />
    <ProjectsPreview />
    <ContactCTA />
  </div>
</template>