<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import emailjs from '@emailjs/browser'
import { gsap, reduced } from '../lib/gsap'
import { site } from '../data/site'
import type { FormData } from '../types'
import ArrowIcon from '../components/ArrowIcon.vue'

const blank: FormData = { name: '', email: '', subject: '', message: '' }
const form = reactive<FormData>({ ...blank })
const errors = reactive<FormData>({ ...blank })
const sending = ref(false)
const sent = ref(false)
const failed = ref('')

const root = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

const channels = [
  { label: 'Email', value: site.email, url: `mailto:${site.email}` },
  { label: 'WhatsApp', value: site.phoneDisplay, url: site.whatsapp },
  { label: 'LinkedIn', value: 'Edafe Prosper', url: site.linkedin },
  { label: 'GitHub', value: '@Prosperedafe', url: site.github },
  { label: 'Résumé', value: 'Download PDF', url: site.resume },
]

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)

function validate() {
  errors.name = form.name.trim() ? '' : 'Please tell me your name.'
  errors.email = !form.email.trim()
    ? 'I need an email to reply to.'
    : emailOk(form.email.trim())
      ? ''
      : 'That email does not look right.'
  errors.subject = form.subject.trim() ? '' : 'Add a short subject.'
  errors.message = form.message.trim().length >= 10 ? '' : 'Give me a little more detail (10 characters or more).'
  return !errors.name && !errors.email && !errors.subject && !errors.message
}

async function submit() {
  failed.value = ''
  if (!validate()) {
    // A quick shake so the problem is hard to miss.
    if (!reduced) gsap.fromTo('.contact-form', { x: -8 }, { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' })
    return
  }
  sending.value = true
  try {
    await emailjs.send(
      'service_njc5ljg',
      'template_r8xeep1',
      {
        from_name: form.name,
        to_name: 'Prosper',
        from_email: form.email,
        subject: form.subject,
        message: form.message,
      },
      'DRN_vB7PkDwvIdX1O',
    )
    Object.assign(form, blank)
    sent.value = true
  } catch (error) {
    console.error('Form submission error:', error)
    failed.value = 'That did not go through. Please try again, or message me on WhatsApp.'
  } finally {
    sending.value = false
  }
}

onMounted(() => {
  if (reduced || !root.value) return
  ctx = gsap.context((self) => {
    const q = self.selector!
    q('.channel').forEach((row: HTMLElement, i: number) => {
      gsap
        .timeline({ scrollTrigger: { trigger: row, start: 'top 96%', once: true }, delay: 0.3 + i * 0.07 })
        .from(row.querySelector('.channel-line'), { scaleX: 0, duration: 1.2, ease: 'snap' })
        .from(row.querySelectorAll('.channel-up'), { yPercent: 120, duration: 0.9, stagger: 0.05 }, 0.1)
    })
    gsap.from(q('.field'), {
      autoAlpha: 0,
      y: 30,
      duration: 1,
      stagger: 0.08,
      delay: 0.4,
      scrollTrigger: { trigger: q('.contact-form')[0], start: 'top 92%', once: true },
    })
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <div ref="root">
    <section class="px-gutter pt-36 md:pt-44">
      <p v-reveal class="label mb-6 flex items-center gap-3">
        <span class="inline-block h-2 w-2 animate-pulse rounded-full bg-accent"></span>
        (Contact) — Open to full-time roles, freelance and consulting
      </p>
      <h1 class="display text-[clamp(3.4rem,14vw,14.5rem)] uppercase">
        <span v-chars="{ start: 'top 100%' }" class="block">Let's</span>
        <span v-chars="{ start: 'top 100%', delay: 0.12 }" class="serif-i block normal-case text-accent">talk.</span>
      </h1>
    </section>

    <section class="grid gap-16 px-gutter py-section lg:grid-cols-12 lg:gap-12">
      <!-- Direct channels -->
      <div class="lg:col-span-5">
        <p v-lines class="mb-10 max-w-[26rem] text-lg text-bone/75">
          Have a product to build, a team that needs an engineer, or just a question? Pick whichever
          channel suits you. I read and answer every message.
        </p>

        <ul>
          <li v-for="c in channels" :key="c.label">
            <a :href="c.url" target="_blank" rel="noopener noreferrer" class="channel">
              <span class="channel-line"></span>
              <span class="overflow-hidden"><span class="channel-up label inline-block">{{ c.label }}</span></span>
              <span class="overflow-hidden"><span class="channel-up channel-value">{{ c.value }}</span></span>
              <span class="channel-arrow"><ArrowIcon :size="16" /></span>
            </a>
          </li>
        </ul>
        <div v-rule class="rule"></div>
      </div>

      <!-- Form -->
      <div class="lg:col-span-6 lg:col-start-7">
        <div v-if="sent" class="rounded-3xl border border-line bg-ink-800 p-10 text-center md:p-14">
          <div class="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-accent text-ink">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true">
              <path d="m5 12.5 4.5 4.5L19 7.5" />
            </svg>
          </div>
          <h2 class="display text-5xl">Message <span class="serif-i text-accent">sent.</span></h2>
          <p class="mx-auto mt-4 max-w-sm text-bone/70">Thank you for reaching out. I'll get back to you as soon as I can.</p>
          <button class="btn btn-ghost mt-8" @click="sent = false">Send another</button>
        </div>

        <form v-else class="contact-form" novalidate @submit.prevent="submit">
          <div class="field" :class="{ 'has-error': errors.name }">
            <label for="name">01 — Your name</label>
            <input id="name" v-model="form.name" type="text" autocomplete="name" placeholder="Jane Doe" />
            <p v-if="errors.name" class="field-error">{{ errors.name }}</p>
          </div>
          <div class="field" :class="{ 'has-error': errors.email }">
            <label for="email">02 — Your email</label>
            <input id="email" v-model="form.email" type="email" autocomplete="email" placeholder="jane@company.com" />
            <p v-if="errors.email" class="field-error">{{ errors.email }}</p>
          </div>
          <div class="field" :class="{ 'has-error': errors.subject }">
            <label for="subject">03 — Subject</label>
            <input id="subject" v-model="form.subject" type="text" placeholder="A new mobile app" />
            <p v-if="errors.subject" class="field-error">{{ errors.subject }}</p>
          </div>
          <div class="field" :class="{ 'has-error': errors.message }">
            <label for="message">04 — Tell me about it</label>
            <textarea id="message" v-model="form.message" rows="4" placeholder="What are you building, and where do I come in?"></textarea>
            <p v-if="errors.message" class="field-error">{{ errors.message }}</p>
          </div>

          <p v-if="failed" class="mt-6 rounded-xl border border-red-400/40 bg-red-500/10 p-4 text-sm text-red-200" role="alert">
            {{ failed }}
          </p>

          <div class="field mt-10 flex flex-wrap items-center gap-5 !border-0 !pb-0">
            <button v-magnetic="0.25" type="submit" class="btn btn-accent !px-9 !py-5" :disabled="sending">
              <template v-if="sending">Sending…</template>
              <template v-else>Send message <ArrowIcon :size="12" /></template>
            </button>
            <a :href="site.whatsapp" target="_blank" rel="noopener noreferrer" class="link-line font-mono text-xs uppercase tracking-[0.14em] text-bone/70">
              or chat on WhatsApp
            </a>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<style scoped>
.channel {
  position: relative;
  display: grid;
  grid-template-columns: 5rem minmax(0, 1fr) auto;
  align-items: center;
  gap: 0.75rem;
  padding: 1.4rem 0;
  transition: padding 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.channel-line {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 1px;
  background: rgba(237, 232, 223, 0.15);
  transform-origin: left;
}
.channel-value {
  display: inline-block;
  font-family: 'Bricolage Grotesque', sans-serif;
  font-weight: 600;
  font-size: clamp(0.92rem, 1.7vw, 1.45rem);
  letter-spacing: -0.02em;
  overflow-wrap: anywhere;
  transition: color 0.35s;
}
.channel-arrow {
  color: var(--mute);
  transition:
    transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
    color 0.35s;
}
@media (min-width: 640px) {
  .channel {
    grid-template-columns: 6.5rem minmax(0, 1fr) auto;
    gap: 1rem;
  }
}
@media (hover: hover) {
  .channel:hover {
    padding-left: 0.75rem;
  }
  .channel:hover .channel-value,
  .channel:hover .channel-arrow {
    color: var(--accent);
  }
  .channel:hover .channel-arrow {
    transform: translate(4px, -4px);
  }
}

.field {
  position: relative;
  border-bottom: 1px solid rgba(237, 232, 223, 0.18);
  padding: 1.6rem 0 1.1rem;
  transition: border-color 0.4s;
}
.field:focus-within {
  border-color: var(--accent);
}
.field.has-error {
  border-color: #f87171;
}
.field label {
  display: block;
  margin-bottom: 0.6rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--mute);
  transition: color 0.4s;
}
.field:focus-within label {
  color: var(--accent);
}
.field input,
.field textarea {
  width: 100%;
  resize: none;
  border: 0;
  background: transparent;
  font-family: 'Bricolage Grotesque', sans-serif;
  font-weight: 500;
  font-size: clamp(1.3rem, 2.2vw, 1.9rem);
  letter-spacing: -0.02em;
  color: var(--bone);
  outline: none;
}
.field input::placeholder,
.field textarea::placeholder {
  color: rgba(237, 232, 223, 0.22);
}
.field-error {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: #fca5a5;
}
button:disabled {
  opacity: 0.6;
  pointer-events: none;
}
</style>
