<script setup lang="ts">
import { ref } from 'vue'

const formData = ref({
  name: '',
  email: '',
  phone: '',
  guests: '2',
  date: '',
  time: '',
  message: '',
})

const errors = ref<Record<string, string>>({})
const isSubmitting = ref(false)
const submitStatus = ref<'idle' | 'success' | 'error'>('idle')

function validateForm() {
  const newErrors: Record<string, string> = {}

  if (!formData.value.name.trim()) {
    newErrors.name = 'Введите ваше имя'
  }

  if (!formData.value.email.trim()) {
    newErrors.email = 'Введите email'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
    newErrors.email = 'Введите корректный email'
  }

  if (!formData.value.phone.trim()) {
    newErrors.phone = 'Введите телефон'
  } else if (!/^[\d\s+()-]{10,}$/.test(formData.value.phone)) {
    newErrors.phone = 'Введите корректный телефон'
  }

  if (!formData.value.date) {
    newErrors.date = 'Выберите дату'
  }

  if (!formData.value.time) {
    newErrors.time = 'Выберите время'
  }

  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

async function handleSubmit(event: Event) {
  event.preventDefault()

  if (!validateForm()) {
    return
  }

  isSubmitting.value = true
  submitStatus.value = 'idle'

  try {
    // Имитация отправки формы
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log('Отправка формы:', formData.value)
    
    submitStatus.value = 'success'
    formData.value = { name: '', email: '', phone: '', guests: '2', date: '', time: '', message: '' }
    errors.value = {}
    
    // Сброс статуса через 3 секунды
    setTimeout(() => submitStatus.value = 'idle', 3000)
  } catch (error) {
    console.error('Ошибка отправки формы:', error)
    submitStatus.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}

function handleChange(field: string) {
  // Очистка ошибки при изменении поля
  if (errors.value[field]) {
    const newErrors = { ...errors.value }
    delete newErrors[field]
    errors.value = newErrors
  }
}
</script>

<template>
  <section class="section" id="contact">
    <div class="container">
      <div class="wrapper">
        <div class="header">
          <h2>Свяжитесь с нами</h2>
          <p>
            Есть вопросы по исследованию или предложения по улучшению методологии?
            Мы будем рады вашей обратной связи.
          </p>
        </div>

        <form class="form" @submit="handleSubmit" novalidate>
          <div class="field">
            <label for="name" class="label">
              Ваше имя <span class="required">*</span>
            </label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              class="input"
              :class="{ 'input-error': errors.name }"
              placeholder="Иван Иванов"
              :aria-invalid="!!errors.name"
              :aria-describedby="errors.name ? 'name-error' : undefined"
              @input="handleChange('name')"
            />
            <span v-if="errors.name" id="name-error" class="error" role="alert">
              {{ errors.name }}
            </span>
          </div>

          <div class="field">
            <label for="email" class="label">
              Электронная почта <span class="required">*</span>
            </label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              class="input"
              :class="{ 'input-error': errors.email }"
              placeholder="ivan@example.com"
              :aria-invalid="!!errors.email"
              :aria-describedby="errors.email ? 'email-error' : undefined"
              @input="handleChange('email')"
            />
            <span v-if="errors.email" id="email-error" class="error" role="alert">
              {{ errors.email }}
            </span>
          </div>

          <div class="field">
            <label for="message" class="label">
              Ваше сообщение <span class="required">*</span>
            </label>
            <textarea
              id="message"
              v-model="formData.message"
              class="textarea"
              :class="{ 'input-error': errors.message }"
              placeholder="Расскажите, что вас интересует..."
              rows="5"
              :aria-invalid="!!errors.message"
              :aria-describedby="errors.message ? 'message-error' : undefined"
              @input="handleChange('message')"
            />
            <span v-if="errors.message" id="message-error" class="error" role="alert">
              {{ errors.message }}
            </span>
          </div>

          <button
            type="submit"
            class="btn btn-primary submit"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? 'Отправка...' : 'Отправить' }}
          </button>

          <div v-if="submitStatus === 'success'" class="success-message" role="status">
            Спасибо! Ваше сообщение успешно отправлено.
          </div>

          <div v-if="submitStatus === 'error'" class="error-message" role="alert">
            Произошла ошибка при отправке. Пожалуйста, попробуйте позже.
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.wrapper {
  max-width: 700px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.header h2 {
  margin-bottom: var(--spacing-md);
}

.header p {
  font-size: 1.125rem;
  color: var(--color-text-light);
}

.form {
  background: white;
  padding: var(--spacing-xl);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
}

.field {
  margin-bottom: var(--spacing-lg);
}

.label {
  display: block;
  font-weight: 600;
  margin-bottom: var(--spacing-xs);
  color: var(--color-text);
  font-size: 0.95rem;
}

.required {
  color: #ef4444;
}

.input,
.textarea {
  width: 100%;
  padding: 0.875rem 1rem;
  font-size: 1rem;
  font-family: var(--font-inter);
  color: var(--color-text);
  background: white;
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
}

.input:focus,
.textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input::placeholder,
.textarea::placeholder {
  color: var(--color-text-light);
  opacity: 0.6;
}

.input-error {
  border-color: #ef4444;
}

.input-error:focus {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.textarea {
  resize: vertical;
  min-height: 120px;
}

.error {
  display: block;
  margin-top: var(--spacing-xs);
  font-size: 0.875rem;
  color: #ef4444;
}

.submit {
  width: 100%;
  margin-top: var(--spacing-md);
  font-size: 1.125rem;
  padding: 1rem 2rem;
}

.submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

.success-message,
.error-message {
  margin-top: var(--spacing-md);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  font-weight: 500;
  text-align: center;
}

.success-message {
  background: #d1fae5;
  color: #065f46;
  border: 2px solid #10b981;
}

.error-message {
  background: #fee2e2;
  color: #991b1b;
  border: 2px solid #ef4444;
}

@media (max-width: 768px) {
  .form {
    padding: var(--spacing-lg);
  }
  
  .header p {
    font-size: 1rem;
  }
}
</style>
